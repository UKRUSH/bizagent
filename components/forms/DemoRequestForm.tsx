"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  currentSystemOptions,
  demoLanguageOptions,
  industryOptions,
  marketingChannelOptions,
  moduleOptions,
  phoneCountryOptions,
  planOptions,
  roleOptions,
  timeWindowOptions,
  timeZoneOptions,
  volumeUnitOptions,
} from "@/content/form-options";
import { enquiryAcknowledgement, marketingConsentLabel, sensitiveDataHint } from "@/content/forms";
import { publishedLegalSlugs } from "@/content/legal";
import { LIMITS, todayIso, validateDemoRequest, type DemoRequest } from "@/lib/validation/requests";
import { CheckboxField, ChoiceGroup, Honeypot, SelectField, TextareaField, TextField } from "./fields";
import { FormStatus } from "./FormStatus";
import { useSubmission } from "./useSubmission";
import styles from "./forms.module.css";

export interface DemoPreselection {
  plan?: string;
  modules: string[];
  industry?: string;
  role?: string;
}

const FIELD_ORDER = [
  "fullName", "businessName", "workEmail", "phoneNumber",
  "industry", "role", "modules", "plan", "volumeAmount", "volumeUnit", "currentSystems", "otherSystems",
  "demoLanguage", "preferredDate", "preferredWindow", "timeZone",
  "requirement", "privacyAck", "marketingChannels",
];

function labelFor(options: readonly { value: string; label: string }[], value?: string) {
  return options.find((option) => option.value === value)?.label;
}

/**
 * Demo request form (spec 12.1–12.2). Query-string values arrive already allowlisted.
 * `placeholder` renders the inert copy used as the Suspense fallback while the preselected
 * form streams in: answers typed into the fallback would be lost when it is replaced.
 */
