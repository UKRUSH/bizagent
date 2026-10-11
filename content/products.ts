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
    navLabel: "WhatsApp Orders",
    summary: "Take orders, answer product questions and track sales on WhatsApp.",
    headline: "Take orders and manage sales where your customers already chat.",
    description:
      "Customers browse your catalogue, ask questions and place orders in a WhatsApp chat. The AI assistant confirms each order, keeps stock and delivery status in view, and passes anything unusual to your team, so every order is recorded in one place.",
    highlights: ["Catalogue in chat", "Order capture", "Payment links", "Delivery updates", "Sales dashboard"],
    capabilities: [
      {
        title: "Catalogue browsing",
        description:
          "Customers ask for a product by name, photo or category and get matching items, prices and options from your approved catalogue.",
        icon: "bag",
      },
      {
        title: "Order capture",
        description:
          "Items, quantities, variants and delivery details are collected in the chat and confirmed back to the customer before the order is saved.",
        icon: "box",
      },
      {
        title: "Payment links and receipts",
        description:
          "A payment link is sent for approved amounts, and the order moves forward once your payment provider confirms it.",
        icon: "shield",
      },
      {
        title: "Order and delivery updates",
        description:
          "Customers are told when an order is confirmed, packed, dispatched and delivered, using approved message templates.",
        icon: "refresh",
      },
      {
        title: "Upsell and repeat orders",
        description:
          "Related items are suggested from your rules, and repeat customers can reorder a previous basket in a few messages.",
        icon: "trending",
      },
      {
        title: "Sales and order dashboard",
        description:
          "See orders by status, revenue by product and period, abandoned chats and follow-ups in one view for your team.",
        icon: "chart",
      },
      {
        title: "Stock and system sync",
        description:
          "Stock, prices and orders can sync with your POS, ERP or e-commerce platform. Connections are assessed for each setup.",
        icon: "plug",
      },
      {
        title: "Team inbox and handoff",
        description:
          "Custom requests, complaints and bulk orders move to a team member with the full chat and order details attached.",
        icon: "users",
      },
    ],
    workflow: [
      {
        title: "Customer messages",
        description: "A customer asks about a product or sends a photo on WhatsApp.",
      },
      {
        title: "Products matched",
        description: "The assistant shares matching items, prices and options from your catalogue.",
      },
      {
        title: "Order confirmed",
        description: "Items, quantities and delivery details are confirmed back to the customer.",
      },
      {
        title: "Payment and fulfilment",
        description: "A payment link is sent and the order goes to your team or system to fulfil.",
      },
      {
        title: "Updates and follow-up",
        description: "Status updates are sent, and the sale is recorded on your dashboard.",
      },
    ],
    humanControls: [
      "Catalogue, prices and discount rules",
      "Custom, bulk and wholesale orders",
      "Refunds, returns and complaints",
      "Approval of any price outside your rules",
    ],
    useCases: [
      {
        title: "Retail and online shops",
        description:
          "Customers who message about a product can see options and order in the same chat, without moving to a website.",
      },
      {
        title: "Restaurants and food delivery",
        description:
          "Menu questions, orders and delivery details are handled in chat, with the kitchen or delivery team notified of each confirmed order.",
      },
      {
        title: "Distributors and repeat buyers",
        description:
          "Regular buyers reorder from their previous orders, and larger or custom orders are passed to a salesperson.",
      },
    ],
    faqs: [
      {
        question: "Do customers need to install anything?",
        answer:
          "No. Customers order in the WhatsApp app they already use. Your business needs an eligible WhatsApp Business number, which we check during onboarding.",
      },
      {
        question: "Can it work with our existing POS or online store?",
        answer:
          "Connections to POS, ERP and e-commerce platforms are assessed for your setup. Without a connection, orders are kept in the BizMaster dashboard and can be exported.",
      },
      {
        question: "Who decides prices and discounts?",
        answer:
          "Your team does. The assistant only quotes prices and discounts from your approved catalogue and rules, and passes any exception to a person.",
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
          text: "I'm the bakery's AI assistant. Yes, the large chocolate cake serves 12. Would you like pickup or delivery on Saturday?",
        },
        { side: "left", text: "Delivery please, to the same address as last time." },
        {
          side: "right",
          text: "Done: 1 large chocolate cake, delivered Saturday morning to your saved address. Here is your payment link to confirm the order.",
        },
      ],
      outcome: {
        title: "Order confirmed",
        details: "Added to Saturday's orders · delivery team notified",
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
