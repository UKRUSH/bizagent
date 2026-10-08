import { moduleCategories, modules } from "@/content/modules";
import { categoryIcons } from "./moduleIcons";
import styles from "./features.module.css";

/** Features hero panel: the five module groups with their descriptions and module counts. */
export function FeatureOverview() {
  return (
    <section className={styles.overview} aria-labelledby="overview-title">
      <p className={styles.overviewTitle} id="overview-title">
        {moduleCategories.length} groups · {modules.length} modules
      </p>
      <ul className={styles.overviewList}>
        {moduleCategories.map((category) => {
          const Icon = categoryIcons[category.id];
          const count = modules.filter((entry) => entry.category === category.id).length;
          return (
            <li key={category.id}>
              <span className={styles.overviewIcon} aria-hidden="true">
                <Icon />
              </span>
              <span>
                <strong>{category.label}</strong>
                <span className={styles.overviewText}>{category.description}</span>
              </span>
              <span className={styles.overviewCount}>
                {count}
                <span className="sr-only"> modules</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
