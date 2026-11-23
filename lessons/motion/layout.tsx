import { CodeBlock, Demo, Exercise } from "@/components/lesson";
import { LayoutPlayground } from "@/components/playgrounds/LayoutPlayground";

export default function Lesson() {
  return (
    <>
      <p>When React sorts a list, the browser lays out the rows in their new order immediately. Motion can animate between the old and new positions if React preserves the identity of each row.</p>
      <Demo title="Position changes and shared identity" caption="Change the list between row and grid, then switch tabs to watch the selected background move.">
        <LayoutPlayground />
      </Demo>

      <h2>Build a sortable list</h2>
      <p>Put this component in a React project with <code>motion</code> installed. Sort it back and forth. The stable <code>key</code> keeps each issue tied to the same DOM node. <code>layout="position"</code> asks Motion to animate where the item sits without scaling its contents.</p>
      <CodeBlock title="IssueList.tsx">{`"use client";

import { useState } from "react";
import { motion } from "motion/react";

const issues = [
  { id: "A-19", title: "Update release notes", priority: 2 },
  { id: "A-18", title: "Fix checkout error", priority: 1 },
];

export default function IssueList() {
  const [byPriority, setByPriority] = useState(false);
  const rows = byPriority
    ? [...issues].sort((a, b) => a.priority - b.priority)
    : issues;

  return (
    <>
      <button aria-pressed={byPriority} onClick={() => setByPriority(!byPriority)}>
        Sort by priority
      </button>
      <ul>
        {rows.map((issue) => (
          <motion.li key={issue.id} layout="position">
            {issue.title}
          </motion.li>
        ))}
      </ul>
    </>
  );
}`}</CodeBlock>

      <h2>How the position is animated</h2>
      <p>FLIP stands for First, Last, Invert, Play. Measure the old and new positions, then offset the element so it visually starts in its old position. Animate that offset to zero. The browser can use transforms for the travel while the document is already in its new layout.</p>

      <h2>Follow an indicator across elements</h2>
      <p>In the tab example, each tab can render the background with the same <code>layoutId</code>. When selection changes, Motion connects the old and new positions even though the indicator is rendered under a different button. Use a <code>LayoutGroup</code> ID to scope shared IDs when there are multiple copies of the component.</p>

      <Exercise solution={<p>The DOM node at each index stays put, and its text changes. There is no retained identity to move. Restore <code>key={"{issue.id}"}</code> and check that the same issue travels across the list.</p>}>
        Replace <code>key={"{issue.id}"}</code> with the array index in your sortable list. Observe what happens when you change the order, explain what React reused, then restore the stable keys.
      </Exercise>
    </>
  );
}
