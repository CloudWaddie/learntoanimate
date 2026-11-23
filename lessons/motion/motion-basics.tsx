"use client";

import { motion } from "motion/react";
import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";

export default function Lesson() {
  return (
    <>
      <p>
        CSS transitions interpolate between two CSS states. <strong>Motion</strong>{" "}
        (the library behind Framer Motion) makes animation a first-class part
        of your component: you declare <em>what it should look like</em>, and
        Motion figures out how to get there — with springs, gestures, and DOM
        changes included.
      </p>

      <h2>The core mental model</h2>
      <p>
        Swap <code>&lt;div&gt;</code> for <code>&lt;motion.div&gt;</code> and
        you gain three props that cover most of animation:
      </p>
      <ul>
        <li>
          <code>initial</code> — where the element starts when it mounts
        </li>
        <li>
          <code>animate</code> — where it goes
        </li>
        <li>
          <code>exit</code> — where it goes when it unmounts (needs{" "}
          <code>AnimatePresence</code>, next lesson)
        </li>
      </ul>

      <CodeBlock title="the world's smallest Motion component">{`import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: "spring", stiffness: 320, damping: 26 }}
/>`}</CodeBlock>

      <Demo
        title="The same card, mounting four ways"
        caption="All four use the same three props. Only the initial offset and the transition differ."
      >
        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
          {[
            { init: { opacity: 0, y: 20 }, label: "rise" },
            { init: { opacity: 0, scale: 0.85 }, label: "pop" },
            { init: { opacity: 0, x: -24 }, label: "slide" },
            { init: { opacity: 0, rotate: -6, y: 14 }, label: "tilt" },
          ].map(({ init, label }, i) => (
            <div key={label} className="h-24 rounded-xl bg-[#0d0d10] p-2">
              <motion.div
                initial={init}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 26,
                  delay: i * 0.07,
                }}
                className="flex h-full items-center justify-center rounded-lg border border-line bg-surface-2 text-[11px] text-white/50"
              >
                {label}
              </motion.div>
            </div>
          ))}
        </div>
      </Demo>

      <h2>Declarative beats imperative</h2>
      <p>
        The shift from CSS thinking: you don't manage classes or key timers.
        You declare a target state — <code>animate</code> — and Motion diffs it
        against reality whenever the component renders. Change{" "}
        <code>animate</code> and Motion animates to the new value, even
        mid-flight.
      </p>

      <h2>Springs are the default for a reason</h2>
      <p>
        Motion's default <code>type: "spring"</code> for transforms isn't a
        stylistic quirk — it's the lesson from module one baked in. Physics-
        based motion is interruptible by construction: every frame the velocity
        is real, so a new target just becomes a new destination.
      </p>

      <CodeBlock title="transition: the three shapes you'll use">{`// spring (default for x/y/scale/rotate)
transition={{ type: "spring", stiffness: 400, damping: 30 }}

// fixed-time (default for opacity — fades are time-based)
transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}

// per-property overrides
transition={{
  x: { type: "spring", stiffness: 400, damping: 30 },
  opacity: { duration: 0.15 },
}}`}</CodeBlock>

      <Callout>
        If you write <code>setTimeout</code> or a class-toggle to drive an
        animation in React, stop — that's the imperative mindset leaking back
        in. Declare the state; let Motion do the driving.
      </Callout>

      <Exercise
        solution={
          <p>
            <code>{`<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 500, damping: 35 }}>`}</code>.
            Small y-travel (the badge is small), and a stiff spring — badges
            are minor chrome, not hero moments.
          </p>
        }
      >
        A "3 new messages" badge appears on a nav icon when notifications
        arrive. Write the motion.div declaration — initial, animate,
        transition — choosing values appropriate for a small UI element.
      </Exercise>
    </>
  );
}
