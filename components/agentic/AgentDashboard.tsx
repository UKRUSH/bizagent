"use client";

import { useState } from "react";
import { dashboardPreview, type DashboardStatus } from "@/content/agenticSolutions";
import { previewDisclosure } from "@/content/previews";
import { BarChartIcon, CheckIcon, ClockIcon, FileIcon, RefreshIcon, UserCheckIcon } from "@/components/ui/icons";
import styles from "./agentic.module.css";

type Decision = "pending" | "approved" | "held";
type View = "workflows" | "activity" | "reports";

const views: { id: View; label: string }[] = [
  { id: "workflows", label: "Workflows" },
  { id: "activity", label: "Activity log" },
  { id: "reports", label: "Reports" },
];

const statusClass: Record<DashboardStatus, string> = {
  Active: styles.statusActive,
  Working: styles.statusWorking,
  "Waiting for approval": styles.statusWaiting,
};

const { agents, stats, approval, workflows, activity, reports } = dashboardPreview;

/**
 * Agent console mockup. Approving or holding the pending task updates the agent's status,
 * the counters and the activity log. Status is always written out, never colour alone
 * (spec 15.2). Nothing here connects to a real system.
 */
export function AgentDashboard() {
  const [decision, setDecision] = useState<Decision>("pending");
  const [view, setView] = useState<View>("workflows");

  const liveAgents = agents.map((agent) => {
    if (agent.name !== approval.agent || decision === "pending") return agent;
    return decision === "approved"
      ? { ...agent, status: approval.approvedStatus, task: approval.approvedTask }
      : { ...agent, status: "Active" as DashboardStatus, task: "Payment reminders on hold" };
  });
  const log =
    decision === "pending"
      ? activity
      : [
          {
            time: "09:45",
            agent: "You",
            text: decision === "approved" ? "Approved the payment reminders" : "Put the payment reminders on hold",
          },
          ...activity,
        ];

  return (
    <figure className={styles.dashboard} aria-labelledby="dashboard-caption">
      <div className={styles.dashboardTop}>
        <div>
          <p className={styles.dashboardName}>BIZny Agent Console</p>
          <p className={styles.dashboardMeta}>Your workspace · Today</p>
        </div>
        <span className={styles.demoBadgeLight}>Illustrative demo</span>
      </div>

      <dl className={styles.stats}>
        <div>
          <dt>Active tasks</dt>
          <dd>{stats.active + (decision === "approved" ? 1 : 0)}</dd>
        </div>
        <div>
          <dt>Completed today</dt>
          <dd>{stats.completed}</dd>
        </div>
        <div>
          <dt>Pending approvals</dt>
          <dd>{decision === "pending" ? 1 : 0}</dd>
        </div>
        <div>
          <dt>Agents online</dt>
          <dd>{agents.length}</dd>
        </div>
      </dl>

      <div className={styles.dashboardGrid}>
        <section className={styles.panel} aria-labelledby="dashboard-agents-title">
          <h3 id="dashboard-agents-title">AI agents</h3>
          <ul className={styles.agentRows}>
            {liveAgents.map((agent) => (
              <li key={agent.name}>
                <span>
                  <strong>{agent.name}</strong>
                  <span className={styles.agentTask}>{agent.task}</span>
                </span>
                <span className={`${styles.status} ${statusClass[agent.status]}`}>{agent.status}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.dashboardSide}>
          <section className={`${styles.panel} ${styles.approvalPanel}`} aria-labelledby="dashboard-approval-title">
            <h3 id="dashboard-approval-title">
              <UserCheckIcon width="18" height="18" aria-hidden="true" />
              Pending approval
            </h3>
            <div aria-live="polite">
              {decision === "pending" ? (
                <>
                  <p className={styles.approvalAgent}>{approval.agent}</p>
                  <p className={styles.approvalTitle}>{approval.title}</p>
                  <p className={styles.approvalDetail}>{approval.detail}</p>
                </>
              ) : (
                <p className={styles.approvalDone}>
                  <CheckIcon width="18" height="18" aria-hidden="true" />
                  {decision === "approved"
                    ? "Approved. The Finance Agent is sending the reminders."
                    : "On hold. Nothing will be sent until you approve it."}
                </p>
              )}
            </div>
            <div className={styles.approvalActions}>
              {decision === "pending" ? (
                <>
                  <button type="button" className="button" onClick={() => setDecision("approved")}>
                    Approve
                  </button>
                  <button type="button" className="button button--secondary" onClick={() => setDecision("held")}>
                    Hold
                  </button>
                </>
              ) : (
                <button type="button" className="button button--secondary" onClick={() => setDecision("pending")}>
                  <RefreshIcon width="18" height="18" />
                  Reset demo
                </button>
              )}
            </div>
          </section>

          <section className={styles.panel} aria-labelledby="dashboard-view-title">
            <h3 id="dashboard-view-title" className="sr-only">
              {views.find((entry) => entry.id === view)?.label}
            </h3>
            <div className={styles.viewSwitch} role="group" aria-label="Dashboard view">
              {views.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  aria-pressed={view === entry.id}
                  aria-controls="dashboard-view"
                  onClick={() => setView(entry.id)}
                >
                  {entry.label}
                </button>
              ))}
            </div>

            <div id="dashboard-view">
              {view === "workflows" && (
                <ul className={styles.workflows}>
                  {workflows.map((workflow) => (
                    <li key={workflow.name}>
                      <span className={styles.workflowHead}>
                        <strong>{workflow.name}</strong>
                        <span>{workflow.progress}%</span>
                      </span>
                      <span className={styles.workflowBar} aria-hidden="true">
                        <span style={{ width: `${workflow.progress}%` }} />
                      </span>
                      <span className={styles.workflowMeta}>{workflow.steps}</span>
                    </li>
                  ))}
                </ul>
              )}
              {view === "activity" && (
                <ol className={styles.activity}>
                  {log.map((entry) => (
                    <li key={`${entry.time}-${entry.text}`}>
                      <ClockIcon width="14" height="14" aria-hidden="true" />
                      <time>{entry.time}</time>
                      <span>
                        <strong>{entry.agent}</strong> {entry.text}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
              {view === "reports" && (
                <ul className={styles.reports}>
                  {reports.map((report, index) => {
                    const Icon = index === 1 ? BarChartIcon : FileIcon;
                    return (
                      <li key={report.title}>
                        <Icon width="18" height="18" aria-hidden="true" />
                        <span>
                          <strong>{report.title}</strong>
                          <span className={styles.workflowMeta}>{report.meta}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>

      <figcaption id="dashboard-caption" className={styles.caption}>
        {previewDisclosure}. Agents, tasks and figures are fictional.
      </figcaption>
    </figure>
  );
}
