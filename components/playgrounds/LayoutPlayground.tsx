"use client";

import { useState } from "react";
import { motion } from "motion/react";

export function LayoutPlayground() {
  const [tab, setTab] = useState(0);
  const [grid, setGrid] = useState(false);
  const tabs = ["Overview", "Specs", "Reviews"];
  const items = [0, 1, 2, 3, 4, 5];

  return (
    <div className="space-y-6 p-4">
      <div>
        <div className="mb-2 text-[11px] uppercase tracking-wider text-white/35">
          shared element — the underline is one element, moved
        </div>
        <div className="inline-flex rounded-xl bg-[#0d0d10] p-1">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className="relative rounded-lg px-4 py-2 text-[13px] text-white/60 transition-colors hover:text-white"
            >
              {tab === i && (
                <motion.span
                  layoutId="tab-pill"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 rounded-lg bg-accent-soft ring-1 ring-accent/40"
                />
              )}
              <span className="relative z-10">{t}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[11px] uppercase tracking-wider text-white/35">
            layout animation — click to reflow
          </div>
          <button
            onClick={() => setGrid((g) => !g)}
            className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[12px] font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white"
          >
            {grid ? "Make it a row" : "Make it a grid"}
          </button>
        </div>
        <div
          className={`rounded-xl bg-[#0d0d10] p-4 ${
            grid ? "grid grid-cols-3 gap-3" : "flex gap-3"
          }`}
        >
          {items.map((i) => (
            <motion.div
              layout
              key={i}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="h-14 rounded-lg border border-line bg-surface-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
