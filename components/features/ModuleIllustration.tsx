import { previewDisclosure } from "@/content/previews";
import type { ModuleIllustration as Illustration } from "@/content/module-illustrations";
import styles from "./features.module.css";

/** Dark, clearly labelled fictional illustration for a module page (spec 7.1). */
export function ModuleIllustration({ illustration }: { illustration: Illustration }) {
  return (
    <figure className={styles.illustration} aria-labelledby="illustration-caption">
      <div className={styles.illustrationHeader}>
        <strong>{illustration.title}</strong>
        <span className={styles.demoBadge}>Illustrative demo</span>
      </div>
      <ol className={styles.events}>
        {illustration.events.map((event) => (
          <li key={event.label}>
            <span className={styles.eventLabel}>{event.label}</span>
            <span>{event.detail}</span>
          </li>
        ))}
      </ol>
      <p className={styles.illustrationOutcome}>{illustration.outcome}</p>
      <figcaption id="illustration-caption" className={styles.illustrationCaption}>
        {previewDisclosure}. Names and details are fictional.
      </figcaption>
    </figure>
  );
}
