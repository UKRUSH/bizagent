import Link from "next/link";
import { formatAllowance, getPriceDisplay, planEnquiryHref, type PriceDisplay } from "@/content/plans";
import type { Plan } from "@/content/types";
import { CheckIcon } from "@/components/ui/icons";
import styles from "./pricing.module.css";

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

/** A paid plan card (spec 8.4). The CTA preselects the plan on the demo form. */
export function PlanCard({ plan, previewDrafts }: { plan: Plan; previewDrafts: boolean }) {
  const headingId = `plan-${plan.slug}`;
  return (
    <article className="card plan-card" aria-labelledby={headingId}>
      <h3 id={headingId}>{plan.name}</h3>
      <PriceBlock display={getPriceDisplay(plan, { previewDrafts })} />
      <ul className={styles.allowance}>
        {formatAllowance(plan).map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
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
      <div>
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
