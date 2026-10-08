import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getIntegrationCategory } from "@/content/integrations";
import { moduleIllustrations } from "@/content/module-illustrations";
import { getModule, getModules, moduleAvailabilityLabels, moduleCategories, modules } from "@/content/modules";
import { ModuleIllustration } from "@/components/features/ModuleIllustration";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import styles from "@/components/features/features.module.css";

/**
 * Module detail page (spec 7.1). All 13 slugs are prerendered. Cache Components removes
 * `dynamicParams`, so any other slug reaches this page at request time and gets the real
 * not-found UI via notFound().
 */
export function generateStaticParams() {
  return modules.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/features/[slug]">): Promise<Metadata> {
  const entry = getModule((await params).slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/features/${entry.slug}` },
  };
}

/** Reading params needs a Suspense boundary for instant client navigation (see PageSkeleton). */
export default function ModulePage({ params }: PageProps<"/features/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ModuleContent params={params} />
    </Suspense>
  );
}

async function ModuleContent({ params }: { params: PageProps<"/features/[slug]">["params"] }) {
  const entry = getModule((await params).slug);
  if (!entry) notFound();

  const category = moduleCategories.find((item) => item.id === entry.category);
  const demoHref = `/book-demo?module=${entry.slug}`;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Features", href: "/features" },
          { label: entry.title },
        ]}
        eyebrow={`Module ${entry.number} · ${category?.label}`}
        title={entry.title}
        actions={
          <>
            <Link href={demoHref} className="button">
              Request This Demo
            </Link>
            <Link href="/features" className="button button--secondary">
              All features
            </Link>
          </>
        }
        aside={<ModuleIllustration illustration={moduleIllustrations[entry.slug]} />}
      >
        <p>
          <StatusBadge label={moduleAvailabilityLabels[entry.availability]} />
        </p>
        <p>{entry.introduction}</p>
      </PageHero>

      <section className="section" aria-labelledby="features-title">
        <div className="container">
          <SectionHeading id="features-title" title="What it includes">
            <p>Every capability in this module, grouped by what it does.</p>
          </SectionHeading>
          <div className={styles.groupGrid}>
            {entry.featureGroups.map((group) => (
              <article key={group.heading} className="card" aria-label={group.heading}>
                <h3>{group.heading}</h3>
                <ul className="feature-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="workflow-title">
        <div className="container">
          <SectionHeading id="workflow-title" title="How it works" />
          <ol className={styles.workflow}>
            {entry.workflow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="use-cases-title">
        <div className="container">
          <SectionHeading id="use-cases-title" title="Practical use cases" />
          <div className="grid-3">
            {entry.useCases.map((useCase) => (
              <article key={useCase.title} className="card" aria-label={useCase.title}>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-label="Benefits and human control">
        <div className={`container ${styles.twoColumn}`}>
          <div>
            <h2 id="benefits-title">Benefits</h2>
            <ul className="check-list" aria-labelledby="benefits-title">
              {entry.benefits.map((benefit) => (
                <li key={benefit}>
                  <CheckIcon width="18" height="18" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 id="control-title">Your team stays in control</h2>
            <ul className="check-list" aria-labelledby="control-title">
              {entry.humanControls.map((control) => (
                <li key={control}>
                  <CheckIcon width="18" height="18" />
                  {control}
                </li>
              ))}
            </ul>
            <p className={styles.cardLink}>
              <Link href="/security">How handoff and approvals work</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="integrations-title">
        <div className={`container ${styles.twoColumn}`}>
          <div>
            <h2 id="integrations-title">Integrations and availability</h2>
            <ul className={styles.integrationList}>
              {entry.integrations.map((id) => (
                <li key={id}>
                  <Link href={`/integrations#${id}`}>{getIntegrationCategory(id).name}</Link>
                </li>
              ))}
            </ul>
            <div className={styles.dependencyNote}>
              <p>
                <strong>A live deployment needs:</strong> {entry.dependencies} Availability and
                connector compatibility are confirmed for your setup during the demo.
              </p>
            </div>
          </div>
          <div>
            <h2 id="faq-title">Questions about this module</h2>
            <FaqList questions={entry.faqs} />
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="related-title">
        <div className="container">
          <SectionHeading id="related-title" title="Related modules" />
          <div className={styles.layerGrid}>
            {getModules(entry.relatedModules).map((related) => (
              <article key={related.slug} className={`card card--interactive ${styles.catalogueCard}`} aria-labelledby={`related-${related.slug}`}>
                <p className={styles.cardMeta}>Module {related.number}</p>
                <h3 id={`related-${related.slug}`}>{related.title}</h3>
                <p>{related.summary}</p>
                <Link href={`/features/${related.slug}`} className={styles.cardLink}>
                  View module<span className="sr-only">: {related.title}</span>
                  <ArrowRightIcon width="18" height="18" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        id="module-cta-title"
        title={`See ${entry.shortTitle} with your own workflow.`}
        text="Tell us how your customers get in touch and what your team handles most often. We’ll shape the demo around this module."
        action={{ href: demoHref, label: "Request This Demo" }}
      />
    </>
  );
}
