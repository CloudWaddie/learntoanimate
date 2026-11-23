"use client";

import { useEffect, useId, useRef, useState, type ComponentType, type ReactNode } from "react";
import "./issue-desk.css";

const initialIssues = [
  { id: "UI-104", title: "Keep filters on refresh", priority: 2, resolved: false, owner: "Sam Lee", summary: "Returning to the board should restore the last selected status and sort order." },
  { id: "UI-103", title: "Add empty state for search", priority: 3, resolved: false, owner: "Jamie Chen", summary: "Show a clear message and a way to clear the query when there are no matching results." },
  { id: "UI-102", title: "Fix keyboard shortcut conflict", priority: 1, resolved: false, owner: "Alex Reed", summary: "The search shortcut currently fires while typing into the comment field. Ignore it when a text input owns focus." },
  { id: "UI-101", title: "Update the release notes", priority: 3, resolved: true, owner: "Sam Lee", summary: "Document the new search filters and link to the keyboard shortcuts guide." },
];

export type IssueRowProps = { children: ReactNode };
export type IssueDetailsProps = {
  open: boolean;
  id: string;
  headingId: string;
  children: ReactNode;
};

function StaticIssueRow({ children }: IssueRowProps) {
  return <li>{children}</li>;
}

function StaticIssueDetails({ open, id, headingId, children }: IssueDetailsProps) {
  return open ? (
    <section id={id} aria-labelledby={headingId} className="issue-details">
      {children}
    </section>
  ) : null;
}

export default function IssueDesk({
  IssueRow = StaticIssueRow,
  Details = StaticIssueDetails,
}: {
  IssueRow?: ComponentType<IssueRowProps>;
  Details?: ComponentType<IssueDetailsProps>;
}) {
  const [issues, setIssues] = useState(initialIssues);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recent");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const panelId = useId();
  const headingId = useId();
  const focusHeading = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const filterRef = useRef<HTMLSelectElement>(null);
  const rowRefs = useRef(new Map<string, HTMLButtonElement>());

  const openCount = issues.filter((issue) => !issue.resolved).length;
  const selected = issues.find((issue) => issue.id === selectedId);
  const visible = issues.filter((issue) => filter === "all" || issue.resolved === (filter === "resolved"));
  if (sort === "priority") visible.sort((a, b) => a.priority - b.priority);

  useEffect(() => {
    if (focusHeading.current) {
      headingRef.current?.focus();
      focusHeading.current = false;
    }
  }, [selectedId]);

  function closeDetails() {
    if (!selectedId) return;
    const returnTarget = rowRefs.current.get(selectedId) ?? filterRef.current;
    returnTarget?.focus();
    setSelectedId(null);
  }

  function toggleStatus() {
    if (!selected) return;
    setIssues((current) => current.map((issue) => issue.id === selected.id ? { ...issue, resolved: !issue.resolved } : issue));
    setAnnouncement(`${selected.id} ${selected.resolved ? "reopened" : "resolved"}.`);
  }

  return (
    <div className="issue-desk" onKeyDown={(event) => {
      if (event.key === "Escape" && selected) closeDetails();
    }}>
      <header className="issue-toolbar">
        <div className="issue-counts">
          <strong>{visible.length} {visible.length === 1 ? "issue" : "issues"}</strong>
          <span>{openCount} open</span>
        </div>
        <div className="issue-controls">
          <label>Status
            <select ref={filterRef} value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="resolved">Resolved</option>
            </select>
          </label>
          <label>Sort
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="recent">Newest</option>
              <option value="priority">Priority</option>
            </select>
          </label>
        </div>
      </header>

      <div className="issue-workspace">
        <ul className="issue-rows" aria-label="Issues">
          {visible.map((issue) => (
            <IssueRow key={issue.id}>
              <button
                type="button"
                ref={(element) => {
                  if (element) rowRefs.current.set(issue.id, element);
                  else rowRefs.current.delete(issue.id);
                }}
                aria-expanded={selectedId === issue.id}
                aria-controls={selectedId === issue.id ? panelId : undefined}
                onClick={(event) => {
                  if (selectedId === issue.id) closeDetails();
                  else {
                    focusHeading.current = event.detail === 0;
                    setSelectedId(issue.id);
                  }
                }}
              >
                <span className="issue-id">{issue.id}</span>
                <span className="issue-row-title">{issue.title}</span>
                <span className="issue-priority" data-priority={issue.priority}>P{issue.priority}</span>
              </button>
            </IssueRow>
          ))}
          {visible.length === 0 && <li className="issue-empty">No issues match this filter.</li>}
        </ul>
        <div className="issue-panel-slot">
          <div className="issue-placeholder">Select an issue to see its details.</div>
          <Details open={Boolean(selected)} id={panelId} headingId={headingId}>
            {selected && (
              <>
                <div className="issue-detail-header">
                  <span className="issue-id">{selected.id}</span>
                  <button className="issue-close" type="button" onClick={closeDetails} aria-label="Close issue details">×</button>
                </div>
                <h3 className="issue-detail-title" id={headingId} ref={headingRef} tabIndex={-1}>{selected.title}</h3>
                <div className="issue-detail-meta">{selected.resolved ? "Resolved" : "Open"} · {selected.owner}</div>
                <p>{selected.summary}</p>
                <button className="issue-action" type="button" onClick={toggleStatus}>{selected.resolved ? "Reopen issue" : "Resolve issue"}</button>
              </>
            )}
          </Details>
        </div>
      </div>
      <div className="issue-announcement" role="status">{announcement}</div>
    </div>
  );
}
