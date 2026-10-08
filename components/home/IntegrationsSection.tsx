import Link from "next/link";
import { getIntegrationsByGroup, integrationGroups, integrationStatusLabels } from "@/content/integrations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./home.module.css";

/**
 * Integrations grouped as in spec 6.9, using text labels rather than third-party logos.
 * Systems show their status in words when it differs from the default assessment.
 */
export function IntegrationsSection() {
  return (
    <section className="section section--muted" aria-labelledby="integrations-title">
      <div className="container">
        <SectionHeading id="integrations-title" title="Works with the systems you already use.">
          <p>
            Connect conversations to your CRM, calendar, commerce and back-office tools, so
            bookings, leads and tickets land where your team already works.
          </p>
        </SectionHeading>
        <div className={styles.integrationGrid}>
          {integrationGroups.map((group) => (
            <article key={group.id} className={`card ${styles.integrationCard}`} aria-labelledby={`integration-${group.id}`}>
              <h3 id={`integration-${group.id}`}>{group.label}</h3>
              <dl>
                {getIntegrationsByGroup(group.id).map((category, _index, groupCategories) => (
                  <div key={category.id}>
                    {/* A lone category repeats the card title, so it is announced but not shown. */}
                    <dt className={groupCategories.length === 1 ? "sr-only" : undefined}>{category.name}</dt>
                    <dd>
                      <ul className={styles.systemChips}>
                        {category.systems.map((system) => (
                          <li key={system.name}>
                            {system.status === "needs-assessment"
                              ? system.name
                              : `${system.name} (${integrationStatusLabels[system.status]})`}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <p className={styles.note}>
          Unless marked otherwise, listed systems have the status &ldquo;
          {integrationStatusLabels["needs-assessment"]}&rdquo;: compatibility is confirmed for your
          setup before anything is promised. Systems marked &ldquo;{integrationStatusLabels.custom}
          &rdquo; are connected through APIs scoped with your team.
        </p>
        <Link href="/integrations" className="button button--secondary">
          Check compatibility
        </Link>
      </div>
    </section>
  );
}
