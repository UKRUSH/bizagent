import "server-only";
import { FileLeadStore, HttpLeadStore, type LeadStore } from "./lead-store";
import type { OutboxOptions } from "./notification-outbox";
import { createRateLimiter } from "./rate-limit";

/**
 * Reads request-pipeline configuration from server-only environment variables (spec 21).
 * Secrets are never exposed through NEXT_PUBLIC_ variables. See .env.example.
 */

/** LEAD_STORE_URL (+ LEAD_STORE_SECRET) wins over LEAD_STORE_DIR; neither means "not configured". */
export function getLeadStore(): LeadStore | null {
  const url = process.env.LEAD_STORE_URL;
  const secret = process.env.LEAD_STORE_SECRET;
  if (url && secret) return new HttpLeadStore(url, secret);
  const directory = process.env.LEAD_STORE_DIR;
  if (directory) return new FileLeadStore(directory);
  return null;
}

/** Notifications are queued only with a file store and a webhook to deliver to. */
export function getOutboxOptions(): OutboxOptions | null {
  const directory = process.env.LEAD_STORE_DIR;
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (!directory || !webhookUrl || process.env.LEAD_STORE_URL) return null;
  return { directory, webhookUrl, webhookSecret: process.env.NOTIFICATION_WEBHOOK_SECRET };
}

/** The request's own origin plus the configured production origin (SITE_URL). */
export function getAllowedOrigins(requestUrl: string): string[] {
  const origins = new Set([new URL(requestUrl).origin]);
  if (process.env.SITE_URL) origins.add(new URL(process.env.SITE_URL).origin);
  return [...origins];
}

/** Five submissions per ten minutes per client and form type, per server instance. */
export const submissionRateLimiter = createRateLimiter(5, 10 * 60 * 1000);
