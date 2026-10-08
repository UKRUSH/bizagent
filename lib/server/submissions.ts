import { unavailableMessage } from "@/content/forms";
import { todayIso, validateDemoRequest, validateEnquiry } from "@/lib/validation/requests";
import { createReference, isValidSubmissionId, type LeadStore, type RequestKind, type StoredRequest } from "./lead-store";
import { enqueueNotification, processOutbox, type OutboxOptions } from "./notification-outbox";
import type { RateLimiter } from "./rate-limit";

/**
 * Shared submission pipeline for POST /api/demo-requests and POST /api/enquiries
 * (spec 12.2, 21). Order of checks: origin → content type → size → JSON → rate limit →
 * honeypot → validation → durable save → scheduled notification. Success is returned only
 * after the store has accepted the request; without a configured store the response is an
 * honest 503, never a fake success.
 */

export type SubmissionType = "demo" | "enquiry";

export interface SubmissionDependencies {
  store: LeadStore | null;
  /** Present only when a file store and a notification webhook are configured. */
  outbox: OutboxOptions | null;
  rateLimiter: RateLimiter;
  allowedOrigins: string[];
  /** Runs work after the response is sent (Next.js `after`). */
  schedule: (task: () => Promise<unknown>) => void;
  now?: () => Date;
  log?: (event: Record<string, unknown>) => void;
}

export const MAX_BODY_BYTES = 16 * 1024;

function json(status: number, body: Record<string, unknown>, headers: Record<string, string> = {}): Response {
  return Response.json(body, { status, headers: { "cache-control": "no-store", ...headers } });
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

export async function handleSubmission(
  request: Request,
  type: SubmissionType,
  deps: SubmissionDependencies,
): Promise<Response> {
  const now = deps.now?.() ?? new Date();
  const log = deps.log ?? ((event) => console.info(JSON.stringify(event)));

  // Same-origin browser forms only (spec 12.2).
  const origin = request.headers.get("origin");
  if (!origin || !deps.allowedOrigins.includes(origin)) {
    return json(403, { ok: false, message: "This request can't be accepted from here." });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json(415, { ok: false, message: "Send the form as JSON." });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_BODY_BYTES) return json(413, { ok: false, message: "The form is too large to send." });
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return json(413, { ok: false, message: "The form is too large to send." });
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, message: "The form data couldn't be read. Please try again." });
  }

  const retryAfter = deps.rateLimiter.check(`${type}:${clientKey(request)}`, now.getTime());
  if (retryAfter > 0) {
    return json(
      429,
      { ok: false, message: "You've sent several requests in a short time. Please wait a few minutes and try again." },
      { "retry-after": String(retryAfter) },
    );
  }

  // Honeypot: a hidden field people never see or fill in.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    log({ event: "request.rejected", reason: "honeypot", type });
    return json(422, { ok: false, message: "This request couldn't be accepted." });
  }

  const result = type === "demo" ? validateDemoRequest(body, todayIso(now)) : validateEnquiry(body);
  if (!result.ok) {
    return json(422, { ok: false, message: "Some answers need attention.", errors: result.errors });
  }

  if (!deps.store) {
    log({ event: "request.unavailable", reason: "store-not-configured", type });
    return json(503, { ok: false, code: "not-configured", message: unavailableMessage });
  }

  const submissionId = isValidSubmissionId(body.submissionId) ? body.submissionId : null;
  const kind: RequestKind = result.value.kind;
  const record: StoredRequest = {
    reference: createReference(submissionId),
    kind,
    submissionId,
    receivedAt: now.toISOString(),
    data: result.value,
  };

  let saved;
  try {
    saved = await deps.store.save(record);
  } catch (error) {
    log({
      event: "request.store-failed",
      type,
      store: deps.store.name,
      error: error instanceof Error ? error.message : "unknown",
    });
    return json(503, { ok: false, code: "temporary", message: unavailableMessage });
  }

  // The lead is durably stored. Notification problems must not change the response.
  if (deps.outbox && !saved.duplicate) {
    const outbox = deps.outbox;
    try {
      await enqueueNotification(outbox.directory, { ...record, reference: saved.reference });
      deps.schedule(() => processOutbox(outbox).catch(() => undefined));
    } catch (error) {
      log({ event: "request.notification-queue-failed", reference: saved.reference, error: String(error) });
    }
  }

  log({ event: saved.duplicate ? "request.duplicate" : "request.accepted", type, kind, reference: saved.reference });
  return json(saved.duplicate ? 200 : 201, {
    ok: true,
    reference: saved.reference,
    receivedAt: saved.receivedAt,
    kind,
  });
}
