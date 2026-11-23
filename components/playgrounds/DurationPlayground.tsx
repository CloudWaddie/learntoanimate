"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Slider } from "@/components/lesson";

export function DurationPlayground() {
  const [duration, setDuration] = useState(300);
  const [show, setShow] = useState(false);

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <Slider
          label="duration"
          value={duration}
          min={50}
          max={1500}
          step={50}
          onChange={setDuration}
          format={(v) => `${v}ms`}
        />
        <button
          onClick={() => setShow((s) => !s)}
          className="rounded-lg border border-line bg-surface-2 px-3.5 py-1.5 text-[12px] font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white"
        >
          {show ? "Hide panel" : "Show panel"}
        </button>
      </div>
      <div className="relative h-36 overflow-hidden rounded-xl bg-[#0d0d10]">
        <AnimatePresence>
          {show && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: duration / 1000, ease: [0.32, 0.72, 0, 1] }}
              className="absolute left-1/2 top-1/2 w-56 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line bg-surface-2 p-4"
            >
              <div className="mb-2 h-2.5 w-20 rounded bg-white/15" />
              <div className="mb-1.5 h-2 w-full rounded bg-white/8" />
              <div className="h-2 w-3/4 rounded bg-white/8" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-3 text-[11.5px] leading-relaxed text-white/35">
        Try 100ms, then 1000ms. UI work lives between 100–400ms. Above ~500ms an
        animation stops feeling like feedback and starts feeling like a delay.
      </p>
    </div>
  );
}
