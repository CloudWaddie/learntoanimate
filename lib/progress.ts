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
  window.localStorage.setItem(KEY, JSON.stringify(ids));
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
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
