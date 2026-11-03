"use client";

import { useEffect, useState } from "react";
import { orchestrationExample } from "@/content/agenticSolutions";
import { previewDisclosure } from "@/content/previews";
import { PauseIcon, PlayIcon, RefreshIcon } from "@/components/ui/icons";
import styles from "./agentic.module.css";

const STEP_MS = 2200;
const { request, steps } = orchestrationExample;

/**
 * Step-through of one request moving through the AI Manager and the specialised agents.
 * Nothing advances on its own until the visitor presses Play. Every step's text is in the
 * HTML; steps not reached yet are only dimmed.
 */
export function OrchestrationDemo() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = steps.length - 1;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setCurrent((step) => Math.min(step + 1, last));
      if (current + 1 >= last) setPlaying(false);
    }, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, current, last]);

  function togglePlay() {
    if (current === last) setCurrent(0);
    setPlaying((value) => !value);
  }

  function goTo(step: number) {
    setPlaying(false);
    setCurrent(step);
  }

  const progress = Math.round((current / last) * 100);

  return (
    <figure className={styles.orchestration} aria-labelledby="orchestration-caption">
      <div className={styles.request}>
        <span className={styles.requestLabel}>Business owner asks</span>
        <p>“{request}”</p>
      </div>

      <div className={styles.orchestrationBar}>
        <div className={styles.progressTrack} aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className={styles.progressText} aria-live="polite">
          Step {current + 1} of {steps.length}: {steps[current].title}
        </p>
      </div>

      <ol className={styles.orchestrationSteps}>
        {steps.map((step, index) => {
          const state = index < current ? "done" : index === current ? "current" : "upcoming";
          return (
            <li key={step.title} className={styles.orchestrationStep} data-state={state}>
              <button
                type="button"
                className={styles.stepButton}
                aria-current={state === "current" ? "step" : undefined}
                onClick={() => goTo(index)}
              >
                <span className={styles.stepNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <span className={styles.stepBody}>
                  <span className={styles.stepAgent}>{step.agent}</span>
                  <span className={styles.stepTitle}>{step.title}</span>
                  <span className={styles.stepDetail}>{step.detail}</span>
                  <span className={styles.stepOutput}>
                    <span className="sr-only">Result: </span>
                    {step.output}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className={styles.orchestrationControls}>
        <button type="button" className="button button--secondary" onClick={() => goTo(Math.max(current - 1, 0))} disabled={current === 0}>
          Previous
        </button>
        <button type="button" className="button" onClick={togglePlay}>
          {playing ? <PauseIcon width="18" height="18" /> : current === last ? <RefreshIcon width="18" height="18" /> : <PlayIcon width="18" height="18" />}
          {playing ? "Pause" : current === last ? "Replay" : "Play"}
        </button>
        <button type="button" className="button button--secondary" onClick={() => goTo(Math.min(current + 1, last))} disabled={current === last}>
          Next
        </button>
      </div>

      <figcaption id="orchestration-caption" className={styles.caption}>
        {previewDisclosure}. The request, tasks and results are fictional.
      </figcaption>
    </figure>
  );
}
