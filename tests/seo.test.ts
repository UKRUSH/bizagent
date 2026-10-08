import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { demoScenarios, scenarioTranscript } from "@/content/demo-scenarios";
import { homepageFaqs } from "@/content/faqs";
import { homepageStructuredData } from "@/lib/structured-data";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("SEO (spec 16)", () => {
  it("lists published routes only in the sitemap", () => {
    const urls = sitemap().map((entry) => new URL(entry.url).pathname);
    assert.equal(new Set(urls).size, urls.length, "no duplicate URLs");
    for (const path of ["/", "/pricing", "/features/inbound-calls", "/industries/hotels", "/solutions/sales-agent", "/demo"]) {
      assert.ok(urls.includes(path), path);
    }
    for (const path of ["/thank-you", "/privacy", "/terms", "/cookies"]) {
      assert.ok(!urls.includes(path), `${path} must not be listed`);
    }
    assert.ok(!urls.some((path) => path.startsWith("/api")));
  });

  it("blocks crawling until indexing is switched on", () => {
    const previous = process.env.SITE_INDEXING;
    delete process.env.SITE_INDEXING;
    assert.deepEqual(robots().rules, { userAgent: "*", disallow: "/" });
    process.env.SITE_INDEXING = "true";
    const open = robots();
    assert.ok(JSON.stringify(open.rules).includes("/api/"));
    assert.ok(open.sitemap?.toString().endsWith("/sitemap.xml"));
    if (previous === undefined) delete process.env.SITE_INDEXING;
    else process.env.SITE_INDEXING = previous;
  });

  it("publishes structured data without prices, offers or ratings, and with the visible FAQs", () => {
    const data = JSON.stringify(homepageStructuredData(homepageFaqs));
    assert.doesNotMatch(data, /offers|price|aggregateRating|review/i);
    for (const faq of homepageFaqs) assert.ok(data.includes(JSON.stringify(faq.question).slice(1, -1)));
  });
});

describe("illustrative demo scenarios (spec 13)", () => {
  it("has the five default scenarios", () => {
    assert.deepEqual(
      demoScenarios.map((scenario) => scenario.id),
      ["clinic-appointment", "hotel-booking", "retail-enquiry", "property-viewing", "sales-qualification"],
    );
  });

  for (const scenario of demoScenarios) {
    it(`${scenario.id} identifies the AI on every channel, has an action per role and no phone numbers`, () => {
      for (const channel of ["phone", "whatsapp"] as const) {
        assert.ok(scenario.greeting[channel].includes("AI assistant"), channel);
        for (const message of scenarioTranscript(scenario, channel)) {
          assert.doesNotMatch(message.text, /\+?\d[\d\s-]{7,}\d/);
        }
      }
      assert.deepEqual(Object.keys(scenario.actions).sort(), ["call-center", "personal-assistant", "sales-agent"]);
    });
  }
});
