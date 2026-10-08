import type { Availability, IntegrationCategory, IntegrationCategoryId, IntegrationGroup } from "./types";

/**
 * Integration directory (spec 10; source section 20.1).
 *
 * Every named source system starts as "needs-assessment" until a working connector is
 * verified. "Custom" entries are custom integrations by nature. Logos are deliberately not
 * used: a logo is not proof of a working connector.
 */
export const integrationCategories: IntegrationCategory[] = [
  {
    id: "telephony",
    name: "Telephony",
    group: "telephony",
    description: "Phone numbers and call routing for inbound and outbound calls.",
    systems: [
      { name: "SIP trunks", status: "needs-assessment" },
      { name: "DID numbers", status: "needs-assessment" },
      { name: "Local numbers", status: "needs-assessment" },
      { name: "Toll-free numbers", status: "needs-assessment" },
      { name: "Caller ID management", status: "needs-assessment" },
    ],
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    group: "telephony",
    description: "Business messaging, approved templates and calling where eligible.",
    systems: [
      { name: "WhatsApp Business Platform (Cloud API) messaging", status: "needs-assessment" },
      { name: "Approved message templates", status: "needs-assessment" },
      { name: "WhatsApp business calling, where eligible", status: "needs-assessment" },
    ],
    note: "Calling depends on platform support for your region and number eligibility.",
  },
  {
    id: "pbx",
    name: "PBX",
    group: "telephony",
    description: "Connect desk phones and softphones, and transfer live calls to your team.",
    systems: [
      { name: "SIP desk phone registration", status: "needs-assessment" },
      { name: "WebRTC softphones", status: "needs-assessment" },
      { name: "Live transfer to PBX extensions", status: "needs-assessment" },
    ],
    note: "Transfer behaviour is confirmed for each deployment.",
  },
  {
    id: "crm",
    name: "CRM",
    group: "crm",
    description: "Look up callers, log conversations and update your pipeline.",
    systems: [
      { name: "Salesforce", status: "needs-assessment" },
      { name: "HubSpot", status: "needs-assessment" },
      { name: "Zoho CRM", status: "needs-assessment" },
      { name: "Custom CRM", status: "custom" },
    ],
  },
  {
    id: "erp",
    name: "ERP",
    group: "back-office",
    description: "Orders, stock and customer records from your business systems.",
    systems: [
      { name: "SAP", status: "needs-assessment" },
      { name: "Oracle", status: "needs-assessment" },
      { name: "Microsoft Dynamics", status: "needs-assessment" },
      { name: "Odoo", status: "needs-assessment" },
      { name: "Custom ERP", status: "custom" },
    ],
  },
  {
    id: "calendar",
    name: "Calendars",
    group: "calendar",
    description: "Offer available slots, book appointments and send invites.",
    systems: [
      { name: "Google Calendar", status: "needs-assessment" },
      { name: "Microsoft 365 Calendar", status: "needs-assessment" },
      { name: "Custom calendar", status: "custom" },
    ],
  },
  {
    id: "email",
    name: "Email",
    group: "calendar",
    description: "Confirmations, summaries, follow-ups and message delivery.",
    systems: [
      { name: "Gmail", status: "needs-assessment" },
      { name: "Outlook", status: "needs-assessment" },
      { name: "SMTP", status: "needs-assessment" },
      { name: "IMAP", status: "needs-assessment" },
    ],
  },
  {
    id: "accounting",
    name: "Accounting",
    group: "back-office",
    description: "Invoices, payment status and receipts.",
    systems: [
      { name: "QuickBooks", status: "needs-assessment" },
      { name: "Xero", status: "needs-assessment" },
      { name: "Tally", status: "needs-assessment" },
      { name: "Zoho Books", status: "needs-assessment" },
    ],
  },
  {
    id: "payments",
    name: "Payments and banking",
    group: "commerce",
    description: "Payment links, receipt confirmation and payment status.",
    systems: [
      { name: "Stripe", status: "needs-assessment" },
      { name: "PayPal", status: "needs-assessment" },
      { name: "Local payment providers", status: "needs-assessment" },
      { name: "Banking APIs", status: "needs-assessment" },
    ],
    note: "Subject to merchant eligibility with each provider.",
  },
  {
    id: "hr",
    name: "HR",
    group: "back-office",
    description: "Staff directories and availability for routing.",
    systems: [
      { name: "BambooHR", status: "needs-assessment" },
      { name: "Workday", status: "needs-assessment" },
      { name: "Custom HR tools", status: "custom" },
    ],
  },
  {
    id: "commerce",
    name: "Commerce",
    group: "commerce",
    description: "Product catalogues, orders, carts and order status.",
    systems: [
      { name: "Shopify", status: "needs-assessment" },
      { name: "WooCommerce", status: "needs-assessment" },
      { name: "Magento", status: "needs-assessment" },
    ],
  },
  {
    id: "logistics",
    name: "Logistics",
    group: "back-office",
    description: "Delivery status and coordination.",
    systems: [
      { name: "Courier services", status: "needs-assessment" },
      { name: "Third-party logistics providers", status: "needs-assessment" },
    ],
  },
  {
    id: "government",
    name: "Government",
    group: "back-office",
    description: "Tax and regulatory portals.",
    systems: [
      { name: "Tax portals", status: "needs-assessment" },
      { name: "Regulatory portals", status: "needs-assessment" },
    ],
    note: "Only where a permitted integration exists.",
  },
  {
    id: "productivity",
    name: "Productivity",
    group: "calendar",
    description: "Documents, calendars and mail in your workspace.",
    systems: [
      { name: "Google Workspace", status: "needs-assessment" },
      { name: "Microsoft 365", status: "needs-assessment" },
    ],
  },
];

/** Homepage groups (spec 6.9). */
export const integrationGroups: { id: IntegrationGroup; label: string }[] = [
  { id: "crm", label: "CRM" },
  { id: "calendar", label: "Calendar" },
  { id: "commerce", label: "Commerce" },
  { id: "telephony", label: "Telephony" },
  { id: "back-office", label: "Back office" },
];

export const connectionApproaches = [
  {
    title: "Connectors",
    description: "Ready-made connections for common systems, used where a connector is available and verified for your setup.",
  },
  {
    title: "APIs and webhooks",
    description: "Custom integrations with your CRM, ERP or internal tools, scoped with your team.",
  },
  {
    title: "Telephony and PBX",
    description: "SIP trunks, numbers, desk phones and softphones connected to the same assistant.",
  },
];

/** Plain-language meaning of each directory status (spec 10). */
export const statusMeanings: { status: Availability; meaning: string }[] = [
  { status: "available", meaning: "A working connection, verified and ready to configure." },
  { status: "custom", meaning: "Connected through APIs built and scoped for your setup." },
  { status: "planned", meaning: "On the roadmap but not available yet." },
  { status: "needs-assessment", meaning: "Compatibility is checked for your setup before anything is promised." },
];

/** Directory status labels (spec 10). Status is never conveyed by colour alone. */
export const integrationStatusLabels: Record<Availability, string> = {
  available: "Available",
  custom: "Custom integration",
  planned: "Planned",
  "needs-assessment": "Needs assessment",
};

const categoryIndex = new Map(integrationCategories.map((category) => [category.id, category]));

export function getIntegrationCategory(id: IntegrationCategoryId): IntegrationCategory {
  const category = categoryIndex.get(id);
  if (!category) throw new Error(`Unknown integration category: ${id}`);
  return category;
}

export function getIntegrationsByGroup(group: IntegrationGroup): IntegrationCategory[] {
  return integrationCategories.filter((category) => category.group === group);
}
