"use client";

import { Highlight, themes } from "prism-react-renderer";
import { useState, type ReactNode } from "react";

type Language = "tsx" | "css" | "markup" | "text";

function detectLanguage(code: string, title = ""): Language {
  if (/^terminal/i.test(title)) return "text";
  if (/\.html\b/.test(title) || /^\s*<!doctype/i.test(code)) return "markup";
  if (/\.css\b|^css\b/i.test(title)) return "css";
  if (/\.tsx?\b|^react\b/i.test(title) || /=>|\b(import|const|function|return)\b|<\/?[A-Za-z]/.test(code)) return "tsx";
  return /^\s*(@[a-z-]+|[.#:*\w-][^{};]*)\s*\{/m.test(code) ? "css" : "tsx";
}

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
    <figure className="my-7 min-w-0 rounded-[.9rem] border border-line bg-surface shadow-(--shadow-card)">
      {(title || caption) && (
        <figcaption className="grid gap-1 border-b border-line px-4 py-3 sm:px-5">
          {title && <span className="text-sm font-semibold">{title}</span>}
          {caption && <span className="max-w-[66ch] text-[13px] leading-relaxed text-muted">{caption}</span>}
        </figcaption>
      )}
      <div className={"relative overflow-hidden rounded-b-[.85rem] " + (title || caption ? "" : "rounded-t-[.85rem]")}>{children}</div>
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
      ? "border-[#d6e2ef] bg-accent-soft"
      : tone === "mint"
        ? "border-[#cfe5d8] bg-[#f0f7f2]"
        : "border-line bg-surface";
  return (
    <div
      className={`my-6 rounded-xl border px-4 py-3.5 text-[.9rem] leading-relaxed text-body ${styles}`}
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
    <div className="code-block my-6 overflow-hidden rounded-[.9rem] border border-line bg-surface shadow-(--shadow-card)">
      <div className="flex items-center justify-between gap-2 border-b border-line py-1.5 pl-4 pr-1.5">
        <span className="min-w-0 truncate font-mono text-xs text-muted">{title ?? "Code"}</span>
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
          className="shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy"}
        </button>
        <span role="status" className="sr-only">{state === "copied" ? "Code copied" : state === "failed" ? "Copy failed" : ""}</span>
      </div>
      <Highlight theme={themes.github} code={children} language={detectLanguage(children, title)}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre tabIndex={0} className="overflow-x-auto bg-[#fcfcfb] p-4 font-mono text-[13px] leading-relaxed text-ink">
            <code>
              {tokens.map((line, lineIndex) => (
                <div key={lineIndex} {...getLineProps({ line })}>
                  {line.map((token, tokenIndex) => <span key={tokenIndex} {...getTokenProps({ token })} />)}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
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
    <div className="my-8 rounded-[.9rem] border border-[#d6e2ef] bg-accent-soft p-4 sm:p-5">
      <div className="mb-1.5 text-[.8rem] font-semibold text-accent">
        Practice
      </div>
      <div className="text-[.95rem] leading-relaxed text-body">
        {children}
      </div>
      {solution && (
        <details className="mt-3">
          <summary className="w-fit py-1.5 text-sm font-medium text-accent">One approach</summary>
          <div className="mt-2 border-t border-[#d6e2ef] pt-3">{solution}</div>
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
      className="rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-body transition-colors hover:border-line-strong hover:text-ink"
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
