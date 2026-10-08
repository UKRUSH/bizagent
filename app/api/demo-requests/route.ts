import { after } from "next/server";
import { getAllowedOrigins, getLeadStore, getOutboxOptions, submissionRateLimiter } from "@/lib/server/config";
import { handleSubmission } from "@/lib/server/submissions";

/** POST /api/demo-requests — demo request journey (spec 12.2, 21). */
export async function POST(request: Request) {
  return handleSubmission(request, "demo", {
    store: getLeadStore(),
    outbox: getOutboxOptions(),
    rateLimiter: submissionRateLimiter,
    allowedOrigins: getAllowedOrigins(request.url),
    schedule: (task) => after(task),
  });
}
