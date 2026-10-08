import { previewDisclosure, stageLabels, type RolePreview } from "@/content/previews";
import { HeadsetIcon, UserCheckIcon } from "@/components/ui/icons";
import styles from "./solutions.module.css";

/** Static, labelled fictional conversation for a role page (spec 4.2, 6.3). */
export function RoleConversation({ preview }: { preview: RolePreview }) {
  return (
    <figure className={`conversation-preview ${styles.preview}`} aria-labelledby="role-preview-caption">
      <div className="preview-toolbar">
        <span className={styles.context}>
          <span className={styles.contextIcon} aria-hidden="true">
            <HeadsetIcon width="16" height="16" />
          </span>
          {preview.context}
        </span>
        <span className={styles.demoBadge}>Illustrative demo</span>
      </div>
      <div className="preview-body">
        <ol className={styles.transcript} aria-label="Fictional conversation">
          {preview.messages.map((message, index) => (
            <li key={index} className={`message ${message.speaker === "assistant" ? "message--ai" : ""}`}>
              <span className="message-label">{message.speaker === "assistant" ? "AI assistant" : "Customer"}</span>
              <p>{message.text}</p>
            </li>
          ))}
        </ol>
        <ol className={styles.stages} aria-label="What happened">
          {stageLabels.map((label, index) => (
            <li key={label}>
              <strong>{label}:</strong> {preview.stages[index]}
            </li>
          ))}
        </ol>
        <div className={`handoff-summary ${styles.handoff}`}>
          <span className={styles.handoffIcon} aria-hidden="true">
            <UserCheckIcon width="18" height="18" />
          </span>
          <div>
            <strong>Handoff to {preview.handoff.to}</strong>
            <p className={styles.handoffReason}>{preview.handoff.reason}</p>
          </div>
        </div>
      </div>
      <figcaption id="role-preview-caption" className={`preview-disclosure ${styles.caption}`}>
        {previewDisclosure}. Names and details are fictional.
      </figcaption>
    </figure>
  );
}
