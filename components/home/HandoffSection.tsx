import Link from "next/link";
import { previewDisclosure } from "@/content/previews";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/icons";
import styles from "./home.module.css";

/** Human handoff section (spec 6.8). The panel is fictional demo content. */
const triggers = [
  "The customer asks to speak with a person",
  "Frustration or negative sentiment is detected",
  "The assistant can't resolve the request",
  "A high-value commitment, above a limit you set",
  "A sensitive topic, such as legal, medical or financial matters",
];

const handoffDetails = [
  { term: "Conversation summary", detail: "Customer R. received a damaged order and wants a replacement before Friday." },
  { term: "Identified intent", detail: "Complaint · replacement request" },
  {
    term: "Previous attempts",
    detail: "Order found, delivery photos received, replacement stock checked: limited availability.",
  },
  { term: "Sentiment", detail: "Frustrated at first, calmer after acknowledgement" },
  { term: "Suggested next step", detail: "Approve an express replacement, or offer a refund." },
];

export function HandoffSection() {
  return (
    <section className="section" aria-labelledby="handoff-title">
      <div className={`container ${styles.split}`}>
        <div>
          <SectionHeading id="handoff-title" title="Your team stays in control.">
            <p>
              The assistant knows when to step aside. Conversations move to the right person with
              everything they need to continue, and actions that need approval wait for it.
            </p>
          </SectionHeading>
          <ul className={styles.triggerList}>
            {triggers.map((trigger) => (
              <li key={trigger}>
                <CheckIcon width="18" height="18" />
                {trigger}
              </li>
            ))}
          </ul>
          <Link href="/security" className="button button--secondary">
            How human control works
          </Link>
        </div>

        <figure className={styles.handoffPanel} aria-labelledby="handoff-panel-caption">
          <div className={styles.handoffHeader}>
            <strong>Handoff to Customer care supervisor</strong>
            <span className={styles.demoBadge}>Illustrative demo</span>
          </div>
          <dl>
            {handoffDetails.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
          <figcaption id="handoff-panel-caption" className={`preview-disclosure ${styles.caption}`}>
            {previewDisclosure}. Names and details are fictional.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
