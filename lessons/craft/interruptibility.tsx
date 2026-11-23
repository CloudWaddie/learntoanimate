import { CodeBlock, Demo, Exercise } from "@/components/lesson";
import { InterruptPlayground } from "@/components/playgrounds/InterruptPlayground";

export default function Lesson() {
  return (
    <>
      <p>When someone changes their mind mid-transition, the interface should respond to the latest input. Test opening and closing a panel quickly. Does a second press work immediately? Does the panel change direction from where it is now?</p>

      <Demo title="Change direction mid-flight" caption="Toggle the target a few times before either dot reaches the end. Observe how a spring and a duration-based easing pick up from the same current position.">
        <InterruptPlayground />
      </Demo>

      <h2>Animate toward the current state</h2>
      <p>A spring takes its current position and velocity into account when the target changes. A duration-based animation can also start at its current position, but its new easing curve sets the velocity from there. The effect is most visible when a curve starts slowly or the target changes while the element is moving quickly.</p>
      <CodeBlock title="React · move toward the latest target">{`<motion.div
  animate={{ x: open ? 0 : -24 }}
  transition={{ type: "spring", stiffness: 400, damping: 34 }}
/>`}</CodeBlock>
      <p>Keep one source of truth for <code>open</code>. Let each click update it immediately. If a timer or a completion callback also changes that state, a previous animation can overwrite a newer action.</p>

      <Exercise solution={<p>The final panel should show the last issue selected. Keep the panel’s key stable as its contents change. If you key the whole panel by issue ID, each selection creates a separate entrance and exit.</p>}>
        In the <a href="/course/craft/capstone/">Issue desk reference</a>, open one issue, close it, and reopen it before the exit finishes. Then switch quickly between two issues. Describe which changes should move the panel and which should update only its contents.
      </Exercise>
    </>
  );
}
