import type { RoleChannel, RoleChannelContent, RoleSlug } from "./types";

/**
 * Channel pages for each role: WhatsApp (chat, voice notes and WhatsApp calls where
 * supported) and Voice (phone line, SIP and PBX). Same publication rules as roles.ts:
 * no latency, capacity or staffing claims, and every preview is fictional and labelled.
 */

export const roleChannelLabels: Record<RoleChannel, { label: string; short: string }> = {
  whatsapp: { label: "WhatsApp Call & Message", short: "WhatsApp" },
  voice: { label: "Voice Call", short: "Voice" },
};

export const roleChannelContent: RoleChannelContent[] = [
  /* ------------------------------------------------------------ Call center */
  {
    role: "call-center",
    channel: "whatsapp",
    headline: "Answer every WhatsApp chat, voice note and call for your support desk.",
    description:
      "Customers already message you on WhatsApp. The assistant replies around the clock from your approved knowledge, understands voice notes, takes WhatsApp calls where supported and routes anything complex to the right agent with the full conversation.",
    highlights: ["Chats and voice notes", "WhatsApp calls where supported", "Routing by intent and language", "Agent handoff"],
    capabilities: [
      {
        icon: "message",
        title: "Instant chat replies",
        description: "Answers routine questions from your knowledge base the moment a message arrives, day or night.",
      },
      {
        icon: "mic",
        title: "Voice-note understanding",
        description: "Transcribes voice notes and replies to what the customer actually asked.",
      },
      {
        icon: "workflow",
        title: "Queue routing",
        description: "Routes each chat by intent, language and priority to the right team or branch.",
      },
      {
        icon: "users",
        title: "Handoff with context",
        description: "Passes the chat to an agent with a summary, so the customer never repeats themselves.",
      },
    ],
    steps: [
      { title: "Connect your WhatsApp number", description: "Verify your business number through the provider flow. We never ask for passwords." },
      { title: "Add your support knowledge", description: "Upload FAQs, policies and routing rules, and set hours and handoff." },
      { title: "Go live with your team", description: "Test with an authorised account, then let the assistant take the first reply." },
    ],
    preview: {
      context: "WhatsApp · Clinic front desk",
      messages: [
        { speaker: "customer", text: "Hi, can I book an appointment with Dr. P. this week?" },
        { speaker: "assistant", text: "Hi! I'm the clinic's AI assistant. Dr. P. is free on Thursday at 4:00 PM. Shall I book it?" },
        { speaker: "customer", text: "Yes please. I also have a question about my last bill." },
        { speaker: "assistant", text: "Booked for Thursday at 4:00 PM. I've passed your billing question to our front desk with this chat." },
      ],
      handoff: { to: "Front desk team", reason: "Billing questions are handled by a person." },
    },
    faqs: [
      {
        question: "Can agents reply in the same WhatsApp chat?",
        answer: "Yes. When the assistant hands over, an agent continues in the same conversation with the full history and a summary.",
      },
      {
        question: "Does it take WhatsApp voice calls?",
        answer: "Live WhatsApp calls are supported where your number and provider allow it. Eligibility is checked during onboarding.",
      },
    ],
  },
  {
    role: "call-center",
    channel: "voice",
    headline: "Answer routine calls and keep every queue moving.",
    description:
      "The assistant answers your phone line, identifies the caller, resolves routine requests from approved knowledge and transfers to an available agent with a summary, so your team spends its time on the calls that need them.",
    highlights: ["Answers your phone line", "SIP and PBX options", "Recording with consent", "Live transfer"],
    capabilities: [
      {
        icon: "phone",
        title: "Inbound call answering",
        description: "Picks up every call, identifies the caller and resolves routine requests.",
      },
      {
        icon: "workflow",
        title: "Intelligent routing",
        description: "Routes by intent, language, skill and priority, across queues and branches.",
      },
      {
        icon: "headset",
        title: "Warm transfer",
        description: "Transfers to an available agent with a summary, and supervisors can take over.",
      },
      {
        icon: "chart",
        title: "Recording and QA",
        description: "Records and transcribes with an announced consent step, and feeds QA reviews.",
      },
    ],
    steps: [
      { title: "Connect your phone line", description: "SIP trunk, number and PBX options are assessed so you can keep the numbers customers know." },
      { title: "Set your call flows", description: "Add knowledge, queues, hours, voice and escalation rules." },
      { title: "Go live and review", description: "Test calls first, then monitor queues and service levels from the dashboard." },
    ],
    preview: {
      context: "Incoming call · Clinic front desk",
      messages: [
        { speaker: "customer", text: "Hi, can I book an appointment with Dr. P. this week?" },
        { speaker: "assistant", text: "I'm the clinic's AI assistant. Dr. P. is free on Thursday at 4:00 PM. Shall I book it?" },
        { speaker: "customer", text: "Yes, please. I also have a question about my last bill." },
        { speaker: "assistant", text: "You're booked. I'll transfer you to our front desk now with a summary of this call." },
      ],
      handoff: { to: "Front desk team", reason: "Billing questions are handled by a person." },
    },
    faqs: [
      {
        question: "Can we keep our existing phone numbers?",
        answer: "SIP trunk, number and PBX options are assessed during onboarding, so you can keep your numbers wherever your provider supports it.",
      },
      {
        question: "Can supervisors take over a call?",
        answer: "Yes. Supervisor override is part of the call center module. Monitoring features for your setup are confirmed during the demo.",
      },
    ],
  },

  /* ------------------------------------------------------------ Sales agent */
  {
    role: "sales-agent",
    channel: "whatsapp",
    headline: "Turn every WhatsApp enquiry into a qualified lead.",
    description:
      "Reply to new enquiries the moment they arrive, share your catalogue, answer common objections and qualify interest on WhatsApp, then pass ready-to-buy customers to your sales team with a scored summary.",
    highlights: ["Instant first reply", "Catalogue and media", "Lead scoring", "Approved templates for follow-ups"],
    capabilities: [
      {
        icon: "message",
        title: "Fast first response",
        description: "Every enquiry gets a reply straight away, with a qualified summary for your salesperson.",
      },
      {
        icon: "image",
        title: "Catalogue and media",
        description: "Shares product photos, brochures and price lists from your media library.",
      },
      {
        icon: "trending",
        title: "Lead scoring",
        description: "Asks qualifying questions and scores interest so your team calls the hottest leads first.",
      },
      {
        icon: "megaphone",
        title: "Template follow-ups",
        description: "Follows up with approved templates on a cadence that stops as soon as the customer replies.",
      },
    ],
    steps: [
      { title: "Connect your WhatsApp number", description: "Verify your business number through the provider flow. We never ask for passwords." },
      { title: "Add products and pricing", description: "Upload your catalogue, qualifying questions and the quotes your team approves." },
      { title: "Let it qualify, you close", description: "The assistant qualifies and follows up; your team negotiates and closes." },
    ],
    preview: {
      context: "WhatsApp enquiry · Office furniture",
      messages: [
        { speaker: "customer", text: "Do you have ergonomic chairs for a 12-person office?" },
        { speaker: "assistant", text: "Hi! I'm the store's AI assistant. Yes, here are three models in your range. Do you need delivery and assembly?" },
        { speaker: "customer", text: "Yes, delivery to Colombo 03 next month." },
        { speaker: "assistant", text: "Thanks! I've noted 12 chairs with delivery. Our sales team will send you a quote today." },
      ],
      handoff: { to: "Sales team", reason: "Quotes and discounts are approved by a person." },
    },
    faqs: [
      {
        question: "Can it send follow-up messages after 24 hours?",
        answer: "Yes, using approved message templates sent only to customers who have opted in, following WhatsApp's messaging rules.",
      },
      {
        question: "Can it close deals on its own?",
        answer: "It can send a payment link for amounts your team has approved. Negotiation, pricing exceptions and contracts stay with your sales team.",
      },
    ],
  },
  {
    role: "sales-agent",
    channel: "voice",
    headline: "Call every lead back and keep follow-ups moving.",
    description:
      "The assistant calls leads from your approved lists, asks qualifying questions, answers common objections and books meetings, then logs the outcome to your pipeline so your salespeople spend their time closing.",
    highlights: ["Outbound calls from approved lists", "Qualifying questions", "Meeting booking", "CRM logging"],
    capabilities: [
      {
        icon: "outgoing",
        title: "Outbound lead calls",
        description: "Calls leads from approved lists inside the calling windows you set.",
      },
      {
        icon: "trending",
        title: "Qualification on the call",
        description: "Asks your qualifying questions and scores interest in real time.",
      },
      {
        icon: "calendar",
        title: "Meetings booked",
        description: "Books a meeting with the right salesperson when the lead is ready.",
      },
      {
        icon: "plug",
        title: "Pipeline updates",
        description: "Logs calls and outcomes to your CRM, so nothing falls through the cracks.",
      },
    ],
    steps: [
      { title: "Connect your phone line", description: "SIP and number options are assessed, and calling windows are set." },
      { title: "Load lists and scripts", description: "Approved lists are checked against do-not-call and consent records." },
      { title: "Review outcomes", description: "Qualified leads, booked meetings and call notes land in your pipeline." },
    ],
    preview: {
      context: "Outbound call · Renewal follow-up",
      messages: [
        { speaker: "assistant", text: "Hi Mr. R., I'm the AI assistant for the insurance team. Your policy renews next month. Is now a good time?" },
        { speaker: "customer", text: "Yes, but I'd like to add my car this time." },
        { speaker: "assistant", text: "Of course. Could I have the make and year? I'll book a call with your advisor to confirm the cover." },
        { speaker: "customer", text: "A 2021 hatchback. Tomorrow afternoon works." },
      ],
      handoff: { to: "Insurance advisor", reason: "Cover changes and pricing are confirmed by a person." },
    },
    faqs: [
      {
        question: "Will it call people who haven't agreed to be contacted?",
        answer: "No. Outbound calls go only to approved lists, checked against do-not-call and consent records, inside the calling windows you set.",
      },
      {
        question: "Does it work with our CRM?",
        answer: "Connections to Salesforce, HubSpot, Zoho CRM and custom systems are assessed for your setup, so calls and outcomes can be logged.",
      },
    ],
  },

  /* ----------------------------------------------------- Personal assistant */
  {
    role: "personal-assistant",
    channel: "whatsapp",
    headline: "A personal assistant on your WhatsApp, so you can stay focused.",
    description:
      "The assistant replies to messages on your WhatsApp number, takes detailed notes from chats and voice notes, suggests meeting times and sends reminders, with anything sensitive or unapproved coming back to you.",
    highlights: ["Replies while you're busy", "Voice-note summaries", "Meeting suggestions", "Reminders"],
    capabilities: [
      {
        icon: "message",
        title: "Replies on your behalf",
        description: "Acknowledges messages and answers routine questions while you're in meetings.",
      },
      {
        icon: "mic",
        title: "Voice-note summaries",
        description: "Turns long voice notes into short summaries with urgency tags.",
      },
      {
        icon: "calendar",
        title: "Scheduling",
        description: "Suggests conflict-free times and sends invites after you approve them.",
      },
      {
        icon: "clock",
        title: "Reminders",
        description: "Sends reminders and confirmations so nothing slips.",
      },
    ],
    steps: [
      { title: "Connect your WhatsApp number", description: "Verify your number through the provider flow. We never ask for passwords." },
      { title: "Set what it may do", description: "Choose VIPs, approval rules, and calendar access you're comfortable with." },
      { title: "Get summaries, not interruptions", description: "Review a digest and approve actions with a tap." },
    ],
    preview: {
      context: "WhatsApp · Executive's number",
      messages: [
        { speaker: "customer", text: "Hi, can Mr. S. meet next week about the warehouse lease?" },
        { speaker: "assistant", text: "Hi! I'm Mr. S.'s AI assistant. He's free Tuesday at 10:00 AM or Wednesday at 3:00 PM. Which suits you?" },
        { speaker: "customer", text: "Wednesday at 3 works." },
        { speaker: "assistant", text: "Thanks! I'll confirm once Mr. S. approves and send you an invite." },
      ],
      handoff: { to: "Mr. S.", reason: "Meetings are confirmed only after approval." },
    },
    faqs: [
      {
        question: "Can I use my existing WhatsApp number?",
        answer: "The number must be eligible for the WhatsApp Business Platform. We check this during onboarding before anything changes.",
      },
      {
        question: "Can it act without asking me?",
        answer: "Only for actions you pre-approve. Sensitive matters, and anything else, wait for your approval.",
      },
    ],
  },
  {
    role: "personal-assistant",
    channel: "voice",
    headline: "Protect your time without missing what matters.",
    description:
      "Screen calls, take detailed messages, make routine calls on your behalf and keep your calendar and reminders organised, with sensitive matters and unapproved actions always coming back to you.",
    highlights: ["Call screening", "Spam filtering", "Detailed messages", "Calls on your behalf"],
    capabilities: [
      {
        icon: "filter",
        title: "Call screening",
        description: "Identifies callers, filters spam and lets VIPs and emergencies through.",
      },
      {
        icon: "message",
        title: "Detailed messages",
        description: "Takes messages with urgency tags and a preferred callback time.",
      },
      {
        icon: "outgoing",
        title: "Calls on your behalf",
        description: "Makes booking, confirmation and reminder calls, and reports the outcome.",
      },
      {
        icon: "calendar",
        title: "Calendar that stays clear",
        description: "Suggests meeting times, avoids conflicts and tracks deadlines.",
      },
    ],
    steps: [
      { title: "Forward your calls", description: "Set call forwarding or connect a number, depending on your provider." },
      { title: "Choose your rules", description: "Pick VIPs, quiet hours and the actions that need your approval." },
      { title: "Read the summary", description: "Get a digest of every call and approve follow-ups." },
    ],
    preview: {
      context: "Screened call · Executive's line",
      messages: [
        { speaker: "customer", text: "Hello, I need to speak to Mr. S. about the warehouse lease." },
        { speaker: "assistant", text: "I'm Mr. S.'s AI assistant. He's in a meeting. Can I take a message and a good time to call back?" },
        { speaker: "customer", text: "Please ask him to call before 5. It's about signing on Friday." },
        { speaker: "assistant", text: "Noted as urgent: lease signing on Friday, callback before 5:00 PM. I'll pass it on now." },
      ],
      handoff: { to: "Mr. S.", reason: "Urgent callbacks go straight to you." },
    },
    faqs: [
      {
        question: "Is this for individuals or businesses?",
        answer: "Both. Personal and business assistant packages are still being finalised, so we'll discuss what fits when you get in touch.",
      },
      {
        question: "What does it need access to?",
        answer: "Only what you grant, such as your calendar for scheduling. Permissions are limited to the actions you enable.",
      },
    ],
  },
];

export function getRoleChannel(role: RoleSlug, channel: string): RoleChannelContent | undefined {
  return roleChannelContent.find((entry) => entry.role === role && entry.channel === channel);
}

export function roleChannelHref(role: RoleSlug, channel: RoleChannel): string {
  return `/solutions/${role}/${channel}`;
}
