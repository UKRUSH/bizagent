import Link from "next/link";
import { siteConfig, verifiedChannel, whatsappHref } from "@/config/site";
import styles from "./home.module.css";

/**
 * Final conversion band (spec 6.12). Contact options appear only when verified, and no
 * response-time promise is made.
 */
export function FinalCta() {
  const whatsapp = verifiedChannel(siteConfig.contact.whatsapp);

  return (
    <section className="cta-band" aria-labelledby="final-cta-title">
      <div className={`container ${styles.ctaInner}`}>
        <div>
          <h2 id="final-cta-title">See how the agent fits your business.</h2>
          <p>
            Tell us how customers contact you and what your team handles most often. We&rsquo;ll
            use that workflow to shape your demo.
          </p>
        </div>
        <div className="button-row">
          <Link href="/book-demo" className="button button--white">
            Book a Demo
          </Link>
          {whatsapp && (
            <a
              href={whatsappHref(whatsapp)}
              className="button button--whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
