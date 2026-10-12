import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./home.module.css";

/**
 * Decorative background image for the homepage hero: a face split between a human agent
 * and an AI agent, both wearing headsets. It carries no information, so it is aria-hidden
 * with an empty alt. A tiny blurred copy fills the rest of the hero around the frame.
 */
const FILL = "/media/hero-ai-agent-fill.webp";

export function HeroImage() {
  return (
    <div
      className={styles.heroMedia}
      aria-hidden="true"
      style={{ "--hero-poster": `url(${FILL})` } as CSSProperties}
    >
      <Image
        src="/media/hero-ai-agent.jpg"
        alt=""
        width={2000}
        height={1116}
        sizes="(max-width: 1023px) 100vw, 1440px"
        className={styles.heroImage}
        preload
      />
    </div>
  );
}
