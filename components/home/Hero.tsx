import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { HeroVideo } from "./HeroVideo";
import styles from "./home.module.css";

/**
 * Homepage hero (spec 6.1): copy on the left over a decorative background video
 * (HeroVideo) whose subject shows on the right. The language chip reflects the intended
 * product languages; it must match the tested configuration before launch (BUILD_PLAN
 * open confirmation 6).
 */
const capabilities = ["Calls and WhatsApp", "Sinhala, Tamil and English workflows", "Human handoff"];

export function Hero() {
  return (
    <section className={`hero ${styles.heroWithVideo}`} aria-labelledby="hero-title">
      <HeroVideo />
      <div className={`container hero-grid ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <span className={`eyebrow ${styles.heroEyebrow}`}>BizMaster Solutions · Tech Hub Division</span>
          <h1 id="hero-title">
            Keep every customer conversation <span className={styles.accent}>moving.</span>
          </h1>
          <p>
            Bring calls, WhatsApp messages, bookings, and follow-ups into one AI-assisted workflow.
            Give customers timely help and give your team the context they need to take over.
          </p>
          <div className="button-row">
            <Link href="/book-demo" className="button button--white">
              Book a Demo
            </Link>
            <Link href="/platform" className="button button--secondary">
              Explore the Platform
            </Link>
          </div>
          <ul className={styles.supportLinks}>
            <li>
              <Link href="/pricing">
                See WhatsApp Plans <ArrowRightIcon width="16" height="16" />
              </Link>
            </li>
            <li>
              <Link href="/demo">
                View Illustrative Demo <ArrowRightIcon width="16" height="16" />
              </Link>
            </li>
          </ul>
          <ul className="capability-row" aria-label="Capabilities">
            {capabilities.map((capability) => (
              <li key={capability} className="capability-chip">
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
