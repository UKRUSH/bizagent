import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalDocument, type LegalSlug } from "@/content/legal";
import { PageHero } from "@/components/ui/PageHero";
import styles from "./trust.module.css";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Formats "2026-11-01" as "1 November 2026" without constructing a Date during prerender. */
function formatIsoDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${monthNames[month - 1]} ${year}`;
}

export function legalMetadata(slug: LegalSlug): Metadata {
  const document = getLegalDocument(slug);
  if (!document) return {};
  return { title: document.title, alternates: { canonical: `/${slug}` } };
}

/**
 * Renders an approved legal document, or the real 404 when no approved text exists, so an
 * empty legal page is never published (spec 5, 16).
 */
export function LegalPage({ slug }: { slug: LegalSlug }) {
  const document = getLegalDocument(slug);
  if (!document) notFound();

  return (
    <>
      <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: document.title }]} title={document.title}>
        <p className={styles.updated}>
          Last updated <time dateTime={document.lastUpdated}>{formatIsoDate(document.lastUpdated)}</time>
        </p>
        {document.introduction && <p>{document.introduction}</p>}
      </PageHero>
      <section className="section">
        <div className={`container ${styles.legal}`}>
          {document.sections.map((section) => (
            <section key={section.heading} aria-label={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
