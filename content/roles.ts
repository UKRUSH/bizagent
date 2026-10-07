import type { OperatingRole, RoleSlug } from "./types";

/**
 * The three operating roles (spec 5, 6.3; source section 2, "The Three Faces").
 * Positioning: the assistant handles repetitive calls and messages; people handle
 * relationships, negotiations and exceptions. No staffing or capacity claims.
 */
export const roles: OperatingRole[] = [
  {
    slug: "call-center",
    title: "Call Center Agent",
    summary:
      "Handle routine enquiries, route conversations, and help the right person take over.",
    headline: "Answer routine calls and keep every queue moving.",
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
    workflow: [
      "Answers the call and identifies the caller",
      "Resolves routine requests from approved knowledge",
      "Routes by intent, language, skill and priority",
      "Transfers to an available agent with a summary",
      "Records, scores and reports for supervisors",
    ],
    useCases: [
      {
        title: "Busy-period overflow",
        description:
          "When every agent is busy, the assistant answers, resolves routine requests and queues the rest with a summary.",
      },
      {
        title: "After-hours support",
        description:
          "Calls outside office hours are answered with the same knowledge, and urgent issues follow your escalation procedure.",
      },
      {
        title: "Multi-site coordination",
        description:
          "Calls for several branches are routed to the right location, with central reporting for supervisors.",
      },
    ],
    faqs: [
      {
        question: "Can we keep our existing phone numbers?",
        answer:
          "SIP trunk, number and PBX options are assessed during onboarding, so you can keep the numbers customers already know wherever your provider supports it.",
      },
      {
        question: "Can supervisors take over a call?",
        answer:
          "Yes. Supervisor override is part of the call center module. The monitoring features available for your setup are confirmed during the demo.",
      },
      {
        question: "How is call quality reviewed?",
        answer:
          "Calls can be scored and added to a QA review queue, where team leads review and coach. Recording always follows an announced consent step.",
      },
    ],
    relatedIndustries: ["support-teams", "bpos-call-centres", "clinics-hospitals", "service-companies"],
    formRole: "call-center",
    href: "/solutions/call-center",
    ctaLabel: "Book a Demo",
  },
  {
    slug: "sales-agent",
    title: "Sales Agent",
    summary: "Qualify interest, organise follow-ups, and keep your sales team informed.",
    headline: "Respond to every enquiry and keep follow-ups moving.",
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
    workflow: [
      "Responds to a new enquiry by call or WhatsApp",
      "Asks qualifying questions and scores the lead",
      "Presents relevant products from your catalogue",
      "Prepares a quote for your team to review",
      "Follows up until there is a clear outcome",
    ],
    useCases: [
      {
        title: "Fast first response",
        description:
          "New website and WhatsApp enquiries get a reply straight away, with a qualified summary waiting for your salesperson.",
      },
      {
        title: "Renewals and repeat orders",
        description:
          "Customers due for a renewal or repeat order are contacted from an approved list and passed to sales when interested.",
      },
      {
        title: "Quote follow-through",
        description:
          "Sent quotes are followed up on a set cadence that stops as soon as the customer replies.",
      },
    ],
    faqs: [
      {
        question: "Can it close deals on its own?",
        answer:
          "It can send a payment link for amounts your team has approved. Negotiation, pricing exceptions and contracts stay with your sales team.",
      },
      {
        question: "Will it contact people who haven't agreed to be contacted?",
        answer:
          "No. Outbound calls and messages go only to approved lists, checked against do-not-call and consent records, inside the calling windows you set.",
      },
      {
        question: "Does it work with our CRM?",
        answer:
          "Connections to Salesforce, HubSpot, Zoho CRM and custom systems are assessed for your setup. Calls, messages and outcomes can then be logged to your pipeline.",
      },
    ],
    relatedIndustries: ["real-estate", "insurance", "education", "sales-teams-smes"],
    formRole: "sales",
    href: "/solutions/sales-agent",
    ctaLabel: "Book a Demo",
  },
  {
    slug: "personal-assistant",
    title: "Personal Call Assistant",
    summary:
      "Screen calls, collect messages, and keep appointments and reminders organised.",
    headline: "Protect your time without missing what matters.",
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
    workflow: [
      "Screens incoming calls and identifies the caller",
      "Lets VIPs and emergencies through",
      "Takes detailed messages with urgency and a callback time",
      "Suggests meetings, reminders and calls on your behalf",
      "Waits for your approval wherever you require it",
    ],
    useCases: [
      {
        title: "Focused working hours",
        description:
          "During meetings, unknown callers are screened and you receive a summary instead of an interruption.",
      },
      {
        title: "Scheduling on your behalf",
        description:
          "Meeting requests get conflict-free suggestions, and invites go out after you approve them.",
      },
      {
        title: "Routine calls handled",
        description:
          "Booking, confirmation and reminder calls are made for you and reported back with the outcome.",
      },
    ],
    faqs: [
      {
        question: "Is this for individuals or businesses?",
        answer:
          "Both. Personal and business assistant packages are still being finalised, so we'll discuss what fits your situation when you get in touch.",
      },
      {
        question: "What does it need access to?",
        answer:
          "Only what you grant, such as your calendar and email for scheduling. Permissions are limited to the actions you enable.",
      },
      {
        question: "Can it act without asking me?",
        answer:
          "Only for actions you pre-approve. Sensitive matters, and anything else, wait for your approval.",
      },
    ],
    relatedIndustries: ["executives-professionals", "finance-professional-services", "sales-teams-smes"],
    formRole: "personal-assistant",
    href: "/solutions/personal-assistant",
    ctaLabel: "Discuss My Setup",
  },
];

export function getRole(slug: string): OperatingRole | undefined {
  return roles.find((role) => role.slug === (slug as RoleSlug));
}
