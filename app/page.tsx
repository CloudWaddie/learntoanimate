"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { modules, totalLessons } from "@/lib/content";

const spring = { type: "spring" as const, stiffness: 300, damping: 28 };

export default function Landing() {
  return (
    <div className="noise-bg min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(255,122,69,0.8)]" />
          <span className="font-semibold tracking-tight">Learn to Animate</span>
        </div>
        <Link
          href="/course"
          className="rounded-lg border border-line px-3.5 py-1.5 text-[13px] text-white/70 transition-colors hover:border-white/25 hover:text-white"
        >
          Open course →
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        <section className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1 text-[12px] text-white/50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            {totalLessons} interactive lessons · free forever
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, ...spring }}
            className="mx-auto max-w-3xl text-balance text-[3.4rem] font-bold leading-[1.05] tracking-tight"
          >
            Craft animations that{" "}
            <span className="bg-gradient-to-r from-accent to-[#ffb38a] bg-clip-text text-transparent">
              feel right
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, ...spring }}
            className="mx-auto mt-5 max-w-xl text-pretty text-[16px] leading-relaxed text-white/50"
          >
            Not another syntax reference. A hands-on course in the theory,
            physics, and taste behind motion on the web — every concept taught
            by a playground you can break.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, ...spring }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <Link
              href="/course"
              className="rounded-xl bg-accent px-5 py-2.5 text-[14px] font-semibold text-black shadow-[0_0_24px_rgba(255,122,69,0.35)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Start learning — it's free
            </Link>
          </motion.div>
        </section>

        <section className="grid gap-4 pb-8 sm:grid-cols-2">
          {modules.map((m, i) => (
            <motion.div
              key={m.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07, ...spring }}
              className="rounded-2xl border border-line bg-surface/70 p-6 backdrop-blur"
            >
              <div className="mb-1 text-[11px] uppercase tracking-[0.16em] text-accent/80">
                Module {m.number}
              </div>
              <h2 className="text-lg font-semibold tracking-tight">{m.title}</h2>
              <p className="mt-1 text-[13px] text-white/45">{m.tagline}</p>
              <ul className="mt-4 space-y-1.5">
                {m.lessons.map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={`/course/${m.slug}/${l.slug}`}
                      className="group flex items-center gap-2 text-[13.5px] text-white/60 transition-colors hover:text-accent"
                    >
                      <span className="h-1 w-1 rounded-full bg-white/20 transition-colors group-hover:bg-accent" />
                      {l.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </section>

        <section className="pb-24 pt-8 text-center">
          <p className="text-[13px] text-white/35">
            Built with the techniques it teaches — springs, orchestration,
            transform-only motion. Inspired by the craft of{" "}
            <a
              href="https://animations.dev"
              className="text-accent/80 underline decoration-accent/30 underline-offset-2"
            >
              animations.dev
            </a>
            ,{" "}
            <a
              href="https://whimsy.joshwcomeau.com"
              className="text-accent/80 underline decoration-accent/30 underline-offset-2"
            >
              whimsical animations
            </a>
            , and{" "}
            <a
              href="https://emilkowal.ski"
              className="text-accent/80 underline decoration-accent/30 underline-offset-2"
            >
              emilkowal.ski
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
