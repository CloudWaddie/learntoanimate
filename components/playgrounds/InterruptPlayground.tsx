"use client";

import { useEffect, useState } from "react";
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
  return (
    <div className="flex-1">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-white/40">
        {label}
      </div>
      <div className="relative h-12 rounded-xl bg-[#0d0d10]">
        <div className="absolute left-6 top-1/2 h-6 w-px -translate-y-1/2 bg-mint/40" />
        <div className="absolute right-6 top-1/2 h-6 w-px -translate-y-1/2 bg-mint/40" />
        <Ball mode={mode} target={target} />
      </div>
    </div>
  );
}

function Ball({ mode, target }: { mode: "spring" | "ease"; target: boolean }) {
  const x = useMotionValue(0);

  // Animating a MotionValue (not a from/to pair) keeps the spring's velocity,
  // so a mid-flight retarget veers instead of restarting from standstill.
  useEffect(() => {
    const controls =
      mode === "spring"
        ? animate(x, target ? 208 : 0, {
            type: "spring",
            stiffness: 260,
            damping: 26,
          })
        : animate(x, target ? 208 : 0, {
            duration: 0.6,
            ease: [0.32, 0.72, 0, 1],
          });
    return () => controls.stop();
  }, [target, mode, x]);

  return (
    <motion.div
      style={{ x }}
      className={`absolute left-6 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full ${
        mode === "spring" ? "bg-accent" : "bg-white/40"
      }`}
    />
  );
}

export function InterruptPlayground() {
  const [on, setOn] = useState(false);
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[12.5px] text-white/50">
          Toggle mid-flight. The spring retargets from its current velocity; the
          ease restarts its clock every time.
        </p>
        <button
          onClick={() => setOn((o) => !o)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
            on ? "bg-accent" : "bg-white/15"
          }`}
        >
          <span
            className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all"
            style={{ left: on ? 22 : 2 }}
          />
        </button>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Track label="spring (interruptible)" mode="spring" target={on} />
        <Track label="ease (restarts)" mode="ease" target={on} />
      </div>
      <p className="mt-3 text-[11.5px] leading-relaxed text-white/35">
        Flip the toggle rapidly — click it again before the ball arrives. The
        orange ball glides into its new destination; the gray ball visibly
        stalls and restarts.
      </p>
    </div>
  );
}
