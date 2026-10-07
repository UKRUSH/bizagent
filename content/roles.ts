import type { OperatingRole, RoleSlug } from "./types";

/**
 * The three operating roles (spec 6.3; source section 2, "The Three Faces").
 * Positioning: the assistant handles repetitive calls and messages; people handle
 * relationships, negotiations and exceptions.
 */
export const roles: OperatingRole[] = [
  {
    slug: "call-center",
    title: "Call Center Agent",
    summary:
      "Handle routine enquiries, route conversations, and help the right person take over.",
    description:
      "Answer routine calls and messages, route each conversation to the right queue or person, and keep a searchable record, so your agents can focus on the conversations that need them.",
    responsibilities: [
      "Answers incoming calls and messages",
      "Routes by intent, language, skill and priority",
      "Books appointments and creates tickets",
      "Escalates with a context summary",
      "Records and transcribes calls with consent",
      "Reports on queues and service levels",
    ],
    teamResponsibilities: [
      "Complex and sensitive conversations",
      "Complaints and disputes",
      "Quality review and coaching",
      "Supervision and takeover of live calls",
    ],
    modules: ["inbound-calls", "call-center", "recording-transcription", "call-filtering"],
    href: "/solutions/call-center",
    ctaLabel: "Book a Demo",
  },
  {
    slug: "sales-agent",
    title: "Sales Agent",
    summary: "Qualify interest, organise follow-ups, and keep your sales team informed.",
    description:
      "Respond to new enquiries quickly, qualify interest, present your catalogue and keep follow-ups moving, so your salespeople spend their time with the customers most ready to buy.",
    responsibilities: [
      "Calls and messages leads from approved lists",
      "Qualifies interest and scores leads",
      "Presents products and answers common objections",
      "Prepares quotes for human review",
      "Follows up until there is a clear outcome",
      "Keeps the pipeline and tasks up to date",
    ],
    teamResponsibilities: [
      "Negotiation and closing",
      "Pricing exceptions and contract terms",
      "Approval of quotes and discounts",
      "Long-term customer relationships",
    ],
    modules: ["outbound-calls", "sales-agent", "follow-ups", "customer-segmentation"],
    href: "/solutions/sales-agent",
    ctaLabel: "Book a Demo",
  },
  {
    slug: "personal-assistant",
    title: "Personal Call Assistant",
    summary:
      "Screen calls, collect messages, and keep appointments and reminders organised.",
    description:
      "Screen calls, take detailed messages, make routine calls on your behalf and keep your calendar and reminders organised, with sensitive matters and unapproved actions always coming back to you.",
    responsibilities: [
      "Screens calls and filters spam",
      "Takes detailed messages with urgency tags",
      "Makes booking, reminder and confirmation calls",
      "Suggests meeting times and avoids conflicts",
      "Tracks deadlines and recurring tasks",
    ],
    teamResponsibilities: [
      "Approval of actions on your behalf",
      "Sensitive and personal matters",
      "Decisions about priorities",
    ],
    modules: ["personal-assistant", "call-filtering", "reminders-scheduling"],
    href: "/solutions/personal-assistant",
    ctaLabel: "Discuss My Setup",
  },
];

export function getRole(slug: string): OperatingRole | undefined {
  return roles.find((role) => role.slug === (slug as RoleSlug));
}
