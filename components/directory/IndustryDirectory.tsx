"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { matchesAllTerms, toTerms } from "@/lib/search";
import { ArrowRightIcon, CloseIcon, LayersIcon, SearchIcon } from "@/components/ui/icons";
import { industryIcon } from "./industryIcons";
import styles from "./directory.module.css";

export interface DirectoryIndustry {
  slug: string;
  name: string;
  summary: string;
  moduleNames: string[];
  /** Lower-case text searched by the filter. */
  searchText: string;
}

/**
 * Searchable industry directory (spec 5 /industries). Every card is in the server HTML;
 * the search only hides cards, and the result count is announced politely. `suggestions`
 * are one-tap searches passed from the server (content/industries.ts).
 */
export function IndustryDirectory({ industries, suggestions }: { industries: DirectoryIndustry[]; suggestions: string[] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const terms = toTerms(query);
  const matches = (industry: DirectoryIndustry) => matchesAllTerms(industry.searchText, terms);
  const visibleCount = industries.filter(matches).length;

  return (
    <div>
      <div className={styles.searchPanel}>
        <div className={styles.field}>
          <label htmlFor={inputId}>Search industries</label>
          <div className={styles.searchBox}>
            <SearchIcon className={styles.searchIcon} width="20" height="20" />
            <input
              id={inputId}
              type="search"
              value={query}
              placeholder="e.g. bookings, clinic, renewal"
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button type="button" className={styles.clear} onClick={() => setQuery("")} aria-label="Clear search">
                <CloseIcon width="18" height="18" />
              </button>
            )}
          </div>
        </div>
        <div className={styles.suggestions} role="group" aria-label="Try a search">
          <span aria-hidden="true">Try:</span>
          {suggestions.map((term) => (
            <button key={term} type="button" aria-pressed={query === term} onClick={() => setQuery(term)}>
              {term}
            </button>
          ))}
        </div>
      </div>
      <p className={styles.status} role="status">
        {terms.length ? `${visibleCount} of ${industries.length} industries match.` : `${industries.length} industries.`}
      </p>

      <ul className={styles.cardGrid}>
        {industries.map((industry) => {
          const Icon = industryIcon(industry.slug);
          return (
            <li key={industry.slug} hidden={!matches(industry)}>
              <article className={`card card--interactive ${styles.card}`} aria-labelledby={`industry-${industry.slug}`}>
                <div className={styles.cardHeader}>
                  {Icon && (
                    <span className="card-icon" aria-hidden="true">
                      <Icon />
                    </span>
                  )}
                  <h2 id={`industry-${industry.slug}`} className={styles.cardTitle}>
                    {industry.name}
                  </h2>
                </div>
                <p>{industry.summary}</p>
                <ul className={styles.tags} aria-label="Recommended modules">
                  {industry.moduleNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
                <Link href={`/industries/${industry.slug}`} className={styles.cardLink}>
                  Explore industry<span className="sr-only">: {industry.name}</span>
                  <ArrowRightIcon width="18" height="18" />
                </Link>
              </article>
            </li>
          );
        })}
        {terms.length === 0 && (
          <li className={styles.closingTile}>
            <span className={styles.closingIcon} aria-hidden="true">
              <LayersIcon width={24} height={24} />
            </span>
            <h2 className={styles.cardTitle}>Prefer to start from a capability?</h2>
            <p>Every industry page is built from the same modules. Browse them on their own.</p>
            <Link href="/features" className="button button--secondary">
              Browse all modules
              <ArrowRightIcon width="18" height="18" />
            </Link>
          </li>
        )}
      </ul>

      {visibleCount === 0 && (
        <div className={styles.empty}>
          <p>
            <strong>No industries match &ldquo;{query}&rdquo;.</strong> Every workflow is different,
            so tell us about yours.
          </p>
          <Link href="/book-demo?industry=other" className="button button--secondary">
            Describe your workflow
          </Link>
        </div>
      )}
    </div>
  );
}
