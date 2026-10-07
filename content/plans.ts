import { siteConfig } from "@/config/site";
import type { PackageTier, Plan, PlanFamily } from "./types";

/**
 * Agent BIZ MASTER plans (spec 8.2–8.4; source section 18.7).
 *
 * One typed source for plan cards, comparison tables, structured data and form options.
 * Amounts are source-document values awaiting commercial confirmation, so every plan is
 * "draft". The conflicting "Rs. 8,000–70,000" range from source section 22 is deliberately
 * not used. Do not add discounts, annual prices, overage rates or extra inclusions here.
 */
export const plans: Plan[] = [
  {
    slug: "free-trial",
    name: "Free Trial",
    family: "chat",
    currency: "LKR",
    price: 0,
    period: "two-weeks",
    chatAllowance: 100,
    features: ["AI chat responses", "Starter knowledge base", "WhatsApp Business connection"],
    isTrial: true,
    ctaLabel: "Ask About the Trial",
    publicationStatus: "draft",
  },
  {
    slug: "basic",
    name: "Basic",
    family: "chat",
    currency: "LKR",
    price: 8000,
    period: "month",
    chatAllowance: 2000,
    features: [
      "AI chat responses",
      "Knowledge base",
      "Lead capture and scoring",
      "Analytics dashboard",
    ],
    ctaLabel: "Enquire About Basic",
    publicationStatus: "draft",
  },
  {
    slug: "plus",
    name: "Plus",
    family: "chat",
    currency: "LKR",
    price: 20000,
    period: "month",
    chatAllowance: 4000,
    features: ["All Basic features"],
    ctaLabel: "Enquire About Plus",
    publicationStatus: "draft",
  },
  {
    slug: "pro",
    name: "Pro",
    family: "chat",
    currency: "LKR",
    price: 40000,
    period: "month",
    chatAllowance: 8000,
    features: ["All Basic features"],
    ctaLabel: "Enquire About Pro",
    publicationStatus: "draft",
  },
  {
    slug: "basic-voice",
    name: "Basic Voice",
    family: "voice",
    currency: "LKR",
    price: 25000,
    period: "month",
    chatAllowance: 2000,
    voiceMinutes: 500,
    features: ["AI voice and chat", "Knowledge base", "Lead capture and scoring"],
    ctaLabel: "Enquire About Basic Voice",
    publicationStatus: "draft",
  },
  {
    slug: "plus-voice",
    name: "Plus Voice",
    family: "voice",
    currency: "LKR",
    price: 45000,
    period: "month",
    chatAllowance: 4000,
    voiceMinutes: 1000,
    features: ["All Basic Voice features"],
    ctaLabel: "Enquire About Plus Voice",
    publicationStatus: "draft",
  },
  {
    slug: "pro-voice",
    name: "Pro Voice",
    family: "voice",
    currency: "LKR",
    price: 100000,
    period: "month",
    chatAllowance: 8000,
    voiceMinutes: 2000,
    features: ["All Basic Voice features"],
    ctaLabel: "Enquire About Pro Voice",
    publicationStatus: "draft",
  },
];

export const planFamilies: { id: PlanFamily; label: string }[] = [
  { id: "chat", label: "Chat AI" },
  { id: "voice", label: "Voice + Chat AI" },
];

/** Broader packaging from source section 22.2 (spec 8.5). Always quoted, never priced. */
export const packageTiers: PackageTier[] = [
  {
    slug: "starter",
    name: "Starter",
    audience: "SMEs and solo professionals",
    scope: "Inbound calls and WhatsApp auto-reply, basic CRM and one number",
  },
  {
    slug: "growth",
    name: "Growth",
    audience: "Growing SMEs",
    scope: "Outbound calls, follow-ups, reminders, recordings and campaigns",
  },
  {
    slug: "professional",
    name: "Professional",
    audience: "Businesses with multiple teams",
    scope: "Call center functions, skill routing, QA and analytics",
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    audience: "Larger organisations",
    scope: "Multi-tenant setup, custom integrations and service-level discussions",
  },
  {
    slug: "white-label",
    name: "White-Label",
    audience: "BPOs, resellers and agencies",
    scope: "The platform under your own brand",
  },
];

/**
 * Commercial terms that must be confirmed before purchase (spec 8.4). Until then the
 * pricing page lists these as "confirmed in your quote" rather than stating terms.
 */
export const billingTermsToConfirm = [
  "What counts as one AI-managed chat",
  "When allowances reset, and in which time zone",
  "Whether allowances are pooled across phone numbers",
  "How trial usage is counted and what happens when the trial ends",
  "What happens above the allowance, and any charges",
  "WhatsApp platform charges, which are separate from your AI-managed chat allowance",
  "Voice, call and PBX charges",
  "Number rental and setup scope",
  "Taxes",
  "Cancellation and refunds",
];

/**
 * INTERNAL ONLY — personal assistant price ideas from source section 17.2. These are
 * proposals, not approved price cards, and must not be rendered.
 */
export const internalPersonalAssistantPriceIdeas = {
  currency: "USD",
  b2c: [
    { name: "Basic", range: "19–49 per month" },
    { name: "Pro", range: "99–199 per month" },
    { name: "Executive", range: "299–999 per month" },
  ],
  b2b: "Per user, plus usage and integration/setup fee",
} as const;

/* ------------------------------------------------------------ Price display */

export type PriceDisplay =
  | { kind: "approved"; amount: string; period: string }
  | { kind: "draft"; amount: string; period: string; label: "Draft price — awaiting approval" }
  | { kind: "on-request"; label: "Request current pricing" };

const amountFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function formatAmount(plan: Plan): string {
  return `${plan.currency} ${amountFormatter.format(plan.price)}`;
}

export function formatPeriod(plan: Plan): string {
  return plan.period === "month" ? "per month" : "for 2 weeks";
}

/**
 * Decides how a plan's price may be shown (spec 6.10, 14.3).
 * - Approved plans show their amount once `pricingPublished` is on.
 * - Draft amounts appear only in developer preview, always with a draft label.
 * - Otherwise the amount is replaced by "Request current pricing".
 */
export function getPriceDisplay(plan: Plan, options: { previewDrafts?: boolean } = {}): PriceDisplay {
  if (siteConfig.flags.pricingPublished && plan.publicationStatus === "approved") {
    return { kind: "approved", amount: formatAmount(plan), period: formatPeriod(plan) };
  }
  if (options.previewDrafts) {
    return {
      kind: "draft",
      amount: formatAmount(plan),
      period: formatPeriod(plan),
      label: "Draft price — awaiting approval",
    };
  }
  return { kind: "on-request", label: "Request current pricing" };
}

/** Server-only switch for showing draft prices in a developer preview build. */
export function shouldPreviewDraftPrices(): boolean {
  return process.env.SHOW_DRAFT_PRICES === "true";
}

export function formatAllowance(plan: Plan): string[] {
  const lines = [`Up to ${amountFormatter.format(plan.chatAllowance)} AI-managed chats`];
  if (plan.voiceMinutes) lines.push(`${amountFormatter.format(plan.voiceMinutes)} call minutes`);
  return lines;
}

/* ---------------------------------------------------------------- Selectors */

export function getPlan(slug: string): Plan | undefined {
  return plans.find((plan) => plan.slug === slug);
}

export function getPlansByFamily(family: PlanFamily): Plan[] {
  return plans.filter((plan) => plan.family === family);
}

/** Booking-form link that preselects a plan (spec 8.4). */
export function planEnquiryHref(plan: Plan): string {
  return `/book-demo?plan=${encodeURIComponent(plan.slug)}`;
}
