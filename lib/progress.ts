"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const KEY = "lta-progress-v1";
const listeners = new Set<() => void>();

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function write(ids: string[]) {
  // Storage can be unavailable (blocked cookies/private mode) — still update
  // subscribers so the UI reflects this session's choice.
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  // 'storage' fires in other tabs so progress stays in sync across them
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function useProgress() {
  const completed = useSyncExternalStore(
    subscribe,
    () => JSON.stringify(read()),
    () => "[]",
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const set: Set<string> = new Set(JSON.parse(completed));

  const toggle = useCallback((id: string) => {
    const cur = new Set(read());
    if (cur.has(id)) cur.delete(id);
    else cur.add(id);
    write([...cur]);
  }, []);

  return { mounted, completed: set, toggle };
}
