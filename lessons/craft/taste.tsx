"use client";

import { motion } from "motion/react";
import { Callout, Demo, Exercise } from "@/components/lesson";
import { Compare } from "@/components/playgrounds/Compare";

function Rows({ tasteful }: { tasteful?: boolean }) {
  return (
    <div className="h-44 space-y-2 overflow-hidden rounded-xl bg-[#0d0d10] p-4">
      {[0, 1, 2, 3].map((i) =>
        tasteful ? (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="h-8 rounded-lg border border-line bg-surface-2"
          />
        ) : (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.18, duration: 0.7, ease: [0.34, 1.9, 0.64, 1] }}
            className="h-8 rounded-lg border border-line bg-surface-2"
          />
        ),
      )}
    </div>
  );
}

export default function Lesson() {
  return (
    <>
      <p>
        You now own every mechanical knob: duration, easing, springs, origin,
        stagger. Taste is knowing which to touch and which to leave alone. It's
        the difference between a product that <em>has animations</em> and one
        that <em>feels animated</em>.
      </p>

      <Demo
        title="Restraint vs. enthusiasm"
        caption="Same rows, same concept. Left: every trick at once — slow, spun, overshot. Right: small travel, quick stagger, plain ease-out."
      >
        <Compare a={<Rows />} b={<Rows tasteful />} labelA="everything, everywhere" labelB="restraint" />
      </Demo>

      <h2>The taste rules</h2>
      <ul>
        <li>
          <strong>Frequency beats magnitude.</strong> An interface animating
          everything at low amplitude feels better than one animating a few
          things theatrically. Reduce scale, travel, and overshoot before
          reducing the number of animated things.
        </li>
        <li>
          <strong>Overshoot is a spice.</strong> A single bouncing element is
          charm; five is a bounce house. Reserve underdamped springs for
          moments of delight — success states, reveals, playful gestures.
        </li>
        <li>
          <strong>Match animation weight to consequence.</strong> Deleting an
          item is small motion; finishing onboarding can be a celebration. The
          magnitude of the animation is part of the message.
        </li>
        <li>
          <strong>Direction carries meaning.</strong> "Next" pushes left, "back"
          pushes right, modals rise, drawers descend. Pick a spatial metaphor
          and never betray it — inconsistency is felt, not seen.
        </li>
        <li>
          <strong>When in doubt, subtract.</strong> If an animation isn't
          obviously earning its duration, delete it. Motion is seasoning, not
          the meal.
        </li>
      </ul>

      <h2>Developing taste</h2>
      <p>
        The reliable method: steal judiciously. Slow down interfaces you admire
        — record your screen, watch frame by frame, measure the durations.
        You'll find that nearly all of the polish you attributed to genius is
        just <em>consistency</em>: the same ease-out curve, the same duration
        band, the same origin rule, applied everywhere.
      </p>

      <Callout>
        Emil Kowalski's standard is a good north star: if you can't explain{" "}
        <em>why</em> an animation is there, it probably shouldn't be.
      </Callout>

      <Exercise
        solution={
          <p>
            Cut: the 400ms wobble on hover (a hover is not an event worth
            400ms), the 3rem vertical travel on enter (too much distance for
            chrome), and the page-load choreographed entrance for a utility
            element. Keep: a ~150ms subtle lift/underline on hover, and a
            modest fade on mount if it must animate at all.
          </p>
        }
      >
        Audit a teammate's navbar: items stagger in on every page load (500ms
        apart), each link does a 400ms wobble on hover, and the logo slides in
        from 3rem below. What's wrong with each, and what would you keep?
      </Exercise>
    </>
  );
}
