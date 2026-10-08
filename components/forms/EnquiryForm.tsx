"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { phoneCountryOptions, securityDocumentOptions } from "@/content/form-options";
import { enquiryAcknowledgement, sensitiveDataHint } from "@/content/forms";
import { publishedLegalSlugs } from "@/content/legal";
import { LIMITS, validateEnquiry, type Enquiry, type EnquiryKind } from "@/lib/validation/requests";
import { CheckboxField, ChoiceGroup, Honeypot, SelectField, TextareaField, TextField } from "./fields";
import { FormStatus } from "./FormStatus";
import { useSubmission } from "./useSubmission";
import styles from "./forms.module.css";

const FIELD_ORDER = ["fullName", "workEmail", "businessName", "phoneNumber", "documents", "message", "privacyAck"];

const copy: Record<EnquiryKind, { messageLabel: string; messageHint: string; submit: string }> = {
  general: {
    messageLabel: "Your message",
    messageHint: "Tell us what you'd like to discuss.",
    submit: "Send Enquiry",
  },
  security: {
    messageLabel: "Your security requirements",
    messageHint: "For example access, retention, hosting region or deployment requirements, and any review deadlines.",
    submit: "Request Security Information",
  },
};

/** General enquiry (/contact) and security-information request (/security), spec 12, 21. */
export function EnquiryForm({ kind }: { kind: EnquiryKind }) {
  const formId = `${kind}-enquiry-form`;
  const initialValues = () => ({
    kind,
    fullName: "",
    workEmail: "",
    businessName: "",
    phoneCountry: "LK",
    phoneNumber: "",
    documents: [] as string[],
    message: "",
    privacyAck: false,
    website: "",
  });
  const [values, setValues] = useState(initialValues);
  const { status, errors, message, submit, clearError } = useSubmission<Enquiry>({
    endpoint: "/api/enquiries",
    formId,
    formKind: kind,
    fieldOrder: FIELD_ORDER,
    onReset: () => setValues(initialValues()),
  });

  function set<K extends keyof typeof values>(name: K, value: (typeof values)[K]) {
    setValues((current) => ({ ...current, [name]: value }));
    clearError(name);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit(values, validateEnquiry(values));
  }

  const privacyPublished = publishedLegalSlugs().includes("privacy");
  const busy = status === "submitting" || status === "received";

  return (
    <form id={formId} className={styles.form} onSubmit={handleSubmit} noValidate>
      <p className={styles.intro}>{sensitiveDataHint}</p>
      <div className="form-grid">
        <TextField formId={formId} name="fullName" label="Full name" required autoComplete="name" maxLength={LIMITS.fullName[1]} value={values.fullName} onChange={(value) => set("fullName", value)} error={errors.fullName} />
        <TextField formId={formId} name="workEmail" label="Work email" type="email" required autoComplete="email" maxLength={LIMITS.email} value={values.workEmail} onChange={(value) => set("workEmail", value)} error={errors.workEmail} />
        <TextField formId={formId} name="businessName" label="Business name" autoComplete="organization" maxLength={LIMITS.businessName[1]} value={values.businessName} onChange={(value) => set("businessName", value)} error={errors.businessName} />
        <div className={styles.phone}>
          <SelectField formId={formId} name="phoneCountry" label="Country code" options={phoneCountryOptions} value={values.phoneCountry} onChange={(value) => set("phoneCountry", value)} />
          <TextField formId={formId} name="phoneNumber" label="Phone or WhatsApp" type="tel" inputMode="tel" autoComplete="tel-national" value={values.phoneNumber} onChange={(value) => set("phoneNumber", value)} error={errors.phoneNumber} />
        </div>
        {kind === "security" && (
          <ChoiceGroup formId={formId} name="documents" label="Documents your review needs" type="checkbox" columns={2} options={securityDocumentOptions} values={values.documents} onChange={(next) => set("documents", next)} error={errors.documents} hint="Availability is confirmed when we reply. Sensitive documents are shared through an access-controlled process." />
        )}
        <TextareaField formId={formId} name="message" label={copy[kind].messageLabel} required maxLength={LIMITS.message[1]} hint={copy[kind].messageHint} value={values.message} onChange={(value) => set("message", value)} error={errors.message} />
        <CheckboxField
          formId={formId}
          name="privacyAck"
          required
          checked={values.privacyAck}
          onChange={(checked) => set("privacyAck", checked)}
          error={errors.privacyAck}
          label={
            <>
              {enquiryAcknowledgement[kind]}
              {privacyPublished && (
                <>
                  {" "}
                  <Link href="/privacy">Read the privacy notice</Link>.
                </>
              )}
            </>
          }
        />
      </div>
      <Honeypot value={values.website} onChange={(value) => setValues((current) => ({ ...current, website: value }))} />
      <FormStatus status={status} message={message} />
      <button type="submit" className="button" disabled={busy} aria-busy={status === "submitting" || undefined}>
        {status === "submitting" ? "Sending…" : status === "failed" ? "Try Again" : copy[kind].submit}
      </button>
    </form>
  );
}
