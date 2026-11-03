"use client";

import Link from "next/link";
import { useState } from "react";
import type { AgentDepartment } from "@/content/agenticSolutions";
import { ArrowRightIcon, CheckIcon, UserCheckIcon } from "@/components/ui/icons";
import { agentIcons } from "./agentIcons";
import styles from "./agentic.module.css";

/**
 * Department cards and a detail panel. Cards are buttons with aria-pressed (as in the module
 * explorer). Every department's detail is in the server-rendered HTML; only the selected one
 * is shown, so the copy stays readable without JavaScript and to search engines.
 */
export function AgentDepartments({ departments }: { departments: AgentDepartment[] }) {
  const [selectedId, setSelectedId] = useState(departments[0].id);

  /** On stacked layouts the detail sits below the cards: bring it into view if it's off-screen. */
  function select(id: AgentDepartment["id"]) {
    setSelectedId(id);
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    requestAnimationFrame(() => {
      const detail = document.getElementById(`department-${id}`);
      const top = detail?.getBoundingClientRect().top ?? 0;
      if (detail && (top < 0 || top > window.innerHeight * 0.6)) detail.scrollIntoView({ block: "start" });
    });
  }

  return (
    <div className={styles.departments}>
      <div className={styles.departmentList} role="group" aria-label="AI agent departments">
        {departments.map((department) => {
          const Icon = agentIcons[department.id];
          const selected = department.id === selectedId;
          return (
            <button
              key={department.id}
              type="button"
              className={styles.departmentCard}
              aria-pressed={selected}
              aria-controls={`department-${department.id}`}
              onClick={() => select(department.id)}
            >
              <span className={styles.departmentIcon} aria-hidden="true">
                <Icon width="20" height="20" />
              </span>
              <span className={styles.departmentTitle}>{department.title}</span>
              <span className={styles.departmentSummary}>{department.summary}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.departmentDetails}>
        {departments.map((department) => {
          const Icon = agentIcons[department.id];
          return (
            <section
              key={department.id}
              id={`department-${department.id}`}
              className={styles.departmentDetail}
              aria-labelledby={`department-${department.id}-title`}
              hidden={department.id !== selectedId}
            >
              <div className={styles.detailHead}>
                <span className={styles.detailIcon} aria-hidden="true">
                  <Icon width="24" height="24" />
                </span>
                <div>
                  <h3 id={`department-${department.id}-title`}>{department.title}</h3>
                  <p>{department.summary}</p>
                </div>
              </div>

              <h4>What it does</h4>
              <ul className="check-list">
                {department.tasks.map((task) => (
                  <li key={task}>
                    <CheckIcon width="18" height="18" />
                    {task}
                  </li>
                ))}
              </ul>

              <h4>Connects to</h4>
              <ul className={styles.chips}>
                {department.connects.map((system) => (
                  <li key={system}>{system}</li>
                ))}
              </ul>

              <p className={styles.approval}>
                <UserCheckIcon width="18" height="18" aria-hidden="true" />
                <span>
                  <strong>Waits for your team:</strong> {department.approval}
                </span>
              </p>

              <div className="button-row">
                <Link href="/book-demo" className="button">
                  Discuss this agent
                  <ArrowRightIcon width="18" height="18" />
                </Link>
                {department.related && (
                  <Link href={department.related.href} className="button button--secondary">
                    {department.related.label}
                  </Link>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
