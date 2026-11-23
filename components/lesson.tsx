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
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface">
      {title && (
        <div className="border-b border-line px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
          {title}
        </div>
      )}
      <div className="relative">{children}</div>
      {caption && (
        <figcaption className="border-t border-line px-4 py-2.5 text-[12px] leading-relaxed text-white/40">
          {caption}
        </figcaption>
      )}
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
      ? "border-accent/30 bg-accent-soft/60"
      : tone === "mint"
        ? "border-mint/30 bg-mint/10"
        : "border-line bg-surface";
  return (
    <div
      className={`my-6 rounded-xl border px-4 py-3.5 text-[14px] leading-relaxed text-white/75 ${styles}`}
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
    <div className="my-6 overflow-hidden rounded-xl border border-line bg-[#0d0d10]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="text-[11px] text-white/35">{title ?? "code"}</span>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(children);
              setState("copied");
            } catch {
              setState("failed");
            }
            setTimeout(() => setState("idle"), 1200);
          }}
          className="text-[11px] text-white/35 transition-colors hover:text-white"
        >
          {state === "copied" ? "copied ✓" : state === "failed" ? "copy failed" : "copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-[#c9d1e0]">
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
  const [open, setOpen] = useState(false);
  return (
    <div className="my-8 rounded-2xl border border-mint/25 bg-mint/[0.05] p-5">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-mint">
        Exercise
      </div>
      <div className="text-[14.5px] leading-relaxed text-white/80">
        {children}
      </div>
      {solution && (
        <div className="mt-4">
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-lg border border-mint/30 px-3 py-1.5 text-[12px] text-mint transition-colors hover:bg-mint/10"
          >
            {open ? "Hide one approach" : "Show one approach"}
          </button>
          {open && (
            <div className="mt-4 border-t border-mint/15 pt-4">{solution}</div>
          )}
        </div>
      )}
    </div>
  );
}

export function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg border border-line bg-surface-2 px-3.5 py-1.5 text-[12px] font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white"
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
    <label className="flex items-center gap-3 text-[12px] text-white/60">
      <span className="w-24 shrink-0">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-[#ff7a45]"
      />
      <span className="w-16 text-right font-mono text-[11px] text-white/50">
        {format ? format(value) : value}
      </span>
    </label>
  );
}
