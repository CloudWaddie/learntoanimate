import Link from "next/link";
import { CodeBlock, Demo } from "@/components/lesson";
import { IssueDeskReference } from "@/components/playgrounds/IssueDeskReference";

export default function Lesson() {
  return (
    <>
      <p>Build motion for an issue tracker people use throughout the day. Make it easy to follow an issue when the list changes order and to see which issue is open. Sorting, filtering, and resolving should work just as well with motion reduced.</p>

      <Demo title="Issue desk · finished reference" caption="Sort by Priority, open UI-102, then resolve it. Try closing and reopening the panel quickly.">
        <IssueDeskReference />
      </Demo>

      <h2>1. Run the starter</h2>
      <p>The starter already handles sorting, filtering, issue status, and keyboard focus. Run it as-is, then add the motion in steps. If you already have a React and TypeScript app, you can use that.</p>
      <div className="my-4 flex flex-wrap gap-2">
        <a className="button-secondary" href="/projects/issue-desk/IssueDesk.tsx" download>Download IssueDesk.tsx <span aria-hidden="true">↓</span></a>
        <a className="button-secondary" href="/projects/issue-desk/issue-desk.css" download>Download issue-desk.css <span aria-hidden="true">↓</span></a>
      </div>
      <CodeBlock title="Terminal · create a React project">{`npm create vite@latest issue-desk -- --template react-ts
cd issue-desk
npm install
npm install motion
npm run dev`}</CodeBlock>
      <p>Put both downloads into <code>src/</code>. Replace <code>src/App.tsx</code> with this entry point. In a fresh Vite project, remove the template’s <code>import "./index.css"</code> from <code>src/main.tsx</code> to clear the demo styles.</p>
      <CodeBlock title="src/App.tsx · start here">{`import IssueDesk from "./IssueDesk";

export default function App() {
  return <IssueDesk />;
}`}</CodeBlock>
      <p>Try every control before adding motion. Set Status to Open, resolve an issue, then close its details. The issue should disappear from the filtered list, and focus should return to the Status control.</p>

      <h2>2. Keep rows recognizable when they reorder</h2>
      <p>Use the <code>IssueRow</code> slot. Keep the existing key on the issue ID. Animate position so the words and priority label keep their shape as the row moves. Read <Link href="/course/motion/layout">layout and shared elements</Link> if you want to inspect why the keys matter.</p>
      <CodeBlock title="src/App.tsx · add an animated row">{`import { motion } from "motion/react";
import IssueDesk, { type IssueRowProps } from "./IssueDesk";

function AnimatedRow({ children }: IssueRowProps) {
  return (
    <motion.li
      layout="position"
      transition={{ type: "spring", stiffness: 470, damping: 36 }}
    >
      {children}
    </motion.li>
  );
}

export default function App() {
  return <IssueDesk IssueRow={AnimatedRow} />;
}`}</CodeBlock>
      <p><strong>Check:</strong> Sort by Priority. UI-102 should travel above UI-104. Sort back while the row is still moving and check that the same four issues end up in the original order.</p>

      <h2>3. Give the details panel an entrance and an exit</h2>
      <p>Use the <code>Details</code> slot. Keep <code>AnimatePresence</code> mounted while the panel comes and goes. Keep the same panel key when switching issues so a single panel stays in place and updates its content. Make the departing panel <code>inert</code> once its exit begins so nobody can tab into it. See <Link href="/course/motion/enter-exit">enter and exit</Link> for the presence pattern.</p>
      <details className="my-3">
        <summary className="w-fit text-sm font-semibold text-accent">Show the panel implementation</summary>
        <CodeBlock title="Add to src/App.tsx · merge imports with step 2">{`import { AnimatePresence, motion, useIsPresent } from "motion/react";
import type { IssueDetailsProps } from "./IssueDesk";

function Panel({ id, headingId, children }: Omit<IssueDetailsProps, "open">) {
  const present = useIsPresent();
  return (
    <motion.section
      id={id}
      aria-labelledby={headingId}
      className="issue-details"
      inert={!present}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 4, transition: { duration: 0.12 } }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

function AnimatedDetails({ open, id, headingId, children }: IssueDetailsProps) {
  return (
    <AnimatePresence initial={false}>
      {open && <Panel key="details" id={id} headingId={headingId}>{children}</Panel>}
    </AnimatePresence>
  );
}

// In App:
// return <IssueDesk IssueRow={AnimatedRow} Details={AnimatedDetails} />;`}</CodeBlock>
      </details>
      <p><strong>Check:</strong> Open two different issues in succession. The heading should switch without the whole panel entering again. Close and immediately reopen with the same row button. The panel should reflect the latest action.</p>

      <h2>4. Verify reduced motion and keyboard use</h2>
      <p>Wrap the board in <code>&lt;MotionConfig reducedMotion="user"&gt;</code>. In DevTools, emulate reduced motion and run the same sorting and panel actions again. For a refresher, see <Link href="/course/craft/accessibility">reduced motion</Link>.</p>
      <CodeBlock title="src/App.tsx · honor the OS preference">{`import { MotionConfig } from "motion/react";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <IssueDesk IssueRow={AnimatedRow} Details={AnimatedDetails} />
    </MotionConfig>
  );
}`}</CodeBlock>
      <ul>
        <li>Use Tab and Enter to open an issue. Focus lands on its heading. Tab to the status action and activate it with Space.</li>
        <li>Press Escape or activate Close. Focus returns to the issue if it is visible and to Status if the filter hid it.</li>
        <li>With reduced motion enabled, the list should reorder without spatial travel. The same issue opens and the same actions work.</li>
      </ul>

      <h2>Review your work</h2>
      <p>Record a short before-and-after of sorting and opening issues. In a few sentences, explain what the movement helps the user follow, where you chose to leave the UI still, and what changed under reduced motion. Use the finished reference to compare behavior and choose your own timings.</p>
    </>
  );
}
