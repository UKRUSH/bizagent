import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { deploymentOptions, enterpriseArchitectures, channelEmbedding } from "@/content/deployment";
import { homepageFaqs } from "@/content/faqs";
import { parseDemoPreselection } from "@/content/form-options";
import { approvalControls, escalationTriggers, handoffContext, handoffTypes, operatingPrinciples } from "@/content/handoff";
import { getHomepageIndustries, industries } from "@/content/industries";
import { integrationCategories } from "@/content/integrations";
import { moduleCategories, modules } from "@/content/modules";
import {
  billingTermsToConfirm,
  getPriceDisplay,
  internalPersonalAssistantPriceIdeas,
  packageTiers,
  planFamilies,
  plans,
} from "@/content/plans";
import { moduleIllustrations } from "@/content/module-illustrations";
import { architectureDescription, platformChannels, platformInterfaces, sharedLayer } from "@/content/platform";
import { rolePreviews } from "@/content/previews";
import { roles } from "@/content/roles";
import { proofPackDocuments, securityControls, securityInterimStatement } from "@/content/security";
import { integrationCategoryIds, moduleSlugs } from "@/content/types";
import {
  internalWhatsappTargets,
  onboardingStages,
  pbxWorkflows,
  voiceNotesVersusCalls,
  whatsappBusinessTools,
  whatsappCapabilities,
  whatsappComplianceRules,
} from "@/content/whatsapp";

const knownModules = new Set<string>(moduleSlugs);
const knownIntegrations = new Set<string>(integrationCategoryIds);

function wordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

describe("modules (spec 7)", () => {
  it("has all 13 modules in source order with the spec 5.1 slugs", () => {
    assert.deepEqual(
      modules.map((entry) => entry.slug),
      [...moduleSlugs],
    );
    assert.deepEqual(
      modules.map((entry) => entry.number),
      Array.from({ length: 13 }, (_, index) => index + 1),
    );
  });

  for (const entry of modules) {
    it(`${entry.slug} meets the module page template (spec 7.1)`, () => {
      const words = wordCount(entry.introduction);
      assert.ok(words >= 80 && words <= 140, `introduction has ${words} words`);
      assert.equal(entry.useCases.length, 3);
      assert.ok(entry.featureGroups.length > 0);
      for (const group of entry.featureGroups) assert.ok(group.items.length > 0, group.heading);
      assert.ok(entry.workflow.length >= 3);
      assert.ok(entry.benefits.length > 0);
      assert.ok(entry.humanControls.length > 0);
      assert.ok(entry.faqs.length > 0);
      assert.ok(moduleCategories.some((category) => category.id === entry.category));
      for (const related of entry.relatedModules) {
        assert.ok(knownModules.has(related), `unknown related module ${related}`);
        assert.notEqual(related, entry.slug);
      }
      assert.equal(new Set(entry.relatedModules).size, entry.relatedModules.length);
      for (const id of entry.integrations) assert.ok(knownIntegrations.has(id), id);
    });
  }

  it("covers every module category", () => {
    for (const category of moduleCategories) {
      assert.ok(modules.some((entry) => entry.category === category.id), category.id);
    }
  });
});

describe("plans (spec 8.2–8.3)", () => {
  it("matches the source section 18.7 table exactly", () => {
    assert.deepEqual(
      plans.map(({ slug, family, price, period, chatAllowance, voiceMinutes }) => ({
        slug,
        family,
        price,
        period,
        chatAllowance,
        voiceMinutes,
      })),
      [
        { slug: "free-trial", family: "chat", price: 0, period: "two-weeks", chatAllowance: 100, voiceMinutes: undefined },
        { slug: "basic", family: "chat", price: 8000, period: "month", chatAllowance: 2000, voiceMinutes: undefined },
        { slug: "plus", family: "chat", price: 20000, period: "month", chatAllowance: 4000, voiceMinutes: undefined },
        { slug: "pro", family: "chat", price: 40000, period: "month", chatAllowance: 8000, voiceMinutes: undefined },
        { slug: "basic-voice", family: "voice", price: 25000, period: "month", chatAllowance: 2000, voiceMinutes: 500 },
        { slug: "plus-voice", family: "voice", price: 45000, period: "month", chatAllowance: 4000, voiceMinutes: 1000 },
        { slug: "pro-voice", family: "voice", price: 100000, period: "month", chatAllowance: 8000, voiceMinutes: 2000 },
      ],
    );
    assert.ok(plans.every((plan) => plan.currency === "LKR"));
  });

  it("keeps every plan in draft until commercially approved", () => {
    assert.ok(plans.every((plan) => plan.publicationStatus === "draft"));
  });

  it("uses the trial CTA wording from spec 8.4", () => {
    assert.equal(plans.find((plan) => plan.isTrial)?.ctaLabel, "Ask About the Trial");
  });

  it("hides draft amounts unless previewing, and labels previews", () => {
    const basic = plans.find((plan) => plan.slug === "basic")!;
    assert.deepEqual(getPriceDisplay(basic), { kind: "on-request", label: "Request current pricing" });
    const preview = getPriceDisplay(basic, { previewDrafts: true });
    assert.equal(preview.kind, "draft");
    assert.ok(preview.kind === "draft" && preview.amount === "LKR 8,000");
  });
});

