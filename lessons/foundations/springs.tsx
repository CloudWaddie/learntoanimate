"use client";

import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";
import { SpringPlayground } from "@/components/playgrounds/SpringPlayground";

export default function Lesson() {
  return (
    <>
      <p>
        Everything so far has been <em>time-based</em>: pick a duration, pick a
        curve, play it out. Springs flip the model. You don't say how long the
        animation takes — you describe a physical system and let it run. The
        duration <em>emerges</em> from the physics.
      </p>

      <h2>Three numbers instead of two</h2>
      <ul>
        <li>
          <strong>Stiffness</strong> — how hard the spring pulls toward the
          target. Higher = faster, snappier.
        </li>
        <li>
          <strong>Damping</strong> — friction. Lower = more oscillation and
          bounce before settling.
        </li>
        <li>
          <strong>Mass</strong> — how heavy the thing feels. Higher = slower
          and more momentum.
        </li>
      </ul>
      <p>
        The ratio that matters most: damping ÷ 2√(stiffness × mass). Below 1
        the system is <em>underdamped</em> and bounces; at or above 1 it's
        <em> overdamped</em> and glides to rest without crossing the target.
        The playground computes it live — watch it while you drag damping down.
      </p>

      <Demo
        title="Spring lab"
        caption="Lower the damping until the curve overshoots the dashed target line. Then raise stiffness — the bounces get tighter."
      >
        <SpringPlayground />
      </Demo>

      <h2>Why springs feel better</h2>
      <p>
        Two reasons. First, <strong>velocity is continuous.</strong> A spring
        starts slow, accelerates, overshoots, oscillates — exactly how real
        objects behave. Second, <strong>springs are interruptible.</strong> If
        the target changes mid-flight, the spring just steers toward the new
        one, preserving its current velocity. A duration-based animation has to
        jump or restart its clock. We'll explore this properly in the
        Interruptibility lesson.
      </p>

      <h2>When to reach for which</h2>
      <ul>
        <li>
          <strong>Springs</strong> for anything the user can interact with or
          interrupt: drag, toggles, panels, playful moments, any element
          tracking a changing target.
        </li>
        <li>
          <strong>Duration + easing</strong> for anything with a fixed script:
          enter/exit transitions, choreography where timing must be exact,
          sequences synchronized with other elements.
        </li>
      </ul>

      <CodeBlock title="a spring in Motion">{`import { animate } from "motion/react";

animate(element, { x: 300 }, {
  type: "spring",
  stiffness: 300,  // pull strength
  damping: 20,     // below ~35 here → visible bounce
  mass: 1,
});`}</CodeBlock>

      <Callout>
        Don't chase a "perfect" spring. Presets exist for a reason: a gentle
        spring (high damping), a snappy one (high stiffness), a bouncy one (low
        damping). Pick a personality, not numbers.
      </Callout>

      <Exercise
        solution={
          <p>
            Stiffness high-ish (~400) for snappiness, damping high (~30) to
            avoid bounce — the user is aiming at a target and oscillation would
            make the row feel slippery. Mass stays 1. Save the low damping for
            celebration moments, not everyday chrome.
          </p>
        }
      >
        You're animating a sidebar item that expands to show sub-items on
        hover. Should it bounce? Pick spring parameters and justify the damping
        choice specifically.
      </Exercise>
    </>
  );
}
