import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getIndustry, industries } from "@/content/industries";
import { getIntegrationCategory } from "@/content/integrations";
import { getModules, moduleAvailabilityLabels } from "@/content/modules";
import { IndustryScenario } from "@/components/directory/IndustryScenario";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ArrowRightIcon, CheckIcon, UserCheckIcon } from "@/components/ui/icons";
import styles from "@/components/directory/directory.module.css";

/**
 * Industry workflow page (spec 9): problem, fictional scenario, recommended modules,
 * operational boundaries, integrations and a demo CTA preselecting the industry.
 * No named clients, testimonials or outcome figures. Unknown slugs 404 in proxy.ts.
 */
export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const industry = getIndustry((await params).slug);
  if (!industry) return {};
  return {
    title: industry.name,
    description: industry.summary,
    alternates: { canonical: `/industries/${industry.slug}` },
  };
}

/** Reading params needs a Suspense boundary for instant client navigation (see PageSkeleton). */
export default function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <IndustryContent params={params} />
    </Suspense>
  );
}

async function IndustryContent({ params }: { params: PageProps<"/industries/[slug]">["params"] }) {
  const industry = getIndustry((await params).slug);
  if (!industry) notFound();

  const demoHref = `/book-demo?industry=${industry.slug}`;
  const index = industries.indexOf(industry);
  const others = [1, 2, 3].map((offset) => industries[(index + offset) % industries.length]);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: industry.name }]}
        eyebrow="Industries"
        title={industry.name}
        actions={
          <>
            <Link href={demoHref} className="button">
              Request Industry Demo
            </Link>
            <Link href="/industries" className="button button--secondary">
              All industries
            </Link>
          </>
        }
        aside={<IndustryScenario scenario={industry.scenario} />}
      >
        <p>{industry.summary}</p>
        <p>
          <strong>The challenge:</strong> {industry.problem}
        </p>
      </PageHero>

      <section className="section" aria-label="Workflows and boundaries">
        <div className={`container ${styles.split}`}>
          <div>
            <h2 id="workflows-title">Workflows the assistant supports</h2>
            <ul className="check-list" aria-labelledby="workflows-title">
              {industry.workflows.map((workflow) => (
                <li key={workflow}>
                  <CheckIcon width="18" height="18" />
                  {workflow}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.boundaries}>
            <h2 id="boundaries-title">Where your team stays in charge</h2>
            <ul className="check-list" aria-labelledby="boundaries-title">
              {industry.boundaries.map((boundary) => (
                <li key={boundary}>
                  <UserCheckIcon width="18" height="18" />
                  {boundary}
                </li>
              ))}
            </ul>
            <p className={styles.note}>
              Customers can always ask for a person, and sensitive requests move to your team with
              the conversation so far.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="modules-title">
        <div className="container">
          <SectionHeading id="modules-title" title="Recommended modules" />
          <div className={styles.moduleGrid}>
            {getModules(industry.modules).map((entry) => (
              <article key={entry.slug} className="card" aria-labelledby={`module-${entry.slug}`}>
                <h3 id={`module-${entry.slug}`}>{entry.title}</h3>
                <p>{entry.summary}</p>
                <p>
                  <StatusBadge label={moduleAvailabilityLabels[entry.availability]} />
                </p>
                <Link href={`/features/${entry.slug}`} className={styles.cardLink}>
                  View module<span className="sr-only">: {entry.title}</span>
                  <ArrowRightIcon width="18" height="18" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-label="Integrations and related industries">
        <div className={`container ${styles.split}`}>
          <div>
            <h2 id="integrations-title">Systems it can work with</h2>
            <ul className={styles.chips} aria-labelledby="integrations-title">
              {industry.integrations.map((id) => (
                <li key={id}>
                  <Link href={`/integrations#${id}`}>{getIntegrationCategory(id).name}</Link>
                </li>
              ))}
            </ul>
            <p className={styles.note}>Compatibility with your specific systems is confirmed during the demo.</p>
          </div>
          <div>
            <h2 id="others-title">Related industries</h2>
            <ul className={styles.chips} aria-labelledby="others-title">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link href={`/industries/${other.slug}`}>{other.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        id="industry-cta-title"
        title={`See it working for ${industry.name.toLowerCase()}.`}
        text="Tell us how customers contact you and what your team handles most often. We’ll shape the demo around your workflow."
        action={{ href: demoHref, label: "Request Industry Demo" }}
      />
    </>
  );
}
