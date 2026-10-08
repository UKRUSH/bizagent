import { previewDisclosure } from "@/content/previews";
import { whatsappPreview } from "@/content/whatsapp";
import { MessageIcon, MicIcon } from "@/components/ui/icons";
import styles from "./whatsapp.module.css";

/**
 * Fictional WhatsApp-style chat in a phone frame (spec 4.2, 8.1). Shows a voice note being
 * transcribed and answered. The green dot is a small channel indicator only (spec 3.1).
 */
export function WhatsAppPreview() {
  return (
    <div className={styles.preview}>
      <figure className={styles.screen} aria-labelledby="whatsapp-preview-caption">
        <div className={styles.header}>
          <span className={styles.channel}>
            <span className={styles.avatar} aria-hidden="true">
              <MessageIcon />
              <span className={styles.dot} />
            </span>
            WhatsApp · {whatsappPreview.businessName}
          </span>
          <span className={styles.demoBadge}>Illustrative demo</span>
        </div>
        <ol className={styles.chat} aria-label="Fictional WhatsApp conversation">
          {whatsappPreview.messages.map((message, index) => (
            <li
              key={index}
              className={message.speaker === "assistant" ? styles.assistant : styles.customer}
            >
              <span className={styles.sender}>
                {message.speaker === "assistant" ? "AI assistant" : "Customer"}
              </span>
              {message.kind === "voice-note" ? (
                <>
                  <span className={styles.voiceNote}>
                    <MicIcon width="16" height="16" /> Voice note · {message.duration}
                  </span>
                  <span className={styles.transcript}>Transcribed: &ldquo;{message.text}&rdquo;</span>
                </>
              ) : (
                <span>{message.text}</span>
              )}
            </li>
          ))}
        </ol>
        <p className={styles.outcome}>{whatsappPreview.outcome}</p>
        <figcaption id="whatsapp-preview-caption" className={styles.caption}>
          {previewDisclosure}. Names and details are fictional.
        </figcaption>
      </figure>
    </div>
  );
}
