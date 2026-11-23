"use client";

import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";
import { DragPlayground } from "@/components/playgrounds/DragPlayground";

export default function Lesson() {
  return (
    <>
      <p>
        So far every animation has been <em>scripted</em>: we chose the start,
        the end, the timing. Gestures flip that — the user's finger or cursor
        is one end of the animation, live. This is where springs stop being a
        stylistic choice and become the only honest tool: a scripted timeline
        can't follow a hand.
      </p>

      <h2>The gesture ladder</h2>
      <ul>
        <li>
          <code>whileHover</code> — pointer over. Subtle lift, brighten, tilt.
        </li>
        <li>
          <code>whileTap</code> — pressed down. Should feel nearly instant.
        </li>
        <li>
          <code>whileFocus</code> — the keyboard-accessible cousin of hover.
        </li>
        <li>
          <code>drag</code> — the user owns the position; physics owns the
          follow-through.
        </li>
      </ul>

      <CodeBlock title="a button that feels physical">{`<motion.button
  whileHover={{ scale: 1.04, y: -1 }}
  whileTap={{ scale: 0.96, y: 0 }}
  transition={{ type: "spring", stiffness: 500, damping: 25 }}
>
  Save changes
</motion.button>`}</CodeBlock>

      <p>
        The values are deliberately small — hover is a whisper (4%), tap is a
        push (4% down). Giant hover scales are the motion equivalent of a
        website that shouts.
      </p>

      <Demo
        title="Drag with momentum"
        caption="Fling the card. Where it lands depends on velocity at release — not just where your pointer was."
      >
        <DragPlayground />
      </Demo>

      <h2>Constraints and elastic</h2>
      <p>
        <code>dragConstraints</code> fences the drag;{" "}
        <code>dragElastic</code> decides how hard the fence pushes back. An
        elastic of ~0.3–0.5 gives that iOS-rubber-band feel — the element
        resists but yields, then springs home. Without elastic, hitting a wall
        feels dead.
      </p>

      <h2>Velocity is the signal</h2>
      <p>
        The deep reason drag feels good: <strong>release momentum</strong>. The
        card doesn't just stop where you let go — it keeps your flick's
        velocity and decays into place. An interface that respects momentum
        feels physical; one that ignores it feels like moving cardboard with a
        stick.
      </p>

      <Callout>
        Gesture-driven motion is the strongest argument for springs. A spring
        doesn't know or care where it is in time — it only knows where it is
        and where it's going, which is exactly what a moving pointer needs.
      </Callout>

      <Exercise
        solution={
          <p>
            <code>drag="x"</code> on the card, a threshold on release (e.g. x
            velocity &gt; 500px/s or offset &gt; 100px) to trigger delete,
            otherwise spring back. The key detail: on snap-back use a spring
            that preserves release velocity — don't restart a timeline.
          </p>
        }
      >
        Design the swipe-to-delete interaction for an email row. What
        determines whether the swipe "commits" or snaps back, and what should
        the snap-back feel like?
      </Exercise>
    </>
  );
}
