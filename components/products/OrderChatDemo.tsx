"use client";

import { useState } from "react";
import { previewDisclosure } from "@/content/previews";
import type { Product } from "@/content/types";
import { BoxIcon, MessageIcon, RefreshIcon } from "@/components/ui/icons";
import roleStyles from "@/components/solutions/solutions.module.css";
import whatsappStyles from "@/components/whatsapp/whatsapp.module.css";
import styles from "./orders.module.css";

/**
 * The product's fictional order chat in the shared WhatsApp phone frame. Messages play in
 * one by one, then the order status; Replay runs it again. Every message is in the HTML, and
 * reduced motion shows them all at once (the global rule shortens the animation).
 */
export function OrderChatDemo({ preview, title }: { preview: Product["preview"]; title: string }) {
  const [run, setRun] = useState(0);

  return (
    <div className={whatsappStyles.preview}>
      <figure className={whatsappStyles.screen} aria-labelledby="order-chat-caption">
        <div className={whatsappStyles.header}>
          <span className={whatsappStyles.channel}>
            <span className={whatsappStyles.avatar} aria-hidden="true">
              <MessageIcon />
              <span className={whatsappStyles.dot} />
            </span>
            {preview.context}
          </span>
          <span className={whatsappStyles.demoBadge}>Illustrative demo</span>
        </div>
        <p className={styles.chatScenario}>{title}</p>
        {/* Keyed by run, so Replay restarts the entrance animation. */}
        <div key={run}>
          <ol className={whatsappStyles.chat} aria-label="Fictional WhatsApp order">
            {preview.messages.map((message, index) => (
              <li
                key={index}
                className={`${message.side === "right" ? whatsappStyles.assistant : whatsappStyles.customer} ${styles.chatMessage}`}
                style={{ animationDelay: `${index * 0.9}s` }}
              >
                <span className={whatsappStyles.sender}>{preview.speakers[message.side]}</span>
                <span>{message.text}</span>
              </li>
            ))}
          </ol>
          <div
            className={`${whatsappStyles.outcome} ${roleStyles.channelHandoff} ${styles.chatMessage}`}
            style={{ animationDelay: `${preview.messages.length * 0.9}s` }}
          >
            <BoxIcon width="18" height="18" />
            <span>
              {preview.outcome.title}
              <small>{preview.outcome.details}</small>
            </span>
          </div>
        </div>
        <div className={styles.replayRow}>
          <button type="button" className={styles.replay} onClick={() => setRun((value) => value + 1)}>
            <RefreshIcon width="16" height="16" />
            Replay conversation
          </button>
        </div>
        <figcaption id="order-chat-caption" className={whatsappStyles.caption}>
          {previewDisclosure}. Names and details are fictional.
        </figcaption>
      </figure>
    </div>
  );
}
