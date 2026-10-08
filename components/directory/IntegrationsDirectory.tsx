"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { Availability, IntegrationCategory } from "@/content/types";
import { matchesAllTerms, toTerms } from "@/lib/search";
import { SearchIcon } from "@/components/ui/icons";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { integrationIcons } from "./integrationIcons";
import styles from "./directory.module.css";

interface IntegrationsDirectoryProps {
  categories: IntegrationCategory[];
  statusLabels: Record<Availability, string>;
}

const statusOrder: Availability[] = ["available", "custom", "planned", "needs-assessment"];

/**
 * Searchable integration directory (spec 10). Status is written as text on every system,
 * never conveyed by colour or logos. Each category keeps its id (e.g. #crm) for deep links,
 * and the jump bar links to the categories that match the current filters.
 */
export function IntegrationsDirectory({ categories, statusLabels }: IntegrationsDirectoryProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Availability | "all">("all");
  const searchId = useId();
  const statusId = useId();

  const terms = toTerms(query);
  const allSystems = categories.flatMap((category) => category.systems);
  const countFor = (value: Availability) => allSystems.filter((system) => system.status === value).length;

  const visible = categories.map((category) => {
    const categoryMatches = matchesAllTerms(`${category.name} ${category.description}`, terms);
    const systems = category.systems.filter(
      (system) =>
        (status === "all" || system.status === status) &&
        (categoryMatches || matchesAllTerms(system.name, terms)),
    );
    return { category, systems };
  });
  const visibleSystems = visible.reduce((total, item) => total + item.systems.length, 0);

  return (
    <div>
      <div className={`${styles.searchPanel} ${styles.integrationSearch}`}>
        <div className={styles.field}>
          <label htmlFor={searchId}>Search systems</label>
          <div className={styles.searchBox}>
            <SearchIcon className={styles.searchIcon} width="20" height="20" />
            <input
              id={searchId}
              type="search"
              value={query}
              placeholder="e.g. HubSpot, calendar, SIP"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor={statusId}>Status</label>
          <select id={statusId} value={status} onChange={(event) => setStatus(event.target.value as Availability | "all")}>
            <option value="all">All statuses ({allSystems.length})</option>
            {statusOrder.map((value) => (
              <option key={value} value={value}>
                {statusLabels[value]} ({countFor(value)})
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className={styles.status} role="status">
        {`Showing ${visibleSystems} of ${allSystems.length} systems.`}
      </p>

      <nav className={styles.jumpBar} aria-label="Jump to a category">
        <ul>
          {visible
            .filter(({ systems }) => systems.length > 0)
            .map(({ category }) => (
              <li key={category.id}>
                <a href={`#${category.id}`}>{category.name}</a>
              </li>
            ))}
        </ul>
      </nav>

      <div className={styles.categoryGrid}>
        {visible.map(({ category, systems }) => {
          const Icon = integrationIcons[category.id];
          return (
            <section
              key={category.id}
              id={category.id}
              className={`card ${styles.category}`}
              aria-labelledby={`${category.id}-title`}
              hidden={systems.length === 0}
            >
              <div className={styles.categoryHeader}>
                <span className="card-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h2 id={`${category.id}-title`} className={styles.cardTitle}>
                  {category.name}
                </h2>
                <span className={styles.systemCount}>
                  {systems.length} {systems.length === 1 ? "system" : "systems"}
                </span>
              </div>
              <p>{category.description}</p>
              <ul className={styles.systems}>
                {systems.map((system) => (
                  <li key={system.name}>
                    <span>{system.name}</span>
                    <StatusBadge label={statusLabels[system.status]} />
                  </li>
                ))}
              </ul>
              {category.note && <p className={styles.categoryNote}>{category.note}</p>}
            </section>
          );
        })}
      </div>

      {visibleSystems === 0 && (
        <div className={styles.empty}>
          <p>
            <strong>No systems match your search.</strong> Custom integrations through APIs and
            webhooks are assessed for your setup.
          </p>
          <Link href="/book-demo" className="button button--secondary">
            Check compatibility
          </Link>
        </div>
      )}
    </div>
  );
}
