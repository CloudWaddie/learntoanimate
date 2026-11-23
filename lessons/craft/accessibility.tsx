import { CodeBlock, Exercise } from "@/components/lesson";

export default function Lesson() {
  return (
    <>
      <p>Large translations, zoom, and parallax can cause discomfort for people with vestibular sensitivity. The operating system’s reduced-motion preference gives you a way to provide the same interface with less spatial movement.</p>

      <h2>Keep the information</h2>
      <p>Write down what the animation communicates. If a panel enters when an issue is selected, preserve the selected row style, the panel heading, and keyboard access to its actions. You can remove the distance traveled and use an instant change or a short opacity transition if needed.</p>

      <CodeBlock title="CSS · remove spatial movement">{`.panel {
  transition: transform 180ms ease-out, opacity 180ms ease-out;
}
.panel[data-open="false"] {
  opacity: 0;
  transform: translateY(8px);
}

@media (prefers-reduced-motion: reduce) {
  .panel { transition: none; }
  .panel[data-open="false"] { transform: none; }
}`}</CodeBlock>
      <p>These CSS rules only cover the visual change. For a real panel, remove or disable its controls when it closes so they can't take focus while hidden.</p>

      <h2>Respect the preference in React</h2>
      <CodeBlock title="React · Motion configuration">{`import { MotionConfig } from "motion/react";

<MotionConfig reducedMotion="user">
  <IssueDesk />
</MotionConfig>`}</CodeBlock>
      <p>Motion disables transform and layout animations under this setting. Opacity can still animate. CSS, canvas, and code using the Web Animations API need their own reduced-motion handling.</p>

      <Exercise solution={<p>In the Issue desk reference, the sorted order, selected issue, and status changes should match in both modes. With reduced motion on, rows should move directly to their new positions and panel controls should remain reachable.</p>}>
        Open the <a href="/course/craft/capstone/">final project reference</a> in another tab. Compare sorting, opening, and closing in both motion modes. Clear the demo checkbox, then enable the operating system preference or emulate it under DevTools → Rendering → Emulate CSS media feature <code>prefers-reduced-motion</code> and repeat.
      </Exercise>
    </>
  );
}
