import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { channelEmbedding, deploymentOptions } from "@/content/deployment";
import { engagementSteps, enterpriseRequirements, serviceLevelStatement, whiteLabelPoints } from "@/content/enterprise";
import { approvalControls } from "@/content/handoff";
import { integrationStatusLabels } from "@/content/integrations";
import { packageTiers } from "@/content/plans";
import { securityInterimStatement } from "@/content/security";
import { deploymentIcons } from "@/components/platform/deploymentIcons";
import { packageTierIcons } from "@/components/pricing/packageTierIcons";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  ArrowRightIcon,
  CheckIcon,
  CloudIcon,
  HeadsetIcon,
  LayersIcon,
  MonitorIcon,
  PlugIcon,
  ShieldIcon,
  SlidersIcon,
  SparkIcon,
  UserCheckIcon,
} from "@/components/ui/icons";
import platform from "@/components/platform/platform.module.css";
import styles from "@/components/solutions/solutions.module.css";

export const metadata: Metadata = {
  title: "Enterprise and White-Label",
  description:
    "Custom deployments, white-label options for BPOs and agencies, approval controls and integration scoping for larger organisations.",
  alternates: { canonical: "/enterprise" },
};

const salesHref = "/book-demo?plan=enterprise";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** The intro sentence as a panel: what is scoped, and who it is for. */
const scopeAreas: { label: string; Icon: IconComponent }[] = [
  { label: "Deployment", Icon: CloudIcon },
  { label: "Integrations", Icon: PlugIcon },
  { label: "Approvals", Icon: UserCheckIcon },
  { label: "Branding", Icon: SparkIcon },
];
const audiences = ["Multi-team businesses", "BPOs", "Agencies", "Institutions"];

/** Decorative icons keyed by white-label point title. */
const whiteLabelIcons: Record<string, IconComponent> = {
  "Your brand": SparkIcon,
  "Separate clients": ShieldIcon,
  "Central administration": SlidersIcon,
  "Multi-site queues": HeadsetIcon,
};

