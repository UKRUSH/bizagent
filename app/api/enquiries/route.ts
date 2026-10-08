import { after } from "next/server";
import { getAllowedOrigins, getLeadStore, getOutboxOptions, submissionRateLimiter } from "@/lib/server/config";
import { handleSubmission } from "@/lib/server/submissions";

/** POST /api/enquiries — general and security-information enquiries (spec 21). */
export async function POST(request: Request) {
  return handleSubmission(request, "enquiry", {
    store: getLeadStore(),
    outbox: getOutboxOptions(),
    rateLimiter: submissionRateLimiter,
    allowedOrigins: getAllowedOrigins(request.url),
    schedule: (task) => after(task),
  });
}
