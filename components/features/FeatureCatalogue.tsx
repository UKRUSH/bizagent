"use client";

import Link from "next/link";
import { useState } from "react";
import type { ModuleCategory } from "@/content/types";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "./features.module.css";

export interface CatalogueModule {
  slug: string;
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
 */
export function FeatureCatalogue({ modules, categories }: FeatureCatalogueProps) {
  const [filter, setFilter] = useState<ModuleCategory | "all">("all");
  const visible = modules.filter((entry) => filter === "all" || entry.category === filter);
  const activeCategory = categories.find((category) => category.id === filter);

  return (
    <div>
      <div className={styles.filters} role="group" aria-label="Filter modules by category">
        <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
          All modules
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={filter === category.id}
            onClick={() => setFilter(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <p className={styles.filterStatus} role="status">
        {activeCategory
          ? `${activeCategory.label}: ${activeCategory.description} Showing ${visible.length} of ${modules.length} modules.`
          : `Showing all ${modules.length} modules.`}
      </p>

      <ul className={styles.catalogue}>
        {modules.map((entry) => (
          <li key={entry.slug} hidden={!visible.includes(entry)}>
            <article className={`card card--interactive ${styles.catalogueCard}`} aria-labelledby={`catalogue-${entry.slug}`}>
              <p className={styles.cardMeta}>
                Module {entry.number} · {entry.categoryLabel}
              </p>
              <h3 id={`catalogue-${entry.slug}`}>{entry.title}</h3>
              <p>{entry.summary}</p>
              <ul className={styles.cardBenefits} aria-label="Benefits">
                {entry.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <p className={styles.cardAvailability}>{entry.availabilityLabel}</p>
              <Link href={`/features/${entry.slug}`} className={styles.cardLink}>
                View module<span className="sr-only">: {entry.title}</span>
                <ArrowRightIcon width="18" height="18" />
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
