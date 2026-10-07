import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustry } from "@/content/industries";
import { getModules, moduleAvailabilityLabels } from "@/content/modules";
import { rolePreviews } from "@/content/previews";
import { getRole, roles } from "@/content/roles";
import { RoleConversation } from "@/components/solutions/RoleConversation";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
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

export default async function RolePage({ params }: PageProps<"/solutions/[slug]">) {
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
        <div className={`container ${styles.split}`}>
          <article className="card" aria-labelledby="assistant-title">
            <h2 id="assistant-title">What the assistant handles</h2>
            <ul className="check-list">
              {role.responsibilities.map((item) => (
                <li key={item}>
                  <CheckIcon width="18" height="18" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className={`card ${styles.teamCard}`} aria-labelledby="team-title">
            <h2 id="team-title">What stays with your team</h2>
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
            {getModules(role.modules).map((entry) => (
              <article key={entry.slug} className={`card ${styles.moduleCard}`} aria-labelledby={`module-${entry.slug}`}>
                <h3 id={`module-${entry.slug}`}>{entry.title}</h3>
                <p>{entry.summary}</p>
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

      <section className="section section--muted" aria-labelledby="use-cases-title">
        <div className="container">
          <SectionHeading id="use-cases-title" title="Where it helps" />
          <div className="grid-3">
            {role.useCases.map((useCase) => (
              <article key={useCase.title} className="card" aria-label={useCase.title}>
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
                    <Link href={`/industries/${industry.slug}`}>{industry.name}</Link>
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
            <p className={styles.note}>
              Running a BPO or several brands? <Link href="/enterprise">See white-label and enterprise options</Link>.
            </p>
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
