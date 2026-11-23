"use client";

import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";
import { ScrollPlayground } from "@/components/playgrounds/ScrollPlayground";

export default function Lesson() {
  return (
    <>
      <p>
        For twenty years, scroll-linked animation meant JavaScript listening to
        scroll events — expensive, janky, and always a little behind. Modern
        CSS changed this: <strong>scroll-driven animations</strong> run the
        scroll position <em>as the timeline</em> of a normal CSS animation,
        entirely off the main thread.
      </p>

      <Demo
        title="Scroll as a timeline"
        caption="The progress bar and the drifting ✦ layers are driven directly by scroll position — the same technique CSS now does natively."
      >
        <ScrollPlayground />
      </Demo>

      <h2>Two timelines, one concept</h2>
      <p>
        <code>scroll()</code> ties animation progress to the scroll position of
        a container — perfect for progress bars and parallax.{" "}
        <code>view()</code> ties it to an element's position within the
        viewport — the native way to do "reveal on scroll."
      </p>

      <CodeBlock title="reveal-on-scroll, zero JavaScript">{`@keyframes reveal {
  from { opacity: 0; transform: translateY(30px) scale(0.98); }
  to   { opacity: 1; transform: none; }
}

.card {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
  /* starts when the card enters, done by 40% visibility */
}`}</CodeBlock>

      <CodeBlock title="a reading progress bar">{`.progress {
  position: fixed;
  inset: 0 auto auto 0;
  height: 3px;
  width: 100%;
  transform-origin: left;
  background: orange;
  animation: grow linear both;
  animation-timeline: scroll(root); /* page scroll */
}

@keyframes grow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}`}</CodeBlock>

      <h2>Discipline for scroll effects</h2>
      <ul>
        <li>
          <strong>Scroll is input, not a toy.</strong> Content should never
          hijack or slow the user's scroll — effects track it, they don't
          control it.
        </li>
        <li>
          <strong>Parallax needs restraint.</strong> A few px of differential
          drift adds depth; whole layers sliding at different speeds makes
          people queasy.
        </li>
        <li>
          <strong>Reveal-on-scroll is a loan.</strong> Overused, every section
          float-fades in and the page feels like a slideshow. Keep it for
          genuinely sequential content, and keep the travel small.
        </li>
      </ul>

      <Callout>
        Browser support note: <code>animation-timeline: scroll()/view()</code>{" "}
        ships in Chromium and is progressing elsewhere — use it as progressive
        enhancement so the content still reads fine without the effect.
      </Callout>

      <Exercise
        solution={
          <p>
            <code>animation-timeline: view()</code> on the image with{" "}
            <code>animation-range: entry 0% cover 40%</code>-ish so it finishes
            before mid-viewport. Keep translateY small (20–40px) — a caption
            gliding in beats an image rocketing up from below.
          </p>
        }
      >
        You want a hero image to fade-and-rise as it enters the viewport,
        finishing its reveal just after it's fully visible. Which timeline and
        range do you pick?
      </Exercise>
    </>
  );
}
