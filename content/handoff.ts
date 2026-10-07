import type { HandoffType } from "./types";

/** Human control and escalation (spec 11.1; source section 19). */

export const escalationTriggers = [
  "The customer asks for a person",
  "Negative sentiment is detected",
  "Urgent or sensitive keywords, such as “manager”, “cancel”, “legal” or “urgent”",
  "The assistant cannot resolve the request after repeated attempts",
  "A high-value deal, above an amount you set",
  "A dispute",
  "Legal, medical or financial subjects",
  "An emergency",
];

export const handoffTypes: HandoffType[] = [
  { name: "Live transfer", description: "The call moves to a team member with a context summary." },
  { name: "Warm transfer", description: "The assistant stays on the line while the team member joins." },
  { name: "Scheduled callback", description: "A team member calls back at a time agreed with the customer." },
  { name: "Ticket queue", description: "The request is routed to a queue with a priority." },
  { name: "Supervisor takeover", description: "A senior team member takes over the conversation." },
  { name: "Approval-based action", description: "A person approves before the assistant proceeds." },
  { name: "PBX transfer", description: "WhatsApp or phone calls ring your registered PBX extensions." },
];

/** What your team receives at handoff. */
export const handoffContext = [
  "Conversation transcript",
  "Customer profile and history",
  "Sentiment trend",
  "Detected intent",
  "Previous attempts and their results",
  "Suggested next step",
];

export const approvalControls = [
  "Approval thresholds for financial commitments",
  "Human review of contract changes",
  "Escalation rules for disputes",
  "Override at any stage",
  "A record of who approved each action, what they approved and when",
];

/** Operating principles that apply to every deployment (source section 25.3). */
export const operatingPrinciples = [
  "The assistant identifies itself as an AI assistant",
  "Call recording requires an announced consent step",
  "Payments, contracts and sensitive communications need human approval",
  "No regulated legal, medical, financial or tax advice",
  "Do-not-call lists and opt-out requests are respected",
  "Outbound campaigns follow frequency caps",
  "Customer records are shared only with authorised team members",
];
