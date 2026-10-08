/**
 * Website conversion events (spec 19). No analytics provider is loaded and nothing is sent
 * anywhere: each event is dispatched as a `bizmaster:analytics` DOM event so an approved,
 * consented tool can subscribe later. Payloads are limited to the typed, non-personal
 * fields below; names, emails, phone numbers, transcripts and free text never belong here.
 * Adding a provider also requires a matching update to the cookie notice and consent.
 */

export type AnalyticsEvent =
  | { name: "demo_cta_click"; location: string }
  | { name: "plan_tab_change"; tab: string }
  | { name: "plan_enquiry"; plan: string }
  | { name: "module_open"; module: string }
  | { name: "industry_selection"; industry: string }
  | { name: "illustrative_demo_started"; scenario: string; role: string; channel: string }
  | { name: "illustrative_demo_completed"; scenario: string; role: string; channel: string }
  | { name: "form_submission_received"; form: "demo" | "general" | "security" }
  | { name: "form_submission_failed"; form: "demo" | "general" | "security"; reason: "invalid" | "unavailable" | "network" }
  | { name: "whatsapp_contact_click"; location: string }
  | { name: "security_pack_request"; location: string };

export const ANALYTICS_EVENT = "bizmaster:analytics";

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<AnalyticsEvent>(ANALYTICS_EVENT, { detail: event }));
}
