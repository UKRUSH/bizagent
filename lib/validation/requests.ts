import {
  currentSystemOptions,
  demoLanguageOptions,
  industryOptions,
  marketingChannelOptions,
  moduleOptions,
  phoneCountryOptions,
  planOptions,
  roleOptions,
  securityDocumentOptions,
  timeWindowOptions,
  timeZoneOptions,
  volumeUnitOptions,
  type CurrentSystemValue,
  type DemoLanguageValue,
  type MarketingChannelValue,
  type Option,
  type RoleValue,
  type TimeWindowValue,
  type TimeZoneValue,
  type VolumeUnitValue,
} from "@/content/form-options";

/**
 * Shared validation for demo requests and enquiries (spec 12.1–12.2). Used in the browser
 * for immediate feedback and again on the server, which is authoritative. Pure functions:
 * "today" is passed in so date rules are testable.
 */

export type FieldErrors = Record<string, string>;
export type ValidationResult<T> = { ok: true; value: T } | { ok: false; errors: FieldErrors };

export const LIMITS = {
  fullName: [2, 100],
  businessName: [2, 150],
  email: 254,
  requirement: 2000,
  message: [10, 2000],
  otherSystems: 200,
  volumeMax: 10_000_000,
} as const;

/* ------------------------------------------------------------------ Inputs */

/** Raw values sent by the demo form. Everything is optional at the type level. */
export interface DemoRequestInput {
  fullName?: unknown;
  businessName?: unknown;
  workEmail?: unknown;
  phoneCountry?: unknown;
  phoneNumber?: unknown;
  industry?: unknown;
  role?: unknown;
  modules?: unknown;
  plan?: unknown;
  volumeAmount?: unknown;
  volumeUnit?: unknown;
  currentSystems?: unknown;
  otherSystems?: unknown;
  demoLanguage?: unknown;
  preferredDate?: unknown;
  preferredWindow?: unknown;
  timeZone?: unknown;
  requirement?: unknown;
  privacyAck?: unknown;
  marketingConsent?: unknown;
  marketingChannels?: unknown;
}

export interface EnquiryInput {
  kind?: unknown;
  fullName?: unknown;
  businessName?: unknown;
  workEmail?: unknown;
  phoneCountry?: unknown;
  phoneNumber?: unknown;
  message?: unknown;
  documents?: unknown;
  privacyAck?: unknown;
}

/* ----------------------------------------------------------------- Outputs */

export interface Phone {
  country: string;
  /** E.164, e.g. +94771234567 */
  e164: string;
}

export interface DemoRequest {
  kind: "demo";
  fullName: string;
  businessName: string;
  workEmail: string;
  phone: Phone | null;
  industry: string;
  role: RoleValue;
  modules: string[];
  plan: string | null;
  volume: { amount: number; unit: VolumeUnitValue } | null;
  currentSystems: CurrentSystemValue[];
  otherSystems: string | null;
  demoLanguage: DemoLanguageValue;
  preferredTime: { date: string | null; window: TimeWindowValue | null; timeZone: TimeZoneValue } | null;
  requirement: string | null;
  privacyAcknowledged: true;
  marketingConsent: { channels: MarketingChannelValue[] } | null;
}

export type EnquiryKind = "general" | "security";

export interface Enquiry {
  kind: EnquiryKind;
  fullName: string;
  businessName: string | null;
  workEmail: string;
  phone: Phone | null;
  message: string;
  documents: string[];
  privacyAcknowledged: true;
}

/* ----------------------------------------------------------------- Helpers */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

/** Like text() but keeps line breaks, for free-text areas. */
function multiline(value: unknown): string {
  return typeof value === "string" ? value.replace(/\r\n?/g, "\n").trim() : "";
}

function list(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string");
  return [];
}

function isAllowed<T extends string>(value: string, options: readonly Option<T>[]): value is T {
  return options.some((option) => option.value === value);
}

function checkLength(errors: FieldErrors, field: string, value: string, [min, max]: readonly [number, number], label: string) {
  if (!value) errors[field] = `Enter your ${label}.`;
  else if (value.length < min) errors[field] = `${capitalise(label)} must be at least ${min} characters.`;
  else if (value.length > max) errors[field] = `${capitalise(label)} must be ${max} characters or fewer.`;
}

