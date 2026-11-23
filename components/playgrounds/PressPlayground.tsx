"use client";

import { useState } from "react";

export function PressPlayground() {
  const [saves, setSaves] = useState(0);
  return (
    <div className="grid gap-3 p-4 bg-stage">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setSaves(saves + 1)} className="button-secondary">Save without press effect</button>
        <button
          type="button"
          onClick={() => setSaves(saves + 1)}
          className="button-primary transition-[transform,background-color] duration-150 ease-out active:bg-[#193b87] motion-safe:active:scale-[0.97] motion-reduce:transition-none"
        >
          Save with press effect
        </button>
      </div>
      <output role="status" className="text-xs text-muted">Draft saves: {saves}</output>
    </div>
  );
}
