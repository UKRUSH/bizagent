"use client";

import { useEffect, useState } from "react";
import { demoChannels, demoDisclosure, demoScenarios, scenarioTranscript, type DemoChannel } from "@/content/demo-scenarios";
import type { RoleSlug } from "@/content/types";
import { track } from "@/lib/analytics";
import styles from "./demo.module.css";

const roleOptions: { id: RoleSlug; label: string }[] = [
  { id: "call-center", label: "Call Center Agent" },
  { id: "sales-agent", label: "Sales Agent" },
  { id: "personal-assistant", label: "Personal Call Assistant" },
];

const STEP_MS = 1400;

/**
 * Guided preview (spec 13). Everything runs locally from fictional data: no network
 * requests, microphone, dialling, messages, calendar invitations or payments. The
 * disclosure stays visible at all times.
 */
export function DemoPlayer() {
  const [scenarioId, setScenarioId] = useState(demoScenarios[0].id);
  const [role, setRole] = useState<RoleSlug>("call-center");
  const [channel, setChannel] = useState<DemoChannel>("whatsapp");
  const [shown, setShown] = useState(0);
  const [playing, setPlaying] = useState(false);

  const scenario = demoScenarios.find((item) => item.id === scenarioId) ?? demoScenarios[0];
  const transcript = scenarioTranscript(scenario, channel);
  const total = transcript.length;
  const complete = shown >= total;
  // Playback stops by itself once the last message is visible.
  const isPlaying = playing && !complete;
  const action = scenario.actions[role];
  const channelLabel = demoChannels.find((item) => item.id === channel)?.label ?? channel;
  const eventDetail = { scenario: scenario.id, role, channel };

  // One timeout per step: reveal the next message, and report completion on the last one.
  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setTimeout(() => {
      const next = shown + 1;
      setShown(next);
      if (next >= total) {
        setPlaying(false);
        track({ name: "illustrative_demo_completed", scenario: scenario.id, role, channel });
      }
    }, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [isPlaying, shown, total, scenario.id, role, channel]);

  function reset() {
    setPlaying(false);
    setShown(0);
  }

  function play() {
    if (complete) setShown(0);
    track({ name: "illustrative_demo_started", ...eventDetail });
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setShown(total);
      track({ name: "illustrative_demo_completed", ...eventDetail });
      return;
    }
    setShown((count) => (complete || count === 0 ? 1 : count));
    setPlaying(true);
  }

  function showAll() {
    setPlaying(false);
    setShown(total);
  }

  return (
    <div className={styles.player}>
      <div className={styles.controls}>
        <div className={styles.field}>
          <label htmlFor="demo-scenario">Scenario</label>
          <select
            id="demo-scenario"
            value={scenarioId}
            onChange={(event) => {
              setScenarioId(event.target.value);
              reset();
            }}
          >
            {demoScenarios.map((item) => (
              <option key={item.id} value={item.id}>
                {item.industry}: {item.title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="demo-role">Role</label>
          <select id="demo-role" value={role} onChange={(event) => setRole(event.target.value as RoleSlug)}>
            {roleOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="demo-channel">Channel</label>
          <select
            id="demo-channel"
            value={channel}
            onChange={(event) => {
              setChannel(event.target.value as DemoChannel);
              reset();
            }}
          >
            {demoChannels.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.buttons}>
        {isPlaying ? (
          <button type="button" className="button" onClick={() => setPlaying(false)}>
            Pause
          </button>
        ) : (
          <button type="button" className="button" onClick={play}>
            {complete ? "Play again" : shown > 0 ? "Resume" : "Play conversation"}
          </button>
        )}
        <button type="button" className="button button--secondary" onClick={showAll} disabled={complete}>
          Show all
        </button>
        <button type="button" className="button button--secondary" onClick={reset} disabled={shown === 0}>
          Reset
        </button>
      </div>

      <div className={styles.stage}>
        <figure className={`conversation-preview ${styles.frame}`} aria-labelledby="demo-frame-caption">
          <div className="preview-toolbar">
            <span className={styles.channelLabel}>
              {channelLabel} · {scenario.title}
            </span>
            <span className={styles.demoBadge}>{demoDisclosure}</span>
          </div>
          <div className="preview-body">
            {shown === 0 && (
              <p className={styles.empty}>Press &ldquo;Play conversation&rdquo; to start this fictional example.</p>
            )}
            <ol className={styles.transcript} aria-live="polite" aria-label="Fictional conversation">
              {transcript.slice(0, shown).map((message, index) => (
                <li key={`${scenario.id}-${channel}-${index}`} className={`message ${message.speaker === "assistant" ? "message--ai" : ""} ${styles.reveal}`}>
                  <span className="message-label">{message.speaker === "assistant" ? "AI assistant" : "Customer"}</span>
                  <p>{message.text}</p>
                </li>
              ))}
            </ol>
            <p className={styles.progress}>
              Message {Math.min(shown, total)} of {total}
            </p>
          </div>
          <figcaption id="demo-frame-caption" className={`preview-disclosure ${styles.caption}`}>
            {demoDisclosure}. Names and details are fictional.
          </figcaption>
        </figure>

        <section className={`card ${styles.action}`} aria-labelledby="demo-action-title" aria-live="polite">
          <h2 id="demo-action-title" className={styles.actionHeading}>
            Proposed action
          </h2>
          {complete ? (
            <>
              <p className={styles.actionTitle}>{action.title}</p>
              <ul className="feature-list">
                {action.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <p className={styles.handoff}>
                <strong>Handoff:</strong> {action.handoff}
              </p>
              <p className={styles.note}>
                In a live deployment, actions like this follow the rules and approvals your team sets.
              </p>
            </>
          ) : (
            <p className={styles.note}>The proposed action for the selected role appears when the conversation finishes.</p>
          )}
        </section>
      </div>
    </div>
  );
}
