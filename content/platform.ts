/**
 * Platform page content (spec 5 /platform, 7.2; source sections 4.1, 4.3 and 4.4).
 * Security is described as controls confirmed per deployment, not as implemented facts.
 */

export const platformChannels = [
  {
    title: "Inbound phone calls",
    description: "Local, DID and toll-free numbers over SIP trunks, answered by the assistant.",
  },
  {
    title: "Outbound phone calls",
    description: "Calls from approved lists, with caller ID management and do-not-call checks.",
  },
  {
    title: "WhatsApp messaging",
    description: "Text, media, voice notes and approved templates on your business number.",
  },
  {
    title: "WhatsApp voice",
    description: "Live voice calls where WhatsApp calling is supported for your number.",
  },
  {
    title: "Desk phones (PBX)",
    description: "SIP desk phones and WebRTC softphones connected to the same assistant.",
  },
  {
    title: "SMS and email",
    description: "Follow-ups, reminders, confirmations and conversation summaries.",
  },
];

export const sharedLayer = [
  { title: "Voice engine", description: "Speech-to-text, text-to-speech, telephony and WhatsApp calling." },
  {
    title: "AI orchestration",
    description: "Language understanding, knowledge retrieval, conversation memory and guardrails.",
  },
  { title: "Workflow automation", description: "Triggers, conditions, actions, scheduling and retries." },
  { title: "Customer records", description: "Contacts, calls, messages, tasks and history in one place." },
  { title: "Integrations", description: "APIs and webhooks for CRM, ERP, calendar, email and messaging." },
  { title: "Admin console", description: "Configuration, analytics, users and billing." },
  { title: "Handoff and approvals", description: "Escalation rules, approval gates and override at any stage." },
  {
    title: "Security controls",
    description: "Permissions, audit logs and data-handling controls, confirmed for each deployment.",
  },
];

export const platformInterfaces = [
  {
    title: "Voice interface",
    description: "Handles incoming and outgoing phone calls, including WhatsApp voice calls.",
  },
  {
    title: "Messaging interface",
    description: "Handles WhatsApp text, media and template messages.",
  },
  {
    title: "Admin interface",
    description: "Dashboards, reports, configuration and the human handoff console.",
  },
];

/** Plain-language description of the spec 7.2 architecture diagram. */
export const architectureDescription =
  "Conversations arrive by phone or WhatsApp and pass a consent and channel check. The AI assistant answers using your business knowledge and the conversation's history. Before acting, it checks whether the action is permitted: routine actions run as automated workflows, while anything that needs approval or escalation goes to a person and continues only once approved. Workflows update your CRM, calendar and other systems, and the results return to the conversation. Every conversation and decision is recorded for review and reporting.";
