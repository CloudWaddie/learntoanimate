import { CodeBlock, Demo, Exercise } from "@/components/lesson";
import { LandingComparison } from "@/components/LandingComparison";
import Link from "next/link";
import { EasingPlayground } from "@/components/playgrounds/EasingPlayground";

export default function Lesson() {
  return (
    <>
      <p>Easing describes how progress changes over a fixed duration. Two panels can move the same distance in 200 ms and still arrive differently. One gets most of the way there early, while another builds speed later.</p>

      <h2>Compare the same response at the same speed</h2>
      <p>Open both confirmations. Each takes 450ms. The curve on the left spends more of that time starting up. The one on the right shows that the action worked earlier and uses the rest of the time to settle. Close both while they’re moving to see how the same curves affect the return.</p>
      <LandingComparison />

      <h2>Inspect the curves</h2>
      <Demo title="Easing editor" caption="Select linear, ease-out, then ease-in. Replay each curve and notice where the marker spends the most time.">
        <EasingPlayground />
      </Demo>

      <h2>Read the curve</h2>
      <p>The horizontal axis is elapsed time. The vertical axis is progress from a starting value to an ending value. A steeper slope means more progress over the same interval. A flat section means the animated value barely changes.</p>
      <p>With <code>cubic-bezier(x1, y1, x2, y2)</code>, the endpoints stay at (0, 0) and (1, 1). You control the two intermediate handles. The x coordinates must stay between 0 and 1. The y coordinates can extend beyond that range. A curve that rises above 1 briefly overshoots on properties that allow it, such as translation.</p>

      <h2>Match the curve to the change</h2>
      <ul>
        <li><strong>Ease-out</strong> makes visible progress early. Try it when revealing a panel in response to a click.</li>
        <li><strong>Ease-in-out</strong> starts and ends gradually. Try it for a visible object moving between positions.</li>
        <li><strong>Ease-in</strong> saves most movement for the end. Start by testing it on an exit where there’s already an immediate response to the user’s action.</li>
        <li><strong>Linear</strong> gives constant progress. Use it when the animated value should change at a steady rate.</li>
      </ul>

      <CodeBlock title="CSS · a starting curve">{`.panel {
  transition: opacity 180ms ease-out,
    transform 180ms cubic-bezier(0.22, 0.75, 0.24, 1);
}`}</CodeBlock>

      <Exercise solution={<p>Ease-out should cover more than half the track in the first half of the duration. The curve sits above the diagonal at the midpoint. Back-out briefly rises above 100%, so the marker should pass its target and return.</p>}>
        Keep the duration fixed. Predict where the linear and ease-out markers will be halfway through the run, then replay to check your prediction. Compare back-out next and find its overshoot on the graph.
      </Exercise>

      <p>Apply this to a real component in the <Link href="/course/walkthroughs/notification-stack/">notification stack walkthrough</Link>. Its spacing and scale share one curve so each card reads as a single moving surface.</p>
    </>
  );
}