describe("industries (spec 9)", () => {
  it("has all 17 segments with unique slugs", () => {
    assert.equal(industries.length, 17);
    assert.equal(new Set(industries.map((industry) => industry.slug)).size, 17);
  });

  it("has the six homepage launch cards from spec 6.7", () => {
    assert.deepEqual(
      getHomepageIndustries().map((industry) => industry.homepageTitle),
      ["Healthcare", "Hospitality", "Retail and E-commerce", "Real Estate", "Education", "Professional Services"],
    );
  });

  for (const industry of industries) {
    it(`${industry.slug} has a valid, fictional scenario`, () => {
      for (const slug of industry.modules) assert.ok(knownModules.has(slug), slug);
      for (const id of industry.integrations) assert.ok(knownIntegrations.has(id), id);
      assert.ok(industry.boundaries.length > 0);
      const firstAssistant = industry.scenario.messages.find((message) => message.speaker === "assistant");
      assert.ok(firstAssistant?.text.includes("AI assistant"), "the assistant must identify itself as an AI");
      for (const message of industry.scenario.messages) {
        assert.doesNotMatch(message.text, /\+?\d[\d\s-]{7,}\d/, "no phone-number-like strings");
      }
    });
  }
});

describe("module illustrations (spec 7.1)", () => {
  it("has a fictional illustration for every module", () => {
    assert.deepEqual(Object.keys(moduleIllustrations).sort(), [...moduleSlugs].sort());
    for (const [slug, illustration] of Object.entries(moduleIllustrations)) {
      assert.ok(illustration.events.length >= 3, slug);
      for (const event of illustration.events) {
        assert.doesNotMatch(event.detail, /\+?\d[\d\s-]{7,}\d/, `${slug}: no phone-number-like strings`);
      }
    }
  });
});

describe("homepage previews (spec 4.2, 6.3)", () => {
  it("has one fictional preview per role", () => {
    assert.deepEqual(
      rolePreviews.map((preview) => preview.role),
      roles.map((role) => role.slug),
    );
  });

  for (const preview of rolePreviews) {
    it(`${preview.role} preview identifies the AI and has four stages`, () => {
      const firstAssistant = preview.messages.find((message) => message.speaker === "assistant");
      assert.ok(firstAssistant?.text.includes("AI assistant"));
      assert.equal(preview.stages.length, 4);
    });
  }
});

describe("integrations (spec 10)", () => {
  it("has the 14 source categories", () => {
    assert.deepEqual(
      integrationCategories.map((category) => category.id),
      [...integrationCategoryIds],
    );
  });

  it("marks nothing as available until a connector is verified", () => {
    for (const category of integrationCategories) {
      for (const system of category.systems) assert.notEqual(system.status, "available", system.name);
    }
  });
});

