import type { ReactNode } from "react";
import type { Option } from "@/content/form-options";
import styles from "./forms.module.css";

/**
 * Form controls with labels, hints and errors associated through aria-describedby and
 * aria-invalid (spec 12.2, 17). Ids follow `${formId}-${name}` so the form can focus the
 * first invalid field.
 */

interface BaseProps {
  formId: string;
  name: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  required?: boolean;
  full?: boolean;
}

function describedBy(id: string, hint?: ReactNode, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

function Label({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id}>
      {label}
      {required ? <span className={styles.required}> (required)</span> : <span className={styles.optional}> (optional)</span>}
    </label>
  );
}

function Messages({ id, hint, error }: { id: string; hint?: ReactNode; error?: string }) {
  return (
    <>
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </>
  );
}

export function TextField({
  formId,
  name,
  label,
  hint,
  error,
  required,
  full,
  value,
  onChange,
  type = "text",
  autoComplete,
  maxLength,
  inputMode,
  min,
  max,
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "date" | "number";
  autoComplete?: string;
  maxLength?: number;
  inputMode?: "numeric" | "tel" | "email" | "text";
  min?: string;
  max?: string;
}) {
  const id = `${formId}-${name}`;
  return (
    <div className={`field ${full ? "field--full" : ""}`}>
      <Label id={id} label={label} required={required} />
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        maxLength={maxLength}
        inputMode={inputMode}
        min={min}
        max={max}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
      />
      <Messages id={id} hint={hint} error={error} />
    </div>
  );
}

export function TextareaField({
  formId,
  name,
  label,
  hint,
  error,
  required,
  value,
  onChange,
  maxLength,
}: BaseProps & { value: string; onChange: (value: string) => void; maxLength: number }) {
  const id = `${formId}-${name}`;
  return (
    <div className="field field--full">
      <Label id={id} label={label} required={required} />
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={maxLength}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={[describedBy(id, hint, error), `${id}-count`].filter(Boolean).join(" ")}
      />
      <p id={`${id}-count`} className={styles.counter}>
        {value.length.toLocaleString("en-US")} of {maxLength.toLocaleString("en-US")} characters
      </p>
      <Messages id={id} hint={hint} error={error} />
    </div>
  );
}

export function SelectField({
  formId,
  name,
  label,
  hint,
  error,
  required,
  full,
  value,
  onChange,
  options,
  placeholder,
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
  options: readonly Option[];
  placeholder?: string;
}) {
  const id = `${formId}-${name}`;
  return (
    <div className={`field ${full ? "field--full" : ""}`}>
      <Label id={id} label={label} required={required} />
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Messages id={id} hint={hint} error={error} />
    </div>
  );
}

/** Checkbox or radio group in a fieldset with a legend. */
export function ChoiceGroup({
  formId,
  name,
  label,
  hint,
  error,
  required,
  options,
  type,
  values,
  onChange,
  columns = 2,
}: BaseProps & {
  options: readonly Option[];
  type: "checkbox" | "radio";
  values: string[];
  onChange: (values: string[]) => void;
  columns?: 1 | 2 | 3;
}) {
  const id = `${formId}-${name}`;
  function toggle(value: string, checked: boolean) {
    if (type === "radio") onChange([value]);
    else onChange(checked ? [...values, value] : values.filter((item) => item !== value));
  }
  return (
    <fieldset
      id={id}
      className={`field field--full ${styles.group}`}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, hint, error)}
    >
      <legend>
        {label}
        {required ? <span className={styles.required}> (required)</span> : <span className={styles.optional}> (optional)</span>}
      </legend>
      <div className={styles.choices} data-columns={columns}>
        {options.map((option) => {
          const optionId = `${id}-${option.value}`;
          return (
            <div key={option.value} className="checkbox-row">
              <input
                id={optionId}
                type={type}
                name={id}
                value={option.value}
                checked={values.includes(option.value)}
                onChange={(event) => toggle(option.value, event.target.checked)}
              />
              <label htmlFor={optionId}>{option.label}</label>
            </div>
          );
        })}
      </div>
      <Messages id={id} hint={hint} error={error} />
    </fieldset>
  );
}

export function CheckboxField({
  formId,
  name,
  label,
  error,
  checked,
  onChange,
  required,
}: {
  formId: string;
  name: string;
  label: ReactNode;
  error?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
}) {
  const id = `${formId}-${name}`;
  return (
    <div className="field field--full">
      <div className="checkbox-row">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

/** Hidden from people (visually and from assistive technology); bots tend to fill it in. */
export function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className={styles.honeypot} aria-hidden="true">
      <label htmlFor="website-field">Website</label>
      <input
        id="website-field"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
