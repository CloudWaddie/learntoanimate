"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

let id = 0;

export function ToastPlayground() {
  const [toasts, setToasts] = useState<{ id: number; label: string }[]>([]);

  const push = () => {
    const tid = ++id;
    setToasts((t) => [...t.slice(-3), { id: tid, label: `Toast #${tid}` }]);
  };

  return (
    <div className="p-4">
      <div className="relative h-56 overflow-hidden rounded-xl bg-stage">
        <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.95, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 60, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="flex items-center justify-between rounded-xl border border-line bg-surface-2 px-4 py-3"
              >
                <div className="flex items-center gap-2.5 text-[13px] text-body">
                  <span className="h-2 w-2 rounded-full bg-mint" />
                  {t.label}
                </div>
                <button
                  onClick={() => setToasts((ts) => ts.filter((x) => x.id !== t.id))}
                  className="text-[11px] text-muted hover:text-ink"
                >
                  dismiss
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <button
          onClick={push}
          className="absolute left-4 top-4 rounded-lg border border-line bg-surface-2 px-3.5 py-1.5 text-[12px] font-medium text-body transition-colors hover:border-line-strong hover:text-ink"
        >
          + Add toast
        </button>
      </div>
      <p className="mt-3 text-[11.5px] leading-relaxed text-muted">
        Without AnimatePresence, a dismissed toast vanishes instantly. With it,
        React waits for the exit animation before unmounting.
      </p>
    </div>
  );
}
