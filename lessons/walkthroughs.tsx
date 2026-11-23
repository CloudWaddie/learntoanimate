import Link from "next/link";
import { CssWorkshop } from "@/components/CssWorkshop";
import { CodeBlock } from "@/components/lesson";

function FocusTimerWalkthrough() {
  return (
    <>
      <h2 id="morph">Morph the shell between states</h2>
      <p>Start, pause, and resume with motion disabled. Pausing keeps the same readout mounted by mapping both active phases to the same key. If you used the displayed seconds as the key, the readout would remount every second.</p>
      <p>On the capsule, change <code>layout=&#123;animated&#125;</code> to <code>layout</code>. Leave the content transitions disabled. The grid computes the natural width of each state, and Motion measures the old and new boxes to interpolate between them.</p>
      <CodeBlock title="FocusTimer.tsx · capsule transition">{`<motion.div
  layout
  className="focus-capsule"
  data-phase={key}
  transition={{ layout: { type: "spring", stiffness: 395, damping: 28 } }}
  style={{ borderRadius: 40 }}
>`}</CodeBlock>
      <p>Try damping values of 15 and 40. Start and immediately reset after each change. Which setting lets the shell and readout settle together? Use the <Link href="/course/foundations/springs/">spring lab</Link> to isolate the same settings.</p>

      <h2 id="readout">Hand off the readout</h2>
      <p>The shell moves to frame the next state. The outgoing text should clear quickly enough that it doesn’t compete with the incoming text.</p>
      <p>Remove the <code>animated</code> checks on the readout. Keep <code>layout="position"</code> so it moves without stretching. Try removing <code>mode="popLayout"</code>, then restore it. Without it, the exiting item can keep contributing to the capsule’s height while the new item is already present.</p>
      <CodeBlock title="FocusTimer.tsx · readout animation">{`// Keep key={key}. Avoid keying on seconds or remaining.
layout="position"
initial={{ opacity: 0, y: reduced ? 0 : 7 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: reduced ? 0 : -5 }}
transition={{ duration: 0.17, layout: spring }}`}</CodeBlock>

      <h2 id="timer-check">Test interruption and the timer logic</h2>
      <ul>
        <li>Pause at three seconds and wait. Resume, then make sure the timer finishes after about three more seconds.</li>
        <li>Start and reset twice in quick succession. The old interval must never finish a newer run. Find the cleanup and the guard on the current timer state.</li>
        <li>Turn on reduced motion. The capsule should resize immediately and the timer should still announce when it finishes.</li>
      </ul>
      <p><strong>Build a duration picker.</strong> Add 10, 25, and 60-second options in the idle state. Give the picker its own readout key and switch directly from picker to running when a duration is chosen. Try going from the widest state straight back to idle. Keep the existing capsule, and check that focus lands on Pause after a choice.</p>
    </>
  );
}

