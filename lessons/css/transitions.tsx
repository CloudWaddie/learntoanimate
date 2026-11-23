import { CodeBlock, Demo } from "@/components/lesson";
import { CssWorkshop } from "@/components/CssWorkshop";
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

      <h2>Practice in the browser</h2>
      <p>In the editor, add a 150ms transition for <code>transform</code> and <code>background-color</code>. Run the CSS, hold the button, and release. Now move your declaration into <code>:active</code> and run it again. Which direction snaps?</p>
      <CssWorkshop exercise="press" />
      <p>On release, the <code>:active</code> rule goes away before the return can animate. Put the transition back on the base rule. Try pressing and releasing quickly, and check that Tab still gives the button a clear focus outline.</p>
    </>
  );
}
