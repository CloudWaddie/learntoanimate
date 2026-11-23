import { CodeBlock, Demo, Exercise } from "@/components/lesson";
import { PressPlayground } from "@/components/playgrounds/PressPlayground";

export default function Lesson() {
  return (
    <>
      <p>A CSS transition interpolates between two values when a property changes. Start with a button: a small change in color and scale can make a press feel immediate.</p>

      <Demo title="Button press feedback" caption="Hold the pointer down on each button, then release. Tab to one and try Space or Enter. Each activation updates the save count.">
        <PressPlayground />
      </Demo>

      <h2>Put the transition on the base state</h2>
      <p>Define which properties can animate on the button itself so the transition applies on both press and release. Keep a visible focus outline and use the native button element for keyboard activation.</p>

      <CodeBlock title="save-button.html · open in a browser">{`<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>Save button</title>
<style>
  button {
    padding: 0.65rem 1rem;
    border: 1px solid #17223a;
    border-radius: 4px;
    background: #254da5;
    color: white;
    transition: transform 140ms ease-out,
                background-color 140ms ease-out;
  }
  button:active { transform: scale(0.97); background: #193b87; }
  button:focus-visible { outline: 2px solid #254da5; outline-offset: 3px; }
  @media (prefers-reduced-motion: reduce) {
    button { transition: none; }
    button:active { transform: none; }
  }
</style>
<button type="button">Save draft</button>
<output role="status"></output>
<script>
  const button = document.querySelector("button");
  const status = document.querySelector("output");
  let saves = 0;
  button.addEventListener("click", () => {
    status.textContent = "Draft saves: " + ++saves;
  });
</script>
</html>`}</CodeBlock>

      <Exercise solution={<p>If you put <code>transition</code> on <code>:active</code>, the declaration goes away when you release the button, so the return snaps. Move it back to the base rule. The color change and save count should still work with reduced motion enabled.</p>}>
        Run the example and move the transition declaration into <code>:active</code>. Press and release to find which direction snaps. Restore the base rule, then try three presses in quick succession and verify the count advances three times.
      </Exercise>
    </>
  );
}
