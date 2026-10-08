"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { RECEIPT_CHANGE_EVENT, RECEIPT_STORAGE_KEY, type Receipt } from "./useSubmission";

function readReceipt(): string | null {
  try {
    return sessionStorage.getItem(RECEIPT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(RECEIPT_CHANGE_EVENT, callback);
  return () => window.removeEventListener(RECEIPT_CHANGE_EVENT, callback);
}

const kindLabels: Record<Receipt["kind"], string> = {
  demo: "demo request",
  general: "enquiry",
  security: "security information request",
};

/**
 * Shows the receipt for a request this browser actually submitted. The receipt is written
 * only after the server confirmed durable acceptance, so visiting /thank-you directly never
 * shows a fake success (spec 12.2).
 */
export function ReceiptView() {
  const stored = useSyncExternalStore(subscribe, readReceipt, () => null);
  let receipt: Receipt | null = null;
  try {
    receipt = stored ? (JSON.parse(stored) as Receipt) : null;
  } catch {
    receipt = null;
  }

  if (!receipt) {
    return (
      <div className="card">
        <h2>No recent request on this device</h2>
        <p>
          If you meant to send a request, you can <Link href="/book-demo">book a demo</Link> or{" "}
          <Link href="/contact">contact the team</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="card" role="status">
      <h2>Thank you. Your {kindLabels[receipt.kind]} has been received.</h2>
      <p>
        Reference: <strong>{receipt.reference}</strong>
      </p>
      <p>
        We&apos;ll review it and get in touch to agree the next step. Keep this reference if you
        need to contact us about your request.
      </p>
    </div>
  );
}
