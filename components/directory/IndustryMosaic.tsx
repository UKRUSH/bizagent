import Link from "next/link";
import { industries } from "@/content/industries";
import { industryIcon } from "./industryIcons";
import styles from "./directory.module.css";

const SHOWN = 8;

/** Industries hero panel: quick links to the first industries, then a jump to the full directory. */
export function IndustryMosaic() {
  const shown = industries.slice(0, SHOWN);
  return (
    <nav className={styles.mosaic} aria-label="Popular industries">
      <ul>
        {shown.map((industry) => {
          const Icon = industryIcon(industry.slug);
          return (
            <li key={industry.slug}>
              <Link href={`/industries/${industry.slug}`}>
                {Icon && (
                  <span aria-hidden="true">
                    <Icon />
                  </span>
                )}
                {industry.name}
              </Link>
            </li>
          );
        })}
        <li>
          <a href="#directory" className={styles.mosaicMore}>
            +{industries.length - SHOWN} more
          </a>
        </li>
      </ul>
    </nav>
  );
}
