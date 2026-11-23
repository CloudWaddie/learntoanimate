"use client";

import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";
import { ParticlePlayground } from "@/components/playgrounds/ParticlePlayground";

export default function Lesson() {
  return (
    <>
      <p>
        Everything so far has been the craft of <em>functional</em> motion —
        animation that explains the interface. This lesson is about the other
        kind: animation that exists purely to delight. Confetti on a success,
        a burst on a like, sparkle on a hover. Cheap to build, wildly
        memorable.
      </p>

      <h2>Particles are just physics</h2>
      <p>
        A particle system is a loop, not a library: spawn N rectangles at a
        point, give each a random velocity inside an arc, apply gravity and a
        little drag every frame, rotate as they fly, fade them out before they
        die. Canvas draws them all in one pass — no DOM cost, hundreds of
        particles on a phone.
      </p>

      <Demo
        title="The burst sandbox"
        caption="This is the whole technique — click to fire. Crank the spread to 360° for a true explosion, drop it to 40° for a fountain."
      >
        <ParticlePlayground />
      </Demo>

      <CodeBlock title="a particle, in full">{`// spawn: random velocity inside a cone pointing up
const angle = (Math.random() - 0.5) * spread - Math.PI / 2;
const speed = force * (0.4 + Math.random() * 0.9);
p.vx = Math.cos(angle) * speed;
p.vy = Math.sin(angle) * speed;

// per frame: gravity + drag + rotation + age
p.vy += gravity;
p.vx *= 0.985;
p.angle += p.spin;
p.life++;          // alpha = 1 - life / maxLife`}</CodeBlock>

      <h2>The design of delight</h2>
      <ul>
        <li>
          <strong>Attach bursts to moments of consequence.</strong> A like, a
          publish, a level-up — not a routine click. Scarcity is what makes
          them special.
        </li>
        <li>
          <strong>Gravity is the personality.</strong> Zero gravity = space
          dust, light gravity = celebration, heavy gravity = a thunk.
        </li>
        <li>
          <strong>Vary everything.</strong> Identical particles read as a bug.
          Randomize size, speed, spin, lifetime — the imperfection is the
          aesthetic.
        </li>
        <li>
          <strong>Fade, don't pop.</strong> A particle that hits its lifespan
          and vanishes instantly is jarring. Alpha is free.
        </li>
      </ul>

      <h2>Beyond confetti</h2>
      <p>
        The same loop powers the other flourishes: trailing cursor sparkles,
        button hover stardust, typing dot-bursts, cursor-following glow fields.
        Once you own the four lines of physics above, "delight" stops being a
        library you import and becomes a tool you reach for.
      </p>

      <Callout>
        Josh Comeau's rule for flourishes: they should feel like a gift to the
        user, not an advertisement for your animation skills. One perfect burst
        &gt; ten okay ones.
      </Callout>

      <Exercise
        solution={
          <p>
            Small count (~12–20), low force, ~90° upward spread, light gravity
            for a lazy arc, short life with quick fade. A full explosion on a
            like button would be overwhelming — the delight is proportional to
            the action.
          </p>
        }
      >
        Tune a burst for a "like" heart — it should feel like a satisfying pop,
        not New Year's Eve. What values would you pick for count, spread,
        force, and gravity?
      </Exercise>
    </>
  );
}
