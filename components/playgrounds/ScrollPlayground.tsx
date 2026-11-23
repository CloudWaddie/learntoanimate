"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export function ScrollPlayground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const smooth = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <div className="p-4">
      <div className="mb-2 text-[11px] uppercase tracking-wider text-muted">
        scroll inside the frame — bar tracks progress, layers move at different rates
      </div>
      <div
        ref={ref}
        className="relative h-64 overflow-y-auto rounded-xl bg-stage"
      >
        <motion.div
          style={{ scaleX }}
          className="sticky top-0 z-20 h-1 origin-left bg-accent"
        />
        <div className="relative h-[700px]">
          <motion.div style={{ y: y3 }} className="absolute left-6 top-10 text-[60px] opacity-15">
            ✦
          </motion.div>
          <motion.div style={{ y: y1 }} className="absolute right-10 top-32 text-[44px] opacity-20">
            ✦
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute left-1/4 top-64 text-[30px] opacity-25">
            ✦
          </motion.div>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="mx-auto mb-8 w-3/4 rounded-xl border border-line bg-surface-2 p-5"
              style={{ marginTop: i === 0 ? 120 : 0 }}
            >
              <div className="mb-2 h-2.5 w-24 rounded bg-line" />
              <div className="mb-1.5 h-2 w-full rounded bg-line" />
              <div className="h-2 w-2/3 rounded bg-line" />
            </div>
          ))}
          <div className="pb-8 text-center text-[12px] text-muted">
            the end — scroll back up
          </div>
        </div>
      </div>
      <p className="mt-3 text-[11.5px] leading-relaxed text-muted">
        <code className="font-mono text-[10.5px]">useScroll</code> gives 0→1
        progress; <code className="font-mono text-[10.5px]">useTransform</code>{" "}
        maps it to any range; wrapping in{" "}
        <code className="font-mono text-[10.5px]">useSpring</code> smooths the
        raw scroll value.
      </p>
    </div>
  );
}
