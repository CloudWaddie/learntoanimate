"use client";

import { AnimatePresence, LayoutGroup, MotionConfig, motion, useIsPresent, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import "./record-library.css";

const records = [
  { id: "breakwater", title: "Breakwater", artist: "Isabel Reyes", style: "Ambient", year: "2024", tracks: [["Sea Glass", "4:18"], ["Harbour Lights", "5:02"], ["Low Tide", "3:40"]] },
  { id: "soft-static", title: "Soft Static", artist: "Western Signal", style: "Electronic", year: "2025", tracks: [["FM Relay", "3:12"], ["Soft Static", "4:41"], ["Dead Air", "2:56"]] },
  { id: "blue-hour", title: "Blue Hour", artist: "Midnight Cinema", style: "Modern jazz", year: "2024", tracks: [["First Light", "4:55"], ["Passing Trains", "6:21"], ["Blue Hour", "5:03"]] },
];

type RecordItem = (typeof records)[number];
const spring = { type: "spring", stiffness: 420, damping: 35 } as const;

function Cover({ record, animated }: { record: RecordItem; animated: boolean }) {
  return <motion.span className="record-cover" data-record={record.id} layoutId={animated ? `cover-${record.id}` : undefined} style={{ borderRadius: 7 }} aria-hidden="true" />;
}

function RecordDetail({ record, close, animated }: { record: RecordItem; close: () => void; animated: boolean }) {
  const present = useIsPresent();
  const reduced = useReducedMotion();
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (present) closeButton.current?.focus({ preventScroll: true });
  }, [present]);
  const duration = animated ? 0.16 : 0;

  return (
    <motion.section className="record-detail" aria-label={record.title} inert={!present}>
      <motion.div className="record-detail-background" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration }} />
      <Cover record={record} animated={animated} />
      <motion.div
        className="record-detail-content"
        initial={{ opacity: 0, y: reduced || !animated ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration, delay: animated && present && !reduced ? 0.07 : 0 }}
      >
        <div className="record-detail-heading">
          <div>
            <strong>{record.title}</strong>
            <span>{record.artist} · {record.year}</span>
          </div>
          <button ref={closeButton} type="button" onClick={close} aria-label="Close record">×</button>
        </div>
        <ol className="record-tracks" aria-label="Tracks">
          {record.tracks.map(([track, length]) => (
            <li key={track}><span>{track}</span><time>{length}</time></li>
          ))}
        </ol>
      </motion.div>
    </motion.section>
  );
}

export default function RecordLibrary({ animated = true }: { animated?: boolean }) {
  const id = useId();
  const [selected, setSelected] = useState<RecordItem | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!selected) trigger.current?.focus({ preventScroll: true });
  }, [selected]);

  return (
    <MotionConfig transition={spring} reducedMotion="user">
      <LayoutGroup id={id}>
        <div className="record-demo" onKeyDown={(event) => {
          if (event.key === "Escape" && selected) {
            event.stopPropagation();
            setSelected(null);
          }
        }}>
          <div className="record-shelf" inert={selected !== null}>
            <div className="record-shelf-heading"><strong>Record library</strong><span>{records.length} releases</span></div>
            <ul className="record-releases">
              {records.map((record) => (
                <li key={record.id}>
                  <button type="button" onClick={(event) => {
                    trigger.current = event.currentTarget;
                    setSelected(record);
                  }}>
                    <Cover record={record} animated={animated} />
                    <strong>{record.title}</strong>
                    <span className="record-genre">{record.style}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <AnimatePresence initial={false}>
            {selected && <RecordDetail key={selected.id} record={selected} animated={animated} close={() => setSelected(null)} />}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
