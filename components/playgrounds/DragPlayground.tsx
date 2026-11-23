"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";

export function DragPlayground() {
  const box = useRef<HTMLDivElement>(null);
  const [elastic, setElastic] = useState(true);

  return (
    <div className="p-4">
      <div className="mb-3 flex items-center gap-3">
        <span className="text-[11px] uppercase tracking-wider text-white/35">
          drag the card — feel the elastic edges
        </span>
        <button
          onClick={() => setElastic((e) => !e)}
          className="rounded-md border border-line px-2.5 py-1 text-[11px] text-white/50 transition-colors hover:border-white/25 hover:text-white"
        >
          elastic: {elastic ? "on" : "off"}
        </button>
      </div>
      <div
        ref={box}
        className="relative flex h-48 items-center justify-center overflow-hidden rounded-xl bg-[#0d0d10]"
      >
        <div className="pointer-events-none absolute inset-x-8 top-1/2 h-px bg-white/8" />
        <motion.div
          drag
          dragConstraints={box}
          dragElastic={elastic ? 0.4 : 0}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 18 }}
          whileDrag={{ scale: 1.06, rotate: 2, cursor: "grabbing" }}
          className="h-24 w-40 cursor-grab rounded-2xl border border-accent/40 bg-gradient-to-br from-accent-soft to-surface-2 p-3 shadow-xl"
        >
          <div className="mb-2 h-2 w-16 rounded bg-accent/50" />
          <div className="h-1.5 w-full rounded bg-white/10" />
          <div className="mt-1.5 h-1.5 w-2/3 rounded bg-white/10" />
        </motion.div>
      </div>
      <p className="mt-3 text-[11.5px] leading-relaxed text-white/35">
        Release while moving — momentum carries the card. dragElastic controls
        how far past the edge it pulls before snapping back.
      </p>
    </div>
  );
}
