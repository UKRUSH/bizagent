import Link from "next/link";
import { siteConfig } from "@/config/site";
import { voiceNotesVersusCalls } from "@/content/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { CheckIcon } from "@/components/ui/icons";
import styles from "./home.module.css";

const chatPoints = [
  "Text, images, documents and other media",
  "Voice notes transcribed and answered",
  "Conversation memory across chats",
  "Approved templates for opted-in broadcasts",
  "Separate knowledge for each phone number",
  "Several numbers managed in one place",
  "Lead capture and scoring",
  "Team handoff with the full history",
];

const voicePoints = [
  "Live WhatsApp voice calls where calling is supported",
  "The same knowledge and rules as your chats",
  "Recording only with announced consent",
  "Spoken orders read back for confirmation",
  "Transfer to your team or PBX mid-call",
  "Callback scheduling when nobody is free",
];

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className={styles.checkList}>
      {items.map((item) => (
        <li key={item}>
          <CheckIcon width="18" height="18" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * WhatsApp product spotlight (spec 6.5). The official platform and provider attribution are
 * not named until confirmed, and no partner badge is shown.
 */
export function WhatsAppSpotlight() {
  return (
    <section className="section section--muted" aria-labelledby="whatsapp-title">
      <div className={`container ${styles.split}`}>
        <div>
          <SectionHeading
            id="whatsapp-title"
            eyebrow={siteConfig.whatsappOfferingName}
            title="Make WhatsApp part of your customer workflow."
          >
            <p>
              Answer chats, understand voice notes and take live voice calls where supported, all
              with the same business knowledge and the same handoff to your team.
            </p>
          </SectionHeading>
          <div className="button-row">
            <Link href="/whatsapp-ai" className="button">
              Explore {siteConfig.whatsappOfferingName}
            </Link>
            <Link href="/pricing" className="button button--secondary">
              See WhatsApp plans
            </Link>
          </div>
        </div>
        <Tabs
          label="WhatsApp capabilities"
          idBase="whatsapp"
          tabs={[
            {
              id: "chat",
              label: "Chat",
              content: (
                <div className={styles.tabPanel}>
                  <CheckList items={chatPoints} />
                  <p className={styles.note}>{voiceNotesVersusCalls.voiceNotes}</p>
                </div>
              ),
            },
            {
              id: "voice",
              label: "Voice",
              content: (
                <div className={styles.tabPanel}>
                  <CheckList items={voicePoints} />
                  <p className={styles.note}>{voiceNotesVersusCalls.liveCalls}</p>
                </div>
              ),
            },
          ]}
        />
      </div>
    </section>
  );
}
