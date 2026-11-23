"use client";

import { useState } from "react";
import { motion } from "motion/react";

const ORIGINS = [
  "center",
  "top left",
  "top right",
  "bottom left",
  "bottom right",
] as const;

export function OriginPlayground() {
  const [origin, setOrigin] = useState<(typeof ORIGINS)[number]>("top right");
  const [open, setOpen] = useState(true);
  const [runId, setRunId] = useState(0);

  return (
    <div className="p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {ORIGINS.map((o) => (
          <button
            key={o}
            onClick={() => {
              setOrigin(o);
              setRunId((r) => r + 1);
              setOpen(true);
            }}
            className={`rounded-md border px-2 py-1 text-[11px] transition-colors ${
              origin === o
                ? "border-accent/50 bg-accent-soft text-accent"
                : "border-line text-muted hover:border-line-strong"
            }`}
          >
            {o}
          </button>
        ))}
        <button
          onClick={() => {
            setOpen((o) => !o);
            setRunId((r) => r + 1);
          }}
          className="ml-auto rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[12px] font-medium text-body hover:border-line-strong hover:text-ink"
        >
          toggle
        </button>
      </div>
      <div className="relative h-44 overflow-hidden rounded-xl bg-stage">
        <div className="absolute right-4 top-4 text-[11px] text-muted">
          ← pretend trigger is up here
        </div>
        {open && (
          <motion.div
            key={`${origin}-${runId}`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 480, damping: 28 }}
            style={{ transformOrigin: origin }}
            className="absolute right-4 top-12 w-44 rounded-xl border border-line bg-surface-2 p-3 shadow-2xl"
          >
            {["New file", "Duplicate", "Rename…", "Delete"].map((item) => (
              <div
                key={item}
                className="rounded-md px-2.5 py-1.5 text-[12.5px] text-body hover:bg-line"
              >
                {item}
              </div>
            ))}
          </motion.div>
        )}
      </div>
      <p className="mt-3 text-[11.5px] leading-relaxed text-muted">
        A menu should grow from its trigger — scale from the corner nearest the
        button, not the center. Try &quot;center&quot; and feel the difference.
      </p>
    </div>
  );
}
