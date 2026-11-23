"use client";

import { useState } from "react";

export function LandingComparison() {
  const [open, setOpen] = useState(false);

  return (
    <figure className="landing-comparison">
      <div className="comparison-grid">
        <div className="comparison-demo" data-open={open} data-kind="slow">
          <div className="comparison-label">Slow start</div>
          <div className="comparison-panel" aria-hidden={!open}>
            <span className="comparison-status" aria-hidden="true" />
            <span>Changes saved</span>
          </div>
        </div>
        <div className="comparison-demo" data-open={open} data-kind="quick">
          <div className="comparison-label">Quick response</div>
          <div className="comparison-panel" aria-hidden={!open}>
            <span className="comparison-status" aria-hidden="true" />
            <span>Changes saved</span>
          </div>
        </div>
      </div>
      <button className="button-secondary" type="button" onClick={() => setOpen((current) => !current)}>
        {open ? "Close both" : "Open both"}
      </button>
    </figure>
  );
}
