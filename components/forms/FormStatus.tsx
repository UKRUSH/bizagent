import type { SubmissionStatus } from "./useSubmission";

/**
 * Polite live region announcing submission state (spec 12.2, 17). It is always rendered so
 * screen readers register it before the first announcement.
 */
export function FormStatus({ status, message }: { status: SubmissionStatus; message: string }) {
  const tone =
    status === "received" ? "form-status--success" : status === "failed" || status === "invalid" ? "form-status--error" : "";
  return (
    <div className={`form-status ${tone}`} role="status" aria-live="polite">
      {status !== "editing" && message}
    </div>
  );
}
