"use client";

import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";
import { DurationPlayground } from "@/components/playgrounds/DurationPlayground";

export default function Lesson() {
  return (
    <>
      <p>
        Ask a room of engineers how long a UI animation should take and you'll
        get answers from 100ms to a full second. There's a reason the great
        interfaces cluster in a narrow band: duration is the single easiest way
        to make an animation feel wrong.
      </p>

      <h2>The usable range is small</h2>
      <ul>
        <li>
          <strong>Under ~100ms</strong> reads as instant — no perceived motion,
          just a state change. Sometimes correct (e.g. button hover), but you
          lose continuity.
        </li>
        <li>
          <strong>100–300ms</strong> is the workhorse. Small elements,
          hovers, toggles, menus. Feels immediate but still legible.
        </li>
        <li>
          <strong>300–500ms</strong> for larger travel — modals, page
          transitions, big layout shifts. Distance justifies duration.
        </li>
        <li>
          <strong>Over 500ms</strong> is a loan you repay in annoyance. Reserve
          it for spectacle the user opted into: onboarding, celebrations,
          hero moments.
        </li>
      </ul>

      <Demo
        title="Feel the difference"
        caption="Toggle the panel at different durations. The spring settings are identical — only the clock changes."
      >
        <DurationPlayground />
      </Demo>

      <h2>Exits are shorter than entrances</h2>
      <p>
        A subtle but universal rule: <strong>leaving takes less time than
        arriving.</strong> An exit is the user saying "I'm done with this" —
        respect that. Enter at 250ms, exit at 150–200ms. Long exits are the
        animation equivalent of someone continuing a story after you've left
        the room.
      </p>

      <h2>Distance and size scale duration</h2>
      <p>
        Fixed durations are a smell. A dropdown traveling 20px needs less time
        than a sheet sliding 800px. Apple scales animation duration to the
        distance traveled — this is part of why iOS feels uniformly "right."
        When you write animation code, prefer physics (springs) or derive
        duration from distance rather than hardcoding one number everywhere.
      </p>

      <CodeBlock title="deriving duration from distance">{`// a small utility that keeps durations proportional
function durationForDistance(px: number) {
  // ~100ms floor, grows with sqrt so big moves stay snappy
  return Math.min(0.5, 0.1 + Math.sqrt(px) / 150);
}

durationForDistance(24);   // ≈ 0.13s — a hover popover
durationForDistance(300);  // ≈ 0.22s — a dropdown
durationForDistance(1200); // ≈ 0.33s — a full sheet`}</CodeBlock>

      <Callout>
        When in doubt, go shorter. If an animation feels "too fast," it was
        probably the right duration with the wrong easing. Slowing down is
        almost never the fix.
      </Callout>

      <Exercise
        solution={
          <p>
            100–300ms. A toast is a transient element the user didn't ask to
            wait for — it should assert itself quickly and leave quicker. Enter
            around 200–250ms; exit at ~150ms or on a swipe.
          </p>
        }
      >
        You're building a toast notification that slides up from the bottom of
        the screen — about 80px of travel. What's a reasonable enter duration,
        and what should the exit duration be relative to it?
      </Exercise>
    </>
  );
}
