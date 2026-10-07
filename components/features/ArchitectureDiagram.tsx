import { architectureDescription } from "@/content/platform";
import styles from "./features.module.css";

/**
 * The spec 7.2 architecture as responsive HTML rather than an image, so every label is real
 * text and the layout reflows on small screens. Connectors are decorative; the flow is
 * written out in the description below the diagram.
 */
export function ArchitectureDiagram() {
  return (
    <figure className={styles.diagram} aria-describedby="architecture-description">
      <div className={`${styles.diagramRow} ${styles.diagramRow2}`}>
        <div className={styles.node}>
          Phone and WhatsApp channels
          <small>Calls, messages, voice notes</small>
        </div>
        <div className={styles.node}>
          Consent and channel gateway
          <small>Opt-in, recording consent, eligibility</small>
        </div>
      </div>

      <div className={`${styles.diagramRow} ${styles.diagramRow3}`}>
        <div className={styles.node}>
          Business knowledge and conversation memory
          <small>Feeds every answer</small>
        </div>
        <div className={`${styles.node} ${styles.nodeCore}`}>
          AI voice and message orchestration
          <small>Understands, answers and decides the next step</small>
        </div>
        <div className={styles.node}>
          Conversation record and analytics
          <small>Every conversation and decision</small>
        </div>
      </div>

      <div className={`${styles.diagramRow} ${styles.diagramRow1}`}>
        <div className={`${styles.node} ${styles.nodeDecision}`}>Is the action permitted?</div>
      </div>

      <div className={`${styles.diagramRow} ${styles.diagramRow2}`}>
        <div className={styles.node}>
          <small>Routine</small>
          Workflow automation
          <small>Bookings, tickets, messages, follow-ups</small>
        </div>
        <div className={`${styles.node} ${styles.nodeHuman}`}>
          <small>Needs approval or escalation</small>
          Human review and handoff
          <small>Continues in workflow automation once approved</small>
        </div>
      </div>

      <div className={`${styles.diagramRow} ${styles.diagramRow1}`}>
        <div className={styles.node}>
          CRM, calendar and business integrations
          <small>Results return to the conversation</small>
        </div>
      </div>

      <figcaption id="architecture-description" className={styles.diagramNote}>
        {architectureDescription}
      </figcaption>
    </figure>
  );
}
