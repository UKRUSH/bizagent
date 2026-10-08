import Link from "next/link";
import { formatAllowance, getPriceDisplay, planEnquiryHref, planFamilies, type PriceDisplay } from "@/content/plans";
import type { Plan } from "@/content/types";
import { CheckIcon, MessageIcon, PhoneIcon, SparkIcon } from "@/components/ui/icons";
import styles from "./pricing.module.css";

const numberFormatter = new Intl.NumberFormat("en-US");

function PriceBlock({ display }: { display: PriceDisplay }) {
  if (display.kind === "on-request") {
    return (
      <p className="plan-price">
        <strong className={styles.onRequest}>{display.label}</strong>
      </p>
    );
  }
  return (
    <div>
      {display.kind === "draft" && <p className={styles.draftBadge}>{display.label}</p>}
      <p className="plan-price">
        <strong>{display.amount}</strong>
        <span>{display.period}</span>
      </p>
    </div>
  );
}

/**
 * Allowances as metric tiles ("Up to 2,000 AI-managed chats per month"), read in that order
 * by screen readers. Uses the same numbers as formatAllowance in content/plans.ts.
 */
function Allowances({ plan }: { plan: Plan }) {
  const period = plan.isTrial ? "for 2 weeks" : "per month";
  return (
    <ul className={styles.metrics}>
      <li>
        <span className={styles.metricUpTo}>Up to</span>
        <strong>{numberFormatter.format(plan.chatAllowance)}</strong>
        <span className={styles.metricLabel}>AI-managed chats {period}</span>
      </li>
      {plan.voiceMinutes ? (
        <li>
          <span className={styles.metricUpTo}>Includes</span>
          <strong>{numberFormatter.format(plan.voiceMinutes)}</strong>
          <span className={styles.metricLabel}>call minutes {period}</span>
        </li>
      ) : null}
    </ul>
  );
}

/** A paid plan card (spec 8.4). The CTA preselects the plan on the demo form. */
export function PlanCard({ plan, previewDrafts }: { plan: Plan; previewDrafts: boolean }) {
  const headingId = `plan-${plan.slug}`;
  const family = planFamilies.find((item) => item.id === plan.family);
  const FamilyIcon = plan.family === "voice" ? PhoneIcon : MessageIcon;
  return (
    <article className={`card plan-card ${styles.planCard}`} aria-labelledby={headingId}>
      <div className={styles.planHeader}>
        <h3 id={headingId}>{plan.name}</h3>
        {family && (
          <span className={styles.familyBadge}>
            <FamilyIcon width="14" height="14" aria-hidden="true" />
            {family.label}
          </span>
        )}
      </div>
      <PriceBlock display={getPriceDisplay(plan, { previewDrafts })} />
      <Allowances plan={plan} />
      <ul className={styles.features}>
        {plan.features.map((feature) => (
          <li key={feature}>
            <CheckIcon width="18" height="18" />
            {feature}
          </li>
        ))}
      </ul>
      <Link href={planEnquiryHref(plan)} className="button">
        {plan.ctaLabel}
      </Link>
    </article>
  );
}

/** The trial shown as a compact banner above the paid cards (spec 15.2). */
export function TrialBanner({ plan, previewDrafts }: { plan: Plan; previewDrafts: boolean }) {
  const display = getPriceDisplay(plan, { previewDrafts });
  return (
    <aside className={styles.trialBanner} aria-labelledby={`plan-${plan.slug}`}>
      <span className={styles.trialIcon} aria-hidden="true">
        <SparkIcon width={22} height={22} />
      </span>
      <div className={styles.trialText}>
        <h3 id={`plan-${plan.slug}`}>{plan.name}</h3>
        <p>
          {formatAllowance(plan).join(" · ")} · {plan.features.join(", ")}.
          {display.kind !== "on-request" && ` ${display.amount} ${display.period}.`}
          {" "}Trial terms are confirmed when you enquire.
        </p>
      </div>
      <Link href={planEnquiryHref(plan)} className="button button--secondary">
        {plan.ctaLabel}
      </Link>
    </aside>
  );
}
