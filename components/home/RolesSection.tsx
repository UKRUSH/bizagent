import Link from "next/link";
import type { ReactNode } from "react";
import { getModules } from "@/content/modules";
import { roles } from "@/content/roles";
import type { RoleSlug } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon, HeadsetIcon, TrendingUpIcon, UserCheckIcon } from "@/components/ui/icons";
import styles from "./home.module.css";

const roleIcons: Record<RoleSlug, ReactNode> = {
  "call-center": <HeadsetIcon />,
  "sales-agent": <TrendingUpIcon />,
  "personal-assistant": <UserCheckIcon />,
};

/** Three operating roles (spec 6.3). Each card links to its role page. */
export function RolesSection() {
  return (
    <section className="section section--muted" aria-labelledby="roles-title">
      <div className="container">
        <SectionHeading id="roles-title" title="Choose the role your business needs.">
          <p>
            One platform works in three roles. The AI assistant handles repeat questions, first
            responses and scheduled follow-ups; your team handles relationships, negotiations and
            exceptions.
          </p>
        </SectionHeading>
        <div className="grid-3">
          {roles.map((role) => (
            <article key={role.slug} className={`card ${styles.cardWithLink}`} aria-labelledby={`role-${role.slug}`}>
              <div className="card-icon">{roleIcons[role.slug]}</div>
              <h3 id={`role-${role.slug}`} className={styles.cardTitle}>
                {role.title}
              </h3>
              <p>{role.summary}</p>
              <ul className={styles.moduleTags} aria-label={`Main modules for ${role.title}`}>
                {getModules(role.modules).map((entry) => (
                  <li key={entry.slug}>{entry.shortTitle}</li>
                ))}
              </ul>
              <Link href={role.href} className={styles.cardLink}>
                Explore the {role.title} role
                <ArrowRightIcon width="18" height="18" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
