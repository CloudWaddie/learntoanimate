"use client";

import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";
import { ToastPlayground } from "@/components/playgrounds/ToastPlayground";

export default function Lesson() {
  return (
    <>
      <p>
        Here's the dirty secret of React animation: React removes elements from
        the DOM the instant your state says so. There is no "fade out first"
        built in. <code>AnimatePresence</code> exists to intercept that unmount
        — it keeps the element around just long enough to play its{" "}
        <code>exit</code> animation.
      </p>

      <CodeBlock title="the pattern">{`import { AnimatePresence, motion } from "motion/react";

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -4 }}   /* runs before unmount */
      transition={{ duration: 0.18 }}
    >
      …
    </motion.div>
  )}
</AnimatePresence>`}</CodeBlock>

      <p>
        Three rules that prevent 90% of AnimatePresence bugs: wrap the{" "}
        <em>conditional</em>, not the parent; every direct child needs a stable{" "}
        <code>key</code>; and <code>mode="wait"</code> when the outgoing and
        incoming elements would overlap.
      </p>

      <Demo
        title="Toasts that leave gracefully"
        caption="Dismiss one — it slides out instead of vanishing. The layout prop keeps siblings sliding up smoothly behind it."
      >
        <ToastPlayground />
      </Demo>

      <h2>Exit is a different beast</h2>
      <p>
        Exits should be <strong>shorter and simpler</strong> than entrances.
        The user already decided this element is done — the exit is polite
        cleanup, not a performance. Halve your enter duration, drop the
        overshoot, keep the direction of travel consistent with how it arrived.
      </p>

      <h2>Lists are the payoff</h2>
      <p>
        The combination of <code>AnimatePresence</code> + <code>layout</code> is
        where Motion earns its name: remove an item and it exits while its
        siblings reflow to fill the gap — the signature "sorted list"
        animation. Two props, zero measuring.
      </p>

      <CodeBlock title="exit + reflow">{`<AnimatePresence initial={false}>
  {items.map((item) => (
    <motion.li
      key={item.id}
      layout                          /* siblings reflow smoothly */
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.15 } }}
    />
  ))}
</AnimatePresence>`}</CodeBlock>

      <Callout>
        <code>initial={false}</code> on AnimatePresence is the "don't animate
        on first page load" switch — essential so a list doesn't theatrically
        enter when the app boots.
      </Callout>

      <Exercise
        solution={
          <p>
            Wrap the modal in <code>AnimatePresence</code> and give it{" "}
            <code>{"exit={{ opacity: 0, scale: 0.96, y: 8 }}"}</code>. Also fade the
            backdrop with its own exit — an instant-disappearing overlay behind
            an animated card looks broken.
          </p>
        }
      >
        Your modal pops in beautifully but disappears instantly when closed,
        leaving a jarring empty hole. Fix it — including the backdrop.
      </Exercise>
    </>
  );
}
