"use client";

import { useState, type ReactNode } from "react";

export function Demo({
  title,
  children,
  caption,
}: {
  title?: string;
  children: ReactNode;
  caption?: string;
}) {
  return (
    <figure className="my-7 min-w-0 rounded-xl border border-line bg-surface">
      {(title || caption) && (
        <figcaption className="grid gap-1 border-b border-line px-4 py-3 sm:px-5">
          {title && <span className="text-sm font-semibold">{title}</span>}
          {caption && <span className="max-w-[66ch] text-[13px] leading-relaxed text-muted">{caption}</span>}
        </figcaption>
      )}
      <div className="relative overflow-hidden rounded-b-xl">{children}</div>
    </figure>
  );
}

export function Callout({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: "accent" | "mint" | "plain";
}) {
  const styles =
    tone === "accent"
      ? "border-accent bg-accent-soft/60"
      : tone === "mint"
        ? "border-mint bg-mint/5"
        : "border-line bg-surface";
  return (
    <div
      className={`my-6 border-l-2 px-4 py-3.5 text-sm leading-relaxed text-body ${styles}`}
    >
      {children}
    </div>
  );
}

export function CodeBlock({
  children,
  title,
}: {
  children: string;
  title?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-2">
        <span className="font-mono text-xs text-muted">{title ?? "Code"}</span>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(children);
              setState("copied");
            } catch {
              setState("failed");
            }
            setTimeout(() => setState("idle"), 1200);
          }}
          className="shrink-0 rounded-sm border border-line px-2 py-1 text-xs font-medium text-accent hover:bg-accent-soft"
        >
          Copy
        </button>
        <span role="status" className="sr-only">{state === "copied" ? "Code copied" : state === "failed" ? "Copy failed" : ""}</span>
        {state !== "idle" && <span aria-hidden="true" className="text-xs text-muted">{state === "copied" ? "Copied" : "Copy failed"}</span>}
      </div>
      <pre tabIndex={0} className="overflow-x-auto bg-stage p-4 font-mono text-[13px] leading-relaxed text-ink">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function Exercise({
  children,
  solution,
}: {
  children: ReactNode;
  solution?: ReactNode;
}) {
  return (
    <div className="my-8 border-y border-line-strong bg-accent-soft/50 p-4 sm:p-5">
      <div className="eyebrow mb-2 text-accent">
        Practice
      </div>
      <div className="text-[15px] leading-relaxed text-body">
        {children}
      </div>
      {solution && (
        <details className="mt-3">
          <summary className="w-fit py-1.5 text-sm font-medium text-accent">One approach</summary>
          <div className="mt-2 border-t border-line pt-3">{solution}</div>
        </details>
      )}
    </div>
  );
}

export function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-sm border border-line-strong bg-surface px-3 py-1.5 text-xs font-medium text-body hover:bg-accent-soft hover:text-ink"
    >
      ↻ Replay
    </button>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  return (
    <label className="grid min-w-0 flex-1 grid-cols-[5rem_minmax(3rem,1fr)_auto] items-center gap-2 text-xs text-body">
      <span>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full min-w-0 cursor-pointer accent-accent"
      />
      <span className="min-w-10 text-right font-mono text-[11px] text-muted">
        {format ? format(value) : value}
      </span>
    </label>
  );
}
