import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { industries, industrySearchSuggestions, industrySearchText } from "@/content/industries";
import { matchesAllTerms, toTerms } from "@/lib/search";

describe("directory search", () => {
  it("splits queries into lower-case terms", () => {
    assert.deepEqual(toTerms("  Clinic   BOOKINGS "), ["clinic", "bookings"]);
    assert.deepEqual(toTerms(""), []);
  });

  it("matches only when every term is present, case-insensitively", () => {
    assert.ok(matchesAllTerms("Appointment booking and reminders", toTerms("BOOKING reminders")));
    assert.ok(!matchesAllTerms("Appointment booking", toTerms("booking renewals")));
    assert.ok(matchesAllTerms("anything", []), "an empty query shows everything");
  });

  it("finds the expected industries for a realistic query", () => {
    const searchText = (slug: string) => {
      const industry = industries.find((item) => item.slug === slug)!;
      return [industry.name, industry.summary, ...industry.workflows].join(" ");
    };
    assert.ok(matchesAllTerms(searchText("insurance"), toTerms("renewal")));
    assert.ok(!matchesAllTerms(searchText("restaurants"), toTerms("renewal")));
  });

  it("every one-tap suggestion finds at least one industry", () => {
    for (const suggestion of industrySearchSuggestions) {
      const hits = industries.filter((industry) => matchesAllTerms(industrySearchText(industry), toTerms(suggestion)));
      assert.ok(hits.length > 0, `"${suggestion}" matches no industry`);
    }
  });
});
