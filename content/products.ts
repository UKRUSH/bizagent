import type { Product, ProductSlug } from "./types";

/**
 * Standalone products listed in the header navigation. Copy follows the publication rules
 * in spec 1.2: no capacity, speed, partner, staff-replacement or ROI claims, and both
 * products show "Availability confirmed in your demo" until scope is approved.
 */
export const products: Product[] = [
  {
    slug: "whatsapp-orders",
    title: "WhatsApp Order & Sales Management System",
    navLabel: "WhatsApp OrderFlow",
    summary: "Take orders on WhatsApp and phone calls, in Sinhala and English, around the clock.",
    headline: "Take orders on WhatsApp and phone calls, 24/7.",
    description:
      "Customers can order through WhatsApp chat, voice notes or phone calls in Sinhala or English. Our AI order agent collects order details, confirms orders and helps automate customer follow-ups.",
    highlights: ["WhatsApp chat orders", "Phone call orders", "Sinhala + English", "Confirmation and follow-up calls", "Order dashboard"],
    capabilities: [
      {
        title: "Incoming order calls",
        description:
          "Answers order calls in Sinhala or English, shares product, price and offer information, and takes the order on the call.",
        icon: "phone",
      },
      {
        title: "WhatsApp chat and voice-note orders",
        description:
          "Customers order by message, photo or voice note on WhatsApp and get matching items and prices from your approved catalogue.",
        icon: "message",
      },
      {
        title: "AI order taking",
        description:
          "Collects the customer's name, contact number, products, quantities and delivery details, reads the order back, then saves it to your order workflow.",
        icon: "box",
      },
      {
        title: "Confirmation and follow-up calls",
        description:
          "Calls or messages customers to confirm orders, check cash-on-delivery and follow up on unfinished orders, inside the hours you set.",
        icon: "outgoing",
      },
      {
        title: "Payment links and reminders",
        description:
          "Sends a payment link for approved amounts, and reminds customers of unpaid orders by WhatsApp or a short voice call.",
        icon: "shield",
      },
      {
        title: "Delivery updates and notifications",
        description:
          "Tells customers when an order is confirmed, dispatched, delayed or delivered, using approved message templates or a call.",
        icon: "refresh",
      },
      {
        title: "Offers, promotions and reorders",
        description:
          "Lets opted-in customers know about offers and new stock, and lets repeat customers reorder a previous basket in a few messages.",
        icon: "megaphone",
      },
      {
        title: "Order dashboard and team handoff",
        description:
          "Every order, call and chat lands in one dashboard. Custom, bulk and complaint cases move to a team member with the full history.",
        icon: "chart",
      },
    ],
    workflow: [
      {
        title: "Customer calls or messages",
        description: "A customer calls your number or sends a WhatsApp message, photo or voice note.",
      },
      {
        title: "Agent answers in their language",
        description: "The agent replies in Sinhala or English with products, prices and offers from your catalogue.",
      },
      {
        title: "Order details collected",
        description: "Name, contact number, products, quantities and delivery details are collected and read back.",
      },
      {
        title: "Order confirmed and saved",
        description: "The confirmed order is saved to your order workflow, with a payment link if one is needed.",
      },
      {
        title: "Follow-ups and delivery updates",
        description: "Confirmation calls, payment reminders and delivery updates go out on schedule.",
      },
    ],
    humanControls: [
      "Catalogue, prices, offers and discount rules",
      "Custom, bulk and wholesale orders",
      "Refunds, returns and complaints",
      "Calling hours and who may be contacted",
      "Approval of any price outside your rules",
    ],
    useCases: [
      {
        title: "Shops and online stores",
        description:
          "Phone and WhatsApp orders are taken even when staff are busy, with product questions answered and every order confirmed.",
      },
      {
        title: "Restaurants and food delivery",
        description:
          "Menu questions, orders, reservations and delivery details are handled during peak hours, and the kitchen is notified of each confirmed order.",
      },
      {
        title: "Distributors and repeat buyers",
        description:
          "Regular buyers reorder by call or message, and larger or custom orders are passed to a salesperson.",
      },
    ],
    faqs: [
      {
        question: "Can customers order by phone call as well as WhatsApp?",
        answer:
          "Yes. Orders can come in through a WhatsApp chat, a voice note, a WhatsApp call where supported, or a call to your business number. Phone line and SIP options are assessed during onboarding.",
      },
      {
        question: "Does it speak Sinhala?",
        answer:
          "Conversations can run in Sinhala and English, and the agent replies in the customer's language. Language support for your products and customers is confirmed during the demo.",
      },
      {
        question: "Do customers need to install anything?",
        answer:
          "No. Customers order in the WhatsApp app they already use, or simply call. For WhatsApp, your business needs an eligible WhatsApp Business number, which we check during onboarding.",
      },
      {
        question: "Will it call customers who haven't agreed to it?",
        answer:
          "No. Outbound calls and messages go only to customers with an open order or who have opted in, inside the calling hours you set.",
      },
      {
        question: "Can it work with our existing POS or online store?",
        answer:
          "Connections to POS, ERP and e-commerce platforms are assessed for your setup. Without a connection, orders are kept in the BizMaster dashboard and can be exported.",
      },
      {
        question: "Who decides prices and discounts?",
        answer:
          "Your team does. The agent only quotes prices and discounts from your approved catalogue and rules, and passes any exception to a person.",
      },
      {
        question: "Can it take payments?",
        answer:
          "It can send a payment link from a supported payment provider for approved amounts. Payment options are confirmed for your country and provider during the demo.",
      },
    ],
    preview: {
      context: "WhatsApp order · Home bakery",
      speakers: { left: "Customer", right: "AI assistant" },
      messages: [
        { side: "left", text: "Hi, do you have the chocolate cake for Saturday? We need it for 12 people." },
        {
          side: "right",
          text: "I'm the bakery's AI assistant. Yes, the large chocolate cake serves 12. May I have a name for the order?",
        },
        { side: "left", text: "It's N. P. Delivery please, to the same address as last time." },
        {
          side: "right",
          text: "Thanks, N. P.: 1 large chocolate cake, delivered Saturday morning to your saved address. Here is your payment link to confirm.",
        },
      ],
      outcome: {
        title: "Order confirmed and saved",
        details: "Added to Saturday's orders · reminder call scheduled for Friday",
      },
    },
    relatedIndustries: ["retail-ecommerce", "restaurants", "d2c-brands", "sales-teams-smes"],
    availability: "needs-assessment",
    formRole: "whatsapp",
    href: "/whatsapp-orders",
  },
  {
    slug: "ai-to-ai-hub",
    title: "AI-to-AI Communication Hub",
    navLabel: "AI-to-AI Hub",
    summary: "Let your AI agents work with other businesses' AI agents, with your rules in control.",
    headline: "Let your AI agents work with theirs, under your rules.",
    description:
      "More suppliers, customers and partners now answer with AI agents of their own. The hub lets your BizMaster agents exchange requests, quotes, bookings and status updates with those agents in a structured way, under rules you set, with every exchange logged and your team one handoff away.",
    highlights: ["Agent directory", "Structured requests", "Your rules apply", "Full audit log", "Human approval"],
    capabilities: [
      {
        title: "Agent directory and trust",
        description:
          "Register the external agents your business works with. Only agents you have approved can exchange messages with yours.",
        icon: "shield",
      },
      {
        title: "Structured requests",
        description:
          "Orders, availability checks, quotes, bookings and status updates are exchanged as structured requests instead of free-form text.",
        icon: "workflow",
      },
      {
        title: "Rules and limits",
        description:
          "Set what each agent may ask, share and agree to, such as price limits, data fields and the hours it may act.",
        icon: "sliders",
      },
      {
        title: "Human approval steps",
        description:
          "Commitments above your limits, new partners and unusual requests wait for a person to approve before anything is confirmed.",
        icon: "users",
      },
      {
        title: "Conversation audit log",
        description:
          "Every exchange is recorded with who sent it, what was agreed and which rule applied, so your team can review it later.",
        icon: "search",
      },
      {
        title: "Open connection standards",
        description:
          "Agents connect through APIs and agent protocols such as MCP where supported. Each connection is assessed before it goes live.",
        icon: "plug",
      },
      {
        title: "Multilingual hand-off",
        description:
          "Requests can be translated between agents working in different languages, with the original kept in the log.",
        icon: "globe",
      },
      {
        title: "Activity overview",
        description:
          "See open requests, agreed actions, pending approvals and failed exchanges across all connected agents.",
        icon: "chart",
      },
    ],
    workflow: [
      {
        title: "Request arrives",
        description: "An approved external agent sends a request, such as a stock check or a booking.",
      },
      {
        title: "Identity checked",
        description: "The hub confirms the sender is on your approved list and allowed to ask.",
      },
      {
        title: "Rules applied",
        description: "Your agent answers from approved data within the limits you set.",
      },
      {
        title: "Approval if needed",
        description: "Anything outside the rules is sent to a person to approve or decline.",
      },
      {
        title: "Logged and synced",
        description: "The result is recorded and passed to your CRM, ERP or calendar.",
      },
    ],
    humanControls: [
      "Which external agents are approved",
      "Price, quantity and commitment limits",
      "Approval of anything outside the rules",
      "Review of the conversation audit log",
    ],
    useCases: [
      {
        title: "Supplier ordering",
        description:
          "Your purchasing agent checks stock and prices with a supplier's agent and places routine orders within the limits you set.",
      },
      {
        title: "Bookings between businesses",
        description:
          "A travel agent's AI asks your hotel's agent for room availability and holds a booking while a person confirms it.",
      },
      {
        title: "Status updates between partners",
        description:
          "Delivery, service and order status are shared automatically between partner agents instead of by phone or email.",
      },
    ],
    faqs: [
      {
        question: "What is AI-to-AI communication?",
        answer:
          "It is when your AI agent exchanges requests and answers directly with another organisation's AI agent, such as a supplier's ordering assistant, instead of a person relaying each message.",
      },
      {
        question: "Can an external agent make commitments on our behalf?",
        answer:
          "No. External agents can only send requests. Your agent responds within the rules you set, and anything outside them waits for a person to approve.",
      },
      {
        question: "Which agents can connect?",
        answer:
          "Agents that support an API or an agent protocol such as MCP can be assessed for connection. Every external agent must be approved by your team before it can exchange messages.",
      },
      {
        question: "Is this available now?",
        answer:
          "The hub is scoped with each business. Which connections, rules and approval steps are available for your setup is confirmed during the demo.",
      },
    ],
    preview: {
      context: "Agent exchange · Hotel and travel partner",
      speakers: { left: "Travel partner's AI agent", right: "Your hotel's AI agent" },
      messages: [
        {
          side: "left",
          text: "Request: 2 deluxe rooms, 14–16 March, for a group booking. Please share availability and rate.",
        },
        {
          side: "right",
          text: "Verified partner. 2 deluxe rooms are available for those dates at your contracted partner rate.",
        },
        { side: "left", text: "Please hold both rooms under booking reference TP-218." },
        {
          side: "right",
          text: "Rooms held for 24 hours. Group bookings need staff confirmation, so I have sent this to our reservations team.",
        },
      ],
      outcome: {
        title: "Approval requested",
        details: "Reservations team · exchange logged with the partner reference",
      },
    },
    relatedIndustries: ["hotels", "retail-ecommerce", "service-companies", "agencies"],
    availability: "needs-assessment",
    formRole: "not-sure",
    href: "/ai-to-ai-hub",
  },
];

const productIndex = new Map(products.map((product) => [product.slug, product]));

export function getProduct(slug: ProductSlug): Product {
  const product = productIndex.get(slug);
  if (!product) throw new Error(`Unknown product: ${slug}`);
  return product;
}
