"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue } from "motion/react";

function Track({
  label,
  mode,
  target,
}: {
  label: string;
  mode: "spring" | "ease";
  target: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted">
        {label}
      </div>
      <div ref={track} className="relative h-12 rounded-sm bg-stage">
        <div className="absolute left-6 top-1/2 h-6 w-px -translate-y-1/2 bg-mint/40" />
        <div className="absolute right-6 top-1/2 h-6 w-px -translate-y-1/2 bg-mint/40" />
        <Ball mode={mode} target={target} track={track} />
      </div>
    </div>
  );
}

function Ball({ mode, target, track }: { mode: "spring" | "ease"; target: boolean; track: React.RefObject<HTMLDivElement | null> }) {
  const x = useMotionValue(0);

  // Animating a MotionValue (not a from/to pair) keeps the spring's velocity,
  // so a mid-flight retarget veers instead of restarting from standstill.
  useEffect(() => {
    const end = Math.max(0, (track.current?.clientWidth ?? 48) - 48);
    const controls =
      mode === "spring"
        ? animate(x, target ? end : 0, {
            type: "spring",
            stiffness: 260,
            damping: 26,
          })
        : animate(x, target ? end : 0, {
            duration: 0.6,
            ease: "easeInOut",
          });
    return () => controls.stop();
  }, [target, mode, track, x]);

  return (
    <motion.div
      style={{ x }}
      className={`absolute left-6 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
        mode === "spring" ? "bg-accent" : "bg-line-strong"
      }`}
    />
  );
}

export function InterruptPlayground() {
  const [on, setOn] = useState(false);
  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          type="button"
          aria-pressed={on}
          onClick={() => setOn((o) => !o)}
          className="button-secondary"
        >
          Move right
        </button>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Track label="Spring" mode="spring" target={on} />
        <Track label="Ease-in-out" mode="ease" target={on} />
      </div>
    </div>
  );
}
