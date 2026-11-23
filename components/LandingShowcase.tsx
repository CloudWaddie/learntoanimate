"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { previews } from "@/components/ProjectPreview";
import { walkthroughs, type WalkthroughSlug } from "@/lib/walkthroughs";

export function LandingShowcase() {
  const [active, setActive] = useState<WalkthroughSlug>(walkthroughs[0].slug);
  const reduced = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = walkthroughs.findIndex((project) => project.slug === active);
  const project = walkthroughs[index];
  const Preview = previews[active];

  function onKeyDown(event: KeyboardEvent) {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + walkthroughs.length) % walkthroughs.length;
    setActive(walkthroughs[next].slug);
    tabs.current[next]?.focus();
  }

  return (
    <div className="showcase">
      <div className="showcase-tabs" role="tablist" aria-label="Walkthrough components" onKeyDown={onKeyDown}>
        {walkthroughs.map(({ slug, title }, position) => (
          <button
            key={slug}
            ref={(node) => { tabs.current[position] = node; }}
            type="button"
            role="tab"
            id={"showcase-tab-" + slug}
            aria-selected={slug === active}
            aria-controls="showcase-panel"
            tabIndex={slug === active ? 0 : -1}
            onClick={() => setActive(slug)}
          >
            {slug === active && (
              <motion.span
                layoutId="showcase-pill"
                className="showcase-pill"
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38 }}
              />
            )}
            <span>{title}</span>
          </button>
        ))}
      </div>
      <div className="project-preview" role="tabpanel" id="showcase-panel" aria-labelledby={"showcase-tab-" + active}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
          >
            <Preview />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="showcase-foot">
        <p>{project.description}</p>
        <Link className="landing-text-link" href={"/course/walkthroughs/" + project.slug + "/"}>
          Build the {project.title.toLowerCase()} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
