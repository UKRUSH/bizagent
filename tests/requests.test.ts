import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, describe, it } from "node:test";
import { createReference, FileLeadStore } from "@/lib/server/lead-store";
import { enqueueNotification, processOutbox } from "@/lib/server/notification-outbox";
import { createRateLimiter } from "@/lib/server/rate-limit";
import { handleSubmission, type SubmissionDependencies } from "@/lib/server/submissions";
import { normalisePhone, validateDemoRequest, validateEnquiry } from "@/lib/validation/requests";

const TODAY = "2026-10-08";
const ORIGIN = "http://localhost:3000";

const validDemo = {
  fullName: "  Asha   Perera ",
  businessName: "Fictional Clinic",
  workEmail: "Asha@Example.com",
  phoneCountry: "LK",
  phoneNumber: "077 123 4567",
  industry: "clinics-hospitals",
  role: "call-center",
  modules: ["inbound-calls", "reminders-scheduling", "inbound-calls"],
  plan: "basic",
  volumeAmount: "120",
  volumeUnit: "calls-per-day",
  currentSystems: ["calendar"],
  otherSystems: "",
  demoLanguage: "english",
  preferredDate: "2026-10-12",
  preferredWindow: "morning",
  timeZone: "Asia/Colombo",
  requirement: "We miss calls at lunchtime.",
  privacyAck: true,
  marketingConsent: false,
  marketingChannels: [],
};

describe("demo request validation (spec 12.1)", () => {
  it("accepts a complete request and normalises values", () => {
    const result = validateDemoRequest(validDemo, TODAY);
    assert.ok(result.ok, JSON.stringify(!result.ok && result.errors));
    assert.equal(result.value.fullName, "Asha Perera");
    assert.equal(result.value.workEmail, "asha@example.com");
    assert.deepEqual(result.value.phone, { country: "LK", e164: "+94771234567" });
    assert.deepEqual(result.value.modules, ["inbound-calls", "reminders-scheduling"]);
    assert.deepEqual(result.value.volume, { amount: 120, unit: "calls-per-day" });
    assert.equal(result.value.marketingConsent, null);
  });

  it("requires the core fields and the acknowledgement", () => {
    const result = validateDemoRequest({}, TODAY);
    assert.ok(!result.ok);
    for (const field of ["fullName", "businessName", "workEmail", "industry", "role", "demoLanguage", "privacyAck"]) {
      assert.ok(result.errors[field], `expected an error for ${field}`);
    }
  });

  it("enforces length and format limits", () => {
    const result = validateDemoRequest(
      { ...validDemo, fullName: "A", workEmail: "not-an-email", requirement: "x".repeat(2001) },
      TODAY,
    );
    assert.ok(!result.ok);
    assert.ok(result.errors.fullName && result.errors.workEmail && result.errors.requirement);
  });

  it("rejects values that are not on the allowlists", () => {
    const result = validateDemoRequest(
      { ...validDemo, industry: "space", modules: ["teleportation"], plan: "<script>", role: "boss" },
      TODAY,
    );
    assert.ok(!result.ok);
    assert.ok(result.errors.industry && result.errors.modules && result.errors.plan && result.errors.role);
  });

  it("treats the preferred time as a request in the future, within a year", () => {
    assert.ok(!validateDemoRequest({ ...validDemo, preferredDate: "2026-10-01" }, TODAY).ok);
    assert.ok(!validateDemoRequest({ ...validDemo, preferredDate: "2027-12-01" }, TODAY).ok);
    assert.ok(!validateDemoRequest({ ...validDemo, preferredDate: "2026-02-30" }, TODAY).ok);
    assert.ok(validateDemoRequest({ ...validDemo, preferredDate: TODAY }, TODAY).ok);
  });

  it("keeps marketing consent separate and records the chosen channels", () => {
    const missingChannel = validateDemoRequest({ ...validDemo, marketingConsent: true, marketingChannels: [] }, TODAY);
    assert.ok(!missingChannel.ok && missingChannel.errors.marketingChannels);
    const withChannel = validateDemoRequest({ ...validDemo, marketingConsent: true, marketingChannels: ["email"] }, TODAY);
    assert.ok(withChannel.ok);
    assert.deepEqual(withChannel.value.marketingConsent, { channels: ["email"] });
  });
});

