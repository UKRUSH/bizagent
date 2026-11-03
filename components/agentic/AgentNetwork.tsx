import type { ComponentType, SVGProps } from "react";
import { previewDisclosure } from "@/content/previews";
import styles from "./agentic.module.css";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export interface AgentNetworkProps {
  /** The coordinating agent in the centre. */
  hub: { label: string; status: string; icon: Icon };
  /** Up to six agents around the hub. */
  agents: { label: string; status: string; icon: Icon }[];
  feed: { agent: string; text: string }[];
  /** Appended to the shared "Illustrative demo" disclosure. */
  caption: string;
  /** Distinguishes figure ids if the visual appears more than once. */
  id?: string;
}

/** Node positions on a hexagon around the hub, as percentages of the orbit box. */
const positions = [
  { x: 50, y: 11 },
  { x: 84, y: 31 },
  { x: 84, y: 69 },
  { x: 50, y: 89 },
  { x: 16, y: 69 },
  { x: 16, y: 31 },
];

/**
 * Hero visual: a central agent coordinating specialised agents, with a live activity feed
 * (spec 4.2: labelled demo). Used on /agentic-solutions and /whatsapp-orders.
 */
export function AgentNetwork({ hub, agents, feed, caption, id = "agent-network" }: AgentNetworkProps) {
  const HubIcon = hub.icon;
  const placed = agents.slice(0, positions.length);

  return (
    <figure className={styles.network} aria-labelledby={`${id}-caption`}>
      <div className={styles.networkHeader}>
        <span className={styles.online}>
          <span className={styles.pulse} aria-hidden="true" />
          AI agents online
        </span>
        <span className={styles.demoBadge}>Illustrative demo</span>
      </div>

      <div className={styles.orbit}>
        <svg className={styles.links} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {placed.map((agent, index) => (
            <line
              key={agent.label}
              x1="50"
              y1="50"
              x2={positions[index].x}
              y2={positions[index].y}
              style={{ animationDelay: `${index * -0.4}s` }}
            />
          ))}
        </svg>

        <div className={styles.manager}>
          <span className={styles.managerIcon} aria-hidden="true">
            <HubIcon width="22" height="22" />
          </span>
          <strong>{hub.label}</strong>
          <span>{hub.status}</span>
        </div>

        <ul className={styles.nodes} aria-label="Specialised agents">
          {placed.map((agent, index) => {
            const AgentIcon = agent.icon;
            const point = positions[index];
            return (
              <li
                key={agent.label}
                className={styles.node}
                style={{ left: `${point.x}%`, top: `${point.y}%`, animationDelay: `${index * 0.12}s` }}
              >
                <span className={styles.nodeIcon} aria-hidden="true">
                  <AgentIcon width="16" height="16" />
                </span>
                <span className={styles.nodeText}>
                  <strong>{agent.label}</strong>
                  <span>{agent.status}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <ol className={styles.feed} aria-label="Recent agent activity">
        {feed.map((entry) => (
          <li key={`${entry.agent}-${entry.text}`}>
            <strong>{entry.agent}</strong>
            <span>{entry.text}</span>
          </li>
        ))}
      </ol>

      <figcaption id={`${id}-caption`} className={styles.caption}>
        {previewDisclosure}. {caption}
      </figcaption>
    </figure>
  );
}
