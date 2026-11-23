"use client";

import { createContext, useContext, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
import IssueDesk, { type IssueDetailsProps, type IssueRowProps } from "@/public/projects/issue-desk/IssueDesk";

const reducedMotion = createContext(false);
const query = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const preference = window.matchMedia(query);
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}

function AnimatedRow({ children }: IssueRowProps) {
  const reduce = useContext(reducedMotion);
  return (
    <motion.li layout={reduce ? false : "position"} transition={{ type: "spring", stiffness: 470, damping: 36 }}>
      {children}
    </motion.li>
  );
}

function Panel({ id, headingId, children }: Omit<IssueDetailsProps, "open">) {
  const present = useIsPresent();
  const reduce = useContext(reducedMotion);

  return (
    <motion.section
      id={id}
      aria-labelledby={headingId}
      className="issue-details"
      inert={!present}
      initial={{ opacity: 0, x: reduce ? 0 : 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: reduce ? 0 : 4, transition: { duration: reduce ? 0 : 0.12 } }}
      transition={{ duration: reduce ? 0 : 0.18, ease: "easeOut" }}
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

export function IssueDeskReference() {
  const [reduce, setReduce] = useState(false);
  const osPrefersReduced = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  return (
    <>
      <div className="flex justify-end border-b border-line bg-stage px-4 py-2.5">
        <label className="inline-flex items-center gap-2 text-xs font-medium text-body">
          <input type="checkbox" className="accent-accent" checked={reduce || osPrefersReduced} disabled={osPrefersReduced} onChange={(event) => setReduce(event.target.checked)} />
          Reduce motion
        </label>
      </div>
      <reducedMotion.Provider value={reduce || osPrefersReduced}>
        <IssueDesk IssueRow={AnimatedRow} Details={AnimatedDetails} />
      </reducedMotion.Provider>
    </>
  );
}
