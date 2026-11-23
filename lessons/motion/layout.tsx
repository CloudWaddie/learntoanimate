"use client";

import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";
import { LayoutPlayground } from "@/components/playgrounds/LayoutPlayground";

export default function Lesson() {
  return (
    <>
      <p>
        The hardest animations in UI aren't moving things — they're{" "}
        <em>rearranged</em> things. An element's parent changes, a list
        reflows, a tab underline belongs to a different button. The element
        didn't move; the layout moved under it. This is the problem{" "}
        <strong>layout animation</strong> solves, and it's Motion's crown
        jewel.
      </p>

      <h2>FLIP: the trick underneath</h2>
      <p>
        Motion uses the FLIP technique — <strong>F</strong>irst,{" "}
        <strong>L</strong>ast, <strong>I</strong>nvert, <strong>P</strong>lay.
        Measure where the element was, measure where it landed, apply a
        transform that makes it look like it never moved, then animate that
        transform to zero. The expensive geometry work happens once; the
        animation itself is pure transform — compositor-cheap.
      </p>

      <CodeBlock title="the magic one-word API">{`// element reflows → it glides instead of jumping
<motion.div layout />

// one element living in two places → shared element transition
{selected
  ? <motion.div layoutId="hero" className="big" />
  : <motion.div layoutId="hero" className="thumb" />}`}</CodeBlock>

      <Demo
        title="layout & layoutId, live"
        caption="The tab pill is a single element with layoutId — Motion moves it between parents. The cards reflow with layout alone."
      >
        <LayoutPlayground />
      </Demo>

      <h2>Shared elements: the wow moment</h2>
      <p>
        <code>layoutId</code> is how you build image → lightbox, card → detail
        page, collapsed → expanded panel. Two different JSX nodes share one{" "}
        <code>layoutId</code>; Motion treats them as a single continuous object
        and morphs between their rects. This is the technique behind nearly
        every "how did they do that" transition you've seen.
      </p>

      <h2>Where layout animation bites back</h2>
      <ul>
        <li>
          <strong>Scale distortion.</strong> Animating a card between very
          different aspect ratios can stretch children mid-flight.{" "}
          <code>layout="position"</code> restricts to position-only animation.
        </li>
        <li>
          <strong>Text reflow.</strong> A reflowing block of text will
          reflow — the letters rewrap, which reads as jitter. Fade text
          separately from the container's layout move.
        </li>
        <li>
          <strong>Cost.</strong> <code>layout</code> measures the DOM on every
          render cycle — fine for dozens of elements, not thousands. Virtualize
          first, animate second.
        </li>
      </ul>

      <Callout>
        layoutId + AnimatePresence is the recipe for the smoothest "expand"
        pattern in UI: click a card, it grows into a modal; close, it shrinks
        home. Users can't articulate why it feels good — the object simply
        never broke continuity.
      </Callout>

      <Exercise
        solution={
          <p>
            Give the list of tracks and the player bar a shared{" "}
            <code>layoutId="artwork"</code> on the album-art element. Collapsed:
            the art is a row's thumbnail; expanded: it's the large cover.
            Motion morphs between them — no manual coordinate math. Add{" "}
            <code>AnimatePresence</code> around the expanded state for its
            enter/exit fades.
          </p>
        }
      >
        A music app shows a mini-player bar; tapping it expands to a full
        player. The album art should visibly travel from the mini-player to the
        big cover. Design it with layoutId.
      </Exercise>
    </>
  );
}
