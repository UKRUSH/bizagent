import { createHash, randomBytes } from "node:crypto";
import { mkdir, open, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Durable storage for demo requests and enquiries (spec 12.2, 21).
 *
 * A request counts as received only once `save()` resolves: the file store has fsynced the
 * record to disk, or the HTTP store has had a 2xx from the receiving system. Saves are
 * idempotent per submission ID, so a double-click or a retry after a network error never
 * creates a second lead.
 */

export type RequestKind = "demo" | "general" | "security";

export interface StoredRequest {
  reference: string;
  kind: RequestKind;
  submissionId: string | null;
  receivedAt: string;
  data: unknown;
}

export interface SaveResult {
  reference: string;
  receivedAt: string;
  /** True when this submission ID was already stored; the original reference is returned. */
  duplicate: boolean;
}

export interface LeadStore {
  readonly name: string;
  save(record: StoredRequest): Promise<SaveResult>;
}

const REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/**
 * Human-friendly reference such as BM-7KQ2-XW9D (no 0/O or 1/I). When a submission ID is
 * given the reference is derived from it, so a retried submission keeps the same reference
 * even if the first response was lost in transit.
 */
export function createReference(submissionId?: string | null): string {
  const bytes = submissionId ? createHash("sha256").update(submissionId).digest() : randomBytes(8);
  const chars = Array.from(bytes, (byte) => REFERENCE_ALPHABET[byte % REFERENCE_ALPHABET.length]).join("");
  return `BM-${chars.slice(0, 4)}-${chars.slice(4, 8)}`;
}

const SUBMISSION_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isValidSubmissionId(value: unknown): value is string {
  return typeof value === "string" && SUBMISSION_ID_PATTERN.test(value);
}

/** Writes a file atomically and durably: temp file, fsync, rename. */
async function writeDurably(filePath: string, contents: string): Promise<void> {
  const tempPath = `${filePath}.${randomBytes(4).toString("hex")}.tmp`;
  const handle = await open(tempPath, "w");
  try {
    await handle.writeFile(contents, "utf8");
    await handle.sync();
  } finally {
    await handle.close();
  }
  await rename(tempPath, filePath);
}

/* -------------------------------------------------------------- File store */

/**
 * Stores each request as a JSON file. Suitable for a Node server with a persistent disk;
 * not for serverless or ephemeral file systems.
 *
 *   <dir>/requests/<reference>.json
 *   <dir>/idempotency/<submissionId>   (contains the reference)
 */
export class FileLeadStore implements LeadStore {
  readonly name = "file";

  constructor(private readonly directory: string) {}

  get requestsDir() {
    return path.join(this.directory, "requests");
  }

  private get idempotencyDir() {
    return path.join(this.directory, "idempotency");
  }

  async save(record: StoredRequest): Promise<SaveResult> {
    await mkdir(this.requestsDir, { recursive: true });
    await mkdir(this.idempotencyDir, { recursive: true });

    if (record.submissionId) {
      const existing = await this.findBySubmission(record.submissionId);
      if (existing) return { ...existing, duplicate: true };
    }

    // Write the request first, then claim the submission ID. A crash between the two can
    // at worst leave a duplicate on retry; it can never report success for a lost lead.
    const requestPath = path.join(this.requestsDir, `${record.reference}.json`);
    await writeDurably(requestPath, JSON.stringify(record, null, 2));

    if (record.submissionId) {
      try {
        await writeFile(
          path.join(this.idempotencyDir, record.submissionId),
          JSON.stringify({ reference: record.reference, receivedAt: record.receivedAt }),
          { flag: "wx" },
        );
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
        // A concurrent save of the same submission won the claim; keep that one.
        await rm(requestPath, { force: true });
        const existing = await this.findBySubmission(record.submissionId);
        if (existing) return { ...existing, duplicate: true };
        throw error;
      }
    }

    return { reference: record.reference, receivedAt: record.receivedAt, duplicate: false };
  }

  private async findBySubmission(submissionId: string): Promise<Omit<SaveResult, "duplicate"> | null> {
    try {
      const contents = await readFile(path.join(this.idempotencyDir, submissionId), "utf8");
      const parsed = JSON.parse(contents) as { reference: string; receivedAt: string };
      return { reference: parsed.reference, receivedAt: parsed.receivedAt };
    } catch {
      return null;
    }
  }
}

/* -------------------------------------------------------------- HTTP store */

/**
 * Forwards each request to an HTTPS endpoint you control (a CRM, form backend or internal
 * API). The request is accepted only on a 2xx response. The submission ID is sent as an
 * Idempotency-Key header so the receiver can discard retries. The receiver is responsible
 * for durable storage and its own team notifications.
 */
export class HttpLeadStore implements LeadStore {
  readonly name = "http";

  constructor(
    private readonly url: string,
    private readonly secret: string,
    private readonly timeoutMs = 10_000,
  ) {}

  async save(record: StoredRequest): Promise<SaveResult> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${this.secret}`,
        ...(record.submissionId ? { "idempotency-key": record.submissionId } : {}),
      },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    if (!response.ok) throw new Error(`Lead store responded with ${response.status}`);
    return { reference: record.reference, receivedAt: record.receivedAt, duplicate: false };
  }
}
