"use client";

import { Callout, CodeBlock, Demo, Exercise } from "@/components/lesson";

export default function Lesson() {
  return (
    <>
      <p>
        The CSS <code>transition</code> is the most under-rated tool in
        animation. Most of the motion a UI needs — hovers, toggles, expansions,
        fades — is a two-state problem, and two states is exactly what a
        transition does: interpolate between A and B when a property changes.
      </p>

      <h2>The anatomy</h2>
      <CodeBlock title="transition">{`.button {
  /* property | duration | easing | delay */
  transition: transform 150ms cubic-bezier(0.32, 0.72, 0, 1);
}

.button:hover {
  transform: translateY(-1px) scale(1.02);
}

.button:active {
  transform: translateY(0) scale(0.98);
  transition-duration: 50ms; /* instant feedback on press */
}`}</CodeBlock>

      <p>
        Three details make this feel professional: the duration is short, the
        easing is ease-out, and the <em>press</em> state gets its own faster
        transition. Press-down should feel nearly instant — a slow sink reads
        as lag, not weight.
      </p>

      <h2>Transition on the right element</h2>
      <p>
        Put <code>transition</code> on the base class, not{" "}
        <code>:hover</code>. A transition declared inside the hover state only
        applies while hovering — the return trip plays with whatever the base
        state declares (or nothing, meaning it snaps back instantly). This is
        the most common CSS animation bug in the wild.
      </p>

      <CodeBlock title="the asymmetric trick">{`.card {
  /* slow, graceful enter */
  transition: transform 250ms ease-out, box-shadow 250ms ease-out;
}
.card:not(:hover) {
  /* separate, faster exit back to rest */
  transition: transform 150ms ease-in, box-shadow 150ms ease-in;
}`}</CodeBlock>

      <Demo title="Transition checklist" caption="Every item below is a real-world line that makes transitions feel intentional rather than default.">
        <div className="p-4 text-[13px] leading-relaxed text-white/60">
          <ul className="space-y-2">
            <li>✓ Duration in the 100–300ms band unless travel is large</li>
            <li>✓ Ease-out for responds-to-user events; ease-in only for exits</li>
            <li>✓ Transition lives on the base selector</li>
            <li>✓ Only <code>transform</code> + <code>opacity</code> animated</li>
            <li>✓ Active/press state faster than hover state</li>
          </ul>
        </div>
      </Demo>

      <h2>What transitions can't do</h2>
      <p>
        Multi-step motion (A → B → C), loops, and choreography across siblings
        all outgrow transitions — that's keyframes, next lesson. And anything
        that must react to a moving target — a cursor, a drag — wants springs
        or JS, not a fixed-duration curve.
      </p>

      <Callout>
        If a transition feels "mechanical," the fix is usually not a keyframe
        animation — it's a better curve or a shorter duration.
      </Callout>

      <Exercise
        solution={
          <p>
            <code>transition: opacity 150ms ease-out</code> on{" "}
            <code>.card</code> for opacity, and on{" "}
            <code>.card .actions</code> declare{" "}
            <code>transition: opacity 150ms ease-out, transform 150ms ease-out</code>.
            On hover: <code>.actions {`{ opacity: 1; transform: none }`}</code>.
            Keep the actions' translate small (4–8px) — a big travel on a fade-
            in reads as a slide, not a reveal.
          </p>
        }
      >
        Write the CSS for a card where action buttons fade in <em>and</em>{" "}
        rise 6px on hover. Two elements animate: the card and the actions.
        Which element gets the transition declaration, and what values?
      </Exercise>
    </>
  );
}
