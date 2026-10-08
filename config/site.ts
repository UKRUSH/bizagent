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
  productName: "BizMaster AI Agent",
  whatsappOfferingName: "Agent BIZ MASTER",
  companyName: "BizMaster Solutions",
  divisionName: "Tech Hub Division",
  shortDescription:
    "BizMaster AI Agent brings calls, WhatsApp messages, bookings and follow-ups into one AI-assisted workflow, with your team in control of every handoff.",
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
  socialProfiles: [],
  providerAttribution: null,
  flags: {
    pricingPublished: false,
    providerAttributionApproved: false,
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

export function whatsappHref(channel: ContactChannel): string {
  return `https://wa.me/${channel.value.replace(/[^\d]/g, "")}`;
}
