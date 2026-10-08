import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { approvalControls, escalationTriggers, handoffContext, handoffTypes, operatingPrinciples } from "@/content/handoff";
import {
  complianceResponsibilities,
  getApprovedSecurityControls,
  proofPackDocuments,
  securityInterimStatement,
  securityReviewTopics,
} from "@/content/security";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  BriefcaseIcon,
  CheckIcon,
  ClockIcon,
  FileIcon,
  GlobeIcon,
  HeadsetIcon,
  LockIcon,
  RefreshIcon,
  SearchIcon,
  ShieldIcon,
  SlidersIcon,
  SparkIcon,
  UserCheckIcon,
  UsersIcon,
} from "@/components/ui/icons";
import platform from "@/components/platform/platform.module.css";
import styles from "@/components/trust/trust.module.css";

export const metadata: Metadata = {
  title: "Security and Human Control",
  description:
    "How BizMaster AI Agent keeps people in control: handoff rules, approvals, consent, and the security questions we answer for your deployment.",
  alternates: { canonical: "/security" },
};

const securityRequestHref = "#request-form";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** The three safeguards named in the intro sentence, shown as the hero panel. */
const safeguards: { label: string; Icon: IconComponent }[] = [
  { label: "Answers within the rules you set", Icon: SlidersIcon },
  { label: "Hands over when a person is needed", Icon: UserCheckIcon },
  { label: "Waits for approval before commitments", Icon: ShieldIcon },
];

/** Decorative icons keyed by review topic title; a missing key shows no icon. */
const topicIcons: Record<string, IconComponent> = {
  "Access and roles": UsersIcon,
  "Retention and deletion": ClockIcon,
  "Where data is stored": GlobeIcon,
  "Support access": HeadsetIcon,
  Encryption: LockIcon,
  "AI data use": SparkIcon,
  "Audit records": SearchIcon,
  "Backup and recovery": RefreshIcon,
};

/**
 * Trust and human control (spec 5 /security, 11). Specific security controls are listed only
 * once approved (none are yet); until then the page explains human control, consent and the
 * questions answered in a security review. No certifications, badges or document links.
 */
