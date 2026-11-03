/**
 * Extra sections for /whatsapp-orders (the core copy lives in products.ts): live agent cards,
 * inbound and outbound order calls, an "always on" band, "not an IVR", industry assistants,
 * manual vs AI, a closing statement and integrations. The page copy is English only; the
 * agent's Sinhala support is described in English. Publication rules (spec 1.2) still apply:
 * no "first", percentage-saving or staffing claims, no testimonials, and every connection
 * is assessed per setup.
 */

import type { ProductIcon } from "./types";

export const heroHeadline = "AI Order Agent for WhatsApp & Phone Calls";

export const heroPoints = [
  "Orders by WhatsApp chat, voice note and phone call",
  "Customers can order in Sinhala or English",
  "Your team keeps control of prices and exceptions",
];

/**
 * Hero visual (the same network as /agentic-solutions): the AI order agent in the centre,
 * the order channels and tasks around it, and three agents' live activity. Fictional.
 */
export const orderNetwork: {
  hub: { label: string; status: string; icon: ProductIcon };
  agents: { label: string; status: string; icon: ProductIcon }[];
  feed: { agent: string; text: string }[];
} = {
  hub: { label: "AI Order Agent", status: "Taking orders 24/7", icon: "spark" },
  agents: [
    { label: "Incoming calls", status: "Taking an order call", icon: "phone" },
    { label: "WhatsApp orders", status: "Reading a voice note", icon: "message" },
    { label: "Payments", status: "Payment link sent", icon: "shield" },
    { label: "Deliveries", status: "Dispatch update sent", icon: "box" },
    { label: "Reminders", status: "Pickup reminder set", icon: "clock" },
    { label: "Outgoing calls", status: "Confirmation call active", icon: "outgoing" },
  ],
  feed: [
    { agent: "AI Agent 01", text: "Handling an incoming order call · Sinhala · 2 × chocolate cake" },
    { agent: "AI Agent 02", text: "WhatsApp order confirmed · Order #1048 · payment link sent" },
    { agent: "AI Agent 03", text: "Order follow-up call active · Order #1042 · delivery confirmed" },
  ],
};

export const audienceLine = ["Shops", "Online stores", "Restaurants", "Bakeries", "Pharmacies", "Distributors", "Delivery businesses"];

export const alwaysOn = {
  kicker: "01 · 24/7 order automation",
  title: "Every order, by call or chat.",
  text: "Automate incoming order calls, WhatsApp orders, confirmation calls, payment reminders and customer follow-ups from one platform, while your team focuses on packing, cooking and delivering.",
  tags: ["Incoming calls", "Outgoing calls", "WhatsApp orders", "Payments", "Reminders", "Deliveries"],
  highlight: "24/7 AI Order Taking",
};

export const customAgent = {
  title: "A custom AI order agent for any business.",
  text: "Every business takes orders differently. We configure the agent to your products, prices, delivery areas and rules.",
  points: [
    "Sinhala and English conversations",
    "WhatsApp chat and voice-note orders",
    "Incoming and outgoing calls",
    "Business-specific order workflows",
    "Custom product catalogue",
    "Business system integrations",
    "Custom approval rules",
  ],
  cta: { label: "Tell Us Your Requirements", href: "/contact" },
};

export const notAnIvr = {
  title: "Not a human call center. Not an IVR menu.",
  text: "A conversational AI order agent that understands what customers say, not a pre-recorded “press 1 for orders” menu.",
  points: [
    {
      title: "24/7 service",
      description: "Orders are taken at night, on weekends and on holidays, and are waiting for your team in the morning.",
    },
    {
      title: "Lighter workload for your team",
      description: "Routine order calls and chats are handled, so staff can focus on packing, cooking and delivering.",
    },
    {
      title: "Incoming calls and chats",
      description: "Understands natural speech, messages, photos and voice notes, in Sinhala or English.",
    },
    {
      title: "Automatic outbound calls",
      description: "Confirmation, payment and follow-up calls go out on schedule to customers who expect them.",
    },
  ],
};

/**
 * Industry assistants: tasks and the benefit. `slug` links when an industry page exists;
 * `note` is a safety rule shown on the card.
 */
