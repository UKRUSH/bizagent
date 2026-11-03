import { siteConfig } from "@/config/site";
import { legalLabels, publishedLegalSlugs } from "./legal";
import { products } from "./products";

/** Global navigation (specification section 5.2). */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  /** Opens the corporate website or another external destination. */
  external?: boolean;
  /** Rendered as a highlighted card inside its menu. */
  featured?: boolean;
}

/** A column of links inside a menu, with an optional sub-heading. */
export interface NavLinkGroup {
  id: string;
  heading?: string;
  links: NavLink[];
}

export type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "menu"; id: string; label: string; groups: NavLinkGroup[] };

export const primaryNavigation: NavItem[] = [
  { kind: "link", label: "Agentic Solutions", href: "/agentic-solutions" },
  {
    kind: "menu",
    id: "voice-agent",
    label: "Voice Agent",
    groups: [
      {
        id: "whatsapp",
        heading: "WhatsApp Call & Message",
        links: [
          {
            label: "Call Center Agent",
            href: "/solutions/call-center/whatsapp",
            description: "WhatsApp chats, voice notes and calls for your support desk.",
          },
          {
            label: "Sales Agent",
            href: "/solutions/sales-agent/whatsapp",
            description: "Instant replies, catalogues and qualified leads on WhatsApp.",
          },
          {
            label: "Personal Call Agent",
            href: "/solutions/personal-assistant/whatsapp",
            description: "Message screening, bookings and reminders on WhatsApp.",
          },
        ],
      },
      {
        id: "voice",
        heading: "Voice Call",
        links: [
          {
            label: "Call Center Agent",
            href: "/solutions/call-center/voice",
            description: "Answers routine calls, routes queues and transfers to agents.",
          },
          {
            label: "Sales Agent",
            href: "/solutions/sales-agent/voice",
            description: "Lead call-backs, qualification and follow-up calls.",
          },
          {
            label: "Personal Call Agent",
            href: "/solutions/personal-assistant/voice",
            description: "Call screening, messages, calendar and reminders.",
          },
        ],
      },
    ],
  },
  ...products.map((product): NavItem => ({ kind: "link", label: product.navLabel, href: product.href })),
  {
    kind: "menu",
    id: "features",
    label: "Features",
    groups: [
      {
        id: "main",
        links: [
          {
            label: "Agent BIZ MASTER — WhatsApp AI",
            href: "/whatsapp-ai",
            description: "Chat, voice notes, templates and team handoff on WhatsApp.",
            featured: true,
          },
          {
            label: "Platform",
            href: "/platform",
            description: "One shared brain, CRM and admin console.",
          },
          {
            label: "All features",
            href: "/features",
            description: "Explore all 13 call and messaging modules.",
          },
        ],
      },
    ],
  },
  { kind: "link", label: "Industries", href: "/industries" },
  {
    kind: "menu",
    id: "company",
    label: "Company",
    groups: [
      {
        id: "main",
        links: [
          { label: "About", href: "/about" },
          { label: "Enterprise", href: "/enterprise" },
          { label: "Security", href: "/security" },
          { label: "Integrations", href: "/integrations" },
          { label: "Contact", href: "/contact" },
          { label: "Company website", href: siteConfig.corporateWebsiteUrl, external: true },
        ],
      },
    ],
  },
];

export const demoLink = { label: "Book a Demo", href: "/book-demo" } as const;

export interface FooterGroup {
  heading: string;
  links: NavLink[];
}

export const footerNavigation: FooterGroup[] = [
  {
    heading: "Product",
    links: [
      { label: "Agentic Solutions", href: "/agentic-solutions" },
      { label: "Platform", href: "/platform" },
      { label: "Features", href: "/features" },
      { label: "WhatsApp AI", href: "/whatsapp-ai" },
      ...products.map((product) => ({ label: product.navLabel, href: product.href })),
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    heading: "Call Agent",
    links: [
      { label: "Call Center Agent", href: "/solutions/call-center/whatsapp" },
      { label: "Sales Agent", href: "/solutions/sales-agent/whatsapp" },
      { label: "Personal Call Agent", href: "/solutions/personal-assistant/whatsapp" },
      { label: "Industries", href: "/industries" },
      { label: "Enterprise", href: "/enterprise" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Security", href: "/security" },
      { label: "Contact", href: "/contact" },
      { label: "Book a Demo", href: "/book-demo" },
      { label: "Company website", href: siteConfig.corporateWebsiteUrl, external: true },
    ],
  },
];

/** Legal links appear only for documents with approved text (spec 5, 16). */
export const legalNavigation: NavLink[] = publishedLegalSlugs().map((slug) => ({
  label: legalLabels[slug],
  href: `/${slug}`,
}));

/** True when `pathname` is `href` or a child route of it. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
