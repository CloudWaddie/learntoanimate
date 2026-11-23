"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";

function CapstoneMenu() {
  const [open, setOpen] = useState(false);
  const items = ["New project", "Import files", "Share link", "Duplicate", "Archive", "Delete"];
  return (
    <div className="relative h-72 rounded-xl bg-[#0d0d10] p-6">
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg border border-line bg-surface-2 px-4 py-2 text-[13px] font-medium text-white/80 shadow-sm transition-colors hover:border-white/25 hover:text-white"
      >
        Actions ▾
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.94, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -4, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            style={{ transformOrigin: "top left" }}
            className="absolute left-6 top-[68px] w-52 rounded-xl border border-line bg-surface-2 p-1.5 shadow-2xl"
          >
            {items.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 + i * 0.025 }}
              >
                <button className="w-full rounded-lg px-3 py-2 text-left text-[13px] text-white/70 transition-colors hover:bg-white/5 hover:text-white">
                  {item}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Lesson() {
  return (
    <>
      <p>
        One component, every lesson. A dropdown menu is the perfect final exam
        because it exercises the entire stack: origin, springs, stagger, exit,
        interruptibility, and restraint — all inside a single small surface.
      </p>

      <Demo
        title="The finished menu — click Actions"
        caption="Try to break it: open and close rapidly, click items mid-animation. It should never stutter or lose its place."
      >
        <CapstoneMenu />
      </Demo>

      <h2>Every choice, annotated</h2>
      <ul>
        <li>
          <strong>Origin: top left.</strong> The menu grows from the trigger —
          the continuity lesson from Transform Origin.
        </li>
        <li>
          <strong>Spring entrance.</strong> Interruptible — reopen mid-exit and
          it just turns around.
        </li>
        <li>
          <strong>25ms stagger.</strong> Items ripple after the container lands,
          well inside the 20–60ms window from Orchestration.
        </li>
        <li>
          <strong>Shorter, simpler exit.</strong> 120ms fade-and-shrink — the
          exits-are-faster rule.
        </li>
        <li>
          <strong>scale(0.94), y(-6px).</strong> Subtle. The menu was already
          conceptually under the button; it just unfolds.
        </li>
        <li>
          <strong>whileTap on the trigger.</strong> The gesture feedback
          lesson — press feels instant.
        </li>
      </ul>

      <CodeBlock title="the whole thing">{`<AnimatePresence>
  {open && (
    <motion.ul
      style={{ transformOrigin: "top left" }}
      initial={{ opacity: 0, scale: 0.94, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -4, transition: { duration: 0.12 } }}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
    >
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.03 + i * 0.025 }}
        >
          …
        </motion.li>
      ))}
    </motion.ul>
  )}
</AnimatePresence>`}</CodeBlock>

      <h2>Where to go from here</h2>
      <ul>
        <li>
          <strong>Audit a real screen.</strong> Pick one page in your product
          and apply the checklist: origins, exit durations, interruptibility,
          transform-only properties.
        </li>
        <li>
          <strong>Build a toast system.</strong> Enter/exit + layout reflow +
          swipe-dismiss is a genuinely reusable piece.
        </li>
        <li>
          <strong>Try a shared-element flow.</strong> Card → detail with
          layoutId — the single biggest "wow per line of code" in the toolkit.
        </li>
        <li>
          <strong>Read the masters.</strong> emilkowal.ski and Josh Comeau's
          writing are the next level of depth on everything in this course.
        </li>
      </ul>

      <Callout>
        You now have the theory, the code, and — most importantly — the
        vocabulary to critique motion. The final step is volume: build, watch,
        and delete ruthlessly. Taste is trained by reps.
      </Callout>

      <Exercise
        solution={
          <p>
            Highlights: spring entrance (interruptible), origin at the trigger
            corner, items staggering after the panel lands, exit faster than
            entrance, scale range under 10%. Missing? probably nothing — a
            well-built menu needs no blur, no bounce, no sound.
          </p>
        }
      >
        Open your favorite app's command menu or dropdown and write down every
        animation decision it makes — then compare against this checklist.
        What's the same? What's missing?
      </Exercise>
    </>
  );
}
