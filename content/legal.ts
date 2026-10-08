/**
 * Legal documents (spec 5, 16, 21). Each document is `null` until approved text exists.
 * A null document has no public page (the route returns 404) and no navigation or sitemap
 * entry. Do not draft placeholder legal text here; paste only approved wording.
 */

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDocument {
  title: string;
  /** ISO date of the approved version, e.g. "2026-11-01". */
  lastUpdated: string;
  introduction?: string;
  sections: LegalSection[];
}

export type LegalSlug = "privacy" | "terms" | "cookies";

export const legalDocuments: Record<LegalSlug, LegalDocument | null> = {
  privacy: null,
  terms: null,
  cookies: null,
};

export const legalLabels: Record<LegalSlug, string> = {
  privacy: "Privacy",
  terms: "Terms",
  cookies: "Cookies",
};

export function getLegalDocument(slug: LegalSlug): LegalDocument | null {
  return legalDocuments[slug];
}

/** Slugs with approved text, in footer order. */
export function publishedLegalSlugs(): LegalSlug[] {
  return (Object.keys(legalDocuments) as LegalSlug[]).filter((slug) => legalDocuments[slug] !== null);
}
