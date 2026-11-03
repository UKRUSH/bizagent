import { networkAgents, networkFeed } from "@/content/agenticSolutions";
import { previewDisclosure } from "@/content/previews";
import { agentIcons } from "./agentIcons";
import styles from "./agentic.module.css";

const ManagerIcon = agentIcons.manager;

/** Node positions on a hexagon around the AI Manager, as percentages of the orbit box. */
const positions = [
  { x: 50, y: 11 },
  { x: 84, y: 31 },
  { x: 84, y: 69 },
  { x: 50, y: 89 },
  { x: 16, y: 69 },
  { x: 16, y: 31 },
];

/** Hero visual: the AI Manager coordinating specialised agents (spec 4.2: labelled demo). */
export function AgentNetwork() {
  return (
    <figure className={styles.network} aria-labelledby="agent-network-caption">
      <div className={styles.networkHeader}>
        <span className={styles.online}>
          <span className={styles.pulse} aria-hidden="true" />
          AI agents online
        </span>
        <span className={styles.demoBadge}>Illustrative demo</span>
      </div>

      <div className={styles.orbit}>
        <svg className={styles.links} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {positions.map((point, index) => (
            <line
              key={index}
              x1="50"
              y1="50"
              x2={point.x}
              y2={point.y}
              style={{ animationDelay: `${index * -0.4}s` }}
            />
          ))}
        </svg>

        <div className={styles.manager}>
          <span className={styles.managerIcon} aria-hidden="true">
            <ManagerIcon width="22" height="22" />
          </span>
          <strong>AI Manager</strong>
          <span>Planning &amp; delegating</span>
        </div>

        <ul className={styles.nodes} aria-label="Specialised agents">
          {networkAgents.map((agent, index) => {
            const Icon = agentIcons[agent.id];
            const point = positions[index];
            return (
              <li
                key={agent.id}
                className={styles.node}
                style={{ left: `${point.x}%`, top: `${point.y}%`, animationDelay: `${index * 0.12}s` }}
              >
                <span className={styles.nodeIcon} aria-hidden="true">
                  <Icon width="16" height="16" />
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
        {networkFeed.map((entry) => (
          <li key={entry.text}>
            <strong>{entry.agent}</strong>
            <span>{entry.text}</span>
          </li>
        ))}
      </ol>

      <figcaption id="agent-network-caption" className={styles.caption}>
        {previewDisclosure}. Agents, tasks and activity are fictional.
      </figcaption>
    </figure>
  );
}
