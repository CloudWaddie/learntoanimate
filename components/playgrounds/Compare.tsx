"use client";

import { useState, type ReactNode } from "react";

export function Compare({
  a,
  b,
  labelA = "before",
  labelB = "after",
  hint,
}: {
  a: ReactNode;
  b: ReactNode;
  labelA?: string;
  labelB?: string;
  hint?: string;
}) {
  const [key, setKey] = useState(0);
  return (
    <div>
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        <div>
          <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-white/35">
            {labelA}
          </div>
          <div key={`a-${key}`}>{a}</div>
        </div>
        <div>
          <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-accent/70">
            {labelB}
          </div>
          <div key={`b-${key}`}>{b}</div>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 pb-3">
        <span className="text-[11.5px] text-white/35">{hint}</span>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[12px] font-medium text-white/70 hover:border-white/25 hover:text-white"
        >
          ↻ Replay both
        </button>
      </div>
    </div>
  );
}
