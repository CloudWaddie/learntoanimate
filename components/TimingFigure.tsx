"use client";

import { useEffect, useRef, useState } from "react";

const curves = {
  linear: { label: "Linear", points: [0, 0, 1, 1] },
  easeOut: { label: "Ease-out", points: [0.22, 0.75, 0.24, 1] },
} as const;

export function TimingFigure() {
  const [curve, setCurve] = useState<keyof typeof curves>("easeOut");
  const plot = useRef<HTMLCanvasElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const [x1, y1, x2, y2] = curves[curve].points;

  useEffect(() => {
    const canvas = plot.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpi = window.devicePixelRatio || 1;
      canvas.width = width * dpi;
      canvas.height = height * dpi;
      ctx.scale(dpi, dpi);
      const styles = getComputedStyle(canvas);
      const inset = 5;
      const x = (n: number) => inset + n * (width - inset * 2);
      const y = (n: number) => height - inset - n * (height - inset * 2);

      for (let i = 0; i <= 4; i++) {
        ctx.beginPath();
        ctx.strokeStyle = styles.getPropertyValue("--color-line").trim();
        ctx.moveTo(x(0), y(i / 4));
        ctx.lineTo(x(1), y(i / 4));
        ctx.moveTo(x(i / 4), y(0));
        ctx.lineTo(x(i / 4), y(1));
        ctx.stroke();
      }
      if (curve !== "linear") {
        ctx.beginPath();
        ctx.strokeStyle = styles.getPropertyValue("--color-muted").trim();
        ctx.setLineDash([4, 5]);
        ctx.moveTo(x(0), y(0));
        ctx.lineTo(x(1), y(1));
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.lineWidth = 3;
      ctx.strokeStyle = styles.getPropertyValue("--color-accent").trim();
      ctx.moveTo(x(0), y(0));
      ctx.bezierCurveTo(x(x1), y(y1), x(x2), y(y2), x(1), y(1));
      ctx.stroke();
      ctx.fillStyle = ctx.strokeStyle;
      for (const end of [0, 1]) {
        ctx.beginPath();
        ctx.arc(x(end), y(end), 4, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [curve, x1, y1, x2, y2]);

  function replay() {
    const dot = marker.current;
    if (!dot?.parentElement) return;
    dot.getAnimations().forEach((animation) => animation.cancel());
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dot.style.left = "100%";
      return;
    }
    dot.style.left = "0%";
    const distance = dot.parentElement.clientWidth;
    const animation = dot.animate([{ transform: "translateX(0)" }, { transform: `translateX(${distance}px)` }], {
      duration: 600,
      easing: `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`,
    });
    animation.onfinish = () => { dot.style.left = "100%"; };
  }

  return (
    <figure className="timing-figure">
      <figcaption>
        <span>Timing curves</span>
        <span className="eyebrow">600 ms</span>
      </figcaption>
      <div className="timing-plot">
        <div className="eyebrow plot-scale" aria-hidden="true"><span>100%</span><span>0%</span></div>
        <canvas ref={plot} role="img" aria-label={curve === "linear" ? "Linear progress stays constant over time." : "Ease-out makes most progress early and slows toward the end. The dashed line shows linear progress."} />
        <span aria-hidden="true" />
        <div className="eyebrow plot-axis"><span>0 ms</span><span>600 ms</span></div>
      </div>
      <div className="timing-track" aria-hidden="true"><span ref={marker} /></div>
      <div className="timing-controls">
        <div role="group" aria-label="Timing curve">
          {(Object.keys(curves) as (keyof typeof curves)[]).map((option) => (
            <button key={option} type="button" aria-pressed={curve === option} onClick={() => setCurve(option)}>
              {curves[option].label}
            </button>
          ))}
        </div>
        <button type="button" onClick={replay}><span aria-hidden="true">↻ </span>Replay</button>
      </div>
    </figure>
  );
}
