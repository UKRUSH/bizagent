import type { Question } from "./types";

/**
 * Copy for /agentic-solutions: AI agents that plan and carry out approved business work.
 * Publication rules (spec 1.2) apply: no "first", percentage-saving, ROI or staffing claims.
 * Agents act only within the permissions and approvals the business sets, every connection
 * is assessed per setup, and the previews are fictional and labelled as such.
 */

export type AgentIcon =
  | "manager"
  | "sales"
  | "marketing"
  | "support"
  | "hr"
  | "finance"
  | "operations"
  | "it"
  | "executive";

export const agenticHero = {
  eyebrow: "Agentic Solutions",
  title: "Your Business. Powered by AI Agents.",
  text: "Transform your business operations with intelligent AI agents that understand your goals, automate workflows, manage tasks, and help your team work smarter.",
  points: ["Plans and carries out approved work", "Connects to the systems you already use", "Your team approves what matters"],
};

/** Hero visual: the AI Manager in the centre, specialised agents around it. Fictional. */
export const networkAgents: { id: AgentIcon; label: string; status: string }[] = [
  { id: "sales", label: "Sales", status: "Following up 4 leads" },
  { id: "marketing", label: "Marketing", status: "Campaign draft ready" },
  { id: "support", label: "Support", status: "Answering enquiries" },
  { id: "finance", label: "Finance", status: "Waiting for approval" },
  { id: "operations", label: "Operations", status: "Tracking deliveries" },
  { id: "executive", label: "Executive", status: "Preparing summary" },
];

export const networkFeed = [
  { agent: "AI Manager", text: "Split the launch request into 6 tasks" },
  { agent: "Marketing Agent", text: "Campaign plan sent for your approval" },
  { agent: "Support Agent", text: "Product questions answered on WhatsApp" },
];

export const whatIsAgentic = {
  title: "Not a chatbot. An AI system that does the work.",
  text: [
    "Agentic Solutions is an intelligent, AI-powered operating layer for your business. Instead of only replying with text, AI agents understand what you need, discuss the details with you, plan the work and carry out approved actions in the systems your team already uses.",
    "Every agent works inside the permissions you give it. Actions that need judgement, money or a customer commitment wait for a person to approve them.",
  ],
  abilities: [
    { title: "Understand requirements", description: "Turns a request in plain language into a clear goal." },
    { title: "Discuss tasks with you", description: "Asks the questions a good colleague would before starting." },
    { title: "Analyse information", description: "Reads your documents, records and reports for context." },
    { title: "Plan workflows", description: "Breaks the goal into steps and assigns each one." },
    { title: "Execute approved actions", description: "Updates records, sends messages and creates tasks." },
    { title: "Connect your systems", description: "Works with your CRM, ERP, WhatsApp, email and APIs." },
    { title: "Automate repetitive work", description: "Takes over routine operations your team repeats daily." },
    { title: "Monitor progress", description: "Tracks every task until it is done or needs help." },
    { title: "Generate reports", description: "Summarises what was done, what changed and what's next." },
    { title: "Escalate to people", description: "Hands complex or sensitive work to the right person." },
  ],
  comparison: {
    chatbot: {
      title: "A typical chatbot",
      items: [
        "Answers questions with text",
        "Forgets the conversation afterwards",
        "Works in one channel",
        "Leaves the actual work to your team",
      ],
    },
    agent: {
      title: "BIZny AI agents",
      items: [
        "Plan the work and carry out approved actions",
        "Share one business context across agents",
        "Work across WhatsApp, calls, email and your systems",
        "Report results and escalate to people when needed",
      ],
    },
  },
};

export interface AgentDepartment {
  id: AgentIcon;
  title: string;
  summary: string;
  tasks: string[];
  /** What always waits for a person. */
  approval: string;
  connects: string[];
  /** An existing page for the closest ready-made agent, when there is one. */
  related?: { href: string; label: string };
}

