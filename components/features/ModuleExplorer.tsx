"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ModuleCategory } from "@/content/types";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "./ModuleExplorer.module.css";

/** The slice of module data the explorer needs, passed from the server. */
export interface ExplorerModule {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  category: ModuleCategory;
  availabilityLabel: string;
  highlights: { heading: string; items: string[] }[];
  humanControl: string;
}

export interface ExplorerCategory {
  id: ModuleCategory;
  label: string;
}

interface ExplorerProps {
  modules: ExplorerModule[];
  categories: ExplorerCategory[];
}

export function ModuleExplorer(props: ExplorerProps) {
  const requested = useSearchParams().get("module");
  const valid = props.modules.some((entry) => entry.slug === requested);
  return <ModuleExplorerView {...props} selectedSlug={valid ? requested! : props.modules[0].slug} />;
}

/**
 * Module list and detail panel (spec 6.4). Buttons use aria-pressed rather than a partial
 * tab pattern. The selection is mirrored to `?module=` with history.replaceState, which
 * Next.js syncs with useSearchParams, so the selected module can be deep-linked.
 */
export function ModuleExplorerView({
  modules,
  categories,
  selectedSlug,
}: ExplorerProps & { selectedSlug: string }) {
  const selected = modules.find((entry) => entry.slug === selectedSlug) ?? modules[0];

  function select(slug: string) {
    const params = new URLSearchParams(window.location.search);
    params.set("module", slug);
    window.history.replaceState(null, "", `?${params.toString()}${window.location.hash}`);
  }

  return (
    <div className={`module-explorer ${styles.explorer}`}>
      <div className={styles.mobilePicker}>
        <label htmlFor="module-picker">Choose a module</label>
        <select id="module-picker" value={selected.slug} onChange={(event) => select(event.target.value)}>
          {categories.map((category) => (
            <optgroup key={category.id} label={category.label}>
              {modules
                .filter((entry) => entry.category === category.id)
                .map((entry) => (
                  <option key={entry.slug} value={entry.slug}>
                    {entry.title}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className={styles.list}>
        {categories.map((category) => (
          <div key={category.id} role="group" aria-labelledby={`module-group-${category.id}`}>
            <p className={styles.groupLabel} id={`module-group-${category.id}`}>
              {category.label}
            </p>
            <div className="module-list">
              {modules
                .filter((entry) => entry.category === category.id)
                .map((entry) => (
                  <button
                    key={entry.slug}
                    type="button"
                    className="module-button"
                    aria-pressed={entry.slug === selected.slug}
                    aria-controls="module-detail"
                    onClick={() => select(entry.slug)}
                  >
                    {entry.shortTitle}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      <section id="module-detail" className={`card ${styles.detail}`} aria-labelledby="module-detail-title">
        <p className={styles.availability}>{selected.availabilityLabel}</p>
        <h3 id="module-detail-title">{selected.title}</h3>
        <p>{selected.summary}</p>
        <div className={styles.highlights}>
          {selected.highlights.map((group) => (
            <div key={group.heading}>
              <h4>{group.heading}</h4>
              <ul className="feature-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className={styles.humanControl}>
          <strong>Your team stays in control:</strong> {selected.humanControl}
        </p>
        <div className="button-row">
          <Link href={`/features/${selected.slug}`} className="button">
            View full module
            <ArrowRightIcon width="18" height="18" />
          </Link>
          <Link href={`/book-demo?module=${selected.slug}`} className="button button--secondary">
            Request this demo
          </Link>
        </div>
      </section>
    </div>
  );
}
