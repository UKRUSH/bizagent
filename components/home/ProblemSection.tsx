import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ClockIcon, LayersIcon, PhoneIcon, UsersIcon } from "@/components/ui/icons";
import styles from "./home.module.css";

/** Customer problem section (spec 6.2). Four cards, no unsupported statistics. */
const problems: { icon: ReactNode; title: string; text: string }[] = [
  {
    icon: <PhoneIcon />,
    title: "Missed calls at busy times",
    text: "When the team is serving customers, the phone keeps ringing. Callers who can't get through often don't try again.",
  },
  {
    icon: <ClockIcon />,
    title: "Messages waiting after hours",
    text: "WhatsApp enquiries arrive in the evening and at weekends, and sit unanswered until someone is back.",
  },
  {
    icon: <LayersIcon />,
    title: "Follow-ups scattered across tools",
    text: "Promised callbacks and reminders live in notebooks, phones and spreadsheets, so some never happen.",
  },
  {
    icon: <UsersIcon />,
    title: "Missing context at handover",
    text: "When a colleague takes over, they don't know what was already said, so customers repeat themselves.",
  },
];

export function ProblemSection() {
  return (
    <section className="section" aria-labelledby="problem-title">
      <div className="container">
        <SectionHeading id="problem-title" title="When calls and follow-ups slip through, opportunities do too." />
        <div className={`${styles.grid4} ${styles.problemGrid}`}>
          {problems.map((problem) => (
            <article key={problem.title} className="card">
              <div className="card-icon">{problem.icon}</div>
              <h3 className={styles.cardTitle}>{problem.title}</h3>
              <p>{problem.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