export function DemoRequestForm({ preselection, placeholder = false }: { preselection: DemoPreselection; placeholder?: boolean }) {
  const formId = "demo-form";
  const initialValues = () => ({
    fullName: "",
    businessName: "",
    workEmail: "",
    phoneCountry: "LK",
    phoneNumber: "",
    industry: preselection.industry ?? "",
    role: preselection.role ?? "",
    modules: preselection.modules,
    plan: preselection.plan ?? "",
    volumeAmount: "",
    volumeUnit: "calls-per-day",
    currentSystems: [] as string[],
    otherSystems: "",
    demoLanguage: "english",
    preferredDate: "",
    preferredWindow: "",
    timeZone: "Asia/Colombo",
    requirement: "",
    privacyAck: false,
    marketingConsent: false,
    marketingChannels: [] as string[],
    website: "",
  });
  const [values, setValues] = useState(initialValues);
  const { status, errors, message, submit, clearError } = useSubmission<DemoRequest>({
    endpoint: "/api/demo-requests",
    formId,
    formKind: "demo",
    fieldOrder: FIELD_ORDER,
    onReset: () => setValues(initialValues()),
  });

  function set<K extends keyof typeof values>(name: K, value: (typeof values)[K]) {
    setValues((current) => ({ ...current, [name]: value }));
    clearError(name);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit(values, validateDemoRequest(values, todayIso()));
  }

  const contextItems = [
    preselection.plan && `Plan: ${labelFor(planOptions, preselection.plan)}`,
    preselection.modules.length > 0 &&
      `Module${preselection.modules.length > 1 ? "s" : ""}: ${preselection.modules.map((slug) => labelFor(moduleOptions, slug)).join(", ")}`,
    preselection.industry && `Industry: ${labelFor(industryOptions, preselection.industry)}`,
    preselection.role && `Role: ${labelFor(roleOptions, preselection.role)}`,
  ].filter(Boolean);
  const privacyPublished = publishedLegalSlugs().includes("privacy");
  const busy = status === "submitting" || status === "received";

  return (
    <form
      id={formId}
      className={placeholder ? `${styles.form} ${styles.placeholder}` : styles.form}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={`${formId}-intro`}
      inert={placeholder}
      aria-busy={placeholder || undefined}
    >
      <p id={`${formId}-intro`} className={styles.intro}>
        Fields marked (required) are needed so we can prepare your demo. {sensitiveDataHint}
      </p>

      {contextItems.length > 0 && (
        <div className={styles.context} role="note">
          <strong>You&apos;re asking about:</strong> {contextItems.join(" · ")}. You can change these below.
        </div>
      )}

      <fieldset className={styles.section}>
        <legend>About you</legend>
        <div className="form-grid">
          <TextField formId={formId} name="fullName" label="Full name" required autoComplete="name" maxLength={LIMITS.fullName[1]} value={values.fullName} onChange={(value) => set("fullName", value)} error={errors.fullName} />
          <TextField formId={formId} name="businessName" label="Business name" required autoComplete="organization" maxLength={LIMITS.businessName[1]} value={values.businessName} onChange={(value) => set("businessName", value)} error={errors.businessName} />
          <TextField formId={formId} name="workEmail" label="Work email" type="email" required autoComplete="email" maxLength={LIMITS.email} value={values.workEmail} onChange={(value) => set("workEmail", value)} error={errors.workEmail} />
          <div className={styles.phone}>
            <SelectField formId={formId} name="phoneCountry" label="Country code" options={phoneCountryOptions} value={values.phoneCountry} onChange={(value) => set("phoneCountry", value)} />
            <TextField formId={formId} name="phoneNumber" label="Phone or WhatsApp" type="tel" inputMode="tel" autoComplete="tel-national" value={values.phoneNumber} onChange={(value) => set("phoneNumber", value)} error={errors.phoneNumber} />
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.section}>
        <legend>What you need</legend>
        <div className="form-grid">
          <SelectField formId={formId} name="industry" label="Industry" required placeholder="Choose your industry" options={industryOptions} value={values.industry} onChange={(value) => set("industry", value)} error={errors.industry} />
          <SelectField formId={formId} name="role" label="Main role" required placeholder="Choose a role" options={roleOptions} value={values.role} onChange={(value) => set("role", value)} error={errors.role} />
          <ChoiceGroup formId={formId} name="modules" label="Modules you're interested in" type="checkbox" columns={2} options={moduleOptions} values={values.modules} onChange={(next) => set("modules", next)} error={errors.modules} />
          <SelectField formId={formId} name="plan" label="Preferred plan" placeholder="No preference" options={planOptions} value={values.plan} onChange={(value) => set("plan", value)} error={errors.plan} />
          <div className={styles.volume}>
            <TextField formId={formId} name="volumeAmount" label="Approximate volume" type="number" inputMode="numeric" min="1" value={values.volumeAmount} onChange={(value) => set("volumeAmount", value)} error={errors.volumeAmount} />
            <SelectField formId={formId} name="volumeUnit" label="Measured in" options={volumeUnitOptions} value={values.volumeUnit} onChange={(value) => set("volumeUnit", value)} error={errors.volumeUnit} />
          </div>
          <ChoiceGroup formId={formId} name="currentSystems" label="Systems you use today" type="checkbox" columns={3} options={currentSystemOptions} values={values.currentSystems} onChange={(next) => set("currentSystems", next)} error={errors.currentSystems} />
          <TextField formId={formId} name="otherSystems" label="Other systems" full maxLength={LIMITS.otherSystems} hint="For example the name of your CRM or phone system." value={values.otherSystems} onChange={(value) => set("otherSystems", value)} error={errors.otherSystems} />
        </div>
      </fieldset>

      <fieldset className={styles.section}>
        <legend>Your demo</legend>
        <div className="form-grid">
          <ChoiceGroup formId={formId} name="demoLanguage" label="Demo language" type="radio" required columns={3} options={demoLanguageOptions} values={[values.demoLanguage]} onChange={([next]) => set("demoLanguage", next)} error={errors.demoLanguage} />
          <TextField formId={formId} name="preferredDate" label="Preferred date" type="date" value={values.preferredDate} onChange={(value) => set("preferredDate", value)} error={errors.preferredDate} hint="A preference, not a confirmed booking. We'll agree a time with you." />
          <SelectField formId={formId} name="preferredWindow" label="Preferred time of day" placeholder="Any time" options={timeWindowOptions} value={values.preferredWindow} onChange={(value) => set("preferredWindow", value)} error={errors.preferredWindow} />
          <SelectField formId={formId} name="timeZone" label="Your time zone" options={timeZoneOptions} value={values.timeZone} onChange={(value) => set("timeZone", value)} error={errors.timeZone} hint="Sri Lanka is suggested; change it if you're elsewhere." />
        </div>
      </fieldset>

      <fieldset className={styles.section}>
        <legend>Anything else</legend>
        <div className="form-grid">
          <TextareaField formId={formId} name="requirement" label="What would you like the demo to cover?" maxLength={LIMITS.requirement} hint={`How customers contact you, what your team handles most, and anything you'd like to see. ${sensitiveDataHint}`} value={values.requirement} onChange={(value) => set("requirement", value)} error={errors.requirement} />
        </div>
      </fieldset>

      <fieldset className={styles.section}>
        <legend>Consent</legend>
        <CheckboxField
          formId={formId}
          name="privacyAck"
          required
          checked={values.privacyAck}
          onChange={(checked) => set("privacyAck", checked)}
          error={errors.privacyAck}
          label={
            <>
              {enquiryAcknowledgement.demo}
              {privacyPublished && (
                <>
                  {" "}
                  <Link href="/privacy">Read the privacy notice</Link>.
                </>
              )}
            </>
          }
        />
        <CheckboxField
          formId={formId}
          name="marketingConsent"
          checked={values.marketingConsent}
          onChange={(checked) => {
            set("marketingConsent", checked);
            if (!checked) set("marketingChannels", []);
          }}
          label={marketingConsentLabel}
        />
        {values.marketingConsent && (
          <ChoiceGroup formId={formId} name="marketingChannels" label="How would you like to hear from us?" type="checkbox" columns={3} options={marketingChannelOptions} values={values.marketingChannels} onChange={(next) => set("marketingChannels", next)} error={errors.marketingChannels} />
        )}
      </fieldset>

      <Honeypot value={values.website} onChange={(value) => setValues((current) => ({ ...current, website: value }))} />

      <FormStatus status={status} message={message} />
      <button type="submit" className="button" disabled={busy} aria-busy={status === "submitting" || undefined}>
        {status === "submitting" ? "Sending…" : status === "failed" ? "Try Again" : "Request Demo"}
      </button>
    </form>
  );
}
