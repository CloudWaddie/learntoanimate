import { CodeBlock, Demo, Exercise } from "@/components/lesson";
import { Compare } from "@/components/playgrounds/Compare";

function Bar({ property }: { property: "width" | "transform" }) {
  return (
    <div className="flex h-20 items-center rounded-sm bg-stage px-4">
      <div data-property={property} className="cost-bar h-3 w-full origin-left bg-accent" />
    </div>
  );
}

export default function Lesson() {
  return (
    <>
      <p>Browsers work out element positions and sizes during layout, draw pixels during paint, and assemble layers during compositing. A repeated change to width can require layout on every frame. Transform and opacity can often run at the compositing stage once the element has a layer.</p>
      <Demo title="Compare width and transform" caption="Replay both bars. They cover the same distance in the same time.">
        <Compare a={<Bar property="width" />} b={<Bar property="transform" />} labelA="width" labelB="transform" />
      </Demo>
      <h2>Record a trace</h2>
      <ol>
        <li>Open the Performance panel in Chromium DevTools and start recording.</li>
        <li>Replay both bars. Wait for them to stop, then stop recording.</li>
        <li>Zoom in on the replay interval in the Main track. Look for repeated <strong>Layout</strong> events. Select one and inspect the affected nodes if available.</li>
      </ol>
      <p>Layouts on the first frame are expected when new elements mount. Repeated layout during the run is what you’re looking for. A small demo can still run smoothly even if it triggers layout. The cost grows when more of the page depends on the changing geometry.</p>
      <CodeBlock title="CSS · two ways to fill the same track">{`@keyframes by-width {
  from { width: 15%; }
  to { width: 100%; }
}

@keyframes by-transform {
  from { transform: scaleX(0.15); }
  to { transform: scaleX(1); }
}

.bar {
  width: 100%;
  transform-origin: left center;
  animation: by-transform 750ms ease-out;
}`}</CodeBlock>
      <Exercise solution={<p>Animate the fill with <code>scaleX</code> and keep the label outside the transformed element. Its layout box stays at full width and the text stays the same shape. Record again to check that the repeated layouts are gone.</p>}>
        Build a progress bar with a percent label beside it. Make the fill start at 15%. Try each animation above and compare the Main track in two separate recordings. Keep the label legible and stationary in both versions.
      </Exercise>
    </>
  );
}
