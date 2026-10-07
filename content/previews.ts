import type { ConversationChannel, RoleSlug, ScenarioMessage } from "./types";

/**
 * Fictional conversations for the homepage preview (spec 4.2, 6.1, 6.3).
 * Initials only, no real numbers, and the AI always identifies itself. Switching role
 * changes this illustration only; nothing is ever sent.
 */
export interface RolePreview {
  role: RoleSlug;
  roleLabel: string;
  channel: ConversationChannel;
  context: string;
  messages: ScenarioMessage[];
  /** The four stages: received, understood, action prepared, handed over. */
  stages: [string, string, string, string];
  action: { title: string; details: string[] };
  handoff: { to: string; reason: string };
}

export const previewDisclosure = "Illustrative demo — no real calls or messages are sent";

export const stageLabels = ["Received", "Understood", "Action prepared", "Handed over"] as const;

export const rolePreviews: RolePreview[] = [
  {
    role: "call-center",
    roleLabel: "Call center",
    channel: "phone",
    context: "Incoming call · Clinic front desk",
    messages: [
      { speaker: "customer", text: "Hi, can I book an appointment with Dr. P. this week?" },
      {
        speaker: "assistant",
        text: "I'm the clinic's AI assistant. Dr. P. is free on Thursday at 4:00 PM. Shall I book it?",
      },
      { speaker: "customer", text: "Yes, please. I also have a question about my last bill." },
      {
        speaker: "assistant",
        text: "You're booked for Thursday at 4:00 PM. I'll pass your billing question to our front desk team with a summary of this call.",
      },
    ],
    stages: [
      "Phone call from a returning patient",
      "Booking request and a billing question",
      "Appointment booked and reminder scheduled",
      "Billing question passed to the front desk",
    ],
    action: {
      title: "Appointment booked",
      details: ["Thursday, 4:00 PM with Dr. P.", "WhatsApp reminder the day before"],
    },
    handoff: { to: "Front desk team", reason: "Billing question · call summary attached" },
  },
  {
    role: "sales-agent",
    roleLabel: "Sales",
    channel: "whatsapp",
    context: "WhatsApp enquiry · Office furniture",
    messages: [
      { speaker: "customer", text: "Do you supply desks for a 20-person office?" },
      {
        speaker: "assistant",
        text: "I'm an AI assistant for the sales team. Yes, we do. When do you need them, and is the budget already approved?",
      },
      { speaker: "customer", text: "Within six weeks, and yes, the budget is approved." },
      {
        speaker: "assistant",
        text: "Thank you. I've noted your timeline and passed this to our sales team, who will prepare a quote for you.",
      },
    ],
    stages: [
      "WhatsApp message from a new lead",
      "Need, timeline and budget captured",
      "Lead scored as hot",
      "Assigned to sales for a reviewed quote",
    ],
    action: {
      title: "Lead qualified",
      details: ["Need: desks for 20 people", "Timeline: within six weeks · budget approved"],
    },
    handoff: { to: "Sales team", reason: "Quote to be reviewed by a manager before sending" },
  },
  {
    role: "personal-assistant",
    roleLabel: "Personal",
    channel: "phone",
    context: "Screened call · Executive's line",
    messages: [
      { speaker: "customer", text: "Hello, is Ms. D. available?" },
      {
        speaker: "assistant",
        text: "I'm Ms. D.'s AI assistant. She's in a meeting. May I ask who's calling and what it's about?",
      },
      { speaker: "customer", text: "It's T., about tomorrow's site visit. It's quite urgent." },
      {
        speaker: "assistant",
        text: "Thank you, T. I'll flag this as urgent and suggest a callback after 3:00 PM.",
      },
    ],
    stages: [
      "Call to the executive's line",
      "Caller and purpose identified",
      "Urgent message and callback suggested",
      "Waiting for Ms. D.'s approval",
    ],
    action: {
      title: "Message taken",
      details: ["From T. · tomorrow's site visit", "Urgent · callback suggested after 3:00 PM"],
    },
    handoff: { to: "Ms. D.", reason: "Callback needs approval" },
  },
];
