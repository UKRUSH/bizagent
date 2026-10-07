import Link from "next/link";
import { getHomepageIndustries, industries } from "@/content/industries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "./home.module.css";

/** Six launch industry cards (spec 6.7) linking to the full directory. */
export function IndustriesSection() {
  return (
    <section className="section section--muted" aria-labelledby="industries-title">
      <div className="container">
        <SectionHeading id="industries-title" title="Built around how your industry works.">
          <p>
            See how bookings, enquiries, reminders and handoff fit together in your sector, with
            sensitive and regulated decisions kept with your team.
          </p>
        </SectionHeading>
        <div className="grid-3">
          {getHomepageIndustries().map((industry) => (
            <article
              key={industry.slug}
              className={`card card--interactive ${styles.cardWithLink}`}
              aria-labelledby={`industry-${industry.slug}`}
            >
              <h3 id={`industry-${industry.slug}`} className={styles.cardTitle}>
                {industry.homepageTitle}
              </h3>
              <p>{industry.summary}</p>
              <Link href={`/industries/${industry.slug}`} className={styles.cardLink}>
                Explore {industry.homepageTitle}
                <ArrowRightIcon width="18" height="18" />
              </Link>
            </article>
          ))}
        </div>
        <p className={styles.sectionFooter}>
          <Link href="/industries" className="button button--secondary">
            View all {industries.length} industries
          </Link>
        </p>
      </div>
    </section>
  );
}
