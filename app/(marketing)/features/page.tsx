import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { moduleAvailabilityLabels, moduleCategories, modules } from "@/content/modules";
import { FeatureCatalogue, type CatalogueModule } from "@/components/features/FeatureCatalogue";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import styles from "@/components/features/features.module.css";

export const metadata: Metadata = {
  title: "Features",
  description:
    "All 13 BizMaster AI Agent modules for calls, WhatsApp, follow-ups, reminders, recording, campaigns, sales and call center operations.",
  alternates: { canonical: "/features" },
};

const catalogue: CatalogueModule[] = modules.map((entry) => ({
  slug: entry.slug,
  number: entry.number,
  title: entry.title,
  summary: entry.summary,
  category: entry.category,
  categoryLabel: moduleCategories.find((category) => category.id === entry.category)?.label ?? "",
  availabilityLabel: moduleAvailabilityLabels[entry.availability],
  benefits: entry.benefits.slice(0, 2),
}));

/** Full feature catalogue (spec 5: all 13 modules, filtering, benefits). */
export default function FeaturesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Features" }]}
        eyebrow="Features"
        title="Thirteen modules for every call and message."
        actions={
          <Link href="/book-demo" className="button">
            Book a Demo
          </Link>
        }
      >
        <p>
          Answer, follow through, understand, grow and manage. Each module works on its own and
          shares the same knowledge, conversation history and handoff rules with the others.
        </p>
      </PageHero>

      <section className="section" aria-labelledby="catalogue-title">
        <div className="container">
          <aside className={styles.featuredCard} aria-labelledby="featured-whatsapp">
            <div>
              <span className={`eyebrow ${styles.featuredEyebrow}`}>Featured</span>
              <h2 id="featured-whatsapp">{siteConfig.whatsappOfferingName}: WhatsApp AI</h2>
              <p>
                Chat, voice notes, templates and live voice calls where supported, with knowledge
                per number and handoff to your team.
              </p>
            </div>
            <Link href="/whatsapp-ai" className="button button--white">
              Explore WhatsApp AI
            </Link>
          </aside>

          <h2 id="catalogue-title" className="sr-only">
            All modules
          </h2>
          <FeatureCatalogue
            modules={catalogue}
            categories={moduleCategories.map(({ id, label, description }) => ({ id, label, description }))}
          />
        </div>
      </section>

      <CtaBand
        id="features-cta-title"
        title="Not sure where to start?"
        text="Tell us how customers reach you today. We’ll suggest the modules that fit and show them in your demo."
        action={{ href: "/book-demo", label: "Book a Demo" }}
      />
    </>
  );
}
