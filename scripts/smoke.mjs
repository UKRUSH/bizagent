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

const industrySlugs = [
  "clinics-hospitals",
  "hotels",
  "restaurants",
  "service-companies",
  "support-teams",
  "bpos-call-centres",
  "institutions",
  "real-estate",
  "education",
  "insurance",
  "retail-ecommerce",
  "d2c-brands",
  "executives-professionals",
  "agencies",
  "sales-teams-smes",
  "automotive",
  "finance-professional-services",
];

/** [path, expected status, text that must appear, optional text that must NOT appear] */
const checks = [
  // "moving." is wrapped in an accent span, so match the start of the headline.
  ["/", 200, "Keep every customer conversation"],
  ["/platform", 200, "One shared platform behind every conversation."],
  ["/features", 200, "Thirteen modules for every call and message."],
  ...moduleSlugs.map((slug) => [`/features/${slug}`, 200, "Illustrative demo"]),
  ["/features/not-a-module", 404, "We couldn’t find that page."],
  ["/solutions/call-center", 200, "Answer routine calls and keep every queue moving."],
  ["/solutions/sales-agent", 200, "Respond to every enquiry and keep follow-ups moving."],
  ["/solutions/personal-assistant", 200, "Protect your time without missing what matters."],
  ["/solutions/not-a-role", 404, "We couldn’t find that page."],
  ["/enterprise", 200, "Built around your organisation"],
  ["/whatsapp-ai", 200, "AI for your WhatsApp Business number."],
  ["/industries", 200, "Built around how your industry works."],
  ...industrySlugs.map((slug) => [`/industries/${slug}`, 200, "Where your team stays in charge"]),
  ["/industries/not-an-industry", 404, "We couldn’t find that page."],
  // Module and industry pages deep-link to /integrations#<category-id>.
  ["/integrations", 200, 'id="crm"'],
  ["/security", 200, "Your team stays in control of every conversation."],
  ["/about", 200, "AI that supports your team, not replaces it."],
  ["/contact", 200, "Talk to the BizMaster AI Agent team."],
  ["/book-demo", 200, "Request Demo"],
  ["/book-demo?plan=pro-voice&module=inbound-calls", 200, "asking about:"],
  ["/thank-you", 200, "noindex"],
  ["/demo", 200, "Illustrative demo — no real calls or messages are sent"],
  // Crawling stays blocked until SITE_INDEXING=true; the sitemap lists published routes only.
  ["/robots.txt", 200, "Disallow: /"],
  ["/sitemap.xml", 200, "/features/inbound-calls", "/thank-you"],
  ["/opengraph-image", 200, "PNG"],
  // Legal pages stay unpublished until approved text exists (spec 5, 16).
  ["/privacy", 404, "We couldn’t find that page."],
  ["/terms", 404, "We couldn’t find that page."],
  ["/cookies", 404, "We couldn’t find that page."],
  // Draft prices must never reach public HTML unless SHOW_DRAFT_PRICES=true (spec 6.10, 14.3).
  ["/pricing", 200, "Request current pricing", "LKR"],
  ["/", 200, "Request current pricing", "LKR"],
  ["/does-not-exist", 404, "We couldn’t find that page."],
];

let failures = 0;
for (const [path, expectedStatus, expectedText, forbiddenText] of checks) {
  const response = await fetch(new URL(path, baseUrl), { redirect: "manual" });
  const html = await response.text();
  const problems = [];
  if (response.status !== expectedStatus) problems.push(`status ${response.status}, expected ${expectedStatus}`);
  if (!html.includes(expectedText)) problems.push(`missing text "${expectedText}"`);
  if (forbiddenText && html.includes(forbiddenText)) problems.push(`contains forbidden text "${forbiddenText}"`);
  if (problems.length) failures++;
  console.log(`${problems.length ? "FAIL" : "ok  "} ${path}${problems.length ? ` — ${problems.join("; ")}` : ""}`);
}

console.log(`\n${checks.length - failures}/${checks.length} route checks passed`);
process.exitCode = failures ? 1 : 0;
