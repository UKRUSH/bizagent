import type { RoleSlug, ScenarioMessage } from "./types";

/**
 * Guided preview scenarios for /demo (spec 13). Local, deterministic and fictional:
 * initials only, no real phone numbers, no medical information, and the AI always
 * identifies itself. Choosing a role changes the proposed action; choosing a channel
 * changes how the conversation opens. Nothing is ever sent.
 */

export type DemoChannel = "phone" | "whatsapp";

export interface ProposedAction {
  title: string;
  details: string[];
  handoff: string;
}

export interface DemoScenario {
  id: string;
  industry: string;
  title: string;
  /** Opening customer message per channel; the rest of the conversation is shared. */
  opening: Record<DemoChannel, string>;
  /** The assistant's first reply per channel. Must identify itself as an AI assistant. */
  greeting: Record<DemoChannel, string>;
  steps: ScenarioMessage[];
  actions: Record<RoleSlug, ProposedAction>;
}

export const demoDisclosure = "Illustrative demo — no real calls or messages are sent";

export const demoChannels: { id: DemoChannel; label: string }[] = [
  { id: "phone", label: "Phone call" },
  { id: "whatsapp", label: "WhatsApp" },
];

export const demoScenarios: DemoScenario[] = [
  {
    id: "clinic-appointment",
    industry: "Healthcare",
    title: "Clinic appointment",
    opening: {
      phone: "Hello, I'd like to book an appointment with Dr. P.",
      whatsapp: "Hi, can I book an appointment with Dr. P.?",
    },
    greeting: {
      phone: "Thank you for calling. I'm the clinic's AI assistant. Dr. P. has Tuesday at 10:30 or Thursday at 4:00. Which suits you?",
      whatsapp: "Hi! I'm the clinic's AI assistant. Dr. P. has Tuesday at 10:30 or Thursday at 4:00. Which suits you?",
    },
    steps: [
      { speaker: "customer", text: "Thursday at 4, please." },
      { speaker: "assistant", text: "Booked for Thursday at 4:00. Would you like a reminder the day before?" },
      { speaker: "customer", text: "Yes please. And can someone call me about my last bill?" },
      { speaker: "assistant", text: "Of course. I've noted that for the front desk team, who will call you back." },
    ],
    actions: {
      "call-center": {
        title: "Appointment booked, billing ticket opened",
        details: ["Thursday 4:00 with Dr. P.", "Reminder scheduled for the day before", "Billing callback ticket created"],
        handoff: "Front desk team · billing callback with call summary",
      },
      "sales-agent": {
        title: "Returning patient noted",
        details: ["Appointment booked", "No sales follow-up suggested for a clinical booking"],
        handoff: "Front desk team · billing question",
      },
      "personal-assistant": {
        title: "Booking confirmed, callback request waiting",
        details: ["Calendar entry added for Thursday 4:00", "Callback request awaiting your approval"],
        handoff: "You · approve the callback time",
      },
    },
  },
  {
    id: "hotel-booking",
    industry: "Hospitality",
    title: "Hotel booking",
    opening: {
      phone: "Hi, do you have a sea-view room for two nights from Friday?",
      whatsapp: "Do you have a sea-view room for 2 nights from Friday?",
    },
    greeting: {
      phone: "Thank you for calling. I'm the hotel's AI assistant. A sea-view double is available Friday to Sunday. Shall I pass a reservation request to our team?",
      whatsapp: "Hello! I'm the hotel's AI assistant. A sea-view double is available Friday to Sunday. Shall I pass a reservation request to our team?",
    },
    steps: [
      { speaker: "customer", text: "Yes please. Can we also check in early?" },
      { speaker: "assistant", text: "I've added an early check-in request. Our reservations team will confirm the rate, payment and early check-in with you." },
    ],
    actions: {
      "call-center": {
        title: "Reservation request created",
        details: ["Sea-view double, Friday to Sunday", "Early check-in requested"],
        handoff: "Reservations team · confirm rate, payment and early check-in",
      },
      "sales-agent": {
        title: "Warm lead: direct booking",
        details: ["Two nights, sea-view double", "Follow-up scheduled if not confirmed within a day"],
        handoff: "Reservations team · send the confirmed rate",
      },
      "personal-assistant": {
        title: "Message taken for the duty manager",
        details: ["Reservation request with dates and room type", "Early check-in question flagged"],
        handoff: "Duty manager · approve early check-in",
      },
    },
  },
  {
    id: "retail-enquiry",
    industry: "Retail and e-commerce",
    title: "Product enquiry",
    opening: {
      phone: "Hello, do you have the blue kettle in stock?",
      whatsapp: "Hi, is the blue kettle in stock?",
    },
    greeting: {
      phone: "Thanks for calling. I'm the shop's AI assistant. Yes, the blue kettle is in stock. Would you like delivery or collection?",
      whatsapp: "Hi! I'm the shop's AI assistant. Yes, the blue kettle is in stock. Would you like delivery or collection?",
    },
    steps: [
      { speaker: "customer", text: "Delivery. Can I pay when it arrives?" },
      { speaker: "assistant", text: "Payment on delivery is available. I'll prepare the order and our team will confirm it with you." },
      { speaker: "customer", text: "Great, thanks." },
    ],
    actions: {
      "call-center": {
        title: "Order draft created",
        details: ["Blue kettle × 1, delivery", "Payment on delivery"],
        handoff: "Sales team · confirm the order and delivery date",
      },
      "sales-agent": {
        title: "Order ready to confirm",
        details: ["Hot lead: ready to buy", "Suggested add-on from the catalogue for the team to offer"],
        handoff: "Sales team · confirm the order",
      },
      "personal-assistant": {
        title: "Order request noted",
        details: ["Delivery order waiting for confirmation"],
        handoff: "Shop owner · approve the order",
      },
    },
  },
  {
    id: "property-viewing",
    industry: "Real estate",
    title: "Property viewing",
    opening: {
      phone: "Hi, I'm calling about the two-bedroom apartment you listed.",
      whatsapp: "Hi, is the two-bedroom apartment still available?",
    },
    greeting: {
      phone: "Thanks for calling. I'm the agency's AI assistant. Yes, it's available. Viewings are open on Saturday at 11:00 or 2:00. Would either work?",
      whatsapp: "Hello! I'm the agency's AI assistant. Yes, it's available. Viewings are open on Saturday at 11:00 or 2:00. Would either work?",
    },
    steps: [
      { speaker: "customer", text: "Saturday at 11. Is the price negotiable?" },
      { speaker: "assistant", text: "You're booked for Saturday at 11:00. Price questions go to the agent, who'll discuss them with you at the viewing." },
    ],
    actions: {
      "call-center": {
        title: "Viewing booked",
        details: ["Saturday 11:00", "Reminder scheduled the day before"],
        handoff: "Agent K. · price question for the viewing",
      },
      "sales-agent": {
        title: "Qualified buyer lead",
        details: ["Viewing booked for Saturday", "Interest: price discussion", "Follow-up after the viewing scheduled"],
        handoff: "Agent K. · negotiation stays with the agent",
      },
      "personal-assistant": {
        title: "Viewing added to the agent's calendar",
        details: ["Saturday 11:00, travel time buffer added"],
        handoff: "Agent K. · confirm the viewing",
      },
    },
  },
  {
    id: "sales-qualification",
    industry: "Professional services",
    title: "Sales qualification",
    opening: {
      phone: "Hello, I'm interested in your accounting services for a small company.",
      whatsapp: "Hi, do you offer accounting services for small companies?",
    },
    greeting: {
      phone: "Thank you for calling. I'm the firm's AI assistant. We do. How many employees do you have, and when would you like to start?",
      whatsapp: "Hi! I'm the firm's AI assistant. We do. How many employees do you have, and when would you like to start?",
    },
    steps: [
      { speaker: "customer", text: "Twelve employees. We'd like to start next month." },
      { speaker: "assistant", text: "Thank you. I can book a consultation with one of our advisors on Wednesday at 11:00 or Friday at 2:00." },
      { speaker: "customer", text: "Friday works." },
      { speaker: "assistant", text: "Booked for Friday at 2:00. The advisor will cover fees and next steps with you." },
    ],
    actions: {
      "call-center": {
        title: "Consultation booked",
        details: ["Friday 2:00 with an advisor", "Company size and start date noted"],
        handoff: "Advisor team · consultation summary attached",
      },
      "sales-agent": {
        title: "Lead scored: hot",
        details: ["Need: accounting for 12 employees", "Timeline: next month", "Consultation booked for Friday"],
        handoff: "Advisor · fees and proposal need human review",
      },
      "personal-assistant": {
        title: "Consultation request on your calendar",
        details: ["Friday 2:00, conflict-free", "Invite waiting for your approval"],
        handoff: "You · approve the invite",
      },
    },
  },
];

/** The full conversation for a scenario and channel, in order. */
export function scenarioTranscript(scenario: DemoScenario, channel: DemoChannel): ScenarioMessage[] {
  return [
    { speaker: "customer", text: scenario.opening[channel] },
    { speaker: "assistant", text: scenario.greeting[channel] },
    ...scenario.steps,
  ];
}