export const orderIndustries: {
  title: string;
  assistant: string;
  slug: string | null;
  tasks: string[];
  benefit: string;
  note?: string;
}[] = [
  {
    title: "Shops, online stores and e-commerce",
    assistant: "AI Order Booking Assistant",
    slug: "retail-ecommerce",
    tasks: [
      "Phone and WhatsApp orders",
      "Product information",
      "Customer details",
      "Order confirmation",
      "Follow-up calls",
      "Offers and promotions",
    ],
    benefit: "Fewer missed sales when staff are busy.",
  },
  {
    title: "Restaurants, food and delivery",
    assistant: "Order & Reservation Assistant",
    slug: "restaurants",
    tasks: [
      "Phone and WhatsApp orders",
      "Menu and offer information",
      "Reservation enquiries",
      "Delivery details",
      "Order confirmation",
      "Customer feedback",
    ],
    benefit: "Less time spent answering phones during peak hours.",
  },
  {
    title: "Bakeries and cake shops",
    assistant: "Advance Order Assistant",
    slug: null,
    tasks: ["Custom cake requests", "Orders by date and time", "Deposit and payment links", "Pickup reminders", "Delivery reminders"],
    benefit: "Advance orders are recorded with their dates and reminders.",
  },
  {
    title: "Pharmacies and health stores",
    assistant: "Reorder Assistant",
    slug: null,
    tasks: ["Stock questions", "Repeat orders", "Delivery updates", "Prescription orders passed to a pharmacist"],
    benefit: "Routine reorders are handled faster.",
    note: "Prescription-related decisions are always passed to qualified staff.",
  },
  {
    title: "Grocery and supermarkets",
    assistant: "Shopping List Assistant",
    slug: null,
    tasks: ["Shopping lists by message, photo or voice note", "Product substitutions", "Delivery slots", "Order confirmation"],
    benefit: "Customers send their shopping list once, and the order gets prepared.",
  },
  {
    title: "Distributors and wholesalers",
    assistant: "Repeat Order Assistant",
    slug: "sales-teams-smes",
    tasks: ["Regular customer reorders", "Customer-specific price lists", "Bulk orders passed to the sales team", "Payment reminders"],
    benefit: "Routine orders are automated, and large deals are passed to salespeople.",
  },
  {
    title: "Logistics, courier and delivery",
    assistant: "Delivery Assistant",
    slug: null,
    tasks: ["Delivery enquiries", "Delivery confirmations", "Delay notifications", "Address checks"],
    benefit: "Customers receive updates without calling your hotline.",
  },
  {
    title: "Custom business",
    assistant: "Custom AI Order Agent",
    slug: null,
    tasks: ["Business-specific order workflow", "Custom rules", "Approval requirements", "Existing business systems"],
    benefit: "The agent adapts to how your business already takes orders.",
  },
];

export const manualVersusAgent = {
  intro: "Let the AI agent handle the routine orders, so your team can focus on the work that needs them.",
  manualTitle: "Manual order handling",
  agentTitle: "BIZny AI order agent",
  manual: [
    "Limited to staff shifts and working hours",
    "The same product and price questions answered again and again",
    "Order details written by hand into a book or sheet",
    "Missed calls and late replies during busy hours",
    "Confirmations and payment reminders depend on someone remembering",
  ],
  agent: [
    "Takes calls and chats 24/7",
    "Answers from your catalogue, prices and offers",
    "Collects and saves every order in one dashboard",
    "Handles many calls and chats at once",
    "Confirmation, payment and follow-up calls on schedule",
    "Frees your staff for the work that needs them",
  ],
};

export const closingStatement = {
  title: "You may not need another phone line. You may need an order agent that's ready to work.",
  text: "BIZny OrderFlow brings WhatsApp orders, incoming and outgoing order calls and your order workflow together, in Sinhala and English.",
};

/** Integration tiles. Every connection is assessed for the business's setup. */
export const orderIntegrations = [
  { title: "Google Sheets", description: "Orders are saved to a live sheet, and product lists are imported from one." },
  { title: "HubSpot CRM", description: "Customers are synced as contacts, matched by phone number." },
  { title: "Google Calendar", description: "Pickup, delivery and reservation events on your calendar." },
  { title: "Slack", description: "Alerts for new orders, calls and payments." },
  { title: "WhatsApp", description: "Order confirmations, updates and reminders on the WhatsApp Business Platform." },
  { title: "n8n", description: "Order events connected to your automation workflows." },
  { title: "POS, ERP and online stores", description: "Connect supported POS and ERP systems, Shopify and WooCommerce." },
  { title: "Payment and delivery partners", description: "Payment links from supported providers, and order handoff to delivery partners." },
];

export const extraConnections = ["REST API", "Webhooks", "Automation workflows", "External business systems"];

export const integrationScope =
  "Scope, connections and timing depend on your systems and are confirmed before implementation.";

export const teamControlNote = "AI handles the routine tasks. Your team handles the exceptions and the important decisions.";

export const finalCta = {
  title: "Start Your AI Order Agent",
  text: "Tell us how your business takes orders. We will configure an AI order agent around your products, customers, workflows and existing systems.",
  contact: { href: "/contact", label: "Talk to Us About Your Setup" },
  start: "Start an AI Order Agent",
};
