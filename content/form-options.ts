import { industries } from "./industries";
import { modules } from "./modules";
import { packageTiers, plans } from "./plans";
import { proofPackDocuments } from "./security";

/**
 * Demo request options and allowlists (spec 12.1–12.2). The same lists drive the form
 * controls, query-string preselection and server validation, so a value accepted in one
 * place is accepted everywhere.
 */

export interface Option<T extends string = string> {
  value: T;
  label: string;
}

export const roleOptions = [
  { value: "call-center", label: "Call centre" },
  { value: "sales", label: "Sales" },
  { value: "personal-assistant", label: "Personal assistant" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "not-sure", label: "Not sure" },
] as const satisfies readonly Option[];

export const demoLanguageOptions = [
  { value: "english", label: "English" },
  { value: "sinhala", label: "Sinhala" },
  { value: "tamil", label: "Tamil" },
] as const satisfies readonly Option[];

export const volumeUnitOptions = [
  { value: "calls-per-day", label: "Calls per day" },
  { value: "chats-per-month", label: "Chats per month" },
  { value: "voice-minutes-per-month", label: "Voice minutes per month" },
] as const satisfies readonly Option[];

export const currentSystemOptions = [
  { value: "crm", label: "CRM" },
  { value: "calendar", label: "Calendar" },
  { value: "pbx", label: "PBX or desk phones" },
  { value: "ecommerce", label: "E-commerce platform" },
  { value: "whatsapp-business", label: "WhatsApp Business" },
] as const satisfies readonly Option[];

export const marketingChannelOptions = [
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "sms", label: "SMS" },
] as const satisfies readonly Option[];

/**
 * Phone country codes (spec 12.1: ask for a country code; normalise only with a validated
 * country). "Other" requires a full international number starting with "+".
 */
export const phoneCountryOptions = [
  { value: "LK", label: "Sri Lanka (+94)", dial: "94" },
  { value: "IN", label: "India (+91)", dial: "91" },
  { value: "AE", label: "United Arab Emirates (+971)", dial: "971" },
  { value: "SA", label: "Saudi Arabia (+966)", dial: "966" },
  { value: "QA", label: "Qatar (+974)", dial: "974" },
  { value: "SG", label: "Singapore (+65)", dial: "65" },
  { value: "MY", label: "Malaysia (+60)", dial: "60" },
  { value: "AU", label: "Australia (+61)", dial: "61" },
  { value: "GB", label: "United Kingdom (+44)", dial: "44" },
  { value: "US", label: "United States or Canada (+1)", dial: "1" },
  { value: "other", label: "Other (enter the full number with +)", dial: "" },
] as const satisfies readonly (Option & { dial: string })[];

/** Asia/Colombo is shown as the suggested selection, never applied silently (spec 17). */
export const timeZoneOptions = [
  { value: "Asia/Colombo", label: "Sri Lanka (Asia/Colombo)" },
  { value: "Asia/Kolkata", label: "India (Asia/Kolkata)" },
  { value: "Asia/Dubai", label: "Gulf (Asia/Dubai)" },
  { value: "Asia/Singapore", label: "Singapore and Malaysia (Asia/Singapore)" },
  { value: "Australia/Sydney", label: "Australia East (Australia/Sydney)" },
  { value: "Europe/London", label: "United Kingdom (Europe/London)" },
  { value: "America/New_York", label: "US East (America/New_York)" },
  { value: "UTC", label: "UTC" },
] as const satisfies readonly Option[];

export const timeWindowOptions = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
] as const satisfies readonly Option[];

export const securityDocumentOptions: Option[] = proofPackDocuments.map((document) => ({
  value: document,
  label: document,
}));

export type PhoneCountryValue = (typeof phoneCountryOptions)[number]["value"];
export type TimeZoneValue = (typeof timeZoneOptions)[number]["value"];
export type TimeWindowValue = (typeof timeWindowOptions)[number]["value"];

export const industryOptions: Option[] = [
  ...industries.map((industry) => ({ value: industry.slug, label: industry.name })),
  { value: "other", label: "Other" },
];

export const moduleOptions: Option[] = modules.map((entry) => ({
  value: entry.slug,
  label: entry.title,
}));

/** Exact plan slugs, broader packages, or "custom" (spec 12.1). */
export const planOptions: Option[] = [
  ...plans.map((plan) => ({ value: plan.slug, label: plan.name })),
  ...packageTiers.map((tier) => ({ value: tier.slug, label: `${tier.name} package` })),
  { value: "custom", label: "Custom or not sure" },
];

export type RoleValue = (typeof roleOptions)[number]["value"];
export type DemoLanguageValue = (typeof demoLanguageOptions)[number]["value"];
export type VolumeUnitValue = (typeof volumeUnitOptions)[number]["value"];
export type CurrentSystemValue = (typeof currentSystemOptions)[number]["value"];
export type MarketingChannelValue = (typeof marketingChannelOptions)[number]["value"];

/** Returns `value` only when it is one of the allowed option values. */
export function pickAllowed<T extends string>(
  value: string | string[] | null | undefined,
  options: readonly Option<T>[],
): T | undefined {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (typeof candidate !== "string") return undefined;
  return options.find((option) => option.value === candidate)?.value;
}

/** Filters a list down to allowed, de-duplicated option values. */
export function pickAllowedList<T extends string>(
  values: string | string[] | null | undefined,
  options: readonly Option<T>[],
): T[] {
  const list = Array.isArray(values) ? values : values ? values.split(",") : [];
  const allowed = new Set(options.map((option) => option.value));
  return [...new Set(list.map((value) => value.trim()))].filter((value): value is T =>
    allowed.has(value as T),
  );
}

/** Query-string preselection for /book-demo (spec 12.2). Unknown values are dropped. */
export function parseDemoPreselection(params: Record<string, string | string[] | undefined>) {
  return {
    plan: pickAllowed(params.plan, planOptions),
    modules: pickAllowedList(params.module, moduleOptions),
    industry: pickAllowed(params.industry, industryOptions),
    role: pickAllowed(params.role, roleOptions),
  };
}