export const agentDepartments: AgentDepartment[] = [
  {
    id: "sales",
    title: "AI Sales Agent",
    summary: "Replies to every enquiry, qualifies interest and keeps your pipeline moving.",
    tasks: [
      "Respond to customer inquiries",
      "Generate leads",
      "Follow up with potential customers",
      "Manage sales pipelines",
      "Support order processing",
    ],
    approval: "Discounts, custom quotes and contract terms go to your sales team.",
    connects: ["CRM", "WhatsApp", "Email", "Calendar"],
    related: { href: "/solutions/sales-agent/whatsapp", label: "See the Sales Agent" },
  },
  {
    id: "marketing",
    title: "AI Marketing Agent",
    summary: "Drafts content, plans campaigns and reports on what's working.",
    tasks: [
      "Generate marketing content",
      "Plan campaigns",
      "Analyse marketing performance",
      "Manage social media workflows",
      "Suggest marketing strategies",
    ],
    approval: "Every post, campaign and broadcast is approved before it is published or sent.",
    connects: ["Social scheduling", "Email marketing", "Analytics", "CRM segments"],
  },
  {
    id: "support",
    title: "AI Customer Support Agent",
    summary: "Answers customers on every channel and routes the hard cases to people.",
    tasks: [
      "Answer customer questions",
      "Handle support requests",
      "Track complaints",
      "Escalate difficult cases",
      "Provide multilingual support",
    ],
    approval: "Refunds, compensation and sensitive complaints go to a person.",
    connects: ["Helpdesk", "WhatsApp", "Phone", "Knowledge base"],
    related: { href: "/solutions/call-center/whatsapp", label: "See the Call Center Agent" },
  },
  {
    id: "hr",
    title: "AI HR Agent",
    summary: "Keeps recruitment, onboarding and HR paperwork organised.",
    tasks: [
      "Assist with recruitment",
      "Organise employee information",
      "Manage onboarding workflows",
      "Support HR documentation",
    ],
    approval: "Hiring decisions, offers, pay and performance always stay with your HR team.",
    connects: ["HR system", "Email", "Calendar", "Document storage"],
  },
  {
    id: "finance",
    title: "AI Finance Agent",
    summary: "Prepares financial information and reports, and flags what needs a look.",
    tasks: [
      "Process financial information",
      "Generate reports",
      "Track invoices",
      "Assist with expense management",
      "Flag unusual transactions",
    ],
    approval: "No payment, refund or ledger entry is made without a person's approval.",
    connects: ["Accounting software", "ERP", "Spreadsheets", "Bank exports"],
  },
  {
    id: "operations",
    title: "AI Operations Agent",
    summary: "Coordinates daily work across teams and spots problems early.",
    tasks: [
      "Manage daily business tasks",
      "Coordinate workflows",
      "Track task completion",
      "Identify operational issues",
      "Connect departments",
    ],
    approval: "Changes to schedules, suppliers or stock orders above your limits need sign-off.",
    connects: ["ERP", "Inventory", "Project tools", "Team chat"],
  },
  {
    id: "it",
    title: "AI IT Agent",
    summary: "Handles first-line technical support and keeps an eye on system issues.",
    tasks: [
      "Assist with technical support",
      "Monitor system issues",
      "Analyse errors",
      "Help manage IT workflows",
    ],
    approval: "Access requests, system changes and deployments need IT sign-off.",
    connects: ["Ticketing", "Monitoring alerts", "Logs", "IT documentation"],
  },
  {
    id: "executive",
    title: "AI Executive Assistant",
    summary: "Keeps leaders briefed, organised and ready for the next decision.",
    tasks: [
      "Manage schedules",
      "Prepare summaries",
      "Organise tasks",
      "Coordinate meetings",
      "Assist management decisions",
    ],
    approval: "Decisions stay with you. Messages sent on your behalf follow your rules.",
    connects: ["Calendar", "Email", "Documents", "Dashboards"],
    related: { href: "/solutions/personal-assistant/voice", label: "See the Personal Call Agent" },
  },
];

