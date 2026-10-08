import type { CSSProperties, ReactNode } from "react";
import {
  CalendarIcon,
  MailIcon,
  MessageIcon,
  PhoneIcon,
  PlugIcon,
  SparkIcon,
  UserCheckIcon,
} from "@/components/ui/icons";
import styles from "./platform.module.css";

const satellites: { label: string; icon: ReactNode }[] = [
  { label: "Calls", icon: <PhoneIcon /> },
  { label: "WhatsApp", icon: <MessageIcon /> },
  { label: "SMS and email", icon: <MailIcon /> },
  { label: "Your team", icon: <UserCheckIcon /> },
  { label: "Calendar", icon: <CalendarIcon /> },
  { label: "CRM and systems", icon: <PlugIcon /> },
];

/**
 * Platform hero visual: channels, systems and the team around one shared assistant.
 * Decorative layout with a text equivalent in the caption.
 */
export function PlatformHub() {
  return (
    <figure className={styles.hub}>
      <figcaption className="sr-only">
        Calls, WhatsApp, SMS and email, your CRM and calendar, and your team all connect to
        the same BizMaster AI Agent.
      </figcaption>
      <div className={styles.hubStage} aria-hidden="true">
        <span className={styles.ring} />
        <span className={`${styles.ring} ${styles.ringInner}`} />
        <div className={styles.core}>
          <SparkIcon width={28} height={28} />
          <strong>BizMaster AI Agent</strong>
          <span>One knowledge base, one history</span>
        </div>
        <ul className={styles.satellites}>
          {satellites.map((item, index) => (
            <li
              key={item.label}
              className={styles.satellite}
              style={{ "--angle": `${index * 60}deg`, "--delay": `${index * -0.6}s` } as CSSProperties}
            >
              <span className={styles.satelliteInner}>
                {item.icon}
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
