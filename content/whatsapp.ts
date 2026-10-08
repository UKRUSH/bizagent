/**
 * Agent BIZ MASTER — the WhatsApp offering (spec 8.1; source section 18).
 *
 * Public copy avoids the source's unverified claims ("Sri Lanka's first", "100% Meta
 * compliant", "live in under 5 minutes", "sub-200ms", "no hidden charges"). The official
 * platform and provider attribution are mentioned only after confirmation (spec 6.5).
 */

export const whatsappCapabilities = [
  {
    title: "No-code onboarding",
    description: "Connect an eligible WhatsApp Business number and configure the assistant without writing code.",
  },
  {
    title: "Your business knowledge",
    description: "Upload documents, FAQs and product information that the assistant answers from.",
  },
  {
    title: "Conversation memory",
    description: "Earlier chats and calls are remembered, so customers do not have to repeat themselves.",
  },
  {
    title: "Multilingual conversations",
    description: "Conversations in supported languages, confirmed for your setup.",
  },
  {
    title: "Intent detection",
    description: "Works out what the customer needs and responds or routes accordingly.",
  },
  {
    title: "Responsive voice",
    description: "Live voice calls are designed for natural, low-delay responses. Performance is measured for each deployment.",
  },
  {
    title: "Long-call recovery",
    description: "Long voice sessions recover gracefully if the connection is interrupted.",
  },
  {
    title: "Voice-note understanding",
    description: "Voice notes are transcribed, understood and answered in the chat.",
  },
];

/** Fictional WhatsApp chat for the page hero (spec 4.2). Initials only; AI identifies itself. */
export const whatsappPreview = {
  businessName: "Fictional homeware shop",
  messages: [
    { speaker: "customer", kind: "text", text: "Hi, do you deliver to Kandy?" },
    {
      speaker: "assistant",
      kind: "text",
      text: "Hi! I'm the shop's AI assistant. Yes, we deliver to Kandy. Which item are you interested in?",
    },
    {
      speaker: "customer",
      kind: "voice-note",
      text: "Can I pay on delivery for the blue kettle?",
      duration: "0:09",
    },
    {
      speaker: "assistant",
      kind: "text",
      text: "Yes, payment on delivery is available for the blue kettle. Shall I prepare the order for our team to confirm?",
    },
    { speaker: "customer", kind: "text", text: "Yes, please." },
  ],
  outcome: "Order draft created and passed to the sales team to confirm.",
} as const;

/** Voice notes and live calls are different features (spec 8.1). */
export const voiceNotesVersusCalls = {
  voiceNotes: "Recorded audio messages sent in a chat. They are transcribed and answered as messages.",
  liveCalls:
    "Real-time WhatsApp voice calls. They need calling to be supported for your region and number, and user consent.",
};

export const whatsappBusinessTools = [
  { title: "Lead scoring", description: "Highlights promising leads from conversation signals." },
  { title: "Template broadcasts", description: "Send approved templates with personalised variables to opted-in customers." },
  { title: "Searchable message history", description: "Find any conversation across your connected numbers." },
  { title: "Multiple numbers", description: "Manage several WhatsApp numbers from one place." },
  { title: "Knowledge per number", description: "Give each number its own knowledge base." },
  { title: "CRM lead sync", description: "Capture leads and sync them with your CRM." },
  { title: "Usage and AI cost analytics", description: "Track message volumes, AI usage and performance per number." },
  { title: "Multi-step nurture", description: "Automated follow-up plans that message and call leads." },
  { title: "Instant configuration updates", description: "Update knowledge and settings without taking the assistant offline." },
  { title: "Media and asset library", description: "Upload and attach images and documents from one place." },
];

/** Provider support and transfer behaviour are confirmed per deployment (spec 8.1). */
export const pbxWorkflows = [
  {
    title: "Desk phones and softphones",
    description: "Connect SIP desk phones or WebRTC softphones to the same assistant voice.",
  },
  {
    title: "Straight to your team",
    description: "Route inbound WhatsApp calls directly to your registered PBX when you prefer a person to answer.",
  },
  {
    title: "Qualify, then transfer",
    description: "The assistant answers first and transfers the live call to your team when the caller asks for a person.",
  },
];

/** Onboarding stages (spec 8.1). Meta credentials are never requested in public forms. */
export const onboardingStages = [
  { title: "Eligibility check", description: "Confirm your number, region and use case are eligible." },
  { title: "Connect your number", description: "Verify and connect the number through the provider's official flow." },
  { title: "Add knowledge", description: "Upload the documents and answers the assistant should use." },
  { title: "Configure", description: "Set languages, business hours, voice and handoff rules." },
  { title: "Test", description: "Try the assistant with an authorised test account." },
  { title: "Go live", description: "Enable the assistant for customers." },
];

/** Platform rules every business must follow (source section 18.8). */
export const whatsappComplianceRules = {
  messaging: [
    "Message only users who have opted in",
    "Use approved templates for marketing and notifications outside the 24-hour customer-service window",
    "Honour opt-outs, such as STOP",
    "Avoid spam, misleading promotions and prohibited content",
  ],
  voice: [
    "Business calling is available only where the platform supports it",
    "Clear user consent is required",
    "Calling and commerce policies apply",
  ],
};

/**
 * INTERNAL ONLY — source performance targets (sections 18.2, 24.3, 24.10). They are
 * distinct targets with undefined measurement boundaries and must not be published as
 * results (spec 1.2).
 */
export const internalWhatsappTargets = {
  messagingReplyTime: "under 5 seconds (source 24.3)",
  agentReplyTime: "under 10 seconds (source 24.10)",
  voiceLatency: "under 200 ms (source 18.2, 24.10) — not end-to-end response time",
};
