import { mkdir, open, readdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import type { StoredRequest } from "./lead-store";

/**
 * File-based notification outbox (spec 12.2). A notification entry is written next to the
 * stored request, then delivered to an internal webhook after the response is sent. A
 * failed delivery is retried with backoff and never affects the stored lead; after
 * `maxAttempts` the entry moves to dead-letter/ for review.
 *
 *   <dir>/outbox/<reference>.json
 *   <dir>/dead-letter/<reference>.json
 */

export interface OutboxEntry {
  reference: string;
  kind: StoredRequest["kind"];
  receivedAt: string;
  /** Minimal contact summary for the team; the full request stays in the store. */
  summary: { fullName?: string; businessName?: string | null; workEmail?: string };
  attempts: number;
  nextAttemptAt: string;
  lastError?: string;
}

export interface OutboxOptions {
  directory: string;
  webhookUrl: string;
  webhookSecret?: string;
  maxAttempts?: number;
  now?: () => Date;
  fetchImpl?: typeof fetch;
}

export interface OutboxRunResult {
  delivered: number;
  retried: number;
  deadLettered: number;
  waiting: number;
  locked: boolean;
}

const LOCK_STALE_MS = 2 * 60 * 1000;

function outboxDir(directory: string) {
  return path.join(directory, "outbox");
}

function deadLetterDir(directory: string) {
  return path.join(directory, "dead-letter");
}

function summarise(record: StoredRequest): OutboxEntry["summary"] {
  const data = (record.data ?? {}) as Record<string, unknown>;
  return {
    fullName: typeof data.fullName === "string" ? data.fullName : undefined,
    businessName: typeof data.businessName === "string" ? data.businessName : null,
    workEmail: typeof data.workEmail === "string" ? data.workEmail : undefined,
  };
}

export async function enqueueNotification(directory: string, record: StoredRequest, now = new Date()): Promise<void> {
  await mkdir(outboxDir(directory), { recursive: true });
  const entry: OutboxEntry = {
    reference: record.reference,
    kind: record.kind,
    receivedAt: record.receivedAt,
    summary: summarise(record),
    attempts: 0,
    nextAttemptAt: now.toISOString(),
  };
  // "wx": a retried submission must not queue a second notification.
  try {
    await writeFile(path.join(outboxDir(directory), `${record.reference}.json`), JSON.stringify(entry, null, 2), {
      flag: "wx",
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
  }
}

async function acquireLock(directory: string, now: Date): Promise<boolean> {
  const lockPath = path.join(directory, "outbox.lock");
  try {
    const handle = await open(lockPath, "wx");
    await handle.close();
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    const info = await stat(lockPath).catch(() => null);
    if (info && now.getTime() - info.mtimeMs > LOCK_STALE_MS) {
      await rm(lockPath, { force: true });
      return acquireLock(directory, now);
    }
    return false;
  }
}

function backoffMs(attempts: number): number {
  return Math.min(2 ** attempts, 60) * 60 * 1000;
}

/** Delivers due notifications. Safe to call often; a lock prevents overlapping runs. */
export async function processOutbox(options: OutboxOptions): Promise<OutboxRunResult> {
  const { directory, webhookUrl, webhookSecret, maxAttempts = 6, fetchImpl = fetch } = options;
  const now = options.now?.() ?? new Date();
  const result: OutboxRunResult = { delivered: 0, retried: 0, deadLettered: 0, waiting: 0, locked: false };

  await mkdir(outboxDir(directory), { recursive: true });
  if (!(await acquireLock(directory, now))) return { ...result, locked: true };

  try {
    const files = (await readdir(outboxDir(directory))).filter((file) => file.endsWith(".json"));
    for (const file of files) {
      const filePath = path.join(outboxDir(directory), file);
      const entry = JSON.parse(await readFile(filePath, "utf8")) as OutboxEntry;
      if (new Date(entry.nextAttemptAt).getTime() > now.getTime()) {
        result.waiting++;
        continue;
      }

      try {
        const response = await fetchImpl(webhookUrl, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            ...(webhookSecret ? { authorization: `Bearer ${webhookSecret}` } : {}),
          },
          body: JSON.stringify({
            event: "request.received",
            reference: entry.reference,
            kind: entry.kind,
            receivedAt: entry.receivedAt,
            summary: entry.summary,
          }),
          signal: AbortSignal.timeout(10_000),
        });
        if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
        await rm(filePath, { force: true });
        result.delivered++;
      } catch (error) {
        const attempts = entry.attempts + 1;
        const updated: OutboxEntry = {
          ...entry,
          attempts,
          lastError: error instanceof Error ? error.message : String(error),
          nextAttemptAt: new Date(now.getTime() + backoffMs(attempts)).toISOString(),
        };
        if (attempts >= maxAttempts) {
          await mkdir(deadLetterDir(directory), { recursive: true });
          await writeFile(filePath, JSON.stringify(updated, null, 2));
          await rename(filePath, path.join(deadLetterDir(directory), file));
          result.deadLettered++;
        } else {
          await writeFile(filePath, JSON.stringify(updated, null, 2));
          result.retried++;
        }
      }
    }
  } finally {
    await rm(path.join(directory, "outbox.lock"), { force: true });
  }
  return result;
}
