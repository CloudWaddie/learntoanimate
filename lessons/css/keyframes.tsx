"use client";

import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";

export default function Lesson() {
  return (
    <>
      <p>
        Transitions handle A → B. <code>@keyframes</code> handle the rest:
        multi-step choreography, loops, and anything where the in-between
        states matter as much as the endpoints.
      </p>

      <h2>When keyframes earn their keep</h2>
      <ul>
        <li>
          <strong>Loops</strong> — skeleton shimmer, a pulsing recording dot, a
          marquee. Transitions can't loop.
        </li>
        <li>
          <strong>Staged motion</strong> — an element that slides in, pauses,
          then scales. Keyframes let you place waypoints in time.
        </li>
        <li>
          <strong>Playful physics mimicry</strong> — a squash-and-stretch
          bounce written by hand, frame by frame.
        </li>
      </ul>

      <CodeBlock title="a hand-tuned attention pulse">{`@keyframes nudge {
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-6px); }
  45%  { transform: translateX(5px); }
  65%  { transform: translateX(-3px); }
  85%  { transform: translateX(2px); }
  100% { transform: translateX(0); }
}

.attention {
  animation: nudge 500ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
}`}</CodeBlock>

      <p>
        Notice the decaying amplitude: −6, +5, −3, +2, 0. That's a damped
        oscillation written by hand — a "shake" that feels physical because the
        wiggle <em>dies out</em> instead of stopping mid-swing.
      </p>

      <h2>The properties that trip people up</h2>
      <ul>
        <li>
          <code>animation-fill-mode: forwards</code> (or{" "}
          <code>both</code>) — without it the element snaps back to its
          un-animated state when the animation ends. The cause of "why does my
          element flash after animating in."
        </li>
        <li>
          <code>animation-delay</code> can be <em>negative</em> — it starts
          the animation partway through, essential for staggering loops so
          they don't pulse in unison.
        </li>
        <li>
          <code>animation-play-state: paused</code> — a cheap way to freeze a
          loop on hover.
        </li>
      </ul>

      <CodeBlock title="staggered shimmer loop">{`@keyframes shimmer {
  from { background-position: -200px 0; }
  to   { background-position: 200px 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    rgba(37,77,165,0.05) 25%,
    rgba(37,77,165,0.12) 50%,
    rgba(37,77,165,0.05) 75%
  );
  background-size: 400px 100%;
  animation: shimmer 1.6s linear infinite;
}

/* desynchronize identical items */
.skeleton:nth-child(2) { animation-delay: -0.5s; }
.skeleton:nth-child(3) { animation-delay: -1.1s; }`}</CodeBlock>

      <Demo title="Keyframes vs transitions" caption="A two-state change is a transition's job. A loop, a wiggle, a multi-stage entrance — that's keyframes.">
        <div className="grid gap-3 p-4 text-[12.5px] text-muted sm:grid-cols-2">
          <div className="rounded-xl bg-stage p-3">
            <div className="mb-1.5 font-medium text-body">use transition</div>
            hover states · toggles · accordion height · focus rings · theme color fades
          </div>
          <div className="rounded-xl bg-stage p-3">
            <div className="mb-1.5 font-medium text-body">use keyframes</div>
            loops · skeletons · spinners · staged entrances · hand-made bounce &amp; shake
          </div>
        </div>
      </Demo>

      <Callout>
        Loops deserve restraint. Anything that pulses forever pulls the eye
        forever — make looped motion slow, subtle, and easy to disable.
      </Callout>

      <Exercise
        solution={
          <p>
            <code>@keyframes shake</code> with waypoints at roughly −8, +6, −4,
            +2, 0 px translateX over ~450ms — the signature decaying-oscillation
            shape. Trigger it by adding a class (or re-triggering with the Web
            Animations API). Don't use <code>infinite</code> — the shake must
            play once and stop.
          </p>
        }
      >
        Design the "wrong password" shake for a login form. Sketch the keyframe
        waypoints (translateX values over time) and decide whether it should
        loop.
      </Exercise>
    </>
  );
}
