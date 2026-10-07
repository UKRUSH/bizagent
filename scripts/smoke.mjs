// Route smoke test against a running server (spec 23.2: route links, the 13 module routes,
// and real not-found UI for invalid slugs).
// Usage: npm run build && npm start, then in another terminal: npm run smoke
// Set BASE_URL to test another host (default http://localhost:3000).

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";

const moduleSlugs = [
  "inbound-calls",
  "outbound-calls",
  "whatsapp-messaging",
  "whatsapp-voice",
  "follow-ups",
  "reminders-scheduling",
  "call-filtering",
  "customer-segmentation",
  "recording-transcription",
  "promotions-campaigns",
  "sales-agent",
  "call-center",
  "personal-assistant",
];

/** [path, expected status, text that must appear in the HTML] */
const checks = [
  ["/", 200, "Keep every customer conversation moving."],
  ["/platform", 200, "One shared platform behind every conversation."],
  ["/features", 200, "Thirteen modules for every call and message."],
  ...moduleSlugs.map((slug) => [`/features/${slug}`, 200, "Illustrative demo"]),
  ["/features/not-a-module", 404, "We couldn’t find that page."],
  ["/solutions/call-center", 200, "Answer routine calls and keep every queue moving."],
  ["/solutions/sales-agent", 200, "Respond to every enquiry and keep follow-ups moving."],
  ["/solutions/personal-assistant", 200, "Protect your time without missing what matters."],
  ["/solutions/not-a-role", 404, "We couldn’t find that page."],
  ["/enterprise", 200, "Built around your organisation"],
  ["/does-not-exist", 404, "We couldn’t find that page."],
];

let failures = 0;
for (const [path, expectedStatus, expectedText] of checks) {
  const response = await fetch(new URL(path, baseUrl), { redirect: "manual" });
  const html = await response.text();
  const problems = [];
  if (response.status !== expectedStatus) problems.push(`status ${response.status}, expected ${expectedStatus}`);
  if (!html.includes(expectedText)) problems.push(`missing text "${expectedText}"`);
  if (problems.length) failures++;
  console.log(`${problems.length ? "FAIL" : "ok  "} ${path}${problems.length ? ` — ${problems.join("; ")}` : ""}`);
}

console.log(`\n${checks.length - failures}/${checks.length} route checks passed`);
process.exitCode = failures ? 1 : 0;
