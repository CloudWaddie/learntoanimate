"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export function CourseArticle({
  title,
  children,
  footer,
}: {
  title: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  const content = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    if (!content.current) return;
    const used = new Set<string>();
    const headings = Array.from(content.current.querySelectorAll("h2"), (heading) => {
      const title = heading.textContent?.trim() ?? "";
      const base = heading.id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
      let anchor = base;
      for (let suffix = 2; used.has(anchor); suffix++) anchor = `${base}-${suffix}`;
      heading.id = anchor;
      used.add(anchor);
      return { id: anchor, title };
    });
    setSections(headings);
    const hash = window.location.hash.slice(1);
    if (used.has(hash)) document.getElementById(hash)?.scrollIntoView();
  }, [title]);

  return (
    <div className="lesson-frame">
      <article className="course-article">
        <header className="lesson-header"><h1>{title}</h1></header>
        <div ref={content} className="prose-course">{children}</div>
        <footer className="lesson-footer">{footer}</footer>
      </article>
      {sections.length > 0 && (
        <nav className="lesson-outline" aria-label="On this page">
          <strong>On this page</strong>
          {sections.map((section) => (
            <a href={`#${section.id}`} key={section.id}>{section.title}</a>
          ))}
        </nav>
      )}
    </div>
  );
}
