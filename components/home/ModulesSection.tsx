import Link from "next/link";
import { Suspense } from "react";
import { moduleAvailabilityLabels, moduleCategories, modules } from "@/content/modules";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ModuleExplorer,
  ModuleExplorerView,
  type ExplorerCategory,
  type ExplorerModule,
} from "@/components/features/ModuleExplorer";
import styles from "./home.module.css";

const explorerModules: ExplorerModule[] = modules.map((entry) => ({
  slug: entry.slug,
  title: entry.title,
  shortTitle: entry.shortTitle,
  summary: entry.summary,
  category: entry.category,
  availabilityLabel: moduleAvailabilityLabels[entry.availability],
  highlights: entry.featureGroups.slice(0, 2).map((group) => ({
    heading: group.heading,
    items: group.items.slice(0, 3),
  })),
  humanControl: entry.humanControls[0],
}));

const explorerCategories: ExplorerCategory[] = moduleCategories.map(({ id, label }) => ({ id, label }));

/**
 * Module explorer (spec 6.4). The static shell renders the default module; once hydrated,
 * the explorer reads `?module=` and the selection becomes interactive.
 */
export function ModulesSection() {
  return (
    <section id="modules" className="section" aria-labelledby="modules-title">
      <div className="container">
        <SectionHeading id="modules-title" title="A complete toolkit for calls and messages.">
          <p>
            Thirteen modules grouped by what they help you do. Start with the ones you need and
            add more as your workflow grows.
          </p>
        </SectionHeading>
        <Suspense
          fallback={
            <ModuleExplorerView
              modules={explorerModules}
              categories={explorerCategories}
              selectedSlug={explorerModules[0].slug}
            />
          }
        >
          <ModuleExplorer modules={explorerModules} categories={explorerCategories} />
        </Suspense>
        <p className={styles.sectionFooter}>
          <Link href="/features" className="button button--secondary">
            Browse all 13 modules
          </Link>
        </p>
      </div>
    </section>
  );
}
