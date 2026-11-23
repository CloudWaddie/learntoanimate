"use client";

import { useId, useState } from "react";

const presets = {
  press: {
    markup: '<button type="button" class="save">Save draft</button>',
    base: `.save {
  padding: 12px 19px;
  border: 0;
  border-radius: 8px;
  background: #243e62;
  color: white;
  font: 600 14px system-ui;
  cursor: pointer;
}
.save:focus-visible { outline: 2px solid #496fac; outline-offset: 4px; }`,
    starter: `.save {
  /* Add a transition here. */
}

.save:active {
  background: #172d4b;
  transform: scale(.95);
}`,
    solution: `.save {
  transition: transform 150ms ease-out,
              background-color 150ms ease-out;
}

.save:active {
  background: #172d4b;
  transform: scale(.95);
}

@media (prefers-reduced-motion: reduce) {
  .save { transition: none; }
  .save:active { transform: none; }
}`,
  },
  stack: {
    markup: `<div class="demo">
  <label><input type="checkbox"> Expand stack</label>
  <ol class="stack">
    <li class="card" style="--depth: 0">Export complete</li>
    <li class="card" style="--depth: 1">Mix uploaded</li>
    <li class="card" style="--depth: 2">New comment</li>
  </ol>
</div>`,
    base: `.demo { width: min(100%, 240px); font: 600 13px system-ui; color: #252935; }
label { display: flex; gap: 5px; align-items: center; margin-bottom: 12px; }
.stack { height: 136px; list-style: none; padding: 0; margin: 0; position: relative; }
.card {
  position: absolute;
  z-index: calc(3 - var(--depth));
  inset: 0 0 auto;
  padding: 11px 12px;
  border: 1px solid #dadee7;
  border-radius: 8px;
  background: white;
  transform-origin: center top;
}
.demo:has(input:checked) .stack { --gap: 44px; --shrink: 0; }`,
    starter: `.stack {
  --gap: 6px;
  --shrink: .06;
}

.card {
  transform: translateY(calc(var(--depth) * var(--gap)));
  /* Add scale and a transition. */
}`,
    solution: `.stack {
  --gap: 6px;
  --shrink: .06;
}

.card {
  transform:
    translateY(calc(var(--depth) * var(--gap)))
    scale(calc(1 - var(--depth) * var(--shrink)));
  transition: transform 210ms cubic-bezier(.22, .8, .32, 1);
}

@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
}`,
  },
};

export function CssWorkshop({ exercise }: { exercise: keyof typeof presets }) {
  const preset = presets[exercise];
  const id = useId();
  const [draft, setDraft] = useState(preset.starter);
  const [applied, setApplied] = useState(preset.starter);
  const preview = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; form-action 'none'; base-uri 'none'">
<style>body { margin: 0; min-height: 100vh; padding: 16px; box-sizing: border-box; display: grid; place-items: center; background: #f5f5f3; }
${preset.base}
${applied.replaceAll("<", "\\3c ")}
</style></head><body>${preset.markup}</body></html>`;

  function load(css: string) {
    setDraft(css);
    setApplied(css);
  }

  return (
    <div className="css-workshop">
      <div className="css-workshop-bar">
        <label htmlFor={id}>styles.css</label>
        <button type="button" onClick={() => load(preset.starter)}>Reset</button>
        <button type="button" onClick={() => load(preset.solution)}>Load solution</button>
        <button type="button" onClick={() => setApplied(draft)} disabled={draft === applied}>Run CSS</button>
      </div>
      <div className="css-workshop-body">
        <textarea
          id={id}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
              event.preventDefault();
              setApplied(draft);
            }
          }}
          spellCheck={false}
          autoCapitalize="off"
        />
        <iframe title="CSS exercise preview" sandbox="" srcDoc={preview} />
      </div>
    </div>
  );
}
