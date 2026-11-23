"use client";

import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import "./notification-stack.css";

const messages = [
  { tone: "success", title: "Export complete", detail: "The cover artwork is ready to download.", icon: "✓" },
  { tone: "progress", title: "Mix uploaded", detail: "Your collaborator can listen now.", icon: "↑" },
  { tone: "notice", title: "New comment", detail: "Isabel left a note on the mix.", icon: "●" },
] as const;

type Notice = (typeof messages)[number] & { id: number; leaving?: boolean };
const initialNotices = messages.map((message, id) => ({ ...message, id }));

export default function NotificationStack({ animated = true }: { animated?: boolean }) {
  const listId = useId();
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const next = useRef(messages.length);
  const exitTimers = useRef(new Set<number>());
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timers = exitTimers.current;
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  function add() {
    const id = next.current++;
    const notice = { ...messages[id % messages.length], id };
    setNotices((previous) => [notice, ...previous].slice(0, 3));
    setMessage(`${notice.title}. ${notice.detail}`);
  }

  function dismiss(notice: Notice) {
    toggle.current?.focus();
    setMessage(`${notice.title} dismissed.`);
    if (!animated || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setNotices((previous) => previous.filter((entry) => entry.id !== notice.id));
      return;
    }
    setNotices((previous) => previous.map((entry) => entry.id === notice.id ? { ...entry, leaving: true } : entry));
    const timer = window.setTimeout(() => {
      setNotices((previous) => previous.filter((entry) => entry.id !== notice.id));
      exitTimers.current.delete(timer);
    }, 220);
    exitTimers.current.add(timer);
  }

  return (
    <div className="notice-demo" data-motion={animated}>
      <div className="notice-stage">
        <ol id={listId} className="notice-stack" data-expanded={expanded}>
          {notices.map((notice, index) => (
            <li
              key={notice.id}
              className="notice-card"
              data-tone={notice.tone}
              data-leaving={Boolean(notice.leaving)}
              style={{ "--depth": index } as CSSProperties}
              inert={notice.leaving || (!expanded && index > 0)}
            >
              <span className="notice-icon" aria-hidden="true">{notice.icon}</span>
              <span className="notice-copy"><strong>{notice.title}</strong><span>{notice.detail}</span></span>
              <button type="button" aria-label={`Dismiss ${notice.title.toLowerCase()}`} onClick={() => dismiss(notice)}>×</button>
            </li>
          ))}
        </ol>
        {notices.length === 0 && <span className="notice-empty">All caught up</span>}
      </div>
      <div className="notice-controls">
        <button type="button" onClick={add}>Add notification</button>
        <button ref={toggle} type="button" aria-expanded={expanded} aria-controls={listId} onClick={() => setExpanded((value) => !value)}>
          {expanded ? "Collapse stack" : "Expand stack"}
        </button>
      </div>
      <span className="notice-announcement" role="status">{message}</span>
    </div>
  );
}
