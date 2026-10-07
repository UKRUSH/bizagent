/**
 * Text status badge. Status is always written out, never conveyed by colour alone
 * (spec 15.2). `label` should already be the human-readable status.
 */
export function StatusBadge({ label, prefix }: { label: string; prefix?: string }) {
  return (
    <span className="status-badge">
      {prefix && <span className="status-badge__prefix">{prefix}: </span>}
      {label}
    </span>
  );
}