function capitalise(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function validateEmail(errors: FieldErrors, value: string) {
  if (!value) errors.workEmail = "Enter your work email address.";
  else if (value.length > LIMITS.email || !EMAIL_PATTERN.test(value)) {
    errors.workEmail = "Enter a valid email address, like name@company.com.";
  }
}

/** Normalises a phone number only against a validated country (spec 12.1). */
export function normalisePhone(countryInput: unknown, numberInput: unknown): { phone: Phone | null; error?: string } {
  const raw = text(numberInput);
  if (!raw) return { phone: null };
  const country = phoneCountryOptions.find((option) => option.value === text(countryInput));
  if (!country) return { phone: null, error: "Choose the country for this number." };
  const compact = raw.replace(/[\s\-().]/g, "");

  if (country.value === "other") {
    return /^\+\d{7,15}$/.test(compact)
      ? { phone: { country: "other", e164: compact } }
      : { phone: null, error: "Enter the full international number, starting with +." };
  }
  // Strip the country code only when the number is written in international form; a
  // national number may legitimately begin with the same digits (e.g. Indian 91xxxxxxxx).
  let national: string;
  if (compact.startsWith("+") || compact.startsWith("00")) {
    const international = compact.replace(/^(\+|00)/, "");
    if (!international.startsWith(country.dial)) {
      return { phone: null, error: "This number's country code doesn't match the selected country." };
    }
    national = international.slice(country.dial.length);
  } else {
    national = compact;
  }
  const digits = national.replace(/^0+/, "");
  if (!/^\d{6,14}$/.test(digits) || country.dial.length + digits.length > 15) {
    return { phone: null, error: "Enter a valid phone number for the selected country." };
  }
  return { phone: { country: country.value, e164: `+${country.dial}${digits}` } };
}

function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth;
}