/** The connected system, left to right. */
export const systemFlow = [
  { title: "User request", description: "You ask in plain language, by chat, voice or dashboard." },
  { title: "AI Manager Agent", description: "Understands the goal and asks what it needs to know." },
  { title: "Task planning", description: "Breaks the goal into tasks, owners and approvals." },
  { title: "Specialised AI agents", description: "Sales, marketing, support and others take their tasks." },
  { title: "Connected systems", description: "Agents work in your CRM, ERP, WhatsApp and email." },
  { title: "Task execution", description: "Approved actions are carried out and logged." },
  { title: "Results & reports", description: "You get a summary of what was done and what's next." },
];

export const systemPrinciples = [
  { title: "One central AI manager", description: "A single agent owns the request, the plan and the result." },
  { title: "Specialised AI agents", description: "Each department agent is configured for its own work." },
  { title: "Shared business context", description: "Agents work from the same customers, products and history." },
  { title: "Task delegation", description: "Work is assigned to the agent, or the person, best placed to do it." },
  { title: "Progress tracking", description: "Every task has an owner, a status and a log." },
  { title: "Human approval when required", description: "You decide which actions wait for a person." },
];

/** Illustrative walk-through of one request through the system. Fictional. */
export const orchestrationExample = {
  request: "Create a marketing campaign for our new product and manage the customer inquiries.",
  steps: [
    {
      agent: "AI Manager",
      title: "Understand the request",
      detail: "Confirms the product, launch date, channels and budget with you before starting.",
      output: "Goal: launch campaign + handle enquiries",
    },
    {
      agent: "AI Manager",
      title: "Create a task plan",
      detail: "Splits the goal into six tasks, assigns an owner to each and marks two for your approval.",
      output: "6 tasks · 2 need approval",
    },
    {
      agent: "Marketing Agent",
      title: "Assign marketing tasks",
      detail: "Drafts the campaign plan, social posts and launch email from your product details.",
      output: "Campaign draft sent for approval",
    },
    {
      agent: "Support Agent",
      title: "Assign customer inquiries",
      detail: "Prepares answers from your product sheet and replies to enquiries on WhatsApp and email.",
      output: "Product FAQ ready · enquiries answered",
    },
    {
      agent: "Sales Agent",
      title: "Coordinate sales",
      detail: "Picks up customers ready to buy, adds them to the CRM and schedules follow-ups.",
      output: "Qualified leads passed to sales",
    },
    {
      agent: "AI Manager",
      title: "Track progress",
      detail: "Watches every task, chases what's waiting and tells you when something needs you.",
      output: "5 of 6 tasks complete · 1 waiting for you",
    },
    {
      agent: "AI Manager",
      title: "Present the results",
      detail: "Sends a summary of what was launched, what customers asked and what happens next.",
      output: "Launch report delivered",
    },
  ],
};

export const automationCapabilities: { title: string; description: string; href?: string }[] = [
  { title: "Business Process Automation", description: "Routine, rule-based processes run end to end without manual steps." },
  { title: "AI Workflow Management", description: "Design, run and monitor workflows that span teams and systems." },
  { title: "Intelligent Task Execution", description: "Agents carry out approved actions, not just suggestions." },
  { title: "Multi-Agent Collaboration", description: "Specialised agents share context and hand work to each other." },
  { title: "Customer Communication Automation", description: "Consistent replies and follow-ups on every channel." },
  { title: "AI Document Processing", description: "Read, sort and extract details from invoices, forms and files." },
  { title: "Business Data Analysis", description: "Ask questions of your business data and get clear answers." },
  { title: "Automated Reporting", description: "Daily, weekly or on-demand reports delivered where you work." },
  { title: "CRM / ERP Integration", description: "Agents read and update the systems your business runs on.", href: "/integrations" },
  { title: "WhatsApp AI Automation", description: "Chats, voice notes, templates and team handoff on WhatsApp.", href: "/whatsapp-ai" },
  { title: "AI Voice Agent Integration", description: "Add AI call agents for inbound and outbound phone calls.", href: "/solutions/call-center/voice" },
  { title: "Custom AI Agent Development", description: "Agents built around your exact processes and rules.", href: "#custom-agents" },
];

export type DashboardStatus = "Active" | "Working" | "Waiting for approval";

