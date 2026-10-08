"use client";

import Link from "next/link";
import { useState } from "react";
import type { ModuleCategory, ModuleSlug } from "@/content/types";
import { ArrowRightIcon, CheckIcon, LayersIcon } from "@/components/ui/icons";
import { moduleIcons } from "./moduleIcons";
import styles from "./features.module.css";

export interface CatalogueModule {
  slug: ModuleSlug;
  number: number;
  title: string;
  summary: string;
  category: ModuleCategory;
  categoryLabel: string;
  availabilityLabel: string;
  benefits: string[];
}

interface FeatureCatalogueProps {
  modules: CatalogueModule[];
  categories: { id: ModuleCategory; label: string; description: string }[];
}

/**
 * Category filter for the 13 modules (spec 5 /features). Every card is in the server HTML;
 * the filter only hides cards, so the full catalogue is available without JavaScript.
 * Each card's single link covers the whole card.
 */
export function FeatureCatalogue({ modules, categories }: FeatureCatalogueProps) {
  const [filter, setFilter] = useState<ModuleCategory | "all">("all");
  const visible = modules.filter((entry) => filter === "all" || entry.category === filter);
  const activeCategory = categories.find((category) => category.id === filter);
  const countFor = (id: ModuleCategory) => modules.filter((entry) => entry.category === id).length;

  return (
    <div>
      <div className={styles.filterBar}>
        <div className={styles.filters} role="group" aria-label="Filter modules by category">
          <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
            All modules <span className={styles.count}>{modules.length}</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={filter === category.id}
              onClick={() => setFilter(category.id)}
            >
              {category.label} <span className={styles.count}>{countFor(category.id)}</span>
            </button>
          ))}
        </div>
      </div>

      <p className={styles.filterStatus} role="status">
        {activeCategory
          ? `${activeCategory.label}: ${activeCategory.description} Showing ${visible.length} of ${modules.length} modules.`
          : `Showing all ${modules.length} modules.`}
      </p>

      <ul className={styles.catalogue}>
        {modules.map((entry) => {
          const Icon = moduleIcons[entry.slug];
          return (
            <li key={entry.slug} hidden={!visible.includes(entry)}>
              <article className={`card card--interactive ${styles.catalogueCard}`} aria-labelledby={`catalogue-${entry.slug}`}>
                <div className={styles.cardTop}>
                  <span className="card-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className={styles.moduleNumber}>Module {entry.number}</span>
                </div>
                <p className={styles.cardMeta}>{entry.categoryLabel}</p>
                <h3 id={`catalogue-${entry.slug}`}>{entry.title}</h3>
                <p>{entry.summary}</p>
                <ul className={styles.cardBenefits} aria-label="Benefits">
                  {entry.benefits.map((benefit) => (
                    <li key={benefit}>
                      <CheckIcon width="16" height="16" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className={styles.cardFooter}>
                  <p className={styles.cardAvailability}>{entry.availabilityLabel}</p>
                  <Link href={`/features/${entry.slug}`} className={styles.cardLink}>
                    View module<span className="sr-only">: {entry.title}</span>
                    <ArrowRightIcon width="18" height="18" />
                  </Link>
                </div>
              </article>
            </li>
          );
        })}
        {filter === "all" && (
          <li className={styles.closingTile}>
            <div className={styles.closingIcon} aria-hidden="true">
              <LayersIcon width={26} height={26} />
            </div>
            <div>
              <h3>One platform under every module.</h3>
              <p>
                Each module shares the same knowledge, conversation history and handoff rules, so
                you can start with one and add more as your workflow grows.
              </p>
              <Link href="/platform" className="button button--secondary">
                See how the platform works
                <ArrowRightIcon width="18" height="18" />
              </Link>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
