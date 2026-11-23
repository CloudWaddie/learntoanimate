"use client";

import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";
import { OriginPlayground } from "@/components/playgrounds/OriginPlayground";

export default function Lesson() {
  return (
    <>
      <p>
        Every <code>transform</code> happens around a point — the{" "}
        <code>transform-origin</code>, which defaults to the element's center.
        For rotations that default is often right. For scales it is frequently
        wrong, and it's the reason so many dropdowns feel like they materialize
        from nowhere instead of <em>unfolding from their button</em>.
      </p>

      <Demo
        title="Same scale, different origin"
        caption="Switch origins and replay. 'Top right' anchors the menu to its imaginary trigger; 'center' makes it bloom in space."
      >
        <OriginPlayground />
      </Demo>

      <h2>The rule: grow from the cause</h2>
      <p>
        Motion should trace back to its origin — literally. A menu grows from
        the button that opened it. A popover grows from the edge it points at.
        A modal that appeared after clicking a row grows subtly from that row's
        direction. When the origin matches the user's mental model of cause and
        effect, the animation feels inevitable; when it doesn't, it feels
        arbitrary.
      </p>

      <CodeBlock title="corner-anchored menu">{`.menu {
  transform-origin: top right; /* the trigger sits top-right */
  transition:
    transform 180ms cubic-bezier(0.32, 0.72, 0, 1),
    opacity 180ms cubic-bezier(0.32, 0.72, 0, 1);
}

.menu[data-closed] {
  opacity: 0;
  transform: scale(0.9);
}`}</CodeBlock>

      <h2>The supporting cast of details</h2>
      <ul>
        <li>
          <strong>Scale range.</strong> Entering at <code>scale(0.9)–0.95</code>{" "}
          is subtle; <code>scale(0)</code> is theatrical. UI elements almost
          never enter from zero.
        </li>
        <li>
          <strong>Pair scale with opacity.</strong> Scale alone looks like a
          zoom; scale + fade looks like an arrival.
        </li>
        <li>
          <strong>Translate a little too.</strong> A few px of vertical drift on
          entry reads as weight. <code>scale(0.96) + y(4px)</code> is the
          signature of a polished menu.
        </li>
        <li>
          <strong>Direction of travel.</strong> Content entering from below
          suggests "new layer"; from the side suggests "next page." Pick the
          metaphor that matches your navigation model.
        </li>
      </ul>

      <Callout>
        The center-origin scale is the single most common "almost right"
        detail in real codebases. It's a one-line fix with outsized payoff.
      </Callout>

      <Exercise
        solution={
          <p>
            The tooltip lives below its button, so it should scale from{" "}
            <code>top center</code>. If the tooltip sat above the button, use{" "}
            <code>bottom center</code>. Whatever edge faces the trigger is the
            anchor.
          </p>
        }
      >
        A tooltip appears directly below a button when hovered. Which{" "}
        <code>transform-origin</code> should it scale from, and why?
      </Exercise>
    </>
  );
}
