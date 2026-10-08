import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { siteConfig } from "@/config/site";
import { companyPurpose, operatingApproach, positioning } from "@/content/company";
import { industries } from "@/content/industries";
import { modules } from "@/content/modules";
import { roles } from "@/content/roles";
import { roleIcons } from "@/components/solutions/roleIcons";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import {
  ArrowRightIcon,
  CheckIcon,
  LandmarkIcon,
  MessageIcon,
  ShieldIcon,
  SparkIcon,
  UserCheckIcon,
  UsersIcon,
  WorkflowIcon,
} from "@/components/ui/icons";
import styles from "@/components/trust/trust.module.css";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.productName} is built by the ${siteConfig.companyName} ${siteConfig.divisionName}.`,
  alternates: { canonical: "/about" },
};

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** The positioning principle and explanation (content/company.ts) as two lists for the hero panel. */
const division: { who: string; Icon: IconComponent; items: string[]; team?: boolean }[] = [
  { who: "The assistant", Icon: SparkIcon, items: ["Routine questions", "First responses", "Scheduled follow-ups"] },
  { who: "Your people", Icon: UsersIcon, items: ["Relationships", "Negotiations", "Exceptions"], team: true },
];

/** Decorative icons keyed by operating-approach title; a missing key shows no icon. */
const approachIcons: Record<string, IconComponent> = {
  "Honest about what is live": CheckIcon,
  "Transparent AI": MessageIcon,
  "Consent first": UserCheckIcon,
  "People approve what matters": ShieldIcon,
  "Built around your workflow": WorkflowIcon,
  "No regulated advice": LandmarkIcon,
};

/**
 * Product ownership (spec 5 /about). Only facts given in the specification: the product,
 * its owner division and its operating approach. No invented history, team or clients.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow={`${siteConfig.companyName} · ${siteConfig.divisionName}`}
        title="AI that supports your team, not replaces it."
        actions={
          <>
            <Link href="/contact" className="button">
              Contact the Team
            </Link>
            <SmartLink href={siteConfig.corporateWebsiteUrl} external className="button button--secondary">
              {siteConfig.companyName} website
            </SmartLink>
          </>
        }
        aside={
          <section className={styles.division} aria-labelledby="division-title">
            <p id="division-title" className={styles.divisionTitle}>
              Who handles what
            </p>
            {division.map(({ who, Icon, items, team }) => (
              <div key={who} className={team ? `${styles.divisionSide} ${styles.divisionTeam}` : styles.divisionSide}>
                <span className={styles.divisionIcon} aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <strong>{who}</strong>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>
        }
      >
        <p>{companyPurpose}</p>
      </PageHero>

      <section className={styles.facts} aria-label="At a glance">
        <div className="container">
          <dl className={styles.factList}>
            <div>
              <dt>Product</dt>
              <dd>{siteConfig.productName}</dd>
            </div>
            <div>
              <dt>Built by</dt>
              <dd>
                {siteConfig.companyName} {siteConfig.divisionName}
              </dd>
            </div>
            <div>
              <dt>Roles</dt>
              <dd>{roles.length}</dd>
            </div>
            <div>
              <dt>Modules</dt>
              <dd>{modules.length}</dd>
            </div>
            <div>
              <dt>Industry guides</dt>
              <dd>{industries.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={styles.principleBand} aria-labelledby="principle-title">
        <div className={`container ${styles.principleSplit}`}>
          <div>
            <h2 id="principle-title" className={styles.principleEyebrow}>
              Our principle
            </h2>
            <blockquote className={styles.principleQuote}>
              <p>{positioning.principle}</p>
            </blockquote>
          </div>
          <div className={styles.principleText}>
            <p>{positioning.explanation}</p>
            <Link href="/platform" className="button button--white">
              See how the platform works
              <ArrowRightIcon width="18" height="18" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="roles-title">
        <div className="container">
          <SectionHeading id="roles-title" title="Three roles, one platform.">
            <p>
              {siteConfig.productName} works in three roles — call center agent, sales agent and
              personal call assistant — on one platform with shared knowledge, customer history and
              handoff rules.
            </p>
          </SectionHeading>
          <div className={styles.roleGrid}>
            {roles.map((role) => {
              const Icon = roleIcons[role.slug];
              return (
                <article key={role.slug} className={`card ${styles.roleCard}`} aria-labelledby={`about-role-${role.slug}`}>
                  <span className={styles.roleIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3 id={`about-role-${role.slug}`}>{role.title}</h3>
                  <p>{role.summary}</p>
                  <Link href={role.href} className={styles.roleLink}>
                    Explore the role<span className="sr-only">: {role.title}</span>
                    <ArrowRightIcon width="18" height="18" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeading id="approach-title" title="How we work." />
          <div className={`${styles.approachGrid} ${styles.approachNumbered}`}>
            {operatingApproach.map((item) => {
              const Icon = approachIcons[item.title];
              return (
                <article key={item.title} className={`card ${styles.approachCard}`} aria-label={item.title}>
                  {Icon && (
                    <span className="card-icon" aria-hidden="true">
                      <Icon />
                    </span>
                  )}
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        id="about-cta-title"
        title="Talk to the team behind the product."
        text="Tell us how your customers reach you today and what you would like to change."
        action={{ href: "/contact", label: "Contact the Team" }}
      />
    </>
  );
}