/** Adds days to an ISO date string without depending on the local time zone. */
function addDays(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

/* --------------------------------------------------------------- Validators */

export function validateDemoRequest(input: DemoRequestInput, today: string): ValidationResult<DemoRequest> {
  const errors: FieldErrors = {};

  const fullName = text(input.fullName);
  checkLength(errors, "fullName", fullName, LIMITS.fullName, "full name");
  const businessName = text(input.businessName);
  checkLength(errors, "businessName", businessName, LIMITS.businessName, "business name");
  const workEmail = text(input.workEmail).toLowerCase();
  validateEmail(errors, workEmail);

  const { phone, error: phoneError } = normalisePhone(input.phoneCountry, input.phoneNumber);
  if (phoneError) errors.phoneNumber = phoneError;

  const industry = text(input.industry);
  if (!isAllowed(industry, industryOptions)) errors.industry = "Choose your industry, or Other.";

  const role = text(input.role);
  if (!isAllowed(role, roleOptions)) errors.role = "Choose the role you're most interested in.";

  const modules = [...new Set(list(input.modules))];
  if (modules.some((value) => !isAllowed(value, moduleOptions))) errors.modules = "Choose modules from the list.";

  const planValue = text(input.plan);
  if (planValue && !isAllowed(planValue, planOptions)) errors.plan = "Choose a plan from the list.";

  let volume: DemoRequest["volume"] = null;
  const amountText = text(input.volumeAmount);
  if (amountText) {
    const amount = Number(amountText);
    const unit = text(input.volumeUnit);
    if (!Number.isInteger(amount) || amount < 1 || amount > LIMITS.volumeMax) {
      errors.volumeAmount = "Enter a whole number, for example 200.";
    } else if (!isAllowed(unit, volumeUnitOptions)) {
      errors.volumeUnit = "Choose what the number measures.";
    } else {
      volume = { amount, unit };
    }
  }

  const currentSystems = [...new Set(list(input.currentSystems))];
  if (currentSystems.some((value) => !isAllowed(value, currentSystemOptions))) {
    errors.currentSystems = "Choose systems from the list.";
  }
  const otherSystems = text(input.otherSystems);
  if (otherSystems.length > LIMITS.otherSystems) {
    errors.otherSystems = `Keep this to ${LIMITS.otherSystems} characters or fewer.`;
  }

  const demoLanguage = text(input.demoLanguage);
  if (!isAllowed(demoLanguage, demoLanguageOptions)) errors.demoLanguage = "Choose a language for the demo.";

  let preferredTime: DemoRequest["preferredTime"] = null;
  const preferredDate = text(input.preferredDate);
  const preferredWindow = text(input.preferredWindow);
  const timeZone = text(input.timeZone);
  if (preferredDate || preferredWindow) {
    if (preferredDate && !isValidIsoDate(preferredDate)) errors.preferredDate = "Enter a valid date.";
    else if (preferredDate && preferredDate < today) errors.preferredDate = "Choose today or a later date.";
    else if (preferredDate && preferredDate > addDays(today, 365)) errors.preferredDate = "Choose a date within the next year.";
    if (preferredWindow && !isAllowed(preferredWindow, timeWindowOptions)) errors.preferredWindow = "Choose a time of day.";
    if (!isAllowed(timeZone, timeZoneOptions)) errors.timeZone = "Choose your time zone.";
    if (!errors.preferredDate && !errors.preferredWindow && !errors.timeZone) {
      preferredTime = {
        date: preferredDate || null,
        window: (preferredWindow || null) as TimeWindowValue | null,
        timeZone: timeZone as TimeZoneValue,
      };
    }
  }

  const requirement = multiline(input.requirement);
  if (requirement.length > LIMITS.requirement) {
    errors.requirement = `Keep this to ${LIMITS.requirement.toLocaleString("en-US")} characters or fewer.`;
  }

  if (input.privacyAck !== true) errors.privacyAck = "Please confirm so we can respond to your request.";

  let marketingConsent: DemoRequest["marketingConsent"] = null;
  if (input.marketingConsent === true) {
    const channels = [...new Set(list(input.marketingChannels))];
    if (channels.length === 0 || channels.some((value) => !isAllowed(value, marketingChannelOptions))) {
      errors.marketingChannels = "Choose how you'd like to hear from us, or untick the option.";
    } else {
      marketingConsent = { channels: channels as MarketingChannelValue[] };
    }
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    value: {
      kind: "demo",
      fullName,
      businessName,
      workEmail,
      phone,
      industry,
      role: role as RoleValue,
      modules,
      plan: planValue || null,
      volume,
      currentSystems: currentSystems as CurrentSystemValue[],
      otherSystems: otherSystems || null,
      demoLanguage: demoLanguage as DemoLanguageValue,
      preferredTime,
      requirement: requirement || null,
      privacyAcknowledged: true,
      marketingConsent,
    },
  };
}

export function validateEnquiry(input: EnquiryInput): ValidationResult<Enquiry> {
  const errors: FieldErrors = {};

  const kind = text(input.kind);
  if (kind !== "general" && kind !== "security") errors.form = "This enquiry type isn't supported.";

  const fullName = text(input.fullName);
  checkLength(errors, "fullName", fullName, LIMITS.fullName, "full name");
  const workEmail = text(input.workEmail).toLowerCase();
  validateEmail(errors, workEmail);

  const businessName = text(input.businessName);
  if (businessName.length > LIMITS.businessName[1]) {
    errors.businessName = `Business name must be ${LIMITS.businessName[1]} characters or fewer.`;
  }

  const { phone, error: phoneError } = normalisePhone(input.phoneCountry, input.phoneNumber);
  if (phoneError) errors.phoneNumber = phoneError;

  const message = multiline(input.message);
  const [minMessage, maxMessage] = LIMITS.message;
  if (!message) errors.message = "Tell us what you'd like to discuss.";
  else if (message.length < minMessage) errors.message = `Add a little more detail (at least ${minMessage} characters).`;
  else if (message.length > maxMessage) errors.message = `Keep this to ${maxMessage.toLocaleString("en-US")} characters or fewer.`;

  const documents = kind === "security" ? [...new Set(list(input.documents))] : [];
  if (documents.some((value) => !isAllowed(value, securityDocumentOptions))) {
    errors.documents = "Choose documents from the list.";
  }

  if (input.privacyAck !== true) errors.privacyAck = "Please confirm so we can respond to your enquiry.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    value: {
      kind: kind as EnquiryKind,
      fullName,
      businessName: businessName || null,
      workEmail,
      phone,
      message,
      documents,
      privacyAcknowledged: true,
    },
  };
}

/** Today's date as YYYY-MM-DD in UTC. */
export function todayIso(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}