function NotificationStackWalkthrough() {
  return (
    <>
      <h2 id="depth">Give every card a depth</h2>
      <p>The cards share a top edge. The inline <code>--depth</code> on each card provides an index. Start with a y-offset that grows with depth, then add a scale that shrinks the back cards around their top center.</p>
      <p>Complete the transform and transition in the editor. Check both directions by toggling Expand stack while it’s still moving. The front card should stay still because its depth is zero.</p>
      <CssWorkshop exercise="stack" />

      <h2 id="expand">Spread the cards without replacing them</h2>
      <p>Set <code>animated</code> to <code>true</code> in your App. Then comment out the <code>transition</code> on <code>.notice-card</code> and restore it once you understand what changes. The same nodes exist before and after expansion. Changing the spacing and shrink tokens gives the browser new values to interpolate.</p>
      <CodeBlock title="notification-stack.css · collapsed and expanded tokens">{`.notice-stack { --spacing: .47rem; --shrink: .065; }
.notice-stack[data-expanded="true"] { --spacing: 4.2rem; --shrink: 0; }

.notice-card {
  transform-origin: center top;
  transform: translateY(calc(var(--depth) * var(--spacing)))
             scale(calc(1 - var(--depth) * var(--shrink)));
  transition: transform 210ms cubic-bezier(.22, .8, .32, 1),
              opacity 190ms ease;
}`}</CodeBlock>
      <p>Temporarily use the array index as the React key. Add a card and see which nodes update in place. Switch back to <code>notice.id</code> so the browser can animate each existing card from its old depth to its new depth.</p>

      <h2 id="entry-exit">Animate cards that enter and leave</h2>
      <p>Remove <code>@starting-style</code> and add a notification. The existing cards still shift, but the entering card has no previous computed style to transition from. Restore the rule. Make the entrance lower by changing the starting offset and compare which direction reads as joining the stack.</p>
      <p>A departing card needs one final render with <code>data-leaving</code> set before it’s removed. The example keeps it for 220ms, slightly longer than the 210ms transform transition. If you change the CSS duration, adjust the removal timer too. Keep the reduced-motion path immediate.</p>
      <ul>
        <li>Expand the stack and dismiss the middle notification. Watch the card below it fill the gap.</li>
        <li>Tab through the collapsed stack. Only the front card should offer a dismiss button. On dismissal, focus should move to the stack toggle.</li>
        <li>Dismiss every notification to check the empty state, then add a new one.</li>
      </ul>
      <p><strong>Build undo.</strong> Add one Undo button beneath the stack for the last dismissal. If the card is still exiting, clear its leaving state so it reverses direction in place. If it has already been removed, reinsert it with its original ID. Check that the old removal timer cannot delete a recovered card.</p>
    </>
  );
}

function RecordLibraryWalkthrough() {
  return (
    <>
      <h2 id="shared-cover">Link the two instances of the cover</h2>
      <p>Open a cover with animation disabled. There’s a cover in the shelf and another beside the track list. Both show the same release. Start by removing the <code>animated</code> condition from <code>layoutId</code> in <code>Cover</code>. Leave the backdrop and copy disabled.</p>
      <CodeBlock title="RecordLibrary.tsx · use the selected record’s identity">{`<motion.span
  className="record-cover"
  data-record={record.id}
  layoutId={"cover-" + record.id}
  style={{ borderRadius: 7 }}
  aria-hidden="true"
/>`}</CodeBlock>
      <p>Open each release. Motion should connect the selected tile to the detail cover. Try using the same literal ID for every tile, then restore the record-specific ID. The <code>LayoutGroup</code> adds a separate namespace when more than one browser appears on a page.</p>

      <h2 id="sequence">Sequence the cover, backdrop, and tracks</h2>
      <p>Open <code>RecordDetail</code> and replace the disabled duration with <code>0.16</code>. Let the backdrop fade while the cover travels. Delay the track list by 70ms on entry so the cover draws the eye first. Let the track list exit immediately so closing feels responsive.</p>
      <CodeBlock title="RecordLibrary.tsx · track list transition">{`initial={{ opacity: 0, y: reduced ? 0 : 8 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.16, delay: present && !reduced ? 0.07 : 0 }}`}</CodeBlock>
      <p>Try using a second shared layout ID for the title. Compare it with the simpler fade. Follow the record’s identity through the cover and decide whether sending the title across the view helps you.</p>

      <h2 id="return">Make the return interruptible</h2>
      <p>The shelf stays mounted so Motion has a target for the return. <code>AnimatePresence</code> keeps the detail mounted long enough to leave. The shelf is inert while covered, and the detail becomes inert as soon as it starts closing.</p>
      <ul>
        <li>Open a card with Enter and confirm focus moves to Close. Press Escape before the entrance finishes and check that focus returns to the original card.</li>
        <li>Open the same card again during its exit. Then repeat with a different record. The cover should always arrive at the destination for the latest selection.</li>
        <li>Emulate reduced motion and check that opening a record removes spatial travel while the track list and keyboard controls still work.</li>
      </ul>
      <p><strong>Build a mini player.</strong> Give each track a Play control that pins a now-playing bar beneath the shelf. Bring the record cover into the bar from the detail view, using a distinct layout ID for this handoff so it doesn’t compete with the shelf. Try switching tracks while the bar is still entering.</p>
    </>
  );
}

export const walkthroughContent = {
  "focus-timer": FocusTimerWalkthrough,
  "notification-stack": NotificationStackWalkthrough,
  "record-library": RecordLibraryWalkthrough,
};
