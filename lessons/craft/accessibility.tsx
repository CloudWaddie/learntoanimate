"use client";

import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";

export default function Lesson() {
  return (
    <>
      <p>
        For a significant slice of your users, the animations in this course
        aren't charming — they're <strong>literally nauseating.</strong>{" "}
        Vestibular disorders (inner-ear motion sensitivity) turn parallax,
        large slides, and zooming into dizziness and headaches. Respecting
        that isn't a compromise; it's craft.
      </p>

      <h2>prefers-reduced-motion</h2>
      <p>
        One media query tells you the user asked their OS for less movement.
        Honor it globally, and design the reduced version as a{" "}
        <em>different experience</em>, not a broken one — instant states and
        gentle cross-fades instead of spatial travel.
      </p>

      <CodeBlock title="the global kill-switch (CSS)">{`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}</CodeBlock>

      <p>
        That blanket override is the floor. The ceiling is nuance: replace
        motion with a quick <em>fade</em> (opacity isn't vestibular-triggering)
        rather than cutting the animation entirely — a state that blinks into
        existence is still better than a teleport.
      </p>

      <CodeBlock title="respecting it in Motion">{`import { useReducedMotion } from "motion/react";

const reduce = useReducedMotion();

<motion.div
  initial={{ opacity: 0, y: reduce ? 0 : 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: reduce ? 0.1 : 0.25 }}
/>`}</CodeBlock>

      <h2>What actually triggers people</h2>
      <ul>
        <li>
          <strong>Large spatial movement</strong> — full-screen slides, big
          parallax, long pans. Scale matters more than speed.
        </li>
        <li>
          <strong>Movement that fights input</strong> — scroll hijacking,
          autoscrolling, anything that overrides where the user pointed the
          page.
        </li>
        <li>
          <strong>Flashing</strong> — more than ~3 flashes per second is a
          seizure risk, not just a vestibular one. Never approach it.
        </li>
        <li>
          <strong>Uncontrolled loops</strong> — autoplaying carousels and
          marquees are a constant low-grade offender.
        </li>
      </ul>

      <Demo title="Safer substitutions" caption="The rule: replace travel with fade, and scale spectacle with opacity.">
        <div className="grid gap-3 p-4 text-[12.5px] text-white/55 sm:grid-cols-2">
          <div className="rounded-xl bg-[#0d0d10] p-3">
            <div className="mb-1.5 font-medium text-white/70">risky</div>
            slide 80px · parallax layers · zoom-to-fullscreen · scroll-linked pans · infinite drift
          </div>
          <div className="rounded-xl bg-[#0d0d10] p-3">
            <div className="mb-1.5 font-medium text-white/70">safer</div>
            cross-fade · subtle scale · short fades · opacity-only reveal · instant swap
          </div>
        </div>
      </Demo>

      <Callout>
        Accessibility isn't a tax on polish — it's a constraint that produces
        better defaults. Most users prefer a fast cross-fade anyway.
      </Callout>

      <Exercise
        solution={
          <p>
            Parallax is one of the highest-risk patterns. Under{" "}
            <code>prefers-reduced-motion</code>, pin the layers so all elements
            scroll together — or just render statically. The depth effect is
            never worth a headache.
          </p>
        }
      >
        Your marketing site has layered parallax hero art. What do you do for
        reduced-motion users — and why is parallax specifically high-risk?
      </Exercise>
    </>
  );
}
