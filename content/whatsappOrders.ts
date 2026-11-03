/**
 * Extra sections for /whatsapp-orders (the core copy lives in products.ts). Structure and
 * order-taking details follow a Sinhala + English AI call-agent landing page: Sinhala
 * headlines over English copy, live agent cards, inbound and outbound order calls, an
 * "always on" band, "not an IVR", industry assistants, manual vs AI, a closing statement
 * and integrations. Publication rules (spec 1.2) still apply: no "first", percentage-saving
 * or staffing claims, no testimonials, and every connection is assessed per setup.
 *
 * `si` fields are Sinhala and are rendered with lang="si".
 */

export const heroKicker = {
  si: "WhatsApp සහ Calls හරහා Orders ලබාගන්නා AI Order Agent",
  en: "Sinhala + English AI order agent for WhatsApp and phone calls",
};

export const heroLocalLine = "ඔබේ Customersලාට Sinhala වලින් Order කරන්න පුළුවන්.";

/** Hero mockup: three agents at work, each a fictional, labelled status. */
export const heroAgents = [
  { label: "AI agent 01", icon: "phone", status: "Handling an incoming order call", detail: "Sinhala · 2 × chocolate cake" },
  { label: "AI agent 02", icon: "message", status: "WhatsApp order confirmed", detail: "Order #1048 · payment link sent" },
  { label: "AI agent 03", icon: "outgoing", status: "Order follow-up call active", detail: "Order #1042 · delivery confirmed" },
] as const;

export const heroBoardTags = ["Incoming calls", "Outgoing calls", "WhatsApp orders", "Payments", "Deliveries", "Reminders"];

export const heroStats = [
  { value: "24/7", label: "Order taking" },
  { value: "WhatsApp + Calls", label: "Orders by chat and phone" },
  { value: "Sinhala + English", label: "Languages" },
];

export const audienceLine = ["Shops", "Online stores", "Restaurants", "Bakeries", "Pharmacies", "Distributors", "Delivery businesses"];

export const alwaysOn = {
  kicker: { si: "ඔබේ Business Orders", en: "01 · Always on" },
  title: "We're awake 24 hours.",
  text: "Automate incoming order calls, WhatsApp orders, confirmation calls, payment reminders and customer follow-ups from one platform, while your team focuses on packing, cooking and delivering.",
  tags: ["Incoming calls", "Outgoing calls", "WhatsApp orders", "Payments", "Reminders", "Deliveries", "24/7"],
};

export const customAgent = {
  si: "ඕනෑම Business එකකට Custom AI Order Agent කෙනෙක්",
  title: "A custom AI order agent for any business.",
  text: "Every business takes orders differently. We configure the agent to your products, prices, delivery areas and rules.",
  points: [
    "A custom order workflow for your business",
    "Sinhala and English conversations by call, chat and voice note",
    "Incoming and outgoing call and WhatsApp automation",
    "Integrations with your business systems",
  ],
  cta: { si: "ඔබගේ අවශ්‍යතාවය අපිට කියන්න", en: "Tell us your requirements" },
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

/** Industry assistants: tasks and the benefit. `slug` links when an industry page exists. */
export const orderIndustries = [
  {
    title: "Shops, online stores and e-commerce",
    assistant: "AI Order Booking Assistant",
    slug: "retail-ecommerce",
    tasks: [
      "Phone and WhatsApp orders",
      "Product and service information",
      "Name, phone and delivery details",
      "Order confirmation",
      "Order follow-up calls",
      "Offers and promotions",
    ],
    benefit: "Even when staff are busy, sales enquiries and routine orders are handled, so fewer sales are missed.",
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
      "Order confirmation calls",
      "Customer feedback",
    ],
    benefit: "During peak hours, staff spend less time tied to the phone, and orders are handled faster.",
  },
  {
    title: "Bakeries and cake shops",
    assistant: "Advance Order Assistant",
    slug: null,
    tasks: ["Custom cake requests", "Orders by date and time", "Deposit and payment links", "Pickup and delivery reminders"],
    benefit: "Every advance order is recorded with its date, and the customer is reminded before pickup.",
  },
  {
    title: "Pharmacies and health stores",
    assistant: "Reorder Assistant",
    slug: null,
    tasks: ["Stock questions", "Repeat orders", "Prescription orders passed to a pharmacist", "Delivery updates"],
    benefit: "Routine reorders are quick, and anything clinical always goes to a person.",
  },
  {
    title: "Grocery and supermarkets",
    assistant: "Shopping List Assistant",
    slug: null,
    tasks: ["Lists by message, photo or voice note", "Substitution choices", "Delivery slots", "Order confirmation"],
    benefit: "Customers send a list once, and the order is built and confirmed for them.",
  },
  {
    title: "Distributors and wholesalers",
    assistant: "Repeat Order Assistant",
    slug: "sales-teams-smes",
    tasks: ["Reorders from regular buyers", "Price lists by customer", "Bulk orders passed to sales", "Payment reminders"],
    benefit: "Regular buyers reorder by call or message, and large deals reach a salesperson.",
  },
  {
    title: "Logistics, courier and delivery",
    assistant: "Delivery Assistant",
    slug: null,
    tasks: ["Delivery enquiries", "Delivery confirmations", "Delay notifications", "Address checks"],
    benefit: "Customers get updates without calling your hotline, and failed deliveries are caught early.",
  },
  {
    title: "Any business that takes orders",
    assistant: "Custom AI Order Agent",
    slug: null,
    tasks: ["An order flow configured to your products", "Your rules and approvals", "Your systems and channels"],
    benefit: "We shape the agent around how you already take orders.",
  },
];

export const manualVersusAgent = {
  si: "Routine වැඩ AI එකට. වැදගත් වැඩ ඔබේ Team එකට.",
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
  si: "තවත් Phone Line එකක් නොවෙයි, වැඩට ලෑස්ති AI Order Agent කෙනෙක්.",
  title: "You may not need another phone line. You may need an order agent that's ready to work.",
  text: "BIZny OrderFlow brings WhatsApp orders, incoming and outgoing order calls and your order workflow together, in Sinhala and English.",
};

/** Integration tiles. Every connection is assessed for the business's setup. */
export const orderIntegrations = [
  { title: "Google Sheets", description: "Orders land in a live sheet, and product lists import from one." },
  { title: "HubSpot CRM", description: "New customers sync as contacts, matched by phone number." },
  { title: "Google Calendar", description: "Pickups, deliveries and reservations mirror to your calendar." },
  { title: "Slack", description: "Real-time alerts for new orders, calls and payments." },
  { title: "WhatsApp", description: "Order confirmations, updates and reminders on the WhatsApp Business Platform." },
  { title: "n8n and automation", description: "Order events stream into your automation workflows." },
  { title: "POS, ERP and online store", description: "Stock, prices and orders sync with your POS, ERP, Shopify or WooCommerce." },
  { title: "Payment and delivery partners", description: "Payment links from supported providers, and orders passed to your riders or courier." },
];

export const extraConnections = ["REST API", "Webhooks", "Automation workflows", "External business systems"];
