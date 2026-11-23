"use client";

import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";
import { InterruptPlayground } from "@/components/playgrounds/InterruptPlayground";

export default function Lesson() {
  return (
    <>
      <p>
        Here is the uncomfortable truth about scripted animation:{" "}
        <strong>users don't wait.</strong> They click again. They toggle back.
        They scroll on. If your animation can't gracefully change its mind,
        it's broken — you've built a UI that punishes impatience, which is most
        of the time users spend in interfaces.
      </p>

      <Demo
        title="Interruption, side by side"
        caption="Flip the toggle while the balls are mid-flight. The spring veers smoothly to the new target; the timeline-based one visibly stalls and re-runs."
      >
        <InterruptPlayground />
      </Demo>

      <h2>Why springs survive interruptions</h2>
      <p>
        A duration-based animation is a recording: it has a clock and a script.
        Interrupt it and you must either cut to the new state (a jump) or
        restart the recording (a visible stall-and-restart). A spring is not a
        recording — it's a physics simulation. At every instant it knows only
        two things: where it is and how fast it's going. Retargeting costs
        nothing; the ball just veers. <strong>Continuity of velocity is the
        whole trick.</strong>
      </p>

      <h2>Designing for interruption</h2>
      <ul>
        <li>
          <strong>Prefer springs for user-facing state.</strong> Toggles,
          panels, accordions, drags — anything a user can flip twice.
        </li>
        <li>
          <strong>Make exits interruptible by entries.</strong> A menu
          mid-close that the user reopens should reverse direction, not snap
          open and replay.
        </li>
        <li>
          <strong>Avoid queued animations.</strong> Two rapid toggles should
          never produce a third, ghost animation. Latest state wins.
        </li>
        <li>
          <strong>Keep animations short.</strong> An un-interruptible 200ms
          animation is forgivable; an un-interruptible 1s one is a cage.
        </li>
      </ul>

      <CodeBlock title="interruptibility for free">{`// Motion animates toward whatever 'animate' currently says.
// Change state mid-flight → it retargets with current velocity.
<motion.div animate={{ x: open ? 0 : -width }} />

// In vanilla JS, the Web Animations API does the same thing:
// calling animate() again from the *current* position is the
// interruptible pattern — don't restart from t=0.`}</CodeBlock>

      <Callout>
        The test: click any interactive element in your app twice, fast. If
        anything stutters, stalls, or snaps — that's an interruptibility bug.
        It's the single most reliable smell test in UI animation.
      </Callout>

      <Exercise
        solution={
          <p>
            Use one spring-driven value for the drawer position whose target is
            just "open" or "closed" — never a timeline. The toggle flips the
            target; the spring does the rest. No timers, no queue.
          </p>
        }
      >
        A hamburger menu animates open over 400ms. Users who double-tap the
        button see the menu visibly hesitate and replay. What's the structural
        fix — not a hack to mask it?
      </Exercise>
    </>
  );
}
