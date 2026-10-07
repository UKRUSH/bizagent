import { SectionHeading } from "@/components/ui/SectionHeading";
import { UserCheckIcon } from "@/components/ui/icons";
import styles from "./home.module.css";

/**
 * Workflow section (spec 6.6). No promise that verification or custom integration finishes
 * within a fixed time.
 */
const steps = [
  {
    title: "Connect an eligible channel",
    text: "Connect your phone line or WhatsApp Business number. Eligibility and verification follow each provider's process.",
  },
  {
    title: "Add business knowledge",
    text: "Upload the documents, FAQs, products and policies the assistant should answer from.",
  },
  {
    title: "Configure routing and approvals",
    text: "Set hours, languages and handoff rules, and choose which actions need a person's approval.",
  },
  {
    title: "Review conversations and improve",
    text: "Read transcripts and outcomes, update knowledge, and adjust rules as you learn.",
  },
];

export function WorkflowSection() {
  return (
    <section className="section" aria-labelledby="workflow-title">
      <div className="container">
        <SectionHeading id="workflow-title" title="From first question to the next action." />
        <ol className={styles.steps}>
          {steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className={styles.callout}>
          <UserCheckIcon />
          <p>
            <strong>Human review point.</strong> Commitments such as prices, refunds and contracts,
            sensitive requests, and anything the assistant cannot resolve go to your team before
            anything is promised.
          </p>
        </div>
      </div>
    </section>
  );
}
