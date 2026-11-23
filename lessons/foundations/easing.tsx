"use client";

import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";
import { EasingPlayground } from "@/components/playgrounds/EasingPlayground";

export default function Lesson() {
  return (
    <>
      <p>
        Nothing in nature moves at a constant speed, and nothing in nature
        teleports to full speed instantly. <strong>Easing is the difference
        between motion and movement.</strong> It's also the single highest-
        leverage knob in animation: the same 300ms slide feels cheap with the
        wrong curve and expensive with the right one.
      </p>

      <h2>Reading a bézier curve</h2>
      <p>
        CSS easings are cubic béziers: <code>cubic-bezier(x1, y1, x2, y2)</code>.
        The curve runs from (0,0) — animation start — to (1,1) — animation end.
        X is time, Y is progress. <strong>The slope of the curve is velocity:</strong>
        steep means fast, flat means slow. The two handles you're about to drag
        are the only knobs.
      </p>
      <p>
        Y can leave the [0, 1] box. Push a handle above the top edge and the
        animation overshoots its target before settling — this is how you get
        bounce without springs. Pull a handle below the bottom and you get
        anticipation: a small backwards dip before launch, like a crouch before
        a jump.
      </p>

      <Demo
        title="The easing editor"
        caption="Drag the mint handles beyond the box edges — watch overshoot and anticipation appear in the ball's motion."
      >
        <EasingPlayground />
      </Demo>

      <h2>The two families that matter</h2>
      <p>
        <strong>Ease-out (fast start, slow end)</strong> is the default for UI.
        Elements entering the screen, menus opening, anything responding to a
        click: attack fast so it feels responsive, decelerate into place so it
        feels controlled. Nearly every good interface you use is ease-out all
        the way down.
      </p>
      <p>
        <strong>Ease-in (slow start, fast end)</strong> is for things leaving —
        an element accelerating off screen as if pulled by gravity. It feels
        wrong for entrances because the slow start reads as lag: you clicked,
        and nothing visibly happened for a beat.
      </p>

      <Callout>
        Rule of thumb: entering → ease-out, exiting → ease-in,
        moving between two visible states → ease-in-out. When everything else
        fails, <code>ease-out</code> with a slight overshoot is almost never
        wrong.
      </Callout>

      <h2>A small set of named curves</h2>
      <CodeBlock title="the curves worth memorizing">{`:root {
  /* the default deceleration curve — start here */
  --ease-out: cubic-bezier(0.32, 0.72, 0, 1);
  /* gentle overshoot for popovers, toasts, menus */
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  /* stronger overshoot for playful moments */
  --ease-springy: cubic-bezier(0.2, 1.4, 0.4, 1);
  /* accelerating exit */
  --ease-in: cubic-bezier(0.5, 0, 1, 0.5);
}`}</CodeBlock>

      <h2>Linear is a code smell</h2>
      <p>
        Linear easing has exactly two legitimate uses: progress indicators and
        continuously-rotating spinners — cases where constant speed <em>is</em>
        the meaning. Everywhere else it reads as robotic. If your motion feels
        mechanical, check for a stray <code>linear</code> or the browser's
        default <code>ease</code> first — both are common accidental defaults.
      </p>

      <Exercise
        solution={
          <p>
            An overshooting ease-out like{" "}
            <code>cubic-bezier(0.34, 1.56, 0.64, 1)</code>. The card scales up,
            passes 1.0 briefly, and settles — a tiny celebration. Pure ease-out
            would look correct but sterile; pure linear would look broken.
          </p>
        }
      >
        A "match found" card pops onto screen in a game UI. Which family of
        easing fits, and why? Sketch the rough curve shape you'd pick.
      </Exercise>
    </>
  );
}
