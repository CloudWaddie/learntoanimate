import { Demo, Exercise } from "@/components/lesson";
import { DurationPlayground } from "@/components/playgrounds/DurationPlayground";

export default function Lesson() {
  return (
    <>
      <p>Duration is the time it takes a transition to finish. A short transition can make a change easier to follow. A long one can make a common action feel slow, especially if it delays reading, clicking, or typing.</p>

      <Demo title="One panel, one variable" caption="Use the same open and close controls at 100, 250, and 650 ms. The distance and easing stay fixed.">
        <DurationPlayground />
      </Demo>

      <h2>Choose a starting point</h2>
      <p>Try 100–150 ms for a small color or press change, 150–250 ms for a small panel, and 250–400 ms for longer travel. Treat these as starting values and judge them in the context of the task.</p>
      <p>Where people have already dismissed something, try a shorter exit. If the departing surface hides important context beneath it, keep the transition long enough to understand the change. Time how soon the next action becomes available as well as how long the animation lasts.</p>

      <Exercise solution={<p>Start with 200 ms on entrance and 120 ms on exit. At 650 ms the panel spends a noticeable amount of time moving or fading. At 100 ms the spatial cue is more subtle. Test your choice on repeated opens and closes before using it elsewhere.</p>}>
        Open and close the panel three times at each of the suggested settings. Choose an entrance duration where the panel still looks connected to the action. Pick an exit duration and explain what it should help the user see.
      </Exercise>
    </>
  );
}
