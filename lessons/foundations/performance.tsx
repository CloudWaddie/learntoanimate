"use client";

import { motion } from "motion/react";
import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";
import { Compare } from "@/components/playgrounds/Compare";

function BarRow({ cheap }: { cheap?: boolean }) {
  return (
    <div className="flex h-40 items-center rounded-xl bg-[#0d0d10] px-6">
      <motion.div
        initial={cheap ? { scaleX: 0.15 } : { width: "15%" }}
        animate={cheap ? { scaleX: 1 } : { width: "100%" }}
        transition={{ duration: 1.4, ease: [0.32, 0.72, 0, 1], repeat: 0 }}
        style={{ transformOrigin: "left" }}
        className="h-10 w-full rounded-lg bg-gradient-to-r from-accent to-[#ffb38a]"
      />
    </div>
  );
}

export default function Lesson() {
  return (
    <>
      <p>
        A beautiful animation that drops frames is worse than no animation.
        Jank doesn't just look bad — it makes the whole product feel slow. The
        good news: the rules for smooth animation are few and absolute.
      </p>

      <h2>Only two properties are truly cheap</h2>
      <p>
        <code>transform</code> and <code>opacity</code>. That's the whole list.
        These two can be handled entirely by the <em>compositor</em> — the part
        of the browser that assembles layers on the GPU without touching layout
        or paint. Everything else risks work on the main thread:
      </p>
      <ul>
        <li>
          <code>width</code>, <code>height</code>, <code>top</code>,{" "}
          <code>left</code>, <code>margin</code> → trigger <strong>layout</strong>{" "}
          (reflow) every frame. The browser recomputes geometry for the element
          and everything near it.
        </li>
        <li>
          <code>background</code>, <code>box-shadow</code>, <code>border</code>{" "}
          → trigger <strong>paint</strong>. Cheaper than layout, still not free.
        </li>
        <li>
          <code>filter: blur()</code>, <code>backdrop-filter</code> → GPU-heavy;
          fine on small elements, treacherous on large ones.
        </li>
      </ul>

      <Demo
        title="Two ways to grow a bar"
        caption="Left animates width — layout every frame. Right animates scaleX — compositor only. Visually identical, structurally different."
      >
        <Compare
          a={<BarRow />}
          b={<BarRow cheap />}
          labelA="animating width (layout)"
          labelB="animating scaleX (composite)"
        />
      </Demo>

      <h2>The translation table</h2>
      <ul>
        <li>
          Move → <code>translateX/Y</code> instead of <code>top/left</code>
        </li>
        <li>
          Resize → <code>scale</code> (mind text distortion; combine with a
          fade) or clip-path instead of <code>width/height</code>
        </li>
        <li>
          Reveal → <code>opacity</code>, or <code>clip-path: inset()</code> for
          a wipe
        </li>
        <li>
          Grow a menu → <code>scale</code> from the right transform-origin
        </li>
      </ul>

      <h2>will-change: a promise, not a spell</h2>
      <p>
        <code>will-change: transform</code> hints the browser to keep the
        element on its own compositor layer. Useful for an element about to
        animate continuously. But each layer costs memory — sprinkle it on
        everything and you trade jank for bloat. Use it surgically, on elements
        you <em>know</em> animate, and remove it when idle.
      </p>

      <CodeBlock title="the cheap-animator's starter pack">{`.card {
  transition:
    transform 200ms cubic-bezier(0.32, 0.72, 0, 1),
    opacity 200ms cubic-bezier(0.32, 0.72, 0, 1);
  will-change: transform; /* only if it animates often */
}

.card:hover {
  transform: translateY(-2px) scale(1.01);
}`}</CodeBlock>

      <Callout>
        Before shipping, open DevTools → Rendering → "Frame rendering stats"
        and watch for dropped frames. If a transition stutters, the first
        question is always: <em>am I animating something other than transform
        or opacity?</em>
      </Callout>

      <Exercise
        solution={
          <p>
            Animating <code>height</code> forces layout on every frame —
            expensive, and the number of affected elements grows with the list.
            Cheap alternatives: animate <code>scaleY</code> on a wrapper (with a
            counter-scale on children if distortion is visible), animate{" "}
            <code>clip-path</code>, or measure with FLIP (covered in the Layout
            lesson) which still resolves to transforms under the hood.
          </p>
        }
      >
        Your teammate animated a sidebar expanding by transitioning{" "}
        <code>height: 0 → 320px</code>. Why might it stutter, and name two
        cheaper ways to get the same visual result.
      </Exercise>
    </>
  );
}
