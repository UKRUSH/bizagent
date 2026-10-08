import type { Metadata } from "next";
import Link from "next/link";
import { ReceiptView } from "@/components/forms/ReceiptView";
import { PageHero } from "@/components/ui/PageHero";
import styles from "@/components/trust/trust.module.css";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

/** Confirmation page (spec 5 /thank-you). The receipt shows only after a genuine submission. */
export default function ThankYouPage() {
  return (
    <>
      <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Your request" }]} title="Your request" />
      <section className="section" aria-label="Your request">
        <div className={`container ${styles.split}`}>
          <ReceiptView />
          <div>
            <h2>While you wait</h2>
            <ul className="feature-list">
              <li>
                <Link href="/platform">See how the platform works</Link>
              </li>
              <li>
                <Link href="/features">Explore all 13 modules</Link>
              </li>
              <li>
                <Link href="/security">Read about security and human control</Link>
              </li>
            </ul>
            <p>
              <Link href="/" className="button button--secondary">
                Return to the homepage
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
