/**
 * Single source for brand names, contact channels, external URLs and publication flags
 * (specification sections 1.2, 5, 6.10, 12.3).
 *
 * Contact values marked `verified: false` are candidates only. They are kept here for
 * review but are never rendered; missing or unverified values hide the related control.
 */

export interface ContactChannel {
  /** Value used in links, e.g. an E.164 number without spaces or an email address. */
  value: string;
  /** Human-readable form. */
  display: string;
  /** Only verified channels for this product are shown publicly. */
  verified: boolean;
}

export interface SiteConfig {
  productName: string;
  whatsappOfferingName: string;
  companyName: string;
  divisionName: string;
  shortDescription: string;
  corporateWebsiteUrl: string;
  contact: {
    whatsapp: ContactChannel | null;
    phone: ContactChannel | null;
    email: ContactChannel | null;
    address: string | null;
    schedulingUrl: string | null;
  };
  /**
   * Live demo lines answered by the AI agent, so visitors can try it before booking:
   * `voice` is a phone number to call, `whatsapp` a WhatsApp number to call or message.
   */
  demoLines: {
    voice: ContactChannel | null;
    whatsapp: ContactChannel | null;
  };
  socialProfiles: { label: string; url: string }[];
  /**
   * Approved public wording for the underlying WhatsApp platform provider (spec 1.2).
   * Rendered only when `flags.providerAttributionApproved` is true. Never a partner badge.
   */
  providerAttribution: string | null;
  flags: {
    /** When false, plan amounts are replaced by "Request current pricing" (spec 6.10). */
    pricingPublished: boolean;
    /** Approved wording for the Agent Dilu / Dilexus provider attribution (spec 1.2). */
    providerAttributionApproved: boolean;
  };
}

export const siteConfig: SiteConfig = {
  productName: "BIZny",
  whatsappOfferingName: "Agent BIZ MASTER",
  companyName: "BizMaster Solutions",
  divisionName: "Tech Hub Division",
  shortDescription:
    "BIZny brings calls, WhatsApp messages, bookings and follow-ups into one AI-assisted workflow, with your team in control of every handoff.",
  corporateWebsiteUrl: "https://bizmastersolutions.lk/",
  contact: {
    // Observed on the corporate homepage during brand inspection (spec 12.3).
    // Confirm it is the right destination for this product before setting verified: true.
    whatsapp: { value: "+94777960231", display: "+94 77 796 0231", verified: false },
    phone: null,
    email: null,
    address: null,
    schedulingUrl: null,
  },
  // Demo lines supplied by the business for /book-demo.
  demoLines: {
    voice: { value: "+94117228351", display: "011 722 8351", verified: true },
    whatsapp: { value: "+94770197994", display: "077 019 7994", verified: true },
  },
  socialProfiles: [],
  // Wording from the spec's "Powered by" block: the Meta Tech Provider is Dilexus, not BIZny.
  providerAttribution:
    "Powered by Agent Dilu, developed by Dilexus, an official Meta Tech Provider.",
  flags: {
    pricingPublished: false,
    providerAttributionApproved: true,
  },
};

/** Returns a channel only when it exists and has been verified for public use. */
export function verifiedChannel(channel: ContactChannel | null): ContactChannel | null {
  return channel?.verified ? channel : null;
}

/** Approved provider attribution text, or null while unapproved. */
export function approvedProviderAttribution(): string | null {
  return siteConfig.flags.providerAttributionApproved ? siteConfig.providerAttribution : null;
}

export function telHref(channel: ContactChannel): string {
  return `tel:${channel.value.replace(/[^\d+]/g, "")}`;
}

/** "+94117228351" → "+94 11 722 8351" (Sri Lankan numbers: 2-digit area or mobile code). */
export function internationalDisplay(channel: ContactChannel): string {
  const match = channel.value.match(/^\+94(\d{2})(\d{3})(\d{4})$/);
  return match ? `+94 ${match[1]} ${match[2]} ${match[3]}` : channel.value;
}

export function whatsappHref(channel: ContactChannel): string {
  return `https://wa.me/${channel.value.replace(/[^\d]/g, "")}`;
}
