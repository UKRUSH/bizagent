import type { Industry } from "./types";

/**
 * Industry segments and buyer workflows (spec 9; source sections 18.6, 23 and 25).
 *
 * Scenarios are fictional: initials only, no real numbers, no clinical or financial detail,
 * and the assistant always identifies itself as an AI assistant. No named clients,
 * testimonials, case studies or outcome figures. Healthcare, legal, finance and insurance
 * content stays administrative, with regulated decisions left to qualified staff.
 */
export const industries: Industry[] = [
  {
    slug: "clinics-hospitals",
    name: "Clinics and hospitals",
    homepageTitle: "Healthcare",
    summary: "Appointment booking, patient enquiries and reminders, with clinical matters routed to staff.",
    problem:
      "Reception teams juggle phones, walk-ins and messages, so patients wait on hold or give up before they can book.",
    workflows: [
      "Appointment booking and rescheduling",
      "Patient enquiries about hours, locations and services",
      "Urgent routing using your approved procedure",
      "Prescription refill requests routed to staff for review",
      "Insurance verification requests",
      "Appointment reminders",
      "Treatment follow-up and patient recall",
    ],
    modules: ["inbound-calls", "reminders-scheduling", "whatsapp-messaging"],
    scenario: {
      title: "Booking a follow-up appointment",
      channel: "phone",
      messages: [
        { speaker: "customer", text: "Hello, I need a follow-up appointment with Dr. P. next week." },
        {
          speaker: "assistant",
          text: "I'm the clinic's AI assistant. Dr. P. has Tuesday at 10:30 or Thursday at 4:00. Which suits you?",
        },
        { speaker: "customer", text: "Thursday at 4, please." },
        {
          speaker: "assistant",
          text: "You're booked for Thursday at 4:00. I'll send a reminder the day before.",
        },
      ],
      outcome: "Appointment booked in the calendar and a reminder scheduled. No clinical details were discussed.",
    },
    boundaries: [
      "Administrative support only: no medical advice, diagnosis or treatment decisions",
      "Refill and insurance requests are passed to staff for review",
      "Urgent and emergency calls follow the organisation's approved procedure",
      "Treatment-related reminder content is approved by clinical staff",
    ],
    integrations: ["calendar", "crm", "whatsapp", "telephony"],
  },
  {
    slug: "hotels",
    name: "Hotels",
    homepageTitle: "Hospitality",
    summary: "Reservation enquiries, guest requests and confirmations across calls and WhatsApp.",
    problem:
      "Front desks are busiest exactly when guests call, so booking enquiries and requests wait or go unanswered.",
    workflows: [
      "Reservation enquiries",
      "Room-service requests",
      "Concierge questions",
      "Wake-up calls",
      "Check-in and check-out information",
      "Booking confirmations",
      "Post-stay follow-up",
    ],
    modules: ["inbound-calls", "whatsapp-messaging", "reminders-scheduling"],
    scenario: {
      title: "Holding a room",
      channel: "whatsapp",
      messages: [
        { speaker: "customer", text: "Do you have a sea-view room for two nights from Friday?" },
        {
          speaker: "assistant",
          text: "I'm the hotel's AI assistant. A sea-view double is available Friday to Sunday. Shall I pass a reservation request to our team?",
        },
        { speaker: "customer", text: "Yes, please." },
        {
          speaker: "assistant",
          text: "Done. Our reservations team will confirm the rate and payment details with you by message.",
        },
      ],
      outcome: "Reservation request passed to the reservations team with dates and room type.",
    },
    boundaries: [
      "Rates outside published policy and special requests go to reception",
      "Card details are never collected in chat; payment uses approved secure links only",
      "Guest complaints are passed to the duty manager",
    ],
    integrations: ["crm", "whatsapp", "telephony", "payments"],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    summary: "Table bookings, menu questions and orders, with promotions only for opted-in guests.",
    problem:
      "Phones ring during service, when staff are busiest, so bookings and orders are missed.",
    workflows: [
      "Table reservations",
      "Menu questions",
      "Order taking",
      "Delivery coordination",
      "Feedback collection",
      "Promotion broadcasts to opted-in customers",
      "Loyalty management",
    ],
    modules: ["whatsapp-messaging", "inbound-calls", "promotions-campaigns"],
    scenario: {
      title: "Booking a table",
      channel: "whatsapp",
      messages: [
        { speaker: "customer", text: "Can I book a table for four at 7:30 on Saturday?" },
        {
          speaker: "assistant",
          text: "I'm the restaurant's AI assistant. A table for four is available at 7:30 on Saturday. Any dietary needs we should note?",
        },
        { speaker: "customer", text: "One guest has a nut allergy." },
        {
          speaker: "assistant",
          text: "Your table is booked. I've flagged the nut allergy for our kitchen team, who will confirm the options with you.",
        },
      ],
      outcome: "Table booked; the allergy note is flagged for kitchen staff to confirm.",
    },
    boundaries: [
      "Allergy and dietary questions are confirmed by kitchen staff",
      "Promotions reach opted-in customers only",
      "Changes to orders already in preparation go to staff",
    ],
    integrations: ["whatsapp", "commerce", "payments"],
  },
  {
    slug: "service-companies",
    name: "Service companies",
    summary: "Job booking, quote requests and service reminders, with dispatch confirmed by your team.",
    problem:
      "Technicians are on site and office staff are on other calls, so new jobs and quote requests slip.",
    workflows: [
      "Job booking",
      "Technician visit requests",
      "Quote requests",
      "Service reminders",
      "Complaint handling",
      "Follow-up on estimates",
      "Promotion campaigns",
    ],
    modules: ["inbound-calls", "outbound-calls", "reminders-scheduling", "follow-ups"],
    scenario: {
      title: "Booking a repair visit",
      channel: "phone",
      messages: [
        { speaker: "customer", text: "My air conditioner isn't cooling. Can someone come out?" },
        {
          speaker: "assistant",
          text: "I'm the company's AI assistant. I can arrange a visit. Is it a wall unit or a central system, and which area are you in?",
        },
        { speaker: "customer", text: "A wall unit, in Area B." },
        {
          speaker: "assistant",
          text: "Thanks. I've requested a visit for tomorrow morning. Our dispatcher will confirm the technician and time.",
        },
      ],
      outcome: "Job created with details; the dispatcher assigns a technician and confirms.",
    },
    boundaries: [
      "Final quotes and pricing exceptions are approved by staff",
      "Technician assignment is confirmed by the dispatcher",
      "Complaints are routed to a supervisor",
    ],
    integrations: ["calendar", "crm", "accounting"],
  },
  {
    slug: "support-teams",
    name: "Support teams",
    summary: "Routine answers, ticket creation and Tier 2 escalation with full context.",
    problem:
      "Agents spend much of their day on repeat questions while complex issues wait in the queue.",
    workflows: [
      "Routine answers from your knowledge base",
      "Ticket creation",
      "Knowledge retrieval",
      "Tier 2 escalation",
      "Customer satisfaction surveys",
      "Follow-up on resolved issues",
    ],
    modules: ["inbound-calls", "whatsapp-messaging", "follow-ups"],
    scenario: {
      title: "Answer, then escalate",
      channel: "whatsapp",
      messages: [
        { speaker: "customer", text: "How do I reset my account password? Also, I was charged twice this month." },
        {
          speaker: "assistant",
          text: "I'm the support team's AI assistant. You can reset your password from the login page using 'Forgot password'. For the double charge, I've opened a billing ticket.",
        },
        {
          speaker: "team",
          text: "Hi, this is R. from billing. I can see the ticket and the transaction history and I'm looking into it now.",
        },
      ],
      outcome: "Routine question answered; billing issue escalated to Tier 2 with a ticket and summary.",
    },
    boundaries: [
      "Unresolved issues escalate to Tier 2 with full context",
      "Refunds and account changes need staff approval",
      "Customers can ask for a person at any time",
    ],
    integrations: ["crm", "email", "telephony"],
  },
  {
    slug: "bpos-call-centres",
    name: "BPOs and call centres",
    summary: "White-label service, overflow and after-hours coverage, multilingual queues and QA.",
    problem:
      "Demand peaks and after-hours volume are hard to staff, and quality varies across shifts and clients.",
    workflows: [
      "White-label service for clients",
      "Overflow handling",
      "After-hours coverage",
      "Multilingual coverage",
      "Quality assurance",
      "Cost visibility per call",
    ],
    modules: ["call-center", "recording-transcription", "inbound-calls"],
    scenario: {
      title: "Overflow for a client brand",
      channel: "phone",
      messages: [
        { speaker: "customer", text: "Hi, I'm calling about my delivery." },
        {
          speaker: "assistant",
          text: "Thanks for calling Brand X. I'm an AI assistant. All our agents are busy. I can check your delivery now, or hold your place in the queue.",
        },
        { speaker: "customer", text: "Please check it." },
        {
          speaker: "assistant",
          text: "Your parcel is out for delivery today. Is there anything else you need an agent for?",
        },
      ],
      outcome: "Routine enquiry resolved during peak volume without joining the queue.",
    },
    boundaries: [
      "Client data is isolated per tenant",
      "Client-specific scripts are approved by each client",
      "QA scoring is reviewed by team leads",
    ],
    integrations: ["telephony", "pbx", "crm"],
  },
  {
    slug: "institutions",
    name: "Institutions",
    summary: "Admissions enquiries, fees and deadlines, events and parent communication.",
    problem:
      "Admissions and administration offices face seasonal surges of the same questions.",
    workflows: [
      "Admission enquiries",
      "Fee and deadline information",
      "Event registration",
      "Student support",
      "Parent communication",
      "Reminder campaigns",
    ],
    modules: ["inbound-calls", "whatsapp-messaging", "reminders-scheduling"],
    scenario: {
      title: "Fee deadline question",
      channel: "whatsapp",
      messages: [
        { speaker: "customer", text: "When is the second-term fee due?" },
        {
          speaker: "assistant",
          text: "I'm the institute's AI assistant. Second-term fees are due on the 15th of next month. Would you like a reminder a week before?",
        },
        { speaker: "customer", text: "Yes, please." },
        { speaker: "assistant", text: "Done. You'll get a reminder here a week before the deadline." },
      ],
      outcome: "Published deadline shared and a reminder scheduled.",
    },
    boundaries: [
      "Admission decisions are made by staff",
      "Student records are shared only with authorised contacts",
      "Fee exceptions go to the accounts office",
    ],
    integrations: ["crm", "calendar", "email"],
  },
  {
    slug: "real-estate",
    name: "Real estate",
    homepageTitle: "Real Estate",
    summary: "Property enquiries, viewing bookings and follow-up with warm leads.",
    problem:
      "Buyers enquire in the evenings and at weekends, and slow replies send them to the next listing.",
    workflows: [
      "Property enquiries",
      "Outreach to consented contacts about new projects",
      "Viewing bookings",
      "Conversations in supported languages for local and overseas buyers",
      "Follow-up with warm leads",
    ],
    modules: ["inbound-calls", "outbound-calls", "whatsapp-messaging", "reminders-scheduling"],
    scenario: {
      title: "Booking a viewing",
      channel: "whatsapp",
      messages: [
        { speaker: "customer", text: "Is the two-bedroom apartment on the listing still available?" },
        {
          speaker: "assistant",
          text: "I'm the agency's AI assistant. Yes, it is. Viewings are available on Saturday at 11:00 or 2:00. Would either work?",
        },
        { speaker: "customer", text: "Saturday at 11." },
        {
          speaker: "assistant",
          text: "Booked. Agent K. will meet you there, and I'll send the address and a reminder.",
        },
      ],
      outcome: "Viewing booked with the agent and a reminder scheduled.",
    },
    boundaries: [
      "Price negotiations and offers are handled by agents",
      "Outreach goes only to contacts who have consented",
      "Legal and financing questions are referred to qualified professionals",
    ],
    integrations: ["crm", "calendar", "whatsapp"],
  },
  {
    slug: "education",
    name: "Education",
    homepageTitle: "Education",
    summary: "Student enquiries, counselling requests, admission follow-up and fee reminders.",
    problem:
      "Prospective students enquire across many channels, and follow-ups get lost during busy intakes.",
    workflows: [
      "Student lead qualification",
      "Course counselling requests",
      "Admission follow-up",
      "Fee reminders",
      "Parent communication",
      "Event promotion",
    ],
    modules: ["sales-agent", "outbound-calls", "whatsapp-messaging", "reminders-scheduling"],
    scenario: {
      title: "Course enquiry",
      channel: "whatsapp",
      messages: [
        { speaker: "customer", text: "Do you have an evening course in digital marketing?" },
        {
          speaker: "assistant",
          text: "I'm the college's AI assistant. Yes, there is an evening intake. Are you looking to start this term or next?",
        },
        { speaker: "customer", text: "Next term." },
        {
          speaker: "assistant",
          text: "Thanks. I've requested a call with one of our course advisors, who will contact you to discuss the course.",
        },
      ],
      outcome: "Lead qualified and a counselling call requested with an advisor.",
    },
    boundaries: [
      "Counselling sessions are held by staff advisors",
      "Scholarship and admission decisions are made by staff",
    ],
    integrations: ["crm", "calendar", "whatsapp"],
  },
  {
    slug: "insurance",
    name: "Insurance",
    summary: "Renewal reminders, lead qualification for agents and document reminders.",
    problem:
      "Renewals and document requests depend on repeated follow-up that agents rarely have time for.",
    workflows: [
      "Policy renewal calls",
      "Lead qualification for agents",
      "Claim status requests",
      "Cross-sell and upsell campaigns to opted-in customers",
      "Document collection reminders",
    ],
    modules: ["outbound-calls", "follow-ups", "reminders-scheduling"],
    scenario: {
      title: "Renewal reminder",
      channel: "phone",
      messages: [
        {
          speaker: "assistant",
          text: "Hello, this is an AI assistant calling from the insurer. Your policy is due for renewal next month. Would you like to renew or speak with an agent?",
        },
        { speaker: "customer", text: "I'd like to discuss changing my cover." },
        {
          speaker: "assistant",
          text: "Of course. I've booked a callback from agent S. tomorrow afternoon.",
        },
      ],
      outcome: "Renewal reminder delivered and a callback booked with a licensed agent.",
    },
    boundaries: [
      "No policy advice or cover decisions; these go to licensed agents",
      "Claim decisions are made by the claims team",
      "Campaigns go only to opted-in customers",
    ],
    integrations: ["crm", "email", "telephony"],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail and e-commerce",
    homepageTitle: "Retail and E-commerce",
    summary: "Order status, delivery, returns and cart recovery on WhatsApp.",
    problem:
      "Order-status and delivery questions crowd out sales conversations, and carts are abandoned without follow-up.",
    workflows: [
      "Order status enquiries",
      "Delivery coordination",
      "Return and refund requests",
      "Abandoned cart recovery",
      "Promotion broadcasts",
      "Loyalty programme management",
    ],
    modules: ["whatsapp-messaging", "follow-ups", "promotions-campaigns"],
    scenario: {
      title: "Where is my order?",
      channel: "whatsapp",
      messages: [
        { speaker: "customer", text: "Where is my order? It was placed on Monday." },
        {
          speaker: "assistant",
          text: "I'm the store's AI assistant. Your order has shipped and is due to arrive tomorrow. Would you like the tracking link?",
        },
        { speaker: "customer", text: "Yes, please." },
        { speaker: "assistant", text: "Here it is. I'll message you if the delivery date changes." },
      ],
      outcome: "Order status shared with tracking; no staff time needed.",
    },
    boundaries: [
      "Refunds are approved by staff",
      "Broadcasts go only to opted-in customers",
      "Card details are never collected in chat",
    ],
    integrations: ["commerce", "payments", "logistics", "whatsapp"],
  },
  {
    slug: "d2c-brands",
    name: "D2C brands",
    summary: "Direct conversations, personalised recommendations, launches and referrals.",
    problem:
      "Direct customer conversations are valuable but hard to keep personal as volume grows.",
    workflows: [
      "Direct customer conversations",
      "Personalised recommendations",
      "Cart recovery",
      "Product launch campaigns",
      "Referral programmes",
      "Campaign follow-up",
    ],
    modules: ["whatsapp-messaging", "sales-agent", "promotions-campaigns"],
    scenario: {
      title: "Product recommendation",
      channel: "whatsapp",
      messages: [
        { speaker: "customer", text: "Which moisturiser is best for dry skin?" },
        {
          speaker: "assistant",
          text: "I'm the brand's AI assistant. Customers with dry skin often choose our Hydra cream. Would you like the product page?",
        },
        { speaker: "customer", text: "Yes, and is it in stock?" },
        { speaker: "assistant", text: "It's in stock. Here's the link to order." },
      ],
      outcome: "Product recommendation shared from the catalogue with a link to buy.",
    },
    boundaries: [
      "Offers stay within approved limits",
      "Marketing messages require opt-in",
      "Product claims come only from approved catalogue content",
    ],
    integrations: ["commerce", "payments", "whatsapp", "crm"],
  },
  {
    slug: "executives-professionals",
    name: "Executives and professionals",
    summary: "Call screening, messages, scheduling and reminders, with you in control.",
    problem:
      "Constant calls and scheduling requests interrupt focused work and important meetings.",
    workflows: [
      "Call screening",
      "Message taking",
      "Appointment booking",
      "Reminder calls",
      "Callbacks",
      "Spam filtering",
      "Personal scheduling",
    ],
    modules: ["personal-assistant", "call-filtering", "reminders-scheduling"],
    scenario: {
      title: "Screening a call",
      channel: "phone",
      messages: [
        { speaker: "customer", text: "Hi, I'd like to speak with Ms. D." },
        {
          speaker: "assistant",
          text: "I'm Ms. D.'s AI assistant. She's in a meeting. May I ask who's calling and what it's about?",
        },
        { speaker: "customer", text: "It's T. from the architecture firm, about tomorrow's site visit." },
        {
          speaker: "assistant",
          text: "Thank you. I'll pass that on and ask her to call you back after 3 pm.",
        },
      ],
      outcome: "Message delivered with urgency and a suggested callback time.",
    },
    boundaries: [
      "Actions on your behalf follow your approval settings",
      "Calendar and email access is limited to the permissions you grant",
      "Emergencies bypass screening",
    ],
    integrations: ["calendar", "email", "productivity"],
  },
  {
    slug: "agencies",
    name: "Agencies",
    summary: "Client lead qualification, campaign follow-up and white-label opportunities.",
    problem:
      "Campaigns generate leads faster than client teams can follow them up.",
    workflows: [
      "Lead qualification for clients",
      "Campaign follow-up",
      "White-label opportunities",
    ],
    modules: ["sales-agent", "outbound-calls", "promotions-campaigns"],
    scenario: {
      title: "Campaign lead follow-up",
      channel: "whatsapp",
      messages: [
        {
          speaker: "assistant",
          text: "Hi, I'm an AI assistant following up on your enquiry about home solar panels. Is now a good time for two quick questions?",
        },
        { speaker: "customer", text: "Sure." },
        {
          speaker: "assistant",
          text: "Do you own the property, and roughly when are you hoping to install?",
        },
        { speaker: "customer", text: "Yes, within three months." },
      ],
      outcome: "Lead qualified and passed to the client's sales team with answers attached.",
    },
    boundaries: [
      "Each client's data is kept separate",
      "Scripts and templates are approved by the client",
      "White-label terms are agreed with our sales team",
    ],
    integrations: ["crm", "whatsapp", "email"],
  },
  {
    slug: "sales-teams-smes",
    name: "Sales teams and SMEs",
    summary: "First response, qualification, follow-ups and owner handoff for hot leads.",
    problem:
      "Owners and small teams serve customers all day, so new enquiries wait and follow-ups are forgotten.",
    workflows: [
      "First response to new enquiries",
      "Lead qualification",
      "Pipeline tasks",
      "Follow-ups",
      "Owner handoff for hot leads",
    ],
    modules: ["inbound-calls", "sales-agent", "whatsapp-messaging", "follow-ups"],
    scenario: {
      title: "Hot lead handoff",
      channel: "whatsapp",
      messages: [
        { speaker: "customer", text: "I need 200 printed T-shirts for an event next month. Can you do it?" },
        {
          speaker: "assistant",
          text: "I'm the shop's AI assistant. We can help. Do you have a design ready, and which sizes do you need?",
        },
        { speaker: "customer", text: "Design is ready. Mostly M and L." },
        {
          speaker: "assistant",
          text: "Thanks. I've passed this to the owner, who will send you a quote today.",
        },
      ],
      outcome: "Hot lead summarised and handed to the owner to quote.",
    },
    boundaries: [
      "Owners or salespeople handle negotiation and closing",
      "Quotes and discounts need approval",
    ],
    integrations: ["crm", "whatsapp", "email"],
  },
  {
    slug: "automotive",
    name: "Automotive",
    summary: "Test-drive and service appointment enquiries and reminders.",
    problem:
      "Showroom and service desks miss calls while serving customers in person.",
    workflows: [
      "Test-drive enquiries and bookings",
      "Service appointment bookings",
      "Service reminders",
    ],
    modules: ["inbound-calls", "whatsapp-messaging", "reminders-scheduling"],
    scenario: {
      title: "Booking a test drive",
      channel: "whatsapp",
      messages: [
        { speaker: "customer", text: "Can I test drive the new hatchback this weekend?" },
        {
          speaker: "assistant",
          text: "I'm the showroom's AI assistant. Saturday at 10:00 or Sunday at 3:00 are open. Which would you like?",
        },
        { speaker: "customer", text: "Saturday at 10." },
        { speaker: "assistant", text: "Booked. Please bring your driving licence. See you Saturday." },
      ],
      outcome: "Test drive booked and the sales team notified.",
    },
    boundaries: [
      "Pricing and finance offers are handled by sales staff",
      "Repair diagnosis is done by technicians",
    ],
    integrations: ["calendar", "crm", "whatsapp"],
  },
  {
    slug: "finance-professional-services",
    name: "Finance and professional services",
    homepageTitle: "Professional Services",
    summary: "Prospect qualification and consultation bookings, with advice left to advisors.",
    problem:
      "Advisors spend time on first calls that could be qualified and scheduled in advance.",
    workflows: [
      "Prospect qualification",
      "Advisor and consultation bookings",
      "Appointment reminders",
    ],
    modules: ["sales-agent", "whatsapp-messaging", "reminders-scheduling"],
    scenario: {
      title: "Booking a consultation",
      channel: "whatsapp",
      messages: [
        { speaker: "customer", text: "I'd like advice on registering a new company." },
        {
          speaker: "assistant",
          text: "I'm the firm's AI assistant. I can book a consultation with one of our advisors. Is this for a sole proprietorship or a limited company?",
        },
        { speaker: "customer", text: "A limited company." },
        {
          speaker: "assistant",
          text: "Thanks. Consultations are available on Wednesday at 11:00 or Friday at 2:00. Which suits you?",
        },
      ],
      outcome: "Consultation booked; advice is given by the advisor, not the assistant.",
    },
    boundaries: [
      "No financial, legal or tax advice; advisors provide it",
      "Regulated actions require approved staff",
      "Sensitive details are collected only through approved secure channels",
    ],
    integrations: ["crm", "calendar", "email"],
  },
];

const industryIndex = new Map(industries.map((industry) => [industry.slug, industry]));

export function getIndustry(slug: string): Industry | undefined {
  return industryIndex.get(slug);
}

/** The six homepage launch cards (spec 6.7), in display order. */
export const homepageIndustrySlugs = [
  "clinics-hospitals",
  "hotels",
  "retail-ecommerce",
  "real-estate",
  "education",
  "finance-professional-services",
] as const;

export function getHomepageIndustries(): Industry[] {
  return homepageIndustrySlugs.map((slug) => {
    const industry = industryIndex.get(slug);
    if (!industry) throw new Error(`Unknown industry slug: ${slug}`);
    return industry;
  });
}
