"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Demo, Exercise } from "@/components/lesson";

function SortPreview({ animate }: { animate: boolean }) {
  const [sorted, setSorted] = useState(false);
  const reduce = useReducedMotion();
  const rows = ["Update release notes", "Fix checkout error", "Archive old exports"];
  const order = sorted ? [1, 0, 2] : [0, 1, 2];

  return (
    <div className="min-w-0 p-4">
      <button type="button" aria-pressed={sorted} className="button-secondary" onClick={() => setSorted(!sorted)}>
        Sort by priority
      </button>
      <span className="ml-2 text-xs text-muted">{animate ? "Animated" : "Instant"}</span>
      <ul className="mt-3 divide-y divide-line rounded-sm border border-line bg-stage">
        <AnimatePresence initial={false}>
          {order.map((i) => (
            <motion.li
              key={rows[i]}
              layout={animate && !reduce ? "position" : false}
              transition={{ type: "spring", stiffness: 470, damping: 36 }}
              className="px-3 py-2 text-sm text-body"
            >
              {rows[i]}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default function Lesson() {
  return (
    <>
      <p>In a list of issues, sorting by priority changes where a row lives. A short transition can help someone keep their place: the row they were reading visibly moves. For a single checkbox, a check mark usually gives enough feedback on its own.</p>

      <Demo title="Follow the checkout issue" caption="Sort each list by priority. Keep your eyes on “Fix checkout error” as it moves from second to first.">
        <div className="grid divide-line sm:grid-cols-2 sm:divide-x">
          <SortPreview animate={false} />
          <SortPreview animate />
        </div>
      </Demo>

      <h2>Describe the state change</h2>
      <p>Before writing any animation code, name the trigger and the two states. In this example, the trigger is sorting by priority. Before and after, the list contains the same issues in different positions. That makes position the useful thing to animate.</p>
      <ul>
        <li><strong>Feedback</strong> confirms an action, such as a save changing to “Saved.” Keep the text or state indicator so the feedback survives without motion.</li>
        <li><strong>Continuity</strong> helps someone follow the same object through a change, such as an issue moving to a new position.</li>
        <li><strong>Emphasis</strong> draws attention to a specific change, such as an error appearing beside the field that caused it.</li>
      </ul>

      <Exercise solution={<p>Sorting has a clear continuity problem. On first load, there is no previous row position to track, so rendering the list immediately gives the reader a stable starting point.</p>}>
        Imagine this list opens with an entrance animation on every visit. Write one sentence explaining which animation you would keep, the change it communicates, and how a user can tell what happened with motion turned off.
      </Exercise>

      <h2>What you’ll build</h2>
      <p>Start by comparing duration and easing in the browser. Then build press feedback in CSS and a sortable list in React. The final project combines those skills in an issue tracker that also lets you open, resolve, and reopen issues.</p>
    </>
  );
}
