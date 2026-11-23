"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ReplayButton, Slider } from "@/components/lesson";

export function StaggerPlayground() {
  const [stagger, setStagger] = useState(50);
  const [count, setCount] = useState(12);
  const [runId, setRunId] = useState(0);
  const [from, setFrom] = useState<"first" | "center" | "last">("first");

  const items = Array.from({ length: count }, (_, i) => i);
  const indexFor = (i: number) =>
    from === "first" ? i : from === "last" ? count - 1 - i : Math.abs(i - (count - 1) / 2);

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap items-end gap-x-5 gap-y-3">
        <Slider label="stagger" value={stagger} min={0} max={150} step={5} onChange={setStagger} format={(v) => `${v}ms`} />
        <Slider label="items" value={count} min={3} max={20} onChange={setCount} />
        <div className="flex gap-1.5">
          {(["first", "center", "last"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFrom(f)}
              className={`rounded-md border px-2 py-1 text-[11px] transition-colors ${
                from === f
                  ? "border-accent/50 bg-accent-soft text-accent"
                  : "border-line text-muted hover:border-line-strong"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <ReplayButton onClick={() => setRunId((r) => r + 1)} />
      </div>
      <div className="flex h-28 flex-wrap content-center items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-stage px-4">
        {items.map((i) => (
          <motion.div
            key={`${runId}-${i}`}
            initial={{ opacity: 0, y: 18, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: indexFor(i) * (stagger / 1000),
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            className="h-6 w-6 rounded-md bg-accent"
          />
        ))}
      </div>
      <p className="mt-3 text-[11.5px] leading-relaxed text-muted">
        Total perceived duration = stagger × items + single-item duration. Keep
        it under ~600ms or the last items feel left behind.
      </p>
    </div>
  );
}
