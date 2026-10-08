"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { unavailableMessage } from "@/content/forms";
import { track } from "@/lib/analytics";
import type { FieldErrors, ValidationResult } from "@/lib/validation/requests";

export const RECEIPT_STORAGE_KEY = "bizmaster-request-receipt";
/** Tells a mounted (possibly hidden) /thank-you page that a newer receipt was stored. */
export const RECEIPT_CHANGE_EVENT = "bizmaster-receipt-change";

export interface Receipt {
  reference: string;
  kind: "demo" | "general" | "security";
  receivedAt: string;
}

export type SubmissionStatus = "editing" | "invalid" | "submitting" | "received" | "failed";

interface Options {
  endpoint: string;
  formId: string;
  /** Which form this is, for privacy-safe analytics events. */
  formKind: Receipt["kind"];
  /** Field names in on-screen order, used to focus the first invalid field. */
  fieldOrder: string[];
  /** Clears the form's answers once a received request's page is left (see below). */
  onReset: () => void;
}

function focusFirstInvalid(formId: string, fieldOrder: string[], errors: FieldErrors) {
  const first = fieldOrder.find((name) => errors[name]);
  if (!first) return;
  const element = document.getElementById(`${formId}-${first}`);
  const target = element instanceof HTMLFieldSetElement ? element.querySelector("input") : element;
  (target as HTMLElement | null)?.focus();
}

/**
 * Submission states (spec 12.2): editing, invalid, submitting, received, failed. The same
 * submission ID is reused for retries so the server can discard duplicates. The receipt is
 * stored only after the server confirms durable acceptance.
 *
 * With cacheComponents, Next.js keeps a page mounted but hidden (React Activity) after
 * navigating to /thank-you. Without a reset, returning to the form would show the old
 * answers, a disabled button, and reuse the old submission ID, so the server would treat a
 * new request as a duplicate. Unsent drafts are kept on purpose.
 */
export function useSubmission<T>({ endpoint, formId, formKind, fieldOrder, onReset }: Options) {
  const router = useRouter();
  const [status, setStatus] = useState<SubmissionStatus>("editing");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const submissionId = useRef<string | null>(null);
  const resetWhenHidden = useRef(false);
  const latestOnReset = useRef(onReset);

  useLayoutEffect(() => {
    latestOnReset.current = onReset;
  });

  // Layout-effect cleanup runs synchronously when Activity hides the page.
  useLayoutEffect(
    () => () => {
      if (!resetWhenHidden.current) return;
      resetWhenHidden.current = false;
      submissionId.current = null;
      setStatus("editing");
      setErrors({});
      setMessage("");
      latestOnReset.current();
    },
    [],
  );

  function showInvalid(fieldErrors: FieldErrors) {
    setErrors(fieldErrors);
    setStatus("invalid");
    const count = Object.keys(fieldErrors).length;
    setMessage(`Please check ${count === 1 ? "the highlighted answer" : `the ${count} highlighted answers`}.`);
    // Wait for the error messages to render before moving focus.
    requestAnimationFrame(() => focusFirstInvalid(formId, fieldOrder, fieldErrors));
  }

  async function submit(payload: Record<string, unknown>, clientCheck: ValidationResult<T>) {
    if (status === "submitting") return;
    if (!clientCheck.ok) {
      showInvalid(clientCheck.errors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setMessage("Sending your request…");
    submissionId.current ??= crypto.randomUUID();

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, submissionId: submissionId.current }),
      });
      const body = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        reference?: string;
        receivedAt?: string;
        kind?: Receipt["kind"];
        message?: string;
        errors?: FieldErrors;
      };

      if (response.ok && body.ok && body.reference && body.receivedAt && body.kind) {
        try {
          sessionStorage.setItem(
            RECEIPT_STORAGE_KEY,
            JSON.stringify({ reference: body.reference, kind: body.kind, receivedAt: body.receivedAt }),
          );
          window.dispatchEvent(new Event(RECEIPT_CHANGE_EVENT));
        } catch {
          // Storage can be unavailable (private mode); the request is still received.
        }
        track({ name: "form_submission_received", form: body.kind });
        resetWhenHidden.current = true;
        setStatus("received");
        setMessage(`Request received. Your reference is ${body.reference}.`);
        router.push("/thank-you");
        return;
      }

      if (response.status === 422 && body.errors) {
        track({ name: "form_submission_failed", form: formKind, reason: "invalid" });
        showInvalid(body.errors);
        return;
      }

      track({ name: "form_submission_failed", form: formKind, reason: "unavailable" });
      setStatus("failed");
      setMessage(body.message ?? unavailableMessage);
    } catch {
      track({ name: "form_submission_failed", form: formKind, reason: "network" });
      setStatus("failed");
      setMessage(
        "We couldn't reach the server, so your request hasn't been sent. Check your connection and try again; your answers are still here.",
      );
    }
  }

  function clearError(name: string) {
    if (!errors[name]) return;
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  return { status, errors, message, submit, clearError };
}