describe("phone normalisation (spec 12.1)", () => {
  it("normalises national and international formats for the selected country", () => {
    assert.equal(normalisePhone("LK", "0771234567").phone?.e164, "+94771234567");
    assert.equal(normalisePhone("LK", "+94 77 123 4567").phone?.e164, "+94771234567");
    assert.equal(normalisePhone("LK", "0094771234567").phone?.e164, "+94771234567");
  });

  it("does not strip national digits that look like the country code", () => {
    assert.equal(normalisePhone("IN", "91234 56789").phone?.e164, "+919123456789");
  });

  it("rejects mismatched codes, missing countries and malformed numbers", () => {
    assert.ok(normalisePhone("LK", "+44 20 7946 0000").error);
    assert.ok(normalisePhone("", "0771234567").error);
    assert.ok(normalisePhone("other", "0771234567").error);
    assert.equal(normalisePhone("other", "+44 20 7946 0000").phone?.e164, "+442079460000");
    assert.equal(normalisePhone("LK", "").phone, null);
  });
});

describe("enquiry validation", () => {
  it("accepts general and security enquiries and allowlists documents", () => {
    const base = { fullName: "R. Silva", workEmail: "r@example.com", message: "Please share your approach.", privacyAck: true };
    assert.ok(validateEnquiry({ ...base, kind: "general" }).ok);
    const security = validateEnquiry({ ...base, kind: "security", documents: ["Subprocessor list"] });
    assert.ok(security.ok);
    assert.deepEqual(security.value.documents, ["Subprocessor list"]);
    assert.ok(!validateEnquiry({ ...base, kind: "security", documents: ["Secret plans"] }).ok);
    assert.ok(!validateEnquiry({ ...base, kind: "demo" }).ok);
  });
});

/* ---------------------------------------------------------------- Pipeline */

function demoRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request(`${ORIGIN}/api/demo-requests`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: ORIGIN, "x-forwarded-for": "203.0.113.7", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("submission pipeline (spec 12.2)", () => {
  let directory: string;
  const scheduled: (() => Promise<unknown>)[] = [];

  before(async () => {
    directory = await mkdtemp(path.join(tmpdir(), "bizmaster-leads-"));
  });
  after(async () => {
    await rm(directory, { recursive: true, force: true });
  });

  function deps(overrides: Partial<SubmissionDependencies> = {}): SubmissionDependencies {
    return {
      store: new FileLeadStore(directory),
      outbox: null,
      rateLimiter: createRateLimiter(100, 60_000),
      allowedOrigins: [ORIGIN],
      schedule: (task) => scheduled.push(task),
      now: () => new Date(`${TODAY}T09:00:00Z`),
      log: () => undefined,
      ...overrides,
    };
  }

  it("returns an honest 503 and stores nothing when no store is configured", async () => {
    const response = await handleSubmission(demoRequest(validDemo), "demo", deps({ store: null }));
    assert.equal(response.status, 503);
    const body = await response.json();
    assert.equal(body.ok, false);
    assert.equal(body.code, "not-configured");
  });

  it("stores the request durably before reporting success", async () => {
    const submissionId = "6b1f4a52-0c1e-4d8e-9a0b-6f7c2d3e4a5b";
    const response = await handleSubmission(demoRequest({ ...validDemo, submissionId }), "demo", deps());
    assert.equal(response.status, 201);
    const body = await response.json();
    assert.equal(body.reference, createReference(submissionId));
    const stored = JSON.parse(await readFile(path.join(directory, "requests", `${body.reference}.json`), "utf8"));
    assert.equal(stored.kind, "demo");
    assert.equal(stored.data.workEmail, "asha@example.com");
  });

  it("does not create a duplicate when the same submission is retried", async () => {
    const submissionId = "0f3c2b1a-9d8e-4f7a-8b6c-5d4e3f2a1b0c";
    const first = await (await handleSubmission(demoRequest({ ...validDemo, submissionId }), "demo", deps())).json();
    const retry = await handleSubmission(demoRequest({ ...validDemo, submissionId }), "demo", deps());
    assert.equal(retry.status, 200);
    assert.equal((await retry.json()).reference, first.reference);
    const files = (await readdir(path.join(directory, "requests"))).filter((file) => file.startsWith(first.reference));
    assert.equal(files.length, 1);
  });

  it("returns field errors without storing anything", async () => {
    const response = await handleSubmission(demoRequest({ ...validDemo, workEmail: "nope" }), "demo", deps());
    assert.equal(response.status, 422);
    assert.ok((await response.json()).errors.workEmail);
  });

  it("rejects other origins, wrong content types, oversized bodies, bad JSON and the honeypot", async () => {
    assert.equal((await handleSubmission(demoRequest(validDemo, { origin: "https://evil.example" }), "demo", deps())).status, 403);
    assert.equal((await handleSubmission(demoRequest(validDemo, { "content-type": "text/plain" }), "demo", deps())).status, 415);
    assert.equal(
      (await handleSubmission(demoRequest({ ...validDemo, requirement: "x".repeat(20_000) }), "demo", deps())).status,
      413,
    );
    assert.equal((await handleSubmission(demoRequest("{not json"), "demo", deps())).status, 400);
    assert.equal((await handleSubmission(demoRequest({ ...validDemo, website: "spam" }), "demo", deps())).status, 422);
  });

  it("rate-limits repeated submissions from the same client", async () => {
    const limited = deps({ rateLimiter: createRateLimiter(2, 60_000) });
    await handleSubmission(demoRequest({ ...validDemo, workEmail: "x" }), "demo", limited);
    await handleSubmission(demoRequest({ ...validDemo, workEmail: "x" }), "demo", limited);
    const third = await handleSubmission(demoRequest(validDemo), "demo", limited);
    assert.equal(third.status, 429);
    assert.ok(Number(third.headers.get("retry-after")) > 0);
  });

  it("reports a temporary failure when the store throws, without claiming success", async () => {
    const failing = { name: "failing", save: async () => Promise.reject(new Error("disk full")) };
    const response = await handleSubmission(demoRequest(validDemo), "demo", deps({ store: failing }));
    assert.equal(response.status, 503);
    assert.equal((await response.json()).code, "temporary");
  });
});

describe("notification outbox (spec 12.2)", () => {
  it("keeps the lead when delivery fails, retries with backoff and dead-letters after the limit", async () => {
    const directory = await mkdtemp(path.join(tmpdir(), "bizmaster-outbox-"));
    try {
      const record = {
        reference: "BM-TEST-0001",
        kind: "demo" as const,
        submissionId: null,
        receivedAt: "2026-10-08T09:00:00.000Z",
        data: { fullName: "A. P.", workEmail: "a@example.com" },
      };
      await enqueueNotification(directory, record, new Date("2026-10-08T09:00:00Z"));
      await enqueueNotification(directory, record, new Date("2026-10-08T09:00:00Z")); // duplicate is ignored

      const failingFetch = (async () => new Response(null, { status: 500 })) as typeof fetch;
      let clock = new Date("2026-10-08T09:00:00Z").getTime();
      const options = { directory, webhookUrl: "https://hooks.example/notify", maxAttempts: 2, fetchImpl: failingFetch, now: () => new Date(clock) };

      const firstRun = await processOutbox(options);
      assert.equal(firstRun.retried, 1);
      assert.equal((await processOutbox(options)).waiting, 1, "waits for the backoff window");

      clock += 3 * 60 * 60 * 1000;
      const secondRun = await processOutbox(options);
      assert.equal(secondRun.deadLettered, 1);
      assert.deepEqual(await readdir(path.join(directory, "dead-letter")), ["BM-TEST-0001.json"]);

      // Delivery succeeds for a fresh entry and removes it from the outbox.
      await enqueueNotification(directory, { ...record, reference: "BM-TEST-0002" }, new Date(clock));
      const okFetch = (async () => new Response(null, { status: 204 })) as typeof fetch;
      const delivered = await processOutbox({ ...options, fetchImpl: okFetch });
      assert.equal(delivered.delivered, 1);
      assert.deepEqual(await readdir(path.join(directory, "outbox")), []);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
