import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getIndustry } from "@/content/industries";
import { getModules, moduleAvailabilityLabels } from "@/content/modules";
import { rolePreviews } from "@/content/previews";
import { getRole, roles } from "@/content/roles";
import { moduleIcons } from "@/components/features/moduleIcons";
import { RoleConversation } from "@/components/solutions/RoleConversation";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ArrowRightIcon, CheckIcon, LayersIcon, SparkIcon, UsersIcon } from "@/components/ui/icons";
import styles from "@/components/solutions/solutions.module.css";

/**
 * Role pages (spec 5: /solutions/call-center, /sales-agent, /personal-assistant).
 * Unknown slugs are rejected with a 404 in proxy.ts before rendering.
 */
export function generateStaticParams() {
  return roles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const role = getRole((await params).slug);
  if (!role) return {};
  return {
    title: role.title,
    description: role.description,
    alternates: { canonical: role.href },
  };
}

/** Reading params needs a Suspense boundary for instant client navigation (see PageSkeleton). */
export default function RolePage({ params }: PageProps<"/solutions/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <RoleContent params={params} />
    </Suspense>
  );
}

async function RoleContent({ params }: { params: PageProps<"/solutions/[slug]">["params"] }) {
  const role = getRole((await params).slug);
  if (!role) notFound();

  const preview = rolePreviews.find((item) => item.role === role.slug);
  const demoHref = `/book-demo?role=${role.formRole}`;
  const relatedIndustries = role.relatedIndustries.flatMap((slug) => getIndustry(slug) ?? []);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }, { label: role.title }]}
        eyebrow={role.title}
        title={role.headline}
        actions={
          <>
            <Link href={demoHref} className="button">
              {role.ctaLabel}
            </Link>
            <a href="#modules" className="button button--secondary">
              See the modules
            </a>
          </>
        }
        aside={preview && <RoleConversation preview={preview} />}
      >
        <p>{role.description}</p>
      </PageHero>

      <section className="section" aria-label="Who does what">
        <div className={`container ${styles.whoSplit}`}>
          <article className={`card ${styles.sideCard}`} aria-labelledby="assistant-title">
            <div className={styles.sideHeader}>
              <span className={styles.sideIcon} aria-hidden="true">
                <SparkIcon />
              </span>
              <h2 id="assistant-title">What the assistant handles</h2>
            </div>
            <ul className="check-list">
              {role.responsibilities.map((item) => (
                <li key={item}>
                  <CheckIcon width="18" height="18" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <span className={styles.handoffMarker} aria-hidden="true">
            <ArrowRightIcon />
            <span>Handoff</span>
          </span>
          <article className={`card ${styles.sideCard} ${styles.teamCard}`} aria-labelledby="team-title">
            <div className={styles.sideHeader}>
              <span className={`${styles.sideIcon} ${styles.sideIconTeam}`} aria-hidden="true">
                <UsersIcon />
              </span>
              <h2 id="team-title">What stays with your team</h2>
            </div>
            <ul className="check-list">
              {role.teamResponsibilities.map((item) => (
                <li key={item}>
                  <CheckIcon width="18" height="18" />
                  {item}
                </li>
              ))}
            </ul>
            <p className={styles.note}>
              Conversations move to a person whenever a customer asks, a topic is sensitive, or
              the assistant cannot resolve the request.
            </p>
          </article>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="workflow-title">
        <div className="container">
          <SectionHeading id="workflow-title" title="How it works in this role" />
          <ol className={styles.steps}>
            {role.workflow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section id="modules" className="section" aria-labelledby="modules-title">
        <div className="container">
          <SectionHeading id="modules-title" title="The modules behind this role">
            <p>Each module has its own page with every capability, use cases and availability.</p>
          </SectionHeading>
          <div className={styles.moduleGrid}>
            {getModules(role.modules).map((entry) => {
              const Icon = moduleIcons[entry.slug];
              return (
                <article key={entry.slug} className={`card ${styles.moduleCard}`} aria-labelledby={`module-${entry.slug}`}>
                  <div className={styles.moduleHeader}>
                    <span className="card-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <span className={styles.moduleNumber}>Module {entry.number}</span>
                      <h3 id={`module-${entry.slug}`}>{entry.title}</h3>
                    </div>
                  </div>
                  <p>{entry.summary}</p>
                  <div className={styles.groups}>
                    {entry.featureGroups.slice(0, 2).map((group) => (
                      <div key={group.heading}>
                        <h4>{group.heading}</h4>
                        <ul className="feature-list">
                          {group.items.slice(0, 3).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className={styles.moduleFooter}>
                    <StatusBadge label={moduleAvailabilityLabels[entry.availability]} />
                    <Link href={`/features/${entry.slug}`} className={styles.cardLink}>
                      View module<span className="sr-only">: {entry.title}</span>
                      <ArrowRightIcon width="18" height="18" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="use-cases-title">
        <div className="container">
          <SectionHeading id="use-cases-title" title="Where it helps" />
          <div className={`grid-3 ${styles.useCases}`}>
            {role.useCases.map((useCase) => (
              <article key={useCase.title} className={`card ${styles.useCase}`} aria-label={useCase.title}>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </article>
            ))}
          </div>
          {relatedIndustries.length > 0 && (
            <div className={styles.related}>
              <h3 id="industries-title">Common in</h3>
              <ul className={styles.industryLinks} aria-labelledby="industries-title">
                {relatedIndustries.map((industry) => (
                  <li key={industry.slug}>
                    <Link href={`/industries/${industry.slug}`}>
                      {industry.name}
                      <ArrowRightIcon width="16" height="16" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <SectionHeading id="faq-title" title={`Questions about the ${role.title} role`} />
          <FaqList questions={role.faqs} />
          {role.slug === "call-center" && (
            <div className={styles.callout}>
              <LayersIcon width="20" height="20" />
              <p>
                Running a BPO or several brands? <Link href="/enterprise">See white-label and enterprise options</Link>.
              </p>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        id="role-cta-title"
        title={`See the ${role.title} with your own workflow.`}
        text="Tell us how customers reach you and what your team handles most often. We’ll shape the demo around this role."
        action={{ href: demoHref, label: role.ctaLabel }}
      />
    </>
  );
}
