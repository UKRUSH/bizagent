"use client";

import { useState } from "react";
import { previewDisclosure, rolePreviews, stageLabels } from "@/content/previews";
import type { ConversationChannel } from "@/content/types";
import { MessageIcon, PhoneIcon, UserCheckIcon } from "@/components/ui/icons";
import styles from "./home.module.css";

const channelChips: { id: ConversationChannel | "follow-up"; label: string }[] = [
  { id: "phone", label: "Phone" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "follow-up", label: "Follow-up" },
];

/**
 * CSS-built, clearly labelled illustrative preview (spec 4.2). The role buttons change the
 * fictional transcript only; there is no network activity, microphone access or sending.
 */
export function ConversationPreview() {
  const [roleIndex, setRoleIndex] = useState(0);
  // The first paint shows the whole transcript; the quiet reveal runs only after a role
  // switch, so content never depends on an animation completing (e.g. throttled frames).
  const [animate, setAnimate] = useState(false);
  const preview = rolePreviews[roleIndex];

  function showRole(index: number) {
    setRoleIndex(index);
    setAnimate(true);
  }

  return (
    <figure className={`conversation-preview ${styles.preview}`} aria-labelledby="preview-caption">
      <div className="preview-toolbar">
        <ul className={styles.channelChips} aria-label="Channels">
          {channelChips.map((chip) => (
            <li
              key={chip.id}
              className={styles.channelChip}
              data-active={chip.id === preview.channel || undefined}
            >
              {chip.id === "phone" ? (
                <PhoneIcon width="14" height="14" />
              ) : (
                <MessageIcon width="14" height="14" />
              )}
              {chip.label}
              {chip.id === preview.channel && <span className="sr-only"> (shown)</span>}
            </li>
          ))}
        </ul>
        <span className={styles.demoBadge}>Illustrative demo</span>
      </div>

      <div className={styles.roleSwitch} role="group" aria-label="Show an example for a role">
        {rolePreviews.map((item, index) => (
          <button
            key={item.role}
            type="button"
            aria-pressed={index === roleIndex}
            onClick={() => showRole(index)}
          >
            {item.roleLabel}
          </button>
        ))}
      </div>

      <div className="preview-body" key={preview.role}>
        <p className={styles.context}>{preview.context}</p>

        <ol className={styles.transcript} aria-label="Fictional conversation">
          {preview.messages.map((message, index) => (
            <li
              key={index}
              className={`message ${message.speaker === "assistant" ? "message--ai" : ""} ${animate ? styles.reveal : ""}`}
              style={animate ? { animationDelay: `${index * 450}ms` } : undefined}
            >
              <span className="message-label">
                {message.speaker === "assistant" ? "AI assistant" : "Customer"}
              </span>
              <p>{message.text}</p>
            </li>
          ))}
        </ol>

        <ol className={styles.timeline} aria-label="What happened">
          {stageLabels.map((label, index) => (
            <li key={label}>
              <strong>{label}:</strong> {preview.stages[index]}
            </li>
          ))}
        </ol>

        <div className={styles.outcomes}>
          <div className={styles.actionSummary}>
            <span className={styles.outcomeLabel}>Action</span>
            <strong>{preview.action.title}</strong>
            <ul>
              {preview.action.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
          <div className="handoff-summary">
            <span className={styles.outcomeLabel}>
              <UserCheckIcon width="14" height="14" /> Handoff
            </span>
            <strong>{preview.handoff.to}</strong>
            <p className={styles.handoffReason}>{preview.handoff.reason}</p>
          </div>
        </div>
      </div>

      <figcaption id="preview-caption" className={`preview-disclosure ${styles.caption}`}>
        {previewDisclosure}. Names and details are fictional.
      </figcaption>
    </figure>
  );
}
