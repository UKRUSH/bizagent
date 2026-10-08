import { previewDisclosure } from "@/content/previews";
import type { ConversationChannel, FictionalScenario } from "@/content/types";
import styles from "./directory.module.css";

const channelLabels: Record<ConversationChannel, string> = {
  phone: "Phone call",
  whatsapp: "WhatsApp",
  "whatsapp-voice": "WhatsApp voice call",
};

const speakerLabels = { customer: "Customer", assistant: "AI assistant", team: "Team member" } as const;

/** Fictional, clearly labelled industry scenario (spec 9). */
export function IndustryScenario({ scenario }: { scenario: FictionalScenario }) {
  return (
    <figure className={`conversation-preview ${styles.scenario}`} aria-labelledby="scenario-caption">
      <div className="preview-toolbar">
        <span className={styles.scenarioTitle}>
          {channelLabels[scenario.channel]} · {scenario.title}
        </span>
        <span className={styles.demoBadge}>Illustrative demo</span>
      </div>
      <div className="preview-body">
        <ol className={styles.transcript} aria-label="Fictional conversation">
          {scenario.messages.map((message, index) => (
            <li
              key={index}
              className={`message ${message.speaker === "customer" ? "" : "message--ai"} ${message.speaker === "team" ? styles.teamMessage : ""}`}
            >
              <span className="message-label">{speakerLabels[message.speaker]}</span>
              <p>{message.text}</p>
            </li>
          ))}
        </ol>
        <div className="handoff-summary">
          <strong>Outcome</strong>
          <p className={styles.outcome}>{scenario.outcome}</p>
        </div>
      </div>
      <figcaption id="scenario-caption" className={`preview-disclosure ${styles.caption}`}>
        {previewDisclosure}. Names and details are fictional.
      </figcaption>
    </figure>
  );
}
