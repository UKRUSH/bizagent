/**
 * Extra sections for /whatsapp-orders (the core copy lives in products.ts). Layout follows
 * an agent-platform landing page: live agent cards, an "always on" band, industry cards,
 * a manual-vs-AI comparison and integrations. Same publication rules as products.ts: no
 * "first", percentage-saving or staffing claims, no testimonials, and every connection is
 * assessed per setup.
 */

/** Hero mockup: three agents at work, each a fictional, labelled status. */
export const heroAgents = [
  { label: "AI agent 01", status: "Taking a WhatsApp order", detail: "2 × chocolate cake · Saturday" },
  { label: "AI agent 02", status: "Payment link sent", detail: "Order #1048 · awaiting payment" },
  { label: "AI agent 03", status: "Delivery update sent", detail: "Order #1042 · out for delivery" },
];

export const heroBoardTags = ["New orders", "Payments", "Deliveries", "Reorders", "Follow-ups"];

export const heroStats = [
  { value: "24/7", label: "Order taking" },
  { value: "Chat + Voice", label: "Messages, voice notes and calls" },
  { value: "Sinhala + English", label: "Conversations" },
];

export const audienceLine = ["Shops", "Restaurants", "Bakeries", "Pharmacies", "Distributors", "Online stores"];

export const alwaysOnTags = ["Orders", "Catalogue", "Payments", "Delivery updates", "Reorders", "24/7"];

export const customAgentPoints = [
  "An order flow shaped around your products and rules",
  "Sinhala and English conversations in chat and voice notes",
  "Order confirmations, updates and reminders on WhatsApp",
  "Connections to your POS, store, sheets or delivery partners",
];

export const notAMenuBot = [
  {
    title: "Understands real messages",
    description: "Customers type, send a photo or a voice note the way they normally would. No numbered menus.",
  },
  {
    title: "Open around the clock",
    description: "Orders are taken at night, on weekends and on holidays, and are waiting for your team in the morning.",
  },
  {
    title: "Confirms before saving",
    description: "Every item, quantity and address is read back to the customer before the order is recorded.",
  },
  {
    title: "Knows when to hand over",
    description: "Complaints, custom requests and bulk orders go to a person with the full chat attached.",
  },
];

/** Industry cards: what the agent does there, and the benefit. `slug` links when a page exists. */
export const orderIndustries = [
  {
    title: "Shops and online stores",
    slug: "retail-ecommerce",
    tasks: ["Product questions and photos", "Order capture and confirmation", "Delivery updates"],
    benefit: "Customers order in the chat they already use, without moving to a website.",
  },
  {
    title: "Restaurants and food delivery",
    slug: "restaurants",
    tasks: ["Menu questions", "Orders and pickup times", "Kitchen and rider notifications"],
    benefit: "Busy-hour orders are taken in parallel while staff focus on the kitchen.",
  },
  {
    title: "Bakeries and cake shops",
    slug: null,
    tasks: ["Custom cake requests", "Advance orders by date", "Pickup and delivery reminders"],
    benefit: "Every advance order is recorded with its date, so nothing is missed.",
  },
  {
    title: "Pharmacies and health stores",
    slug: null,
    tasks: ["Stock questions", "Repeat orders", "Prescription orders passed to a pharmacist"],
    benefit: "Routine reorders are quick, and anything clinical always goes to a person.",
  },
  {
    title: "Distributors and wholesalers",
    slug: "sales-teams-smes",
    tasks: ["Repeat orders from regular buyers", "Price lists by customer", "Bulk orders to sales"],
    benefit: "Regular buyers reorder in a few messages, and large deals reach a salesperson.",
  },
  {
    title: "D2C and home brands",
    slug: "d2c-brands",
    tasks: ["Catalogue and offers", "Cash-on-delivery confirmation", "Reorder reminders"],
    benefit: "Confirmations before dispatch help reduce failed deliveries.",
  },
  {
    title: "Grocery and supermarkets",
    slug: null,
    tasks: ["Shopping lists by message or photo", "Substitution choices", "Delivery slots"],
    benefit: "Customers send a list once, and the order is built and confirmed for them.",
  },
  {
    title: "Any business that sells on WhatsApp",
    slug: null,
    tasks: ["An order flow configured to your products", "Your rules and approvals", "Your systems"],
    benefit: "We shape the agent around how you already take orders.",
  },
];

export const manualVersusAgent = {
  manual: [
    "Orders wait until someone is free to reply",
    "The same product questions are answered again and again",
    "Order details are copied by hand into a book or sheet",
    "Busy hours mean missed or late replies",
    "Payment and delivery follow-ups depend on memory",
  ],
  agent: [
    "Replies the moment a message arrives, day or night",
    "Answers from your approved catalogue and prices",
    "Records every confirmed order in one dashboard",
    "Handles many chats at once during busy hours",
    "Sends payment links, updates and reminders on schedule",
  ],
};

/** Integration tiles. Every connection is assessed for the business's setup. */
export const orderIntegrations = [
  { title: "POS and ERP", description: "Stock, prices and orders sync with the system you already run." },
  { title: "Online store", description: "Catalogue and orders can connect to Shopify, WooCommerce or a custom store." },
  { title: "Google Sheets", description: "Keep a live order sheet, or import your product list from one." },
  { title: "Payment providers", description: "Payment links from a supported provider for approved amounts." },
  { title: "Delivery partners", description: "Confirmed orders passed to your riders or courier service." },
  { title: "CRM", description: "Customers and order history synced to HubSpot, Zoho CRM or your own CRM." },
];

export const extraConnections = ["REST API", "Webhooks", "Automation workflows", "Your business systems"];
