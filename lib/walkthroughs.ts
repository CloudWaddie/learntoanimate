export const walkthroughs = [
  {
    slug: "focus-timer",
    title: "Focus timer",
    description: "Morph a compact timer through idle, counting down, and finished states without cutting off an interrupted transition.",
    tryIt: "Start the ten-second timer, pause it halfway, then resume and let it finish. Try resetting just after you start it.",
    source: "FocusTimer.tsx",
    stylesheet: "focus-timer.css",
  },
  {
    slug: "notification-stack",
    title: "Notification stack",
    description: "Use CSS to spread overlapping notifications into a list, then animate new and dismissed cards in the same stack.",
    tryIt: "Add two notifications, expand the stack, and dismiss the middle card. Collapse it while the others are moving.",
    source: "NotificationStack.tsx",
    stylesheet: "notification-stack.css",
  },
  {
    slug: "record-library",
    title: "Record library",
    description: "Build an App Store-style card-to-detail transition where the cover connects a record on the shelf to its track list.",
    tryIt: "Open a record and follow the cover into the detail view. Press Escape while it’s still moving, then open a different record.",
    source: "RecordLibrary.tsx",
    stylesheet: "record-library.css",
  },
] as const;

export type WalkthroughSlug = (typeof walkthroughs)[number]["slug"];
