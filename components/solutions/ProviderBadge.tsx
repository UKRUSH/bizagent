import { approvedProviderAttribution } from "@/config/site";
import { ShieldIcon } from "@/components/ui/icons";
import styles from "./solutions.module.css";

/**
 * Highlighted "Meta Tech Provider" badge. The status belongs to Dilexus, the developer of
 * Agent Dilu, so the badge always carries the full attribution and renders only once the
 * wording is approved in config/site.ts (spec 1.2). It is never placed beside the logo.
 */
export function ProviderBadge() {
  const attribution = approvedProviderAttribution();
  if (!attribution) return null;

  return (
    <p className={styles.providerBadge}>
      <span className={styles.providerMark}>
        <ShieldIcon width="16" height="16" />
        Meta Tech Provider
      </span>
      <span className={styles.providerText}>{attribution}</span>
    </p>
  );
}
