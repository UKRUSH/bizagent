import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { channelEmbedding } from "@/content/deployment";
import {
  connectionApproaches,
  integrationCategories,
  integrationStatusLabels,
  statusMeanings,
} from "@/content/integrations";
import { IntegrationsDirectory } from "@/components/directory/IntegrationsDirectory";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CheckIcon, HeadsetIcon, MonitorIcon, PhoneIcon, PlugIcon, WorkflowIcon } from "@/components/ui/icons";
import styles from "@/components/directory/directory.module.css";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Telephony, WhatsApp, PBX, CRM, ERP, calendar, email, accounting, payments, commerce and more, with the availability of each connection stated plainly.",
  alternates: { canonical: "/integrations" },
};

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Decorative icons keyed by connection approach title; a missing key shows no icon. */
const approachIcons: Record<string, IconComponent> = {
  Connectors: PlugIcon,
  "APIs and webhooks": WorkflowIcon,
  "Telephony and PBX": HeadsetIcon,
};

const allSystems = integrationCategories.flatMap((category) => category.systems);

/** Systems and channels directory (spec 5 /integrations, 10). Text labels, no logos. */
export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Integrations" }]}
        eyebrow="Integrations"
        title="Connect the systems you already use."
        actions={
          <>
            <Link href="/book-demo" className="button">
              Check Compatibility
            </Link>
            <a href="#directory" className="button button--secondary">
              Browse the directory
            </a>
          </>
        }
        aside={
          <section className={styles.statusSummary} aria-labelledby="summary-title">
            <p className={styles.summaryTotal} id="summary-title">
              <strong>{allSystems.length}</strong>
              <span>systems in {integrationCategories.length} categories</span>
            </p>
            {/* Only statuses that currently have systems; the legend below explains all four. */}
            <dl className={styles.summaryRows}>
              {statusMeanings
                .map((item) => ({ ...item, count: allSystems.filter((system) => system.status === item.status).length }))
                .filter((item) => item.count > 0)
                .map((item) => (
                  <div key={item.status}>
                    <dt>
                      <StatusBadge label={integrationStatusLabels[item.status]} />
                    </dt>
                    <dd>{item.count}</dd>
                  </div>
                ))}
            </dl>
            <a href="#status-legend-title" className={styles.summaryLink}>
              What each status means
            </a>
          </section>
        }
      >
        <p>
          Conversations can update your CRM, calendar, commerce and back-office systems. Every
          system below shows its status in plain words, so you know what is ready and what is
          assessed for your setup.
        </p>
      </PageHero>

      <section className="section" aria-labelledby="approaches-title">
        <div className="container">
          <SectionHeading id="approaches-title" title="How connections work." />
          <div className={styles.threeGrid}>
            {connectionApproaches.map((approach) => {
              const Icon = approachIcons[approach.title];
              return (
                <article key={approach.title} className={`card ${styles.approachCard}`} aria-label={approach.title}>
                  {Icon && (
                    <span className="card-icon" aria-hidden="true">
                      <Icon />
                    </span>
                  )}
                  <h3>{approach.title}</h3>
                  <p>{approach.description}</p>
                </article>
              );
            })}
          </div>
          <h3 id="status-legend-title" className={styles.legendTitle}>
            What each status means
          </h3>
          <dl className={styles.legendGrid} aria-labelledby="status-legend-title">
            {statusMeanings.map((item) => (
              <div key={item.status}>
                <dt>
                  <StatusBadge label={integrationStatusLabels[item.status]} />
                </dt>
                <dd>{item.meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="directory" className="section section--muted" aria-label="Integration directory">
        <div className="container">
          <IntegrationsDirectory categories={integrationCategories} statusLabels={integrationStatusLabels} />
        </div>
      </section>

      <section className="section" aria-labelledby="embedding-title">
        <div className={`container ${styles.split} ${styles.embedPanels}`}>
          <div className="card">
            <div className={styles.embedHeader}>
              <span className={styles.embedIcon} aria-hidden="true">
                <MonitorIcon />
              </span>
              <h2 id="embedding-title">Your website and apps</h2>
            </div>
            <ul className="check-list">
              {channelEmbedding.website.map((item) => (
                <li key={item}>
                  <CheckIcon width="18" height="18" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <div className={styles.embedHeader}>
              <span className={styles.embedIcon} aria-hidden="true">
                <PhoneIcon />
              </span>
              <h2 id="mobile-title">Mobile apps</h2>
            </div>
            <ul className="check-list">
              {channelEmbedding.mobile.map((item) => (
                <li key={item}>
                  <CheckIcon width="18" height="18" />
                  {item}
                </li>
              ))}
            </ul>
            <p className={styles.note}>
              Embedded sessions need authentication, an allowlist of permitted origins and an agreed
              bridge contract.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        id="integrations-cta-title"
        title="Check compatibility with your systems."
        text="Tell us which CRM, calendar, phone system and other tools you use. We’ll confirm what connects and how."
        action={{ href: "/book-demo", label: "Check Compatibility" }}
      />
    </>
  );
}
