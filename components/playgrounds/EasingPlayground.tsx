"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ReplayButton } from "@/components/lesson";

const PRESETS: { name: string; pts: [number, number, number, number] }[] = [
  { name: "linear", pts: [0, 0, 1, 1] },
  { name: "ease", pts: [0.25, 0.1, 0.25, 1] },
  { name: "ease-in", pts: [0.42, 0, 1, 1] },
  { name: "ease-out", pts: [0, 0, 0.58, 1] },
  { name: "ease-in-out", pts: [0.42, 0, 0.58, 1] },
  { name: "easeOutQuad", pts: [0.5, 1, 0.89, 1] },
  { name: "easeOutQuint", pts: [0.23, 1, 0.32, 1] },
  { name: "back-out", pts: [0.34, 1.56, 0.64, 1] },
  { name: "custom-springy", pts: [0.2, 1.4, 0.4, 1] },
];

const W = 260;
const H = 260;
const PAD = 20;

function toSvg(x: number, y: number) {
  return { x: PAD + x * (W - 2 * PAD), y: H - PAD - y * (H - 2 * PAD) };
}
function fromSvg(px: number, py: number) {
  return {
    x: (px - PAD) / (W - 2 * PAD),
    y: (H - PAD - py) / (H - 2 * PAD),
  };
}

export function EasingPlayground({ height = 300 }: { height?: number }) {
  const [pts, setPts] = useState<[number, number, number, number]>([
    0.34, 1.56, 0.64, 1,
  ]);
  const [preset, setPreset] = useState("back-out");
  const ballRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<0 | 1 | null>(null);

  const easing = `cubic-bezier(${pts.map((n) => n.toFixed(2)).join(",")})`;

  const replay = useCallback(() => {
    const el = ballRef.current;
    if (!el) return;
    el.animate(
      [
        { transform: "translateX(0px)", offset: 0 },
        { transform: "translateX(190px)", offset: 1 },
      ],
      { duration: 1200, easing, fill: "forwards" },
    );
  }, [easing]);

  useEffect(() => {
    replay();
  }, [replay]);

  const onPointerDown = (which: 0 | 1) => (e: React.PointerEvent) => {
    dragRef.current = which;
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragRef.current === null || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const p = fromSvg(
      e.clientX - rect.left,
      e.clientY - rect.top,
    );
    const i = dragRef.current;
    setPts((prev) => {
      const next = [...prev] as [number, number, number, number];
      next[i * 2] = Math.min(1, Math.max(0, p.x));
      next[i * 2 + 1] = Math.min(2, Math.max(-1, p.y));
      return next;
    });
    setPreset("custom");
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  const p0 = toSvg(0, 0);
  const p1 = toSvg(pts[0], pts[1]);
  const p2 = toSvg(pts[2], pts[3]);
  const p3 = toSvg(1, 1);

  return (
    <div className="flex flex-col gap-4 p-4 sm:flex-row">
      <div className="flex-1">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-[300px] touch-none select-none"
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {[0.25, 0.5, 0.75].map((g) => {
            const a = toSvg(g, 0);
            const b = toSvg(g, 1);
            const c = toSvg(0, g);
            const d = toSvg(1, g);
            return (
              <g key={g} stroke="rgba(255,255,255,0.06)">
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
                <line x1={c.x} y1={c.y} x2={d.x} y2={d.y} />
              </g>
            );
          })}
          <rect
            x={PAD}
            y={PAD}
            width={W - 2 * PAD}
            height={H - 2 * PAD}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            rx={4}
          />
          <line x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} stroke="#6ee7b7" strokeOpacity={0.7} strokeDasharray="3 3" />
          <line x1={p3.x} y1={p3.y} x2={p2.x} y2={p2.y} stroke="#6ee7b7" strokeOpacity={0.7} strokeDasharray="3 3" />
          <path
            d={`M ${p0.x} ${p0.y} C ${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}`}
            fill="none"
            stroke="#ff7a45"
            strokeWidth={2.5}
          />
          <circle cx={p1.x} cy={p1.y} r={9} fill="rgba(110,231,183,0.25)" />
          <circle
            cx={p1.x}
            cy={p1.y}
            r={6}
            fill="#6ee7b7"
            className="cursor-grab"
            onPointerDown={onPointerDown(0)}
          />
          <circle cx={p2.x} cy={p2.y} r={9} fill="rgba(110,231,183,0.25)" />
          <circle
            cx={p2.x}
            cy={p2.y}
            r={6}
            fill="#6ee7b7"
            className="cursor-grab"
            onPointerDown={onPointerDown(1)}
          />
        </svg>
        <div className="mt-1 font-mono text-[11px] text-white/40">{easing}</div>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                setPts(p.pts);
                setPreset(p.name);
              }}
              className={`rounded-md border px-2 py-1 font-mono text-[10.5px] transition-colors ${
                preset === p.name
                  ? "border-accent/50 bg-accent-soft text-accent"
                  : "border-line text-white/50 hover:border-white/25 hover:text-white/80"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div>
          <div className="mb-3 h-9">
            <div className="relative h-full w-[230px]">
              <div className="absolute inset-y-0 my-auto h-px w-full bg-white/10" />
              <div
                ref={ballRef}
                className="absolute top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_rgba(255,122,69,0.5)]"
              />
            </div>
          </div>
          <ReplayButton onClick={replay} />
          <p className="mt-3 text-[11.5px] leading-relaxed text-white/35">
            Drag the mint handles. Y above 1 = overshoot. Y below 0 =
            anticipation. The curve's slope is velocity.
          </p>
        </div>
      </div>
    </div>
  );
}
