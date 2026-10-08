import Link from "next/link";
import { formatPeriod, getPriceDisplay, planEnquiryHref, planFamilies, plans } from "@/content/plans";
import styles from "./pricing.module.css";

const numberFormatter = new Intl.NumberFormat("en-US");

/**
 * All plans in one comparison table inside its own labelled, focusable horizontal-scroll
 * region (spec 8.4), so narrow screens scroll the table rather than the page.
 */
export function PlanComparisonTable({ previewDrafts }: { previewDrafts: boolean }) {
  return (
    <div className="table-scroll" role="region" aria-labelledby="plan-comparison-caption" tabIndex={0}>
      <table className={styles.compare}>
        <caption id="plan-comparison-caption">Compare Agent BIZ MASTER plans</caption>
        <thead>
          <tr>
            <th scope="col">Plan</th>
            <th scope="col">Type</th>
            <th scope="col">Price</th>
            <th scope="col">AI-managed chats</th>
            <th scope="col">Call minutes</th>
            <th scope="col">Includes</th>
            <th scope="col">
              <span className="sr-only">Enquire</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => {
            const display = getPriceDisplay(plan, { previewDrafts });
            return (
              <tr key={plan.slug} data-family={plan.family}>
                <th scope="row">{plan.name}</th>
                <td>
                  <span className={styles.familyPill}>{planFamilies.find((family) => family.id === plan.family)?.label}</span>
                </td>
                <td>
                  {display.kind === "on-request"
                    ? display.label
                    : `${display.amount} ${formatPeriod(plan)}${display.kind === "draft" ? " (draft)" : ""}`}
                </td>
                <td>
                  Up to {numberFormatter.format(plan.chatAllowance)}
                  {plan.isTrial ? " for 2 weeks" : " per month"}
                </td>
                <td>{plan.voiceMinutes ? `${numberFormatter.format(plan.voiceMinutes)} per month` : "Not listed"}</td>
                <td>{plan.features.join(", ")}</td>
                <td>
                  <Link href={planEnquiryHref(plan)} className={styles.enquire}>
                    Enquire<span className="sr-only"> about {plan.name}</span>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
