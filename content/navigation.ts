import { siteConfig } from "@/config/site";
import { legalLabels, publishedLegalSlugs } from "./legal";

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

export type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "menu"; id: string; label: string; links: NavLink[] };

export const primaryNavigation: NavItem[] = [
  { kind: "link", label: "Platform", href: "/platform" },
  {
    kind: "menu",
    id: "features",
    label: "Features",
    links: [
      {
        label: "Agent BIZ MASTER — WhatsApp AI",
        href: "/whatsapp-ai",
        description: "Chat, voice notes, templates and team handoff on WhatsApp.",
        featured: true,
      },
      {
        label: "All features",
        href: "/features",
        description: "Explore all 13 call and messaging modules.",
      },
    ],
  },
  {
    kind: "menu",
    id: "solutions",
    label: "Solutions",
    links: [
      {
        label: "Call Center Agent",
        href: "/solutions/call-center",
        description: "Routine enquiries, routing and handoff.",
      },
      {
        label: "Sales Agent",
        href: "/solutions/sales-agent",
        description: "Qualification, follow-ups and pipeline updates.",
      },
      {
        label: "Personal Call Assistant",
        href: "/solutions/personal-assistant",
        description: "Screening, messages, calendar and reminders.",
      },
      {
        label: "Enterprise",
        href: "/enterprise",
        description: "Custom deployments and white-label options.",
      },
    ],
  },
  { kind: "link", label: "Industries", href: "/industries" },
  { kind: "link", label: "Pricing", href: "/pricing" },
  {
    kind: "menu",
    id: "company",
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Security", href: "/security" },
      { label: "Integrations", href: "/integrations" },
      { label: "Contact", href: "/contact" },
      { label: "Company website", href: siteConfig.corporateWebsiteUrl, external: true },
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
      { label: "Platform", href: "/platform" },
      { label: "Features", href: "/features" },
      { label: "WhatsApp AI", href: "/whatsapp-ai" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Call Center Agent", href: "/solutions/call-center" },
      { label: "Sales Agent", href: "/solutions/sales-agent" },
      { label: "Personal Call Assistant", href: "/solutions/personal-assistant" },
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