/** Custom and white-label (spec 5: deployment options, controls, SLA discussions; Talk to Sales). */
export default function EnterprisePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }, { label: "Enterprise" }]}
        eyebrow="Enterprise and white-label"
        title="Built around your organisation's requirements."
        actions={
          <>
            <Link href={salesHref} className="button">
              Talk to Sales
            </Link>
            <Link href="/security" className="button button--secondary">
              Security and human control
            </Link>
          </>
        }
        aside={
          <section className={styles.scopePanel} aria-labelledby="scope-title">
            <p id="scope-title" className={styles.scopeTitle}>
              Scoped with your team before anything goes live
            </p>
            <ul className={styles.scopeList}>
              {scopeAreas.map(({ label, Icon }) => (
                <li key={label}>
                  <span aria-hidden="true">
                    <Icon />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <p className={styles.scopeFor}>For</p>
            <ul className={styles.audienceChips}>
              {audiences.map((audience) => (
                <li key={audience}>{audience}</li>
              ))}
            </ul>
          </section>
        }
      >
        <p>
          For multi-team businesses, BPOs, agencies and institutions: deployment, integrations,
          approvals and branding are scoped with your team before anything goes live.
        </p>
      </PageHero>

      <section className="section" aria-labelledby="packages-title">
        <div className="container">
          <SectionHeading id="packages-title" title="Packages for every stage.">
            <p>
              These packages are quoted for your requirements. For WhatsApp chat and voice plans,{" "}
              <Link href="/pricing">see pricing</Link>.
            </p>
          </SectionHeading>
          <div className={styles.tierGrid}>
            {packageTiers.map((tier, index) => {
              const Icon = packageTierIcons[tier.slug];
              return (
                <article key={tier.slug} className={`card ${styles.tierCard}`} aria-labelledby={`tier-${tier.slug}`}>
                  <div className={styles.tierTop}>
                    {Icon && (
                      <span className="card-icon" aria-hidden="true">
                        <Icon />
                      </span>
                    )}
                    <span className={styles.stage} aria-hidden="true">
                      {packageTiers.map((other, dot) => (
                        <span key={other.slug} data-filled={dot <= index || undefined} />
                      ))}
                    </span>
                  </div>
                  <h3 id={`tier-${tier.slug}`}>{tier.name}</h3>
                  <p className={styles.tierAudience}>{tier.audience}</p>
                  <p className={styles.tierScope}>{tier.scope}</p>
                  <Link href={`/book-demo?plan=${tier.slug}`} className={`button button--secondary ${styles.tierQuote}`}>
                    Request a quote<span className="sr-only"> for {tier.name}</span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="white-label-title">
        <div className="container">
          <SectionHeading id="white-label-title" title="White-label for BPOs, resellers and agencies.">
            <p>Offer the assistant to your own clients, with each client kept separate.</p>
          </SectionHeading>
          <div className={styles.fourGrid}>
            {whiteLabelPoints.map((point) => {
              const Icon = whiteLabelIcons[point.title];
              return (
                <article key={point.title} className={`card ${styles.pointCard}`} aria-label={point.title}>
                  {Icon && (
                    <span className="card-icon" aria-hidden="true">
                      <Icon />
                    </span>
                  )}
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </article>
              );
            })}
          </div>
          <div className={styles.callout}>
            <ShieldIcon width="20" height="20" />
            <p>White-label and multi-tenant features are confirmed for your setup during scoping.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="deployment-title">
        <div className="container">
          <SectionHeading id="deployment-title" title="Deployment options." />
          <div className={styles.fourGrid}>
            {deploymentOptions.map((option) => {
              const Icon = deploymentIcons[option.slug];
              return (
                <article key={option.slug} className={`card ${platform.deployCard}`} aria-labelledby={`deploy-${option.slug}`}>
                  {Icon && (
                    <span className="card-icon" aria-hidden="true">
                      <Icon />
                    </span>
                  )}
                  <h3 id={`deploy-${option.slug}`}>{option.title}</h3>
                  <p>{option.description}</p>
                  <p className={platform.bestFor}>
                    <strong>Best for:</strong> {option.bestFor}
                  </p>
                  <div className={platform.deployFooter}>
                    <StatusBadge label={integrationStatusLabels[option.availability]} />
                  </div>
                </article>
              );
            })}
          </div>
          <div className={`${styles.split} ${styles.panelRow}`}>
            <div className={`card ${styles.panel}`}>
              <div className={styles.panelHeader}>
                <span className={styles.panelIcon} aria-hidden="true">
                  <LayersIcon />
                </span>
                <h3 id="requirements-title">Requirements we assess with you</h3>
              </div>
              <ul className="check-list" aria-labelledby="requirements-title">
                {enterpriseRequirements.map((item) => (
                  <li key={item}>
                    <CheckIcon width="18" height="18" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className={styles.note}>
                Each requirement is assessed for your deployment before it is included in a proposal.
              </p>
            </div>
            <div className={`card ${styles.panel}`}>
              <div className={styles.panelHeader}>
                <span className={styles.panelIcon} aria-hidden="true">
                  <MonitorIcon />
                </span>
                <h3 id="embedding-title">Your website and apps</h3>
              </div>
              <ul className="check-list" aria-labelledby="embedding-title">
                {[...channelEmbedding.website, ...channelEmbedding.mobile].map((item) => (
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
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="controls-title">
        <div className={`container ${styles.split} ${styles.panelRow}`}>
          <div className={`card ${styles.panel}`}>
            <div className={styles.panelHeader}>
              <span className={styles.panelIcon} aria-hidden="true">
                <UserCheckIcon />
              </span>
              <h2 id="controls-title">Approvals and governance</h2>
            </div>
            <ul className="check-list">
              {approvalControls.map((control) => (
                <li key={control}>
                  <CheckIcon width="18" height="18" />
                  {control}
                </li>
              ))}
            </ul>
          </div>
          <div className={`card ${styles.panel}`}>
            <div className={styles.panelHeader}>
              <span className={styles.panelIcon} aria-hidden="true">
                <ShieldIcon />
              </span>
              <h2 id="sla-title">Security and service levels</h2>
            </div>
            <p>{securityInterimStatement}</p>
            <p>{serviceLevelStatement}</p>
            <Link href="/security" className="button button--secondary">
              How we approach security and human control
              <ArrowRightIcon width="18" height="18" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="engagement-title">
        <div className="container">
          <SectionHeading id="engagement-title" title="How an enterprise engagement works." />
          <ol className={`${styles.steps} ${styles.stepsDescribed}`}>
            {engagementSteps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        id="enterprise-cta-title"
        title="Tell us what your organisation needs."
        text="Share your channels, volumes, systems and requirements. We’ll come back with a scoped approach."
        action={{ href: salesHref, label: "Talk to Sales" }}
      />
    </>
  );
}