describe("roles, FAQs, trust and forms", () => {
  it("has the three operating roles with valid modules", () => {
    assert.deepEqual(
      roles.map((role) => role.slug),
      ["call-center", "sales-agent", "personal-assistant"],
    );
    for (const role of roles) for (const slug of role.modules) assert.ok(knownModules.has(slug), slug);
  });

  it("has the eight homepage questions from spec 6.11", () => {
    assert.equal(homepageFaqs.length, 8);
  });

  it("publishes no security control as verified", () => {
    assert.ok(securityControls.every((control) => control.status !== "approved"));
  });

  it("drops query-string values that are not on the allowlists (spec 12.2)", () => {
    assert.deepEqual(
      parseDemoPreselection({ plan: "pro-voice", module: "inbound-calls,not-a-module", industry: "hotels", role: "x" }),
      { plan: "pro-voice", modules: ["inbound-calls"], industry: "hotels", role: undefined },
    );
    assert.deepEqual(parseDemoPreselection({ plan: "<script>" }), {
      plan: undefined,
      modules: [],
      industry: undefined,
      role: undefined,
    });
  });
});

/**
 * Public content must not state the unsupported claims listed in spec 1.2. Internal-only
 * exports (price ideas, performance targets) are deliberately excluded from this scan.
 */
describe("publication guardrails (spec 1.2)", () => {
  const publicContent = {
    modules,
    moduleCategories,
    roles,
    industries,
    integrationCategories,
    plans,
    planFamilies,
    packageTiers,
    billingTermsToConfirm,
    homepageFaqs,
    deploymentOptions,
    enterpriseArchitectures,
    channelEmbedding,
    escalationTriggers,
    handoffTypes,
    handoffContext,
    approvalControls,
    operatingPrinciples,
    securityInterimStatement,
    proofPackDocuments,
    whatsappCapabilities,
    voiceNotesVersusCalls,
    whatsappBusinessTools,
    pbxWorkflows,
    onboardingStages,
    whatsappComplianceRules,
    rolePreviews,
    moduleIllustrations,
    platformChannels,
    sharedLayer,
    platformInterfaces,
    architectureDescription,
  };

  function collectStrings(value: unknown, path: string, out: { path: string; text: string }[]) {
    if (typeof value === "string") out.push({ path, text: value });
    else if (Array.isArray(value)) value.forEach((item, index) => collectStrings(item, `${path}[${index}]`, out));
    else if (value && typeof value === "object") {
      for (const [key, child] of Object.entries(value)) collectStrings(child, `${path}.${key}`, out);
    }
    return out;
  }

  const banned: [RegExp, string][] = [
    [/sri lanka'?s first/i, "first-in-market claim"],
    [/\b100\s?%/i, "absolute percentage claim"],
    [/meta (tech )?(provider|partner)/i, "unverified partner status"],
    [/no hidden (charges|fees|costs)/i, "undefined-cost claim"],
    [/zero (wait|setup|missed|downtime)/i, "absolute availability claim"],
    [/\bunder \d+\s?(ms|milliseconds|seconds|minutes)\b/i, "unmeasured speed claim"],
    [/\b\d+\s?ms\b/i, "latency figure"],
    [/live in (under )?\d/i, "provisioning-time claim"],
    [/\b\d[\d,]*\+ (concurrent|simultaneous|calls|languages)/i, "capacity claim"],
    [/most popular/i, "unsupported popularity label"],
    [/guarantee/i, "guarantee"],
    [/replac\w* (your |\d+.\d+ )?(receptionists?|staff|team|callers|agents|sales)/i, "staff-replacement claim"],
    [/AES-?256|AWS|KMS|Bedrock|CloudTrail/i, "unverified security implementation detail"],
    [/GDPR|CCPA|HIPAA|ISO 27001|SOC 2/i, "unverified compliance claim"],
    [/human-like|human-quality/i, "voice impersonation wording"],
  ];

  // securityControls is excluded: it quotes source requirements for internal review only.
  const strings = collectStrings(publicContent, "content", []);

  it("scans a meaningful amount of content and would catch a banned claim", () => {
    assert.ok(strings.length > 500, `only ${strings.length} strings scanned`);
    const internal = collectStrings({ internalWhatsappTargets, internalPersonalAssistantPriceIdeas }, "internal", []);
    assert.ok(internal.some(({ text }) => banned.some(([pattern]) => pattern.test(text))));
  });

  for (const [pattern, reason] of banned) {
    it(`contains no ${reason}`, () => {
      const hits = strings.filter(({ text }) => pattern.test(text));
      assert.deepEqual(hits, [], hits.map((hit) => `${hit.path}: ${hit.text}`).join("\n"));
    });
  }
});
