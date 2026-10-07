import type { ModuleCategory, ModuleSlug, ProductModule } from "./types";

/**
 * The 13 communication modules (spec 7; source sections 5–17).
 *
 * Feature groups preserve every source item. Wording is adjusted where the source states
 * an unverified capacity, speed, security or staffing claim (spec 1.2), e.g. "100+
 * concurrent calls" becomes "sized to your provider capacity and plan". Availability stays
 * "needs-assessment" until the business confirms which modules are live.
 */
export const modules: ProductModule[] = [
  {
    slug: "inbound-calls",
    number: 1,
    sourceSection: "5",
    title: "Inbound Call Handling",
    shortTitle: "Inbound calls",
    summary:
      "Answer incoming calls with your greeting, understand what the caller needs, and resolve, route or hand over with context.",
    introduction:
      "Inbound call handling gives every caller a consistent first response. The AI assistant greets callers with your business greeting, recognises returning customers from your CRM, and works out what they need: a booking, a support question, a complaint, a billing query or something urgent. Routine questions are answered from the knowledge you approve. Bookings, tickets and messages are created in the systems you already use. When a caller asks for a person, sounds frustrated or raises something sensitive, the call is routed or transferred with a summary, so your team does not start from scratch. After-hours and overflow rules decide what happens when your team is busy or away.",
    category: "respond",
    featureGroups: [
      {
        heading: "Answering and availability",
        items: [
          "Branded greeting, customisable per business and per department",
          "Conversational answering, with keypad menus only where you need them",
          "After-hours, weekend and holiday coverage using the same greeting and rules",
          "Simultaneous call handling, sized to your provider capacity and plan",
          "Overflow routing to a backup team or callback queue",
        ],
      },
      {
        heading: "Caller identification",
        items: [
          "Automatic caller ID detection",
          "Real-time CRM lookup",
          "Past interaction history retrieval",
          "VIP caller recognition and priority routing",
          "Unknown caller handling: capture name, purpose and contact details",
        ],
      },
      {
        heading: "Intent, sentiment and language",
        items: [
          "Natural-language understanding across supported languages and accents",
          "Intent classification: sales enquiry, support, complaint, booking, billing, information request and emergency",
          "Sentiment signals such as frustration, urgency and satisfaction",
          "Language detection and switching within supported languages",
        ],
      },
      {
        heading: "Smart routing",
        items: [
          "Department routing by intent",
          "Skill-based routing to the right person",
          "VIP caller priority",
          "Geographic routing",
          "Time-based routing",
          "Fallback to a human operator",
        ],
      },
      {
        heading: "Answers from your knowledge",
        items: [
          "Answers drawn from your documents, website and product catalogue",
          "Product and service questions",
          "Pricing and availability from approved sources",
          "Location, hours and directions",
          "Policy and procedure questions",
          "Knowledge updates from the admin console",
        ],
      },
      {
        heading: "Appointment booking",
        items: [
          "Calendar integration (Google, Microsoft or custom)",
          "Slot offering and confirmation",
          "Reminder calls or messages",
          "Rescheduling and cancellation",
          "No-show follow-up",
        ],
      },
      {
        heading: "Ticket creation",
        items: [
          "Automatic ticket creation",
          "Priority and department assignment",
          "SLA tracking",
          "Escalation rules",
          "Ticket status follow-up calls",
        ],
      },
      {
        heading: "Message taking",
        items: [
          "Detailed message capture",
          "Urgency tagging",
          "Delivery by email, SMS or WhatsApp",
          "Read confirmation",
          "Callback scheduling",
        ],
      },
      {
        heading: "Transfer to your team",
        items: [
          "Live transfer to a team member",
          "Warm transfer with a context summary",
          "Emergency escalation using your approved procedure",
          "Supervisor override",
          "Callback promise tracking",
        ],
      },
    ],
    workflow: [
      "Greets the caller and identifies them from caller ID and CRM history",
      "Detects intent, sentiment and language",
      "Answers from approved knowledge, or completes a booking, ticket or message",
      "Routes or transfers with a summary when a person is needed",
      "Logs the outcome to the conversation record",
    ],
    useCases: [
      {
        title: "After-hours booking",
        description:
          "A caller reaches a clinic after closing. The assistant offers open slots from the calendar, confirms one and sends a WhatsApp confirmation.",
      },
      {
        title: "Busy-period overflow",
        description:
          "During a lunchtime rush, calls the front desk cannot take are answered, routine questions are resolved, and the rest are queued for callback.",
      },
      {
        title: "Support ticket with handoff",
        description:
          "A customer reports a fault. A ticket opens with priority and department, and the caller is transferred to an agent along with the summary.",
      },
    ],
    benefits: [
      "Fewer missed calls during busy periods and after hours",
      "The same greeting and process on every call",
      "Capacity that can grow with demand, within provider limits",
      "Searchable transcripts where recording is enabled and consented",
      "Callers served in supported languages",
    ],
    humanControls: [
      "Callers can ask for a person at any time",
      "Negative sentiment, urgent keywords and repeated failures trigger escalation",
      "Emergency calls follow your organisation's approved procedure",
      "Supervisors can take over a live call",
    ],
    integrations: ["telephony", "crm", "calendar", "email"],
    dependencies:
      "Telephony, speech-to-text and text-to-speech, knowledge engine, CRM, calendar and routing.",
    demonstration: "A fictional incoming call becomes a booking or a ticket, with handoff.",
    relatedModules: ["call-center", "reminders-scheduling", "recording-transcription", "call-filtering"],
    faqs: [
      {
        question: "Do callers know they are speaking with an AI assistant?",
        answer:
          "Yes. The assistant introduces itself as an AI assistant, and callers can ask to speak with a person at any point.",
      },
      {
        question: "What happens when the assistant cannot answer a question?",
        answer:
          "It follows your routing rules: transfer to an available team member, take a detailed message, or schedule a callback, passing along what has already been discussed.",
      },
    ],
    availability: "needs-assessment",
  },
  {
    slug: "outbound-calls",
    number: 2,
    sourceSection: "6",
    title: "Outbound Call Handling",
    shortTitle: "Outbound calls",
    summary:
      "Place calls for qualification, reminders, surveys and follow-ups, with consent checks, calling windows and outcomes tracked.",
    introduction:
      "Outbound call handling lets the AI assistant place calls from lists you approve, such as CRM segments, spreadsheets or lead lists, for sales qualification, reminders, notifications, verification, surveys and follow-ups. Each call follows a script you configure, with branching for common answers and approved responses to objections. Before dialling, numbers are checked against do-not-call lists and consent records, and calls are placed only inside the calling windows you set for each time zone. Every call ends with an outcome such as interested, callback or wrong number. Your CRM and pipeline are updated, so your team can pick up the conversations that need a person.",
    category: "follow-through",
    featureGroups: [
      {
        heading: "Lead lists and dialling",
        items: [
          "Dialling from CRM, spreadsheet, database or lead list imports",
          "Do-not-call list checks before dialling",
          "Consent verification",
          "Time-zone-aware calling windows",
          "Automatic retry scheduling for unanswered calls",
        ],
      },
      {
        heading: "Scripts and conversation",
        items: [
          "Natural voice conversation that identifies itself as an AI assistant",
          "Multi-language and multi-accent support within supported languages",
          "Script adherence with dynamic branching",
          "Objection handling with approved responses",
          "Value proposition tailored to each segment",
        ],
      },
      {
        heading: "Offers and payments",
        items: [
          "Offer presentation within approved discount rules",
          "Payment link delivery by SMS, WhatsApp or email",
        ],
      },
      {
        heading: "Reminder and notification calls",
        items: [
          "Appointment reminders",
          "Payment reminders",
          "Renewal and subscription reminders",
          "Delivery notifications",
          "Event notifications",
          "Verification calls",
          "Survey calls",
          "Feedback collection calls",
        ],
      },
      {
        heading: "Follow-up sequences",
        items: [
          "Multi-attempt follow-up sequences",
          "Personalised follow-up based on the previous conversation",
          "Sample cadence: day 1, day 3, day 7 and day 14",
          "Stop-on-reply logic",
          "Re-engagement of dormant leads",
          "Win-back sequences for lost customers",
        ],
      },
      {
        heading: "Outcomes and pipeline",
        items: [
          "Outcome tags: interested, not interested, callback, wrong number and do-not-call",
          "Automatic CRM updates",
          "Pipeline stage movement",
          "Task creation for your team",
          "Activity reports and dashboards",
        ],
      },
    ],
    workflow: [
      "Imports an approved list and checks do-not-call and consent records",
      "Calls inside the permitted window and follows your script",
      "Handles questions and objections with approved responses",
      "Tags the outcome and schedules retries or follow-ups",
      "Updates the CRM and creates tasks for your team",
    ],
    useCases: [
      {
        title: "Enquiry qualification",
        description:
          "Website enquiries are called back, asked a few qualifying questions, and the strongest leads are passed to sales with notes.",
      },
      {
        title: "Renewal reminders",
        description:
          "Customers approaching a policy or subscription renewal are reminded and offered a callback from an advisor.",
      },
      {
        title: "Post-service survey",
        description:
          "After a service visit, customers are asked short feedback questions and their answers are logged against the job.",
      },
    ],
    benefits: [
      "More leads contacted without adding dialling work for your team",
      "Consistent scripts on every call",
      "Faster first contact after an enquiry",
      "Every outcome logged and reportable",
      "Consent and do-not-call rules checked before each call",
    ],
    humanControls: [
      "High-value opportunities are passed to a member of your sales team",
      "Offers, discounts and payment links stay within rules you approve",
      "Contacts can opt out, and opt-outs are respected on every channel",
      "Your team reviews the tasks created from call outcomes",
    ],
    integrations: ["telephony", "crm", "payments", "email"],
    dependencies: "Calling provider, consent store, scheduler, CRM and message delivery services.",
    demonstration: "Lead list → qualification → tagged result → next task.",
    relatedModules: ["follow-ups", "sales-agent", "promotions-campaigns", "call-filtering"],
    faqs: [
      {
        question: "How are do-not-call and consent rules handled?",
        answer:
          "Numbers are checked against your do-not-call list and consent records before each call, and opt-outs are recorded so later campaigns respect them.",
      },
      {
        question: "Can calls be placed outside business hours?",
        answer:
          "Calls are placed only inside the calling windows you configure for each time zone, including weekend and holiday rules.",
      },
    ],
    availability: "needs-assessment",
  },
  {
    slug: "whatsapp-messaging",
    number: 3,
    sourceSection: "7",
    title: "WhatsApp Auto-Reply and Messaging",
    shortTitle: "WhatsApp messaging",
    summary:
      "Reply to WhatsApp messages with context, handle media and routine requests, and hand conversations to your team when needed.",
    introduction:
      "WhatsApp messaging gives customers a timely first response on a channel many of them already use. The AI assistant replies to routine questions using your approved knowledge, remembers earlier messages in the conversation, and understands text, images, documents, voice notes, locations and contact cards. It can take orders, share order status, book appointments, register complaints, send payment links and collect feedback. Broadcasts, and notifications sent outside the customer-service window, use approved message templates and reach only customers who have opted in. When a request needs judgement, the conversation moves to your team with its full history.",
    category: "respond",
    featureGroups: [
      {
        heading: "Auto-reply",
        items: [
          "Prompt replies to inbound messages, including outside office hours",
          "Multi-language support within supported languages",
          "Context-aware responses using conversation memory",
          "Answers to frequent questions from approved knowledge",
          "Fallback to a human agent",
          "Opt-in and opt-out handling",
          "Template message management",
          "Broadcast campaigns",
        ],
      },
      {
        heading: "Message types",
        items: [
          "Text messages",
          "Images",
          "Documents (PDF, Word and Excel)",
          "Voice notes, transcribed and answered",
          "Video",
          "Location sharing",
          "Contact cards",
          "Interactive buttons and lists",
        ],
      },
      {
        heading: "Conversational capabilities",
        items: [
          "Order placement",
          "Order status enquiries",
          "Product information",
          "Price and availability",
          "Appointment booking",
          "Complaint registration",
          "Payment link delivery",
          "Feedback collection",
          "Human handoff",
        ],
      },
      {
        heading: "Broadcast campaigns",
        items: [
          "Segmented customer lists",
          "Personalised offers",
          "Festival and seasonal campaigns",
          "Abandoned cart recovery",
          "Win-back campaigns",
          "New product launches",
          "Loyalty rewards",
          "Referral programmes",
          "Campaign performance analytics",
        ],
      },
      {
        heading: "Quality and compliance",
        items: [
          "Opt-in capture and storage",
          "Opt-out handling",
          "Quality-rating protection",
          "Template approval workflow",
          "Rate-limit management",
          "Spam prevention",
        ],
      },
    ],
    workflow: [
      "Receives a message and loads the conversation history",
      "Understands the text, media or voice note",
      "Answers from approved knowledge or completes the request",
      "Hands the conversation to your team when needed",
      "Records the outcome and any lead details",
    ],
    useCases: [
      {
        title: "Product enquiry with a photo",
        description:
          "A customer sends a photo asking whether an item is in stock. The assistant checks the catalogue and replies with price and availability.",
      },
      {
        title: "Order status",
        description:
          "A customer asks where their order is. The assistant looks up the order and shares the latest delivery status.",
      },
      {
        title: "Complaint handoff",
        description:
          "A customer reports a damaged delivery. A complaint is registered and the chat moves to the support team with the photos and history.",
      },
    ],
    benefits: [
      "Customers get a prompt reply on a channel they already use",
      "Routine orders and questions handled without manual typing",
      "Abandoned carts and dormant customers followed up within messaging rules",
      "Full conversation history available to your team",
      "Many conversations handled in parallel",
    ],
    humanControls: [
      "Customers can ask for a person in the chat",
      "Complaints, refunds and sensitive topics move to your team",
      "Broadcasts use approved templates and reach opted-in customers only",
      "Your team can take over any conversation",
    ],
    integrations: ["whatsapp", "crm", "commerce", "payments"],
    dependencies: "WhatsApp channel integration, approved templates, and commerce or CRM APIs.",
    demonstration: "A fictional product enquiry with media and handoff.",
    relatedModules: ["whatsapp-voice", "follow-ups", "promotions-campaigns", "customer-segmentation"],
    faqs: [
      {
        question: "Can the assistant send marketing messages to anyone?",
        answer:
          "No. Marketing messages, and notifications outside the customer-service window, use approved templates and go only to customers who have opted in. Opt-outs are honoured.",
      },
      {
        question: "Does it understand voice notes?",
        answer:
          "Yes. Voice notes are transcribed and answered like text messages. This is separate from live WhatsApp voice calls.",
      },
    ],
    availability: "needs-assessment",
  },
  {
    slug: "whatsapp-voice",
    number: 4,
    sourceSection: "8",
    title: "WhatsApp Voice Calling",
    shortTitle: "WhatsApp voice",
    summary:
      "Answer and place WhatsApp voice calls where calling is supported, with consent-based recording, transcripts and live transfer.",
    introduction:
      "WhatsApp voice calling extends the assistant to live voice calls on WhatsApp, where the calling feature is supported and your number is eligible. Inbound calls are answered with your greeting, the caller is matched to their history, and the conversation follows the same knowledge and rules as your phone line. Outbound calls follow approved scripts and require clear user consent. When recording is enabled it is announced at the start of the call, and calls can be transcribed and summarised for your team. Spoken orders can be captured as structured data and read back for confirmation. When a caller asks for a person, the call is transferred live or a callback is scheduled.",
    category: "respond",
    featureGroups: [
      {
        heading: "Inbound WhatsApp calls",
        items: [
          "Branded greeting",
          "Caller identification and CRM lookup",
          "Multi-language support within supported languages",
          "Conversational answers from approved knowledge",
          "Escalation to a person when needed",
        ],
      },
      {
        heading: "Outbound WhatsApp calls",
        items: [
          "Outbound calling where eligible and consented",
          "Natural voice conversation that identifies itself as an AI assistant",
          "Script adherence and dynamic branching",
          "Objection handling with approved responses",
          "Call outcome tagging",
        ],
      },
      {
        heading: "Recording and transcription",
        items: [
          "Consent-based recording, announced at call start",
          "Real-time transcription",
          "AI-generated call summary",
          "Sentiment analysis",
          "Keyword tagging",
          "Searchable archive",
          "Retention by policy",
        ],
      },
      {
        heading: "Voice order capture",
        items: [
          "Spoken orders converted to structured data",
          "Confirmation read-back",
          "CRM and order-system updates",
        ],
      },
      {
        heading: "Escalation to a person",
        items: [
          "Live transfer with a context summary",
          "Emergency escalation using your approved procedure",
          "Callback scheduling",
        ],
      },
    ],
    workflow: [
      "Checks calling eligibility and consent",
      "Answers or places the call with your greeting",
      "Announces recording when enabled and transcribes the call",
      "Captures the request and reads back key details",
      "Transfers live or schedules a callback, with a summary",
    ],
    useCases: [
      {
        title: "Ordering by voice",
        description:
          "A restaurant customer calls on WhatsApp to order. The assistant captures the items, reads them back, and sends the order to the kitchen system.",
      },
      {
        title: "Service booking",
        description:
          "A car owner calls to book a service. A slot is offered and confirmed, and a reminder is scheduled.",
      },
      {
        title: "Qualify, then transfer",
        description:
          "A buyer calls about a property listing. After a few questions, the call is transferred live to an agent with a summary.",
      },
    ],
    benefits: [
      "Voice and messaging on the same WhatsApp number",
      "Customers can call without dialling a separate phone number",
      "Calls captured as transcripts and summaries when consented",
      "Recording consent built into the call flow",
    ],
    humanControls: [
      "Recording only with announced consent",
      "Live transfer to your team mid-call",
      "Orders confirmed by read-back before they are submitted",
      "Outbound calls only to users who have given consent",
    ],
    integrations: ["whatsapp", "pbx", "crm", "commerce"],
    dependencies:
      "WhatsApp calling eligibility, user permissions, a real-time voice service and PBX integration.",
    demonstration: "A call preview with transcript and confirmation step.",
    relatedModules: ["whatsapp-messaging", "inbound-calls", "recording-transcription", "call-center"],
    faqs: [
      {
        question: "Is WhatsApp calling available for every number?",
        answer:
          "No. WhatsApp business calling is available only where the platform supports it and for eligible numbers. Eligibility is checked during onboarding.",
      },
      {
        question: "What is the difference between voice notes and voice calls?",
        answer:
          "Voice notes are recorded messages answered in the chat. Voice calls are live conversations that need calling eligibility and a real-time voice service.",
      },
    ],
    availability: "needs-assessment",
  },
  {
    slug: "follow-ups",
    number: 5,
    sourceSection: "9",
    title: "Call and Message Follow-Ups",
    shortTitle: "Follow-ups",
    summary:
      "Schedule follow-up sequences across calls, WhatsApp, SMS and email that stop on reply and escalate when there is no response.",
    introduction:
      "Follow-ups make sure conversations that need a next step get one. After a call or chat, the assistant can schedule a sequence across phone, WhatsApp, SMS and email, for example on day 1, day 3, day 7 and day 14, personalised from what was said before. Sequences stop as soon as the customer replies, and escalate to your team when there is no response. Cadence rules respect time zones, working days, weekends, holidays and frequency limits, so customers are not over-contacted. Every attempt is logged in a single cross-channel history, so whoever picks up the conversation can see what has already happened.",
    category: "follow-through",
    featureGroups: [
      {
        heading: "Call follow-ups",
        items: [
          "Multi-attempt follow-up after an initial call",
          "Personalised follow-up based on the previous conversation",
          "Sample cadence: day 1, day 3, day 7 and day 14",
          "Stop-on-reply logic",
          "Re-engagement sequences for dormant leads",
          "Win-back sequences for lost customers",
          "Every attempt logged",
        ],
      },
      {
        heading: "Message follow-ups",
        items: [
          "Multi-channel follow-up: WhatsApp, SMS, email and call",
          "Personalised messages based on history",
          "Scheduled cadence",
          "Stop-on-reply logic",
          "Escalation when there is no response",
          "Re-engagement sequences",
        ],
      },
      {
        heading: "Cross-channel follow-ups",
        items: [
          "Start on WhatsApp, follow up by call",
          "Start on a call, follow up on WhatsApp",
          "Unified conversation thread across channels",
          "Full history visible to your team",
        ],
      },
      {
        heading: "Cadence rules",
        items: [
          "Configurable by industry, product and deal stage",
          "Time-zone aware",
          "Business-hours aware",
          "Weekend and holiday aware",
          "Frequency caps to avoid over-contacting",
        ],
      },
      {
        heading: "Outcome tracking",
        items: [
          "Every follow-up attempt logged",
          "Response tracking",
          "Conversion tracking",
          "Effectiveness analytics",
        ],
      },
    ],
    workflow: [
      "A conversation ends with a next step",
      "A sequence is scheduled within your cadence rules",
      "Each attempt is personalised from the conversation history",
      "The sequence stops on reply, or escalates when there is no response",
      "Outcomes are logged and reported",
    ],
    useCases: [
      {
        title: "Quote follow-up",
        description:
          "A service company sends a quote. With no reply after two days, a WhatsApp reminder goes out, followed later by a call.",
      },
      {
        title: "Dormant lead re-engagement",
        description:
          "Leads with no activity for several weeks receive a short re-engagement sequence that stops as soon as anyone replies.",
      },
      {
        title: "Dropped-call recovery",
        description:
          "A customer's call drops mid-conversation. A WhatsApp message follows, offering a convenient callback time.",
      },
    ],
    benefits: [
      "Fewer leads lost to silence",
      "A consistent cadence without manual reminder lists",
      "Prompt follow-up after each interaction",
      "Complete follow-up history in one place",
      "More value from the leads you already have",
    ],
    humanControls: [
      "Sequences stop as soon as a customer replies",
      "Non-responses escalate to a named team member",
      "Frequency caps and quiet hours prevent over-contacting",
      "An opt-out stops all follow-ups on every channel",
    ],
    integrations: ["crm", "whatsapp", "email", "telephony"],
    dependencies: "A durable workflow engine, reply events and a suppression list.",
    demonstration: "A timeline with pending, replied and stopped states.",
    relatedModules: ["outbound-calls", "reminders-scheduling", "sales-agent", "promotions-campaigns"],
    faqs: [
      {
        question: "Can we change the follow-up cadence?",
        answer:
          "Yes. Day 1, 3, 7 and 14 is a sample. Cadence can be configured by industry, product and deal stage.",
      },
      {
        question: "What stops a follow-up sequence?",
        answer:
          "A reply on any channel, an opt-out, or a team member closing the conversation stops the remaining steps.",
      },
    ],
    availability: "needs-assessment",
  },
  {
    slug: "reminders-scheduling",
    number: 6,
    sourceSection: "10",
    title: "Reminders and Scheduling",
    shortTitle: "Reminders",
    summary:
      "Send appointment, payment, renewal and service reminders by call or message, and handle confirmations, reschedules and no-shows.",
    introduction:
      "Reminders and scheduling help customers keep the commitments they have made. The assistant can remind people about appointments, payments, renewals, bills, deadlines, meetings, service visits and deliveries by call, WhatsApp, SMS or email, or cascade across channels when the first one gets no answer. Reminders can be one-off or recurring and respect time zones and business hours. Customers can confirm, cancel or ask to reschedule in the same conversation, and no-shows can trigger a follow-up to rebook. Calendar integration keeps bookings in sync, and sensitive reminders, such as those about medication or treatment, use content your team has approved.",
    category: "follow-through",
    featureGroups: [
      {
        heading: "Reminder types",
        items: [
          "Appointments",
          "Payments",
          "Renewals, such as insurance, subscriptions and licences",
          "Bill payments",
          "Follow-ups",
          "Birthdays and anniversaries",
          "Deadlines",
          "Meetings",
          "Medication and treatment, using content your team approves",
          "Service due dates",
          "Deliveries",
        ],
      },
      {
        heading: "Delivery methods",
        items: [
          "Outbound call",
          "WhatsApp message",
          "SMS",
          "Email",
          "Multi-channel cascade",
          "Voice and message combined",
        ],
      },
      {
        heading: "Scheduling",
        items: [
          "Calendar integration (Google, Microsoft or custom)",
          "Recurring reminders",
          "One-time reminders",
          "Time-zone aware",
          "Business-hours aware",
          "Escalation on non-response",
          "Confirmation capture",
        ],
      },
      {
        heading: "Confirmation handling",
        items: [
          "Yes or no response capture",
          "Rescheduling requests",
          "Cancellations",
          "No-show follow-up",
          "Rebooking",
        ],
      },
    ],
    workflow: [
      "A booking or due date is created",
      "Reminders are scheduled by channel and time zone",
      "The customer confirms, cancels or asks to reschedule",
      "The calendar is updated",
      "A no-show triggers a rebooking follow-up",
    ],
    useCases: [
      {
        title: "Appointment reminder",
        description:
          "A patient receives a WhatsApp reminder the day before an appointment and confirms with one tap.",
      },
      {
        title: "Payment due",
        description:
          "A customer is reminded about an upcoming bill with a payment link. If there is no response, the reminder escalates to a call.",
      },
      {
        title: "Vehicle service due",
        description:
          "A car owner is told a service is due and books a slot in the same chat.",
      },
    ],
    benefits: [
      "Fewer missed appointments",
      "More completed bookings",
      "Timely payment reminders",
      "Proactive service customers notice",
      "No manual reminder lists for your team",
    ],
    humanControls: [
      "Medication and treatment reminders use content approved by your team",
      "Customers choose their channel and can opt out",
      "Reschedule requests that need judgement go to your team",
      "Escalation on non-response follows your rules",
    ],
    integrations: ["calendar", "whatsapp", "email", "telephony"],
    dependencies: "Calendar, consent records, a scheduler, and approved content for sensitive reminders.",
    demonstration: "A booking summary and reminder schedule.",
    relatedModules: ["inbound-calls", "follow-ups", "personal-assistant", "whatsapp-messaging"],
    faqs: [
      {
        question: "Can a customer reschedule from the reminder?",
        answer:
          "Yes. Customers can confirm, cancel or ask for another slot in the same call or chat, and the calendar is updated.",
      },
      {
        question: "Can reminders include medical information?",
        answer:
          "Healthcare reminders stay administrative, such as appointment times. Any treatment-related content must be approved by your team.",
      },
    ],
    availability: "needs-assessment",
  },
  {
    slug: "call-filtering",
    number: 7,
    sourceSection: "11",
    title: "Call Filtering and Spam Blocking",
    shortTitle: "Call filtering",
    summary:
      "Prioritise known customers, screen unknown callers and filter spam, with a review queue so genuine callers are not lost.",
    introduction:
      "Call filtering protects your team's time while making sure genuine callers get through. Known customers and VIPs are recognised and prioritised. Unknown callers are asked who they are and what the call is about. Suspected spam, robocalls and telemarketing can be blocked or redirected using block and allow lists, time and location rules, and reputation signals. Because filtering can make mistakes, blocked calls go to a review queue with false-positive handling. For executives, the assistant can screen calls secretary-style while letting emergencies through. For outbound calling, numbers are checked against do-not-call lists, consent records and frequency caps before dialling.",
    category: "understand",
    featureGroups: [
      {
        heading: "Inbound filtering",
        items: [
          "Known customer recognition and priority",
          "Known spam and robocall recognition: block or redirect",
          "Unknown caller screening: capture name and purpose",
          "Do-not-call list checks",
          "Blocklist management",
          "Allowlist management",
          "Time-based rules",
          "Geographic rules",
          "Caller reputation scoring",
        ],
      },
      {
        heading: "Spam blocking",
        items: [
          "Real-time spam call detection",
          "Robocall blocking",
          "Telemarketer identification",
          "Automatic blocklist updates",
          "Reporting and review queue",
          "False-positive handling",
        ],
      },
      {
        heading: "Executive screening",
        items: [
          "VIP caller priority",
          "Secretary-style screening",
          "“Who’s calling, and what is it about?” prompt",
          "Silent call rejection",
          "Emergency escalation bypass",
          "Callback scheduling for non-urgent calls",
        ],
      },
      {
        heading: "Outbound filtering",
        items: [
          "Do-not-call list checks before dialling",
          "Consent verification",
          "Time-zone compliance",
          "Frequency caps",
          "Regulatory compliance checks",
        ],
      },
    ],
    workflow: [
      "Checks caller ID against allow, block and customer lists",
      "Screens unknown callers for name and purpose",
      "Applies time, location and reputation rules",
      "Connects the call, takes a message or blocks it",
      "Sends uncertain decisions to a review queue",
    ],
    useCases: [
      {
        title: "Protecting the front desk",
        description:
          "Repeat telemarketing calls are redirected, while existing customers go straight through to the team.",
      },
      {
        title: "Executive screening",
        description:
          "An unknown caller is asked for their name and purpose, and the executive receives a summary instead of an interruption.",
      },
      {
        title: "Outbound compliance",
        description:
          "A campaign list is checked against do-not-call and consent records, and ineligible numbers are removed before dialling.",
      },
    ],
    benefits: [
      "Fewer unwanted interruptions for staff and executives",
      "Genuine customers prioritised",
      "Do-not-call and consent rules checked consistently",
      "An extra layer of defence against fraud and phishing calls",
      "More focused working hours",
    ],
    humanControls: [
      "A review queue for blocked calls, with false-positive handling",
      "Emergency callers bypass screening",
      "Allow lists for people who must always reach you",
      "Your team can override any filtering decision",
    ],
    integrations: ["telephony", "crm"],
    dependencies: "Reputation signals, block and allow lists, a policy engine and escalation.",
    demonstration: "A caller screening decision with a review override.",
    relatedModules: ["personal-assistant", "inbound-calls", "customer-segmentation", "outbound-calls"],
    faqs: [
      {
        question: "What if a genuine caller is blocked?",
        answer:
          "Blocked calls go to a review queue. Your team can mark a false positive, add the number to the allow list and call back.",
      },
      {
        question: "Can important contacts always get through?",
        answer:
          "Yes. Allow lists and VIP rules let chosen callers bypass screening, and emergency escalation bypasses it too.",
      },
    ],
    availability: "needs-assessment",
  },
  {
    slug: "customer-segmentation",
    number: 8,
    sourceSection: "12",
    title: "Customer Filtering and Segmentation",
    shortTitle: "Segmentation",
    summary:
      "Group customers by value, loyalty, language, interest and engagement, and route or follow up with each segment appropriately.",
    introduction:
      "Customer segmentation helps the assistant treat each customer appropriately. Profiles build up from every interaction, including preferences, notes, purchase and conversation history, and sentiment trend, alongside data from your CRM. Customers can be grouped by value, loyalty tier, location, language, industry, product interest, purchase history, engagement and churn risk. Segments then drive routing and actions: VIP callers get priority, high-value prospects reach senior team members, new customers receive onboarding, and customers at risk of leaving can be offered retention support. Rules are configured by your team and are explainable, so you can see why a customer was placed in a segment.",
    category: "understand",
    featureGroups: [
      {
        heading: "Segmentation",
        items: [
          "By value (high, medium and low)",
          "By loyalty tier",
          "By geography",
          "By language",
          "By industry or vertical",
          "By product interest",
          "By purchase history",
          "By engagement level",
          "By churn risk",
        ],
      },
      {
        heading: "Dynamic rules",
        items: [
          "Filter incoming calls by segment",
          "Filter WhatsApp messages by segment",
          "Filter outbound campaigns by segment",
          "Priority routing by segment",
          "Special handling by segment, such as VIP or standard",
        ],
      },
      {
        heading: "Customer profiles",
        items: [
          "Contact enrichment from each interaction",
          "Preferences and notes",
          "Purchase history",
          "Conversation history",
          "Sentiment trend",
          "Lifetime value estimate",
          "Churn risk score",
        ],
      },
      {
        heading: "Actions by segment",
        items: [
          "VIP handling: priority routing and a special greeting",
          "High-value prospects: warm transfer to senior team members",
          "Low engagement: re-engagement sequences",
          "Churn risk: retention offers",
          "New customers: onboarding sequence",
          "Loyal customers: loyalty rewards and upsell",
        ],
      },
    ],
    workflow: [
      "Profiles update from each interaction and from your CRM",
      "Rules assign customers to segments",
      "Segments shape routing, greetings and offers",
      "Actions are logged with the rule that triggered them",
      "Your team reviews and adjusts the rules",
    ],
    useCases: [
      {
        title: "VIP priority",
        description:
          "A high-value customer calls, is greeted by name and is routed straight to their account manager.",
      },
      {
        title: "Retention check-in",
        description:
          "Customers flagged as at risk of leaving receive a check-in call and a retention offer approved by your team.",
      },
      {
        title: "Language routing",
        description:
          "When a handoff is needed, Tamil-speaking customers are routed to Tamil-speaking staff.",
      },
    ],
    benefits: [
      "Each segment treated appropriately",
      "Focus on high-value opportunities",
      "Earlier signals of customers at risk of leaving",
      "The right customer reaches the right person",
      "A fuller picture of each customer",
    ],
    humanControls: [
      "Segment rules are configured and reviewed by your team",
      "Explainable rules show why a customer is in a segment",
      "Retention offers stay within approved limits",
      "Access to customer data follows role-based permissions",
    ],
    integrations: ["crm", "commerce"],
    dependencies: "CRM data, a scoring model and explainable rule configuration.",
    demonstration: "A segment selector changes a fictional workflow.",
    relatedModules: ["promotions-campaigns", "sales-agent", "inbound-calls", "call-filtering"],
    faqs: [
      {
        question: "Where does segment data come from?",
        answer:
          "From your CRM and other connected systems, plus details captured in conversations. Integration scope is confirmed during onboarding.",
      },
      {
        question: "Can we see why a customer is in a segment?",
        answer:
          "Yes. Segments use rules your team configures, so the reason for each assignment can be reviewed.",
      },
    ],
    availability: "needs-assessment",
  },
  {
    slug: "recording-transcription",
    number: 9,
    sourceSection: "13",
    title: "Call Recording, Transcription and Compliance",
    shortTitle: "Recording and transcripts",
    summary:
      "Record calls with consent, transcribe and summarise them, and search conversations with access controls and retention policies.",
    introduction:
      "Recording and transcription turn calls into a searchable, useful record, with consent. Recording is announced at the start of a call and can be configured by business, department and region. Calls can be transcribed in supported languages with speaker separation, timestamps and confidence scores, then summarised with topics, keywords, intent, sentiment, outcomes and a quality score. Your team can search and filter by date, agent, customer, outcome or sentiment, and export only where their role allows. Retention and deletion follow your policy, and access is recorded in an audit trail. Specific encryption and data-residency controls are confirmed for each deployment.",
    category: "understand",
    featureGroups: [
      {
        heading: "Recording",
        items: [
          "Consent-based recording, announced at call start",
          "Configurable per business, department and region",
          "Encrypted storage and transmission, confirmed per deployment",
          "Retention controls by policy",
          "Automatic deletion by policy",
        ],
      },
      {
        heading: "Transcription",
        items: [
          "Real-time speech-to-text",
          "Transcription in supported languages",
          "Speaker separation",
          "Timestamps",
          "Confidence scoring",
          "Searchable archive",
        ],
      },
      {
        heading: "AI analysis",
        items: [
          "Call summaries",
          "Sentiment: positive, neutral or negative",
          "Keyword tagging",
          "Topic classification",
          "Intent detection",
          "Outcome tagging",
          "Quality scoring for QA",
        ],
      },
      {
        heading: "Search and retrieval",
        items: [
          "Full-text search across calls",
          "Filters by date, agent, customer, outcome and sentiment",
          "Export for QA, training or legal review, by permission",
          "Role-based access controls",
        ],
      },
      {
        heading: "Compliance controls",
        items: [
          "Consent capture and storage",
          "Retention rules by regulation",
          "Audit trail of access",
          "Do-not-call compliance logging",
          "Data-protection controls for access, export and deletion",
          "Region choice for data storage, where supported",
        ],
      },
    ],
    workflow: [
      "Announces recording and captures consent",
      "Transcribes with speakers and timestamps",
      "Summarises and tags the conversation",
      "Stores it under retention and access rules",
      "Makes it searchable for authorised staff",
    ],
    useCases: [
      {
        title: "Quality review",
        description:
          "A supervisor filters last week's calls by negative sentiment and reviews the summaries for coaching.",
      },
      {
        title: "Dispute resolution",
        description:
          "A customer disputes what was agreed. An authorised manager retrieves the transcript and the recording.",
      },
      {
        title: "Training library",
        description:
          "Well-handled calls are exported, with permission, as examples for new team members.",
      },
    ],
    benefits: [
      "Consent and retention handled by policy",
      "Faster quality review with search and summaries",
      "Real examples for team training",
      "A verifiable record for disputes",
      "Regional rules applied through configuration",
    ],
    humanControls: [
      "Recording only after an announced consent step",
      "Export and playback limited by role",
      "Access to recordings is logged",
      "Deletion requests follow your retention policy",
    ],
    integrations: ["telephony", "crm"],
    dependencies: "A recording provider, secure storage, permissions and retention jobs.",
    demonstration: "Consent state, a redacted transcript and search filters.",
    relatedModules: ["call-center", "inbound-calls", "whatsapp-voice", "customer-segmentation"],
    faqs: [
      {
        question: "Are all calls recorded automatically?",
        answer:
          "Only when recording is enabled for that business, department or region, and only after the recording announcement.",
      },
      {
        question: "Who can listen to recordings?",
        answer:
          "Only the roles you authorise. Exports need a permission, and access is recorded in an audit trail.",
      },
    ],
    availability: "needs-assessment",
  },
  {
    slug: "promotions-campaigns",
    number: 10,
    sourceSection: "14",
    title: "Promotions and Campaigns",
    shortTitle: "Campaigns",
    summary:
      "Plan voice, WhatsApp, SMS and email campaigns for opted-in segments, with frequency caps, opt-outs and results tracking.",
    introduction:
      "Promotions and campaigns help you reach existing customers with relevant offers, politely and within the rules. Campaigns can run by voice, WhatsApp, SMS or email for seasons, festivals, events and launches, or be triggered by events such as an abandoned cart. Offers can include discounts within approved limits, promo codes, time-limited deals, loyalty rewards, referrals and upsell suggestions. Targeting uses segments, purchase history, engagement, location, language and behaviour, and A/B tests compare versions. Every campaign checks consent and channel rules, respects opt-outs and frequency caps, and reports delivery, responses and conversions. Revenue attribution uses a model agreed with your team.",
    category: "grow",
    featureGroups: [
      {
        heading: "Campaign channels",
        items: [
          "Outbound promotion calls",
          "WhatsApp broadcasts using approved templates",
          "SMS campaigns",
          "Email campaigns",
          "Coordinated multi-channel campaigns",
          "Festival, seasonal and event campaigns",
        ],
      },
      {
        heading: "Offer management",
        items: [
          "Discount rules and limits",
          "Promo codes",
          "Time-limited offers",
          "Personalised offers by segment",
          "Loyalty rewards",
          "Referral programmes",
          "Upsell and cross-sell offers",
        ],
      },
      {
        heading: "Targeting",
        items: [
          "Segment-based targeting",
          "Purchase-history-based targeting",
          "Engagement-based targeting",
          "Geographic targeting",
          "Language-based targeting",
          "Behaviour-based targeting",
        ],
      },
      {
        heading: "Execution",
        items: [
          "Scheduled campaigns",
          "Trigger-based campaigns, such as abandoned cart",
          "A/B testing",
          "Frequency caps",
          "Opt-out handling",
          "Compliance checks",
        ],
      },
      {
        heading: "Analytics",
        items: [
          "Sent, delivered, read where available, and responded",
          "Conversion by campaign",
          "Revenue attribution using an agreed model",
          "Return-on-investment calculation",
          "Segment-level performance",
          "Best-time and best-channel insights",
        ],
      },
    ],
    workflow: [
      "Choose a segment and an approved offer",
      "Check consent, templates and frequency caps",
      "Schedule or trigger the campaign",
      "Handle replies and opt-outs",
      "Report delivery, responses and conversions",
    ],
    useCases: [
      {
        title: "Festival offer",
        description:
          "A retailer sends an approved WhatsApp template with a festival discount to opted-in loyalty members.",
      },
      {
        title: "Abandoned cart",
        description:
          "A shopper who left items in their cart receives one reminder with a link back to checkout.",
      },
      {
        title: "Referral invitation",
        description:
          "Customers who rated a recent service highly are invited to refer a friend.",
      },
    ],
    benefits: [
      "More sales from existing customers",
      "Re-engagement of dormant customers",
      "Loyalty and referral programmes run consistently",
      "Clear data on what works",
      "Campaigns run without manual sending",
    ],
    humanControls: [
      "Templates and offers are approved before sending",
      "Discounts stay within limits your team sets",
      "Opt-outs are honoured across channels",
      "Frequency caps protect customers and channel quality ratings",
    ],
    integrations: ["whatsapp", "email", "commerce", "crm"],
    dependencies: "Verified templates, channel policies, approvals and a suppression list.",
    demonstration: "An approved template preview and eligibility check.",
    relatedModules: ["customer-segmentation", "whatsapp-messaging", "follow-ups", "outbound-calls"],
    faqs: [
      {
        question: "Who can receive campaign messages?",
        answer:
          "Only contacts who have opted in for that channel. Opt-outs are recorded and respected in later campaigns.",
      },
      {
        question: "How are campaign results measured?",
        answer:
          "Delivery, responses and conversions are reported. Revenue attribution needs an agreed attribution model and baseline, set up with your team.",
      },
    ],
    availability: "needs-assessment",
  },
  {
    slug: "sales-agent",
    number: 11,
    sourceSection: "15",
    title: "Sales Agent",
    shortTitle: "Sales agent",
    summary:
      "Qualify enquiries, present your catalogue, prepare quotes for review, and keep your pipeline and follow-ups up to date.",
    introduction:
      "The sales agent module uses the assistant to support your sales team from first enquiry to closed deal. It qualifies leads with budget, authority, need and timeline questions, scores them hot, warm or cold, and sends a summary to the right salesperson. It can present products from your catalogue, explain how features meet the customer's needs, and respond to common objections using answers you approve. Quotes with discounts and taxes can be prepared for human review, and payment links can be sent once approved. Every call, message and outcome is logged to your pipeline, with tasks created for your team.",
    category: "grow",
    featureGroups: [
      {
        heading: "Lead qualification",
        items: [
          "BANT questions: budget, authority, need and timeline",
          "Lead scoring from responses",
          "Hot, warm and cold tagging",
          "Qualification summary sent to the sales manager",
          "Duplicate detection with merge review",
        ],
      },
      {
        heading: "Pitch delivery",
        items: [
          "Product knowledge from your catalogue",
          "Personalised pitch by segment and industry",
          "Feature, advantage, benefit and value explanation",
          "Objection handling with approved responses",
          "Differentiation using approved messaging",
        ],
      },
      {
        heading: "Quotation and closing",
        items: [
          "Quote preparation for review",
          "Discount and tax calculation within your rules",
          "Payment gateway integration",
          "Payment link delivery by SMS, WhatsApp or email",
          "Receipt confirmation",
          "Outstanding payment follow-up",
          "Follow-up cadence until close",
        ],
      },
      {
        heading: "Pipeline management",
        items: [
          "Logging of every call, message and outcome",
          "Pipeline stage movement",
          "Task creation for your team",
          "Activity reports and dashboards",
          "Forecast support",
        ],
      },
    ],
    workflow: [
      "Captures the enquiry and asks qualifying questions",
      "Scores and summarises the lead",
      "Presents relevant products from your catalogue",
      "Prepares a quote for human review",
      "Updates the pipeline and schedules follow-ups",
    ],
    useCases: [
      {
        title: "Enquiry qualification",
        description:
          "A WhatsApp enquiry is qualified in a few messages, and a hot lead is assigned to a salesperson with a summary.",
      },
      {
        title: "Quote preparation",
        description:
          "A customer asks for pricing on three items. A draft quote with tax is prepared and sent after a manager approves it.",
      },
      {
        title: "Payment follow-up",
        description:
          "An approved invoice is still unpaid after a week, so a polite reminder with the payment link is sent.",
      },
    ],
    benefits: [
      "Your sales team spends more time on qualified leads",
      "Consistent qualification on every enquiry",
      "Faster responses to new enquiries",
      "A complete record of every sales interaction",
    ],
    humanControls: [
      "Quotes, discounts and contracts need human approval",
      "High-value deals escalate to senior staff",
      "Payment links are sent only for approved amounts",
      "Duplicate merges are reviewed before they apply",
    ],
    integrations: ["crm", "payments", "commerce", "email"],
    dependencies: "Product data, CRM, pricing rules, payment integration and an approval workflow.",
    demonstration: "Enquiry → qualification → human-reviewed quote.",
    relatedModules: ["outbound-calls", "follow-ups", "customer-segmentation", "whatsapp-messaging"],
    faqs: [
      {
        question: "Can the assistant agree a price or discount?",
        answer:
          "It can prepare quotes within the rules you set. Discounts beyond those limits, contracts and high-value deals go to your team for approval.",
      },
      {
        question: "Is it meant to take the place of my sales team?",
        answer:
          "No. It handles first responses, qualification and follow-ups so your team can focus on relationships and negotiations.",
      },
    ],
    availability: "needs-assessment",
  },
  {
    slug: "call-center",
    number: 12,
    sourceSection: "16",
    title: "Call Center Operations",
    shortTitle: "Call center",
    summary:
      "Run queues by department, language and skill, combine the assistant with human agents, and monitor service levels and quality.",
    introduction:
      "Call center operations bring queues, routing, reporting and quality assurance together with the assistant. Queues can be set up by department, language and skill, with priority queues for VIP callers and dedicated overflow and after-hours queues. The assistant handles routine calls, can route by spoken request instead of keypad menus, and skips menus for known callers, while human agents take the calls that need them based on skills and availability. Supervisors get live and historical dashboards, volume forecasts, staffing suggestions and SLA monitoring, plus automatic call scoring and a QA review queue for coaching. Multi-site, multi-brand and white-label setups support BPOs and larger organisations.",
    category: "manage",
    featureGroups: [
      {
        heading: "Queue management",
        items: [
          "Queues by department, language and skill",
          "Priority queues for VIP callers",
          "Overflow queues",
          "After-hours queues",
          "Queue status announcements",
        ],
      },
      {
        heading: "Agent management",
        items: [
          "Human agent integration",
          "Skill-based routing to people",
          "Agent availability management",
          "Agent performance dashboards",
          "Coaching and QA tools",
        ],
      },
      {
        heading: "Voice menus (IVR)",
        items: [
          "Optional keypad menus",
          "Natural-language routing without keypad input",
          "Dynamic menus by intent",
          "Menu skipping for known callers",
          "Multi-language menus",
        ],
      },
      {
        heading: "Workforce management",
        items: [
          "Real-time dashboards",
          "Historical reporting",
          "Volume forecasting",
          "Staffing recommendations",
          "SLA monitoring",
        ],
      },
      {
        heading: "Quality assurance",
        items: [
          "Automatic call scoring",
          "Sentiment tracking",
          "Compliance checks",
          "QA review queue",
          "Coaching recommendations",
        ],
      },
      {
        heading: "Multi-site and multi-tenant",
        items: [
          "Multiple locations",
          "Multiple brands",
          "White-label for BPOs",
          "Tenant isolation",
          "Central administration",
        ],
      },
    ],
    workflow: [
      "Identifies intent and routes to the right queue",
      "Handles routine calls and announces queue status",
      "Matches other calls to available, skilled agents",
      "Scores calls for quality review",
      "Reports service levels to supervisors",
    ],
    useCases: [
      {
        title: "After-hours coverage",
        description:
          "Calls after the floor closes are answered, routine questions are resolved, and the rest are queued for the morning shift.",
      },
      {
        title: "Multilingual queues",
        description:
          "Callers are routed to Sinhala, Tamil or English queues based on the language they speak.",
      },
      {
        title: "BPO white-label",
        description:
          "A BPO runs separately branded queues for several clients, with isolated data and central administration.",
      },
    ],
    benefits: [
      "Routine calls handled before they reach your agents",
      "Busy periods managed without emergency staffing",
      "Coverage between shifts",
      "Consistent, compliant interactions",
      "Clear visibility into queue and team performance",
    ],
    humanControls: [
      "Supervisors can monitor and take over calls",
      "Agent availability decides who receives transfers",
      "QA reviews and coaching stay with your team leads",
      "Tenant data stays isolated between clients",
    ],
    integrations: ["telephony", "pbx", "crm"],
    dependencies: "Queue and telephony services, staffing state, tenancy and permissions.",
    demonstration: "A queue list, handoff status and a fictional QA panel.",
    relatedModules: ["inbound-calls", "recording-transcription", "customer-segmentation", "call-filtering"],
    faqs: [
      {
        question: "Do we still need human agents?",
        answer:
          "Yes. The assistant handles routine calls and first responses; your agents handle complex, sensitive and high-value conversations.",
      },
      {
        question: "Can a BPO serve several clients?",
        answer:
          "White-label, multi-brand and tenant-isolation options are discussed as part of an enterprise deployment.",
      },
    ],
    availability: "needs-assessment",
  },
  {
    slug: "personal-assistant",
    number: 13,
    sourceSection: "17",
    title: "Personal Call Assistant",
    shortTitle: "Personal assistant",
    summary:
      "Screen calls, take detailed messages, make calls on your behalf, and manage reminders and calendar suggestions that wait for your approval.",
    introduction:
      "The personal call assistant works like a capable chief of staff for executives, founders and busy professionals. It screens calls secretary-style, lets VIPs and emergencies through, silently rejects spam and takes detailed messages with urgency tags and callback times. It can make booking, reminder, confirmation and follow-up calls on your behalf, track deadlines and recurring tasks, and manage your calendar by suggesting times, avoiding conflicts, handling time zones, adding travel buffers and preparing agendas. Requests can be passed to other modules, such as sales or WhatsApp. Anything sensitive, and any action you have not pre-approved, waits for your approval.",
    category: "manage",
    featureGroups: [
      {
        heading: "Call screening",
        items: [
          "Secretary-style screening: “Who’s calling, and what is it about?”",
          "VIP recognition and priority",
          "Silent rejection of spam",
          "Emergency escalation",
          "Callback scheduling for non-urgent calls",
        ],
      },
      {
        heading: "Message taking",
        items: [
          "Detailed message capture",
          "Urgency tagging",
          "Delivery by your preferred channel",
          "Read confirmation",
          "Callback scheduling",
        ],
      },
      {
        heading: "Calls on your behalf",
        items: [
          "Calls you request",
          "Follow-up calls",
          "Booking calls",
          "Reminder calls",
          "Confirmation calls",
        ],
      },
      {
        heading: "Reminders and tasks",
        items: [
          "Appointment reminders",
          "Follow-up reminders",
          "Deadline tracking",
          "Recurring tasks",
          "Priority management",
          "Completion tracking",
        ],
      },
      {
        heading: "Calendar management",
        items: [
          "Schedule management",
          "Rescheduling",
          "Confirmation",
          "Invite sending",
          "Conflict avoidance",
          "Time-zone handling",
          "Meeting preparation",
          "Agenda creation",
          "Travel time buffers",
        ],
      },
      {
        heading: "Delegation between modules",
        items: [
          "“Call this lead” → Sales Agent",
          "“Answer my calls” → Inbound Call Handling",
          "“Send this customer the catalogue and take the order” → WhatsApp Messaging",
          "“Remind me, email him, call her, book the meeting” → Personal Call Assistant",
        ],
      },
      {
        heading: "Human handoff",
        items: [
          "Sensitive matter escalation",
          "Complex issue transfer",
          "Emergency routing",
          "Supervisor override",
          "Approval-based actions",
        ],
      },
    ],
    workflow: [
      "Screens the call or receives your request",
      "Takes a message or suggests an action",
      "Waits for your approval where required",
      "Completes the call, booking or reminder",
      "Reports back with a summary",
    ],
    useCases: [
      {
        title: "Meeting scheduling",
        description:
          "An executive asks for a meeting next week. The assistant proposes three conflict-free times and sends the invite once approved.",
      },
      {
        title: "Screening during a meeting",
        description:
          "An unknown caller is screened, and a message with urgency and a callback time is delivered after the meeting.",
      },
      {
        title: "Booking on your behalf",
        description:
          "A consultant asks the assistant to confirm a dinner reservation. The call is made and the confirmation is recorded.",
      },
    ],
    benefits: [
      "More focused hours with fewer interruptions",
      "Fewer missed reminders and follow-ups",
      "More time for high-value decisions",
      "Support outside office hours",
      "Calendar and email access limited to the permissions you grant",
    ],
    humanControls: [
      "Calendar and email actions use only the permissions you grant",
      "Sensitive topics are passed to you, not handled automatically",
      "Invites and calls on your behalf can require approval",
      "Emergencies bypass screening",
    ],
    integrations: ["calendar", "email", "productivity", "telephony"],
    dependencies: "Calendar and email permissions, provider actions and scoped authorisation.",
    demonstration: "A schedule suggestion that waits for approval.",
    relatedModules: ["call-filtering", "reminders-scheduling", "inbound-calls", "sales-agent"],
    faqs: [
      {
        question: "What can it do without asking me?",
        answer:
          "Only the actions you pre-approve. Everything else, including sensitive matters, waits for your approval.",
      },
      {
        question: "Is there a plan for individuals?",
        answer:
          "Personal and business assistant packages are still being finalised. Book a demo to discuss your setup.",
      },
    ],
    availability: "needs-assessment",
  },
];

