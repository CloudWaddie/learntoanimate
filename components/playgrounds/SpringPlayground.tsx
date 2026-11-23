"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "motion/react";
import { ReplayButton, Slider } from "@/components/lesson";

const PRESETS = [
  { name: "gentle", stiffness: 120, damping: 14, mass: 1 },
  { name: "snappy", stiffness: 400, damping: 30, mass: 1 },
  { name: "bouncy", stiffness: 500, damping: 8, mass: 1 },
  { name: "sluggish", stiffness: 60, damping: 12, mass: 1 },
  { name: "stiff", stiffness: 800, damping: 60, mass: 1 },
];

export function SpringPlayground() {
  const [stiffness, setStiffness] = useState(300);
  const [damping, setDamping] = useState(12);
  const [mass, setMass] = useState(1);
  const ballRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animation = useRef<ReturnType<typeof animate> | null>(null);

  const replay = () => {
    const el = ballRef.current;
    if (!el) return;
    animation.current?.stop();
    const samples: number[] = [];
    animation.current = animate(0, 1, {
      type: "spring",
      stiffness,
      damping,
      mass,
      onUpdate: (v) => {
        el.style.left = `${v * 50}%`;
        samples.push(v);
      },
      onComplete: () => draw(samples),
    });
  };

  const draw = (samples: number[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#a3aec0";
    ctx.beginPath();
    const targetY = h / 2;
    ctx.moveTo(0, targetY);
    ctx.lineTo(w, targetY);
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = "#254da5";
    ctx.lineWidth = 2;
    ctx.beginPath();
    samples.forEach((v, i) => {
      const x = (i / Math.max(1, samples.length - 1)) * w;
      const y = h - (v / 2) * h;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
  };

  useEffect(() => {
    const t = setTimeout(replay, 150);
    return () => {
      clearTimeout(t);
      animation.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stiffness, damping, mass]);

  return (
    <div className="flex flex-col gap-4 p-4 sm:flex-row">
      <div className="flex-1 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                setStiffness(p.stiffness);
                setDamping(p.damping);
                setMass(p.mass);
              }}
              className="rounded-md border border-line px-2 py-1 font-mono text-[10.5px] text-muted transition-colors hover:border-line-strong hover:text-body"
            >
              {p.name}
            </button>
          ))}
        </div>
        <Slider label="stiffness" value={stiffness} min={20} max={1000} onChange={setStiffness} />
        <Slider label="damping" value={damping} min={1} max={80} onChange={setDamping} />
        <Slider label="mass" value={mass} min={0.2} max={4} step={0.1} onChange={setMass} format={(v) => v.toFixed(1)} />
        <div className="pt-1 font-mono text-[11px] text-muted">
          damping ratio ≈ {(damping / (2 * Math.sqrt(stiffness * mass))).toFixed(2)}{" "}
          {damping / (2 * Math.sqrt(stiffness * mass)) < 1
            ? "(underdamped — oscillates)"
            : "(overdamped — no bounce)"}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="relative mx-3.5 mb-3 h-9">
          <div className="absolute inset-x-0 inset-y-0 my-auto h-px bg-line" />
          <div className="absolute left-1/2 top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-mint/60" />
          <div
            ref={ballRef}
            className="absolute left-0 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          />
        </div>
        <canvas ref={canvasRef} width={280} height={90} className="w-full rounded-lg bg-stage" />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10.5px] text-muted">position over time — dashes = target</span>
          <ReplayButton onClick={replay} />
        </div>
      </div>
    </div>
  );
}