/** Interactive dashboard preview. Every name and figure is fictional. */
export const dashboardPreview = {
  agents: [
    { name: "AI Manager", status: "Active", task: "Coordinating 3 workflows" },
    { name: "Sales Agent", status: "Working", task: "Following up new leads" },
    { name: "Marketing Agent", status: "Working", task: "Scheduling launch posts" },
    { name: "Support Agent", status: "Active", task: "Answering WhatsApp enquiries" },
    { name: "Finance Agent", status: "Waiting for approval", task: "Payment reminders prepared" },
  ] satisfies { name: string; status: DashboardStatus; task: string }[],
  stats: { active: 12, completed: 38 },
  approval: {
    agent: "Finance Agent",
    title: "Send payment reminders for 4 overdue invoices",
    detail: "Reminders drafted from your template. Nothing is sent until you approve.",
    approvedStatus: "Working" as DashboardStatus,
    approvedTask: "Sending payment reminders",
  },
  workflows: [
    { name: "New product launch", progress: 83, steps: "5 of 6 tasks done" },
    { name: "Lead follow-up", progress: 60, steps: "Daily · runs at 9:00" },
    { name: "Month-end invoice check", progress: 40, steps: "2 of 5 tasks done" },
  ],
  activity: [
    { time: "09:42", agent: "Support Agent", text: "Answered a delivery question on WhatsApp" },
    { time: "09:38", agent: "Sales Agent", text: "Added a qualified lead to the CRM" },
    { time: "09:31", agent: "Marketing Agent", text: "Campaign draft approved by you" },
    { time: "09:20", agent: "AI Manager", text: "Created the launch task plan" },
  ],
  reports: [
    { title: "Daily operations summary", meta: "Today · 08:00" },
    { title: "Weekly sales pipeline", meta: "Monday · 07:30" },
    { title: "Support topics this week", meta: "Friday · 17:00" },
  ],
};

export const agenticSteps = [
  {
    title: "Understand Your Business",
    description: "We analyse your company workflows, business goals and existing systems.",
  },
  {
    title: "Design AI Agents",
    description: "We create specialised AI agents based on your company's requirements.",
  },
  {
    title: "Connect Business Systems",
    description: "We integrate the agents with your CRM, ERP, databases, website, WhatsApp, email and APIs.",
  },
  {
    title: "Automate Operations",
    description: "AI agents execute approved workflows, monitor progress and generate results.",
  },
];

export const customAgents = {
  title: "Custom AI agents, built for how you work.",
  text: "Every business runs differently. We design custom AI agents around your processes, your data, your rules and the approvals your team needs, then connect them to the systems you already use.",
  examples: [
    { title: "AI Sales Agent", href: "/solutions/sales-agent/whatsapp" },
    { title: "AI Call Agent", href: "/solutions/call-center/voice" },
    { title: "AI WhatsApp Agent", href: "/whatsapp-ai" },
    { title: "AI ERP Assistant" },
    { title: "AI Business Manager" },
    { title: "AI Customer Service Agent", href: "/solutions/call-center/whatsapp" },
    { title: "AI Workflow Automation Agent" },
  ],
  cta: "Build Your Custom AI Agent",
};

export const agenticFaqs: Question[] = [
  {
    question: "How is this different from a chatbot?",
    answer:
      "A chatbot answers questions. Agentic AI also plans and carries out the work: it can update your CRM, create tasks, send approved messages and report back, inside the permissions you set.",
  },
  {
    question: "Can AI agents act without my approval?",
    answer:
      "Only where you allow it. You choose which actions an agent can take on its own and which wait for a person, such as payments, discounts, public posts or anything sent on your behalf.",
  },
  {
    question: "Which systems can the agents connect to?",
    answer:
      "Common options include CRMs, ERPs, spreadsheets, databases, websites, WhatsApp, email, calendars and REST APIs. Each connection is assessed for your setup during planning.",
  },
  {
    question: "Do we need all eight department agents?",
    answer:
      "No. Most businesses start with one or two agents for the work that takes the most time, then add more once those are running well.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a demo and tell us about your workflows. We'll map where AI agents fit, which systems they need and where your team should stay involved.",
  },
];
