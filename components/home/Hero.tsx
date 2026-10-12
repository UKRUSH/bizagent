import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { HeroImage } from "./HeroImage";
import styles from "./home.module.css";

/**
 * Homepage hero (spec 6.1): copy on the left over a decorative background image
 * (HeroImage) whose subject shows on the right. The language chip reflects the intended
 * product languages; it must match the tested configuration before launch (BUILD_PLAN
 * open confirmation 6).
 */
const capabilities = ["Calls and WhatsApp", "Sinhala, Tamil and English workflows", "Human handoff"];

export function Hero() {
  return (
    <section className={`hero ${styles.heroWithMedia}`} aria-labelledby="hero-title">
      <HeroImage />
      <div className={`container hero-grid ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <span className={`eyebrow ${styles.heroEyebrow}`}>BizMaster Solutions · Tech Hub Division</span>
          <h1 id="hero-title">
            AI Agentic Solutions for <span className={styles.accent}>Business Automation.</span>
          </h1>
          <p>
            Deploy AI agents that answer calls, reply on WhatsApp, book appointments, and follow up
            on leads — automating routine work while your team stays in control of every handoff.
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
              <Link href="/whatsapp-ai#plans">
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
