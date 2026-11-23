"use client";

import { AnimatePresence, LayoutGroup, MotionConfig, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useState } from "react";
import "./focus-timer.css";

type Timer =
  | { phase: "idle" | "ringing" }
  | { phase: "running"; endsAt: number }
  | { phase: "paused"; remaining: number };

const duration = 10_000;
const spring = { type: "spring", stiffness: 395, damping: 28 } as const;

export default function FocusTimer({ animated = true }: { animated?: boolean }) {
  const id = useId();
  const reduced = useReducedMotion();
  const [timer, setTimer] = useState<Timer>({ phase: "idle" });
  const [now, setNow] = useState(0);
  const phase = timer.phase;
  const remaining = phase === "running" ? Math.max(0, timer.endsAt - now)
    : phase === "paused" ? timer.remaining : 0;
  const seconds = Math.ceil(remaining / 1000);

  useEffect(() => {
    if (phase !== "running") return;
    const tick = () => {
      const time = Date.now();
      setNow(time);
      if (time >= timer.endsAt) {
        setTimer((current) => current === timer ? { phase: "ringing" } : current);
      }
    };
    const interval = window.setInterval(tick, 80);
    return () => window.clearInterval(interval);
  }, [phase, timer]);

  function start(milliseconds: number) {
    const time = Date.now();
    setNow(time);
    setTimer({ phase: "running", endsAt: time + milliseconds });
  }

  function toggle() {
    if (phase === "running") {
      const left = timer.endsAt - Date.now();
      setTimer(left > 0 ? { phase: "paused", remaining: left } : { phase: "ringing" });
    } else if (phase === "paused") {
      start(timer.remaining);
    } else {
      start(duration);
    }
  }

  const key = phase === "paused" ? "running" : phase;

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id={id}>
        <div className="focus-demo">
          <div className="focus-device">
            <motion.div layout={animated} className="focus-capsule" data-phase={key} transition={{ layout: spring }} style={{ borderRadius: 40 }}>
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={key}
                  layout={animated && "position"}
                  className="focus-readout"
                  initial={{ opacity: 0, y: reduced || !animated ? 0 : 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced || !animated ? 0 : -5 }}
                  transition={{ duration: animated ? 0.17 : 0, layout: spring }}
                >
                  <span className="focus-status-icon" aria-hidden="true" />
                  {key === "running" ? (
                    <>
                      <span>{phase === "paused" ? "Paused" : "Focus"}</span>
                      <time className="focus-time" dateTime={`PT${seconds}S`}>0:{String(seconds).padStart(2, "0")}</time>
                    </>
                  ) : <span>{key === "ringing" ? "Time’s up" : "Ready"}</span>}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <span className="focus-device-label">Focus timer</span>
          </div>
          <div className="focus-controls">
            <button type="button" onClick={toggle} className="focus-primary">
              {phase === "idle" ? "Start 10s timer" : phase === "running" ? "Pause" : phase === "paused" ? "Resume" : "Restart"}
            </button>
            <button type="button" disabled={phase === "idle"} onClick={() => setTimer({ phase: "idle" })}>Reset</button>
          </div>
          <span className="focus-announcement" role="status">
            {{ idle: "", running: "Timer running", paused: "Timer paused", ringing: "Time’s up" }[phase]}
          </span>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
