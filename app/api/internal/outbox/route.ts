import { timingSafeEqual } from "node:crypto";
import { getOutboxOptions } from "@/lib/server/config";
import { processOutbox } from "@/lib/server/notification-outbox";

/**
 * POST /api/internal/outbox — retries pending notifications, for a scheduled job (cron).
 * Requires `Authorization: Bearer <OUTBOX_PROCESS_SECRET>`. Without the secret configured
 * the endpoint does not exist (404).
 */
export async function POST(request: Request) {
  const secret = process.env.OUTBOX_PROCESS_SECRET;
  const options = getOutboxOptions();
  if (!secret || !options) return new Response(null, { status: 404 });

  const provided = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return new Response(null, { status: 401 });
  }

  const result = await processOutbox(options);
  return Response.json(result, { headers: { "cache-control": "no-store" } });
}