export const moduleCategories: { id: ModuleCategory; label: string; description: string }[] = [
  { id: "respond", label: "Respond", description: "Answer calls and messages as they arrive." },
  { id: "follow-through", label: "Follow through", description: "Make the next call, reminder or follow-up happen." },
  { id: "understand", label: "Understand", description: "Know who is calling and what was said." },
  { id: "grow", label: "Grow", description: "Turn conversations into sales and repeat business." },
  { id: "manage", label: "Manage", description: "Run teams, queues and personal schedules." },
];

export const moduleAvailabilityLabels: Record<ProductModule["availability"], string> = {
  available: "Available",
  custom: "Custom setup",
  planned: "Planned",
  "needs-assessment": "Availability confirmed in your demo",
};

const moduleIndex = new Map(modules.map((entry) => [entry.slug, entry]));

export function getModule(slug: string): ProductModule | undefined {
  return moduleIndex.get(slug as ModuleSlug);
}

export function getModules(slugs: readonly ModuleSlug[]): ProductModule[] {
  return slugs.map((slug) => {
    const entry = moduleIndex.get(slug);
    if (!entry) throw new Error(`Unknown module slug: ${slug}`);
    return entry;
  });
}

export function getModulesByCategory(category: ModuleCategory): ProductModule[] {
  return modules.filter((entry) => entry.category === category);
}