export default function SecurityPage() {
  const approvedControls = getApprovedSecurityControls();

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Security" }]}
        eyebrow="Security and human control"
        title="Your team stays in control of every conversation."
        actions={
          <Link href={securityRequestHref} className="button">
            Request Security Information
          </Link>
        }
        aside={
          <ul className={styles.safeguards} aria-label="How the assistant stays in bounds">
            {safeguards.map(({ label, Icon }) => (
              <li key={label}>
                <span aria-hidden="true">
                  <Icon />
                </span>
                {label}
              </li>
            ))}
          </ul>
        }
      >
        <p>
          The assistant answers within the rules you set, hands over when a person is needed, and
          waits for approval before commitments. {securityInterimStatement}
        </p>
      </PageHero>

      <section className="section" aria-label="Human handoff">
        <div className={`container ${styles.split} ${styles.secPanels}`}>
          <div className={`card ${platform.panel}`}>
            <h2 id="triggers-title">When a person takes over</h2>
            <ul className="check-list" aria-labelledby="triggers-title">
              {escalationTriggers.map((trigger) => (
                <li key={trigger}>
                  <CheckIcon width="18" height="18" />
                  {trigger}
                </li>
              ))}
            </ul>
            <h3 id="context-title">What your team receives</h3>
            <ul className={platform.chips} aria-labelledby="context-title">
              {handoffContext.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.note}>
              Handoff is designed to share only what the receiving team member is authorised to see.
            </p>
          </div>
          <div>
            <h2 id="handoff-types-title" className={platform.typesHeading}>
              How the handover happens
            </h2>
            <dl className={platform.types} aria-labelledby="handoff-types-title">
              {handoffTypes.map((type) => (
                <div key={type.name} className={platform.type}>
                  <dt>{type.name}</dt>
                  <dd>{type.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-label="Approvals and consent">
        <div className={`container ${styles.split} ${styles.secPanels}`}>
          <div className="card">
            <div className={styles.secPanelHeader}>
              <span className={styles.secPanelIcon} aria-hidden="true">
                <UserCheckIcon />
              </span>
              <h2 id="approvals-title">Approvals</h2>
            </div>
            <ul className="check-list" aria-labelledby="approvals-title">
              {approvalControls.map((control) => (
                <li key={control}>
                  <CheckIcon width="18" height="18" />
                  {control}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <div className={styles.secPanelHeader}>
              <span className={styles.secPanelIcon} aria-hidden="true">
                <ShieldIcon />
              </span>
              <h2 id="principles-title">Consent and conduct</h2>
            </div>
            <ul className="check-list" aria-labelledby="principles-title">
              {operatingPrinciples.map((principle) => (
                <li key={principle}>
                  <CheckIcon width="18" height="18" />
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="review-title">
        <div className="container">
          <SectionHeading id="review-title" title="Questions we answer in a security review.">
            <p>
              Requirements differ by organisation and deployment, so each of these is confirmed for
              your setup in writing.
            </p>
          </SectionHeading>
          <div className={styles.topicGrid}>
            {securityReviewTopics.map((topic) => {
              const Icon = topicIcons[topic.title];
              return (
                <article key={topic.title} className={`card ${styles.topicCard}`} aria-label={topic.title}>
                  {Icon && (
                    <span className="card-icon" aria-hidden="true">
                      <Icon />
                    </span>
                  )}
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </article>
              );
            })}
          </div>

          {approvedControls.length > 0 && (
            <div className={styles.note}>
              <h3 id="controls-title">Confirmed controls</h3>
              <ul className="check-list" aria-labelledby="controls-title">
                {approvedControls.map((control) => (
                  <li key={control.control}>
                    <CheckIcon width="18" height="18" />
                    <span>
                      <strong>{control.control}:</strong> {control.sourceRequirement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="section section--muted" aria-label="Documentation and shared responsibilities">
        <div className={`container ${styles.split} ${styles.secPanels}`}>
          <div className={styles.notice}>
            <h2 id="docs-title">Security documentation</h2>
            <p>
              You can ask for the documentation your review needs. Availability is confirmed when
              you ask, and sensitive documents are shared through an access-controlled process,
              which may require a non-disclosure agreement.
            </p>
            <ul className={styles.docTiles} aria-labelledby="docs-title">
              {proofPackDocuments.map((document) => (
                <li key={document}>
                  <FileIcon width="18" height="18" aria-hidden="true" />
                  {document}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <div className={styles.secPanelHeader}>
              <span className={styles.secPanelIcon} aria-hidden="true">
                <BriefcaseIcon />
              </span>
              <h2 id="responsibilities-title">Your responsibilities as a business</h2>
            </div>
            <p>Some obligations stay with the business using the assistant:</p>
            <ul className="check-list" aria-labelledby="responsibilities-title">
              {complianceResponsibilities.map((item) => (
                <li key={item}>
                  <CheckIcon width="18" height="18" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="request-form" className="section" aria-labelledby="request-title">
        <div className={`container ${styles.split}`}>
          <div className={styles.requestIntro}>
            <h2 id="request-title">Request security information</h2>
            <p>
              Tell us about your access, retention, deployment and data-handling requirements, and
              the documents your review needs.
            </p>
            <div className="card">
              <ul>
                <li>
                  <FileIcon width="18" height="18" aria-hidden="true" />
                  Availability of each document is confirmed when we reply.
                </li>
                <li>
                  <LockIcon width="18" height="18" aria-hidden="true" />
                  Sensitive documents are shared through an access-controlled process.
                </li>
              </ul>
            </div>
          </div>
          <EnquiryForm kind="security" />
        </div>
      </section>
    </>
  );
}
