"use client";

import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/lesson";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  spin: number;
  angle: number;
  life: number;
  maxLife: number;
  color: string;
};

const COLORS = ["#ff7a45", "#ffb38a", "#6ee7b7", "#f4f4f6", "#ffcf5c"];

export function ParticlePlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>(0);
  const [count, setCount] = useState(60);
  const [force, setForce] = useState(9);
  const [gravity, setGravity] = useState(0.25);
  const [spread, setSpread] = useState(360);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => p.life < p.maxLife);
      for (const p of particles.current) {
        p.vy += gravity;
        p.vx *= 0.985;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        p.life++;
        const fade = 1 - p.life / p.maxLife;
        ctx.save();
        ctx.globalAlpha = Math.max(0, fade);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
        ctx.restore();
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [gravity]);

  const burst = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = (e.clientX - rect.left) * scaleX;
    const cy = (e.clientY - rect.top) * scaleY;
    for (let i = 0; i < count; i++) {
      const angle =
        (Math.random() - 0.5) * (spread * (Math.PI / 180)) - Math.PI / 2;
      const speed = force * (0.4 + Math.random() * 0.9);
      particles.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 4 + Math.random() * 9,
        spin: (Math.random() - 0.5) * 0.3,
        angle: Math.random() * Math.PI,
        life: 0,
        maxLife: 60 + Math.random() * 50,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }
  };

  return (
    <div className="p-4">
      <canvas
        ref={canvasRef}
        width={640}
        height={260}
        onClick={burst}
        className="w-full cursor-pointer rounded-xl bg-[#0d0d10]"
      />
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        <Slider label="count" value={count} min={10} max={200} step={5} onChange={setCount} />
        <Slider label="force" value={force} min={2} max={20} step={0.5} onChange={setForce} />
        <Slider label="gravity" value={gravity} min={0} max={0.8} step={0.05} onChange={setGravity} format={(v) => v.toFixed(2)} />
        <Slider label="spread" value={spread} min={30} max={360} step={10} onChange={setSpread} format={(v) => `${v}°`} />
      </div>
      <p className="mt-3 text-[11.5px] text-white/35">
        Click anywhere in the dark area. Particles are just physics: random
        velocity in an arc, gravity, drag, and a fade-out on life.
      </p>
    </div>
  );
}
