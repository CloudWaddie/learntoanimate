"use client";

import { useState } from "react";

const versions = [
  { kind: "slow", label: "Slow start", curve: "cubic-bezier(.7, 0, .95, .6)" },
  { kind: "quick", label: "Quick response", curve: "cubic-bezier(.18, .82, .28, 1)" },
];

export function LandingComparison() {
  const [open, setOpen] = useState(false);

  return (
    <figure className="landing-comparison">
      <div className="comparison-grid">
        {versions.map(({ kind, label, curve }) => (
          <div className="comparison-demo" data-open={open} data-kind={kind} key={kind}>
            <div className="comparison-label">{label}<code>{curve}</code></div>
            <div className="comparison-skeleton" aria-hidden="true"><i /><i /><i /></div>
            <div className="comparison-panel" aria-hidden={!open}>
              <span className="comparison-status" aria-hidden="true">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.5l2.2 2.2 4.8-5.2" /></svg>
              </span>
              <span>Changes saved</span>
            </div>
          </div>
        ))}
      </div>
      <button className="button-secondary" type="button" onClick={() => setOpen((current) => !current)}>
        {open ? "Close both" : "Open both"}
      </button>
    </figure>
  );
}
