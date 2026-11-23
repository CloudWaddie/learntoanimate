"use client";

import { motion } from "motion/react";
import { Callout, Demo } from "@/components/lesson";
import { Compare } from "@/components/playgrounds/Compare";

function Card({ instant }: { instant?: boolean }) {
  return (
    <div className="h-40 rounded-xl bg-[#0d0d10] p-4">
      <motion.div
        initial={instant ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          instant ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 28 }
        }
        className="rounded-xl border border-line bg-surface-2 p-4"
      >
        <div className="mb-2 h-2.5 w-24 rounded bg-white/15" />
        <div className="mb-1.5 h-2 w-full rounded bg-white/8" />
        <div className="h-2 w-2/3 rounded bg-white/8" />
      </motion.div>
    </div>
  );
}

export default function Lesson() {
  return (
    <>
      <p>
        Animation is not decoration. In a real interface, motion is how the
        software <strong>talks back</strong>: it confirms that your click
        registered, shows where new content came from, and preserves your sense
        of place while the screen rearranges itself.
      </p>
      <p>
        Without motion, interfaces teleport. A panel appears out of nowhere, a
        deleted row vanishes, a tab's content swaps instantly. Your brain has to
        re-parse the whole screen to figure out what changed. With even a short,
        well-chosen animation, the change <em>narrates itself</em> — you
        literally watch the old state become the new one.
      </p>

      <h2>The three jobs of motion</h2>
      <ul>
        <li>
          <strong>Feedback.</strong> A button that depresses on click, a toggle
          that slides — proof that the interface heard you.
        </li>
        <li>
          <strong>Continuity.</strong> A sidebar that slides out keeps its
          identity; you know it's the same object, just moved. Appearing and
          teleporting are not the same thing.
        </li>
        <li>
          <strong>Character.</strong> A springy overshoot on a success
          checkmark, a subtle settle on a modal. This is where products stop
          feeling generic.
        </li>
      </ul>

      <Demo
        title="Same content, two personalities"
        caption="Left: appears instantly — you have to notice it changed. Right: enters with a spring — you watch it arrive."
      >
        <Compare a={<Card instant />} b={<Card />} labelA="instant" labelB="animated" />
      </Demo>

      <h2>The trap: animation as garnish</h2>
      <p>
        The failure mode is motion that exists because it can — long fades on
        every page load, parallax that fights the scrollbar, reveals that make
        you wait for content you came to read. Users feel this as slowness and
        self-indulgence, not polish.
      </p>
      <p>
        The rule of thumb that organizes everything else in this course:{" "}
        <strong>animate the change, not the surface.</strong> Motion should map
        to something the user did or something that just changed. Decorative
        motion is allowed — it just has to earn its duration.
      </p>

      <Callout>
        By the end of this course you'll be able to look at any interface and
        say <em>why</em> its animation feels good or bad — and name the exact
        ingredient (duration, easing, origin, interruptibility) responsible.
      </Callout>

      <h2>How this course works</h2>
      <p>
        Every concept comes with a live playground. Don't just read — drag the
        handles, push values to extremes, break things. Taste in animation is
        trained by <em>feeling</em> the difference between 200ms and 400ms, not
        by memorizing numbers. The code snippets are real; copy them into your
        own projects.
      </p>
    </>
  );
}
