import { internationalDisplay, siteConfig, telHref, verifiedChannel, whatsappHref } from "@/config/site";
import { MessageIcon, PhoneIcon, ShieldIcon } from "@/components/ui/icons";
import styles from "./demoLines.module.css";
import trustStyles from "./trust.module.css";

function lines() {
  return {
    voice: verifiedChannel(siteConfig.demoLines.voice),
    whatsapp: verifiedChannel(siteConfig.demoLines.whatsapp),
  };
}

/** True when at least one live demo line can be shown. */
export function hasDemoLines(): boolean {
  const { voice, whatsapp } = lines();
  return Boolean(voice || whatsapp);
}

/**
 * Live demo lines on /book-demo: a phone number answered by the AI voice agent and a
 * WhatsApp number for the WhatsApp call agent. Only verified lines render (config/site.ts).
 */
export function DemoLines() {
  const { voice, whatsapp } = lines();
  if (!voice && !whatsapp) return null;

  return (
    <>
      <div className={styles.grid}>
        {voice && (
          <article className={styles.line} aria-labelledby="demo-line-voice">
            <div className={styles.head}>
              <span className={styles.icon} aria-hidden="true">
                <PhoneIcon width="24" height="24" />
              </span>
              <div>
                <p className={styles.kind}>AI voice call demo</p>
                <h3 id="demo-line-voice">Call the AI voice agent</h3>
              </div>
            </div>
            <a href={telHref(voice)} className={styles.number}>
              {voice.display}
            </a>
            <p className={styles.international}>From outside Sri Lanka: {internationalDisplay(voice)}</p>
            <ol className={styles.steps}>
              <li>Call {voice.display} from any phone.</li>
              <li>The AI agent answers and introduces itself.</li>
              <li>Talk to it as a customer would, for example about an order, a booking or a product.</li>
            </ol>
            <a href={telHref(voice)} className="button">
              <PhoneIcon width="18" height="18" />
              Call {voice.display}
            </a>
          </article>
        )}

        {whatsapp && (
          <article className={styles.line} aria-labelledby="demo-line-whatsapp">
            <div className={styles.head}>
              <span className={`${styles.icon} ${styles.iconWhatsapp}`} aria-hidden="true">
                <MessageIcon width="24" height="24" />
              </span>
              <div>
                <p className={styles.kind}>WhatsApp call agent demo</p>
                <h3 id="demo-line-whatsapp">Call the WhatsApp call agent</h3>
              </div>
            </div>
            <a href={whatsappHref(whatsapp)} className={styles.number} target="_blank" rel="noopener noreferrer">
              {whatsapp.display}
              <span className="sr-only"> (opens WhatsApp in a new tab)</span>
            </a>
            <p className={styles.international}>On WhatsApp: {internationalDisplay(whatsapp)}</p>
            <ol className={styles.steps}>
              <li>Open the chat with {whatsapp.display} in WhatsApp, or save the number.</li>
              <li>Tap the call icon to place a WhatsApp voice call.</li>
              <li>The AI agent answers, introduces itself and takes your request.</li>
            </ol>
            <a
              href={whatsappHref(whatsapp)}
              className="button button--whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageIcon width="18" height="18" />
              Open in WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </article>
        )}
      </div>

      <p className={styles.notice}>
        <ShieldIcon width="18" height="18" aria-hidden="true" />
        <span>
          On these demo lines you speak with an AI assistant, not a person. They are for trying the
          agent, so please don&apos;t share personal, health or payment details. Your network&apos;s
          standard call or data charges may apply.
        </span>
      </p>
    </>
  );
}

/** Compact version for the form's sidebar. */
export function DemoLinesCompact() {
  const { voice, whatsapp } = lines();
  if (!voice && !whatsapp) return null;

  return (
    <div className={`card ${styles.compact}`}>
      <h2 id="try-now-title" className={trustStyles.asideHeading}>
        Try the AI agent now
      </h2>
      <ul aria-labelledby="try-now-title">
        {voice && (
          <li>
            <PhoneIcon width="18" height="18" aria-hidden="true" />
            <span>
              <span className={styles.compactLabel}>Voice call demo</span>
              <a href={telHref(voice)}>{voice.display}</a>
            </span>
          </li>
        )}
        {whatsapp && (
          <li>
            <MessageIcon width="18" height="18" aria-hidden="true" />
            <span>
              <span className={styles.compactLabel}>WhatsApp call demo</span>
              <a href={whatsappHref(whatsapp)} target="_blank" rel="noopener noreferrer">
                {whatsapp.display}
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              </a>
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}
