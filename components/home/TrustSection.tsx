import Link from "next/link";
import { homepageFaqs } from "@/content/faqs";
import { operatingPrinciples } from "@/content/handoff";
import { securityInterimStatement } from "@/content/security";
import { FaqList } from "@/components/ui/FaqList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon, ShieldIcon } from "@/components/ui/icons";
import styles from "./home.module.css";

/**
 * Security and FAQ (spec 6.11). Only operating principles are stated; specific security
 * controls stay off the page until confirmed (spec 11.2).
 */
export function TrustSection() {
  return (
    <section className="section section--muted" aria-labelledby="faq-title">
      <div className={`container ${styles.trustGrid}`}>
        <section className="card" aria-labelledby="security-title">
          <div className="card-icon">
            <ShieldIcon />
          </div>
          <h2 id="security-title" className={styles.cardTitle}>
            Security and data handling
          </h2>
          <p>{securityInterimStatement}</p>
          <ul className={styles.triggerList}>
            {operatingPrinciples.slice(0, 5).map((principle) => (
              <li key={principle}>
                <CheckIcon width="18" height="18" />
                {principle}
              </li>
            ))}
          </ul>
          <Link href="/security" className={styles.cardLink}>
            Read about security and human control
          </Link>
        </section>
        <div>
          <SectionHeading id="faq-title" title="Questions businesses ask." />
          <FaqList questions={homepageFaqs} />
        </div>
      </div>
    </section>
  );
}
