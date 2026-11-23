"use client";

import { motion, useReducedMotion } from "motion/react";
import { Demo, Exercise } from "@/components/lesson";
import { Compare } from "@/components/playgrounds/Compare";

function Rows({ staggered }: { staggered: boolean }) {
  const reduced = useReducedMotion();
  return (
    <ul className="space-y-1.5 rounded-sm bg-stage p-3">
      {["Checkout returns an error", "Update release notes", "Archive old exports"].map((title, index) => (
        <motion.li
          key={title}
          initial={staggered && !reduced ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.12, duration: 0.28, ease: "easeOut" }}
          className="rounded-sm border border-line bg-surface px-2 py-1.5 text-sm text-body"
        >
          {title}
        </motion.li>
      ))}
    </ul>
  );
}

export default function Lesson() {
  return (
    <>
      <p>When you review an animation, start with the task someone is trying to finish. A staggered entrance can establish a reading order during a one-time walkthrough. The same delay on a list someone checks all day makes that list slower to scan.</p>
      <Demo title="Evaluate a list entrance" caption="Replay both versions several times. See how soon you can read the last issue in each list.">
        <Compare a={<Rows staggered />} b={<Rows staggered={false} />} labelA="Staggered entrance" labelB="Immediate list" />
      </Demo>

      <h2>Review the interaction</h2>
      <ol>
        <li><strong>Repeat it.</strong> Open, close, and reopen the surface three times. Notice how long you wait to start the next step.</li>
        <li><strong>Remove one effect.</strong> Compare the two versions and see whether you lose a cue about what changed or where something moved.</li>
        <li><strong>Check the resting state.</strong> Readability, focus, selected state, and status should be obvious once the animation is over.</li>
      </ol>

      <Exercise solution={<p>Render the issue list immediately on first load. Keep position changes on sorting so readers can follow rows, and use a small reveal for the details panel. Test all three decisions with a ten-action sequence before settling on timings.</p>}>
        Write a review of the Issue desk for a teammate. Propose one animation to remove, one to keep, and an observable test for each decision.
      </Exercise>
    </>
  );
}
