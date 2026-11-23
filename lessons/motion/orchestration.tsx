"use client";

import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";
import { StaggerPlayground } from "@/components/playgrounds/StaggerPlayground";

export default function Lesson() {
  return (
    <>
      <p>
        One animated element is a feature. Ten elements arriving as a
        choreographed group is a <em>design</em>. Orchestration is how you make
        a page feel composed rather than merely functional — and its core
        technique is embarrassingly simple: delay, applied in a pattern.
      </p>

      <h2>Stagger: delay as a design tool</h2>
      <p>
        A list of items entering one after another reads as a single wave. The
        knob that controls the feel is the <em>stagger interval</em> — the gap
        between each item starting. Too tight and it's a blur; too loose and
        the last item is still loading when the user has already scrolled past.
      </p>

      <Demo
        title="Stagger lab"
        caption="Try 'center' — items ripple outward from the middle, which reads as radiating from a source rather than reading order."
      >
        <StaggerPlayground />
      </Demo>

      <p>
        Practical numbers: 20–60ms between items is the sweet spot. Above
        ~100ms each item feels like its own event. And remember the math from
        duration: total time = stagger × items + item duration — so{" "}
        <strong>stagger less when the list is longer</strong>.
      </p>

      <h2>Variants: choreography as data</h2>
      <p>
        Motion's answer to coordination is <em>variants</em> — named states a
        parent broadcasts to its children. The parent says "we're open" and
        every child knows its own entrance; the orchestration lives in data,
        not timeouts.
      </p>

      <CodeBlock title="parent conducts, children play">{`const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 28 } },
};

<motion.ul variants={list} initial="hidden" animate="show">
  {items.map(i => <motion.li key={i} variants={item} />)}
</motion.ul>`}</CodeBlock>

      <p>
        Two details worth stealing: <code>delayChildren</code> lets the
        container itself land first (a panel opens, <em>then</em> its items
        cascade — much better than everything arriving at once), and{" "}
        <code>staggerDirection</code> / <code>staggerChildren</code> turning
        negative lets the exit run the wave in reverse.
      </p>

      <h2>Orchestration is hierarchy</h2>
      <p>
        Good choreography has an order of importance: the container first, then
        primary content, then chrome. If everything animates with equal weight
        the eye has nowhere to land. Vary the delay, vary the travel — primary
        elements get slightly larger motion because they deserve the attention.
      </p>

      <Callout>
        The reverse wave on exit (items leaving in reverse order, faster) is a
        tiny detail that makes menus feel crafted rather than canned.
      </Callout>

      <Exercise
        solution={
          <p>
            Panel lands first (~150ms spring), then content items stagger at
            ~30–40ms each — the source of motion radiates from the top. On
            close, reverse the order with a shorter stagger so the panel
            doesn't sit empty waiting for its children to finish.
          </p>
        }
      >
        Design the entrance for a command palette (like ⌘K): the panel itself,
        then 5 result rows. What order, what stagger values, and what happens
        on close?
      </Exercise>
    </>
  );
}
