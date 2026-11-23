"use client";

import FocusTimer from "@/public/projects/focus-timer/FocusTimer";
import NotificationStack from "@/public/projects/notification-stack/NotificationStack";
import RecordLibrary from "@/public/projects/record-library/RecordLibrary";
import type { WalkthroughSlug } from "@/lib/walkthroughs";
import { useState } from "react";

const previews = {
  "focus-timer": FocusTimer,
  "notification-stack": NotificationStack,
  "record-library": RecordLibrary,
};

export function ProjectPreview({ slug, compare = false }: { slug: WalkthroughSlug; compare?: boolean }) {
  const Preview = previews[slug];
  const [animated, setAnimated] = useState(true);

  return (
    <div className="project-preview">
      {compare && (
        <label className="project-motion-toggle">
          <input type="checkbox" checked={animated} onChange={(event) => setAnimated(event.target.checked)} />
          Enable animation
        </label>
      )}
      <Preview animated={animated} />
    </div>
  );
}
