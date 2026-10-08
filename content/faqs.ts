import type { Question } from "./types";

/**
 * Homepage FAQ — the eight questions from spec 6.11. Answers avoid unconfirmed promises
 * about languages, response times, fees and allowances. Module-specific questions live on
 * each module in content/modules.ts.
 */
export const homepageFaqs: Question[] = [
  {
    question: "What does BizMaster AI Agent do?",
    answer:
      "It answers routine calls and WhatsApp messages, books appointments, takes messages, follows up, and passes conversations to your team with context. You choose which modules and rules apply to your business.",
  },
  {
    question: "Which channels does it support?",
    answer:
      "Phone calls and WhatsApp messaging are the core channels, with WhatsApp voice calling where eligible, and SMS and email for follow-ups and reminders. The channels available for your number and region are confirmed during onboarding.",
  },
  {
    question: "Which languages can it use?",
    answer:
      "The product is designed for English, Sinhala and Tamil conversations. The languages available for your setup are confirmed during your demo.",
  },
  {
    question: "Can customers talk to a person?",
    answer:
      "Yes. Customers can ask for a person at any time. Conversations also move to your team when the assistant detects frustration, a sensitive topic or a request it cannot resolve, along with a summary of what has been discussed.",
  },
  {
    question: "How do we update what the assistant knows?",
    answer:
      "Your team manages the business knowledge the assistant uses, such as documents, FAQs, product details and policies. When information changes, you update the source and the assistant uses the new version.",
  },
  {
    question: "How is plan usage counted?",
    answer:
      "Plans include an allowance of AI-managed chats and, on Voice plans, call minutes. The exact counting definition, reset period and what happens above the allowance are confirmed in your quote.",
  },
  {
    question: "Are WhatsApp platform fees included?",
    answer:
      "WhatsApp charges for certain message types are set by the platform and are separate from your plan's AI-managed chat allowance. We explain the charges that apply to your use when we prepare your quote.",
  },
  {
    question: "How do I request a demo?",
    answer:
      "Use the Book a Demo form to tell us how customers contact you and what your team handles most often. We use that to shape a demo around your workflow.",
  },
];

/** Agent BIZ MASTER page (spec 8.1). No setup-time, latency or partner claims. */
export const whatsappFaqs: Question[] = [
  {
    question: "Which WhatsApp numbers can be connected?",
    answer:
      "WhatsApp Business numbers that meet the platform's eligibility requirements. Eligibility is checked at the start of onboarding, and the number is connected through the provider's own verification flow.",
  },
  {
    question: "Do you need my WhatsApp or Meta account password?",
    answer:
      "No. We never ask for account passwords in forms or messages. Connection happens through the provider's verification flow during onboarding.",
  },
  {
    question: "What is the difference between voice notes and voice calls?",
    answer:
      "Voice notes are recorded messages that the assistant transcribes and answers in the chat. Voice calls are live conversations that need WhatsApp calling to be supported for your region and number, and user consent.",
  },
  {
    question: "Can we use more than one number?",
    answer:
      "Yes. Several numbers can be managed from one place, each with its own knowledge base. How allowances apply across numbers is confirmed in your quote.",
  },
  {
    question: "Who can we send broadcast messages to?",
    answer:
      "Only customers who have opted in. Marketing messages, and notifications outside the 24-hour customer-service window, use approved templates, and opt-outs are honoured.",
  },
];

/** Pricing page (spec 8.4). Terms that are not yet confirmed are described as such. */
export const pricingFaqs: Question[] = [
  {
    question: "What is an AI-managed chat?",
    answer:
      "It is the unit your plan allowance is measured in. The exact counting definition, when allowances reset and whether they are shared across numbers are confirmed in your quote.",
  },
  {
    question: "Are WhatsApp platform fees included?",
    answer:
      "No. WhatsApp charges for certain message types are set by the platform and are separate from your plan's AI-managed chat allowance. We explain the charges that apply to your use in your quote.",
  },
  {
    question: "Can we try it first?",
    answer:
      "Ask about the trial. Trial terms, including eligibility and what happens when it ends, are confirmed when you enquire.",
  },
  {
    question: "What if we need custom integrations or several teams?",
    answer:
      "Custom integrations, white-label and enterprise deployments are quoted separately. See the enterprise options or talk to sales.",
  },
];
