"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { adjacentLessons, allLessons, totalLessons } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export function LessonChrome({
  moduleSlug,
  lessonSlug,
  title,
  minutes,
  moduleTitle,
  moduleNumber,
  children,
}: {
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  minutes: number;
  moduleTitle: string;
  moduleNumber: number;
  children: React.ReactNode;
}) {
  const { prev, next } = adjacentLessons(moduleSlug, lessonSlug);
  const index = allLessons.findIndex(({ module, lesson }) => module.slug === moduleSlug && lesson.slug === lessonSlug);
  const { mounted, completed, toggle } = useProgress();
  const id = `/course/${moduleSlug}/${lessonSlug}`;
  const done = mounted && completed.has(id);
  const content = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    if (!content.current) return;
    const used = new Set<string>();
    const headings = Array.from(content.current.querySelectorAll("h2"), (heading) => {
      const title = heading.textContent?.trim() ?? "";
      const base = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
      let anchor = base;
      for (let suffix = 2; used.has(anchor); suffix++) anchor = `${base}-${suffix}`;
      heading.id = anchor;
      used.add(anchor);
      return { id: anchor, title };
    });
    setSections(headings);
    const hash = window.location.hash.slice(1);
    if (used.has(hash)) document.getElementById(hash)?.scrollIntoView();
  }, [id]);

  return (
    <div className="lesson-frame">
      <article className="course-article">
        <header className="lesson-header">
          <h1>{title}</h1>
        </header>

        <div ref={content} className="prose-course">{children}</div>

        <footer className="lesson-footer">
          <div className="lesson-meta">
            <span>Module {String(moduleNumber).padStart(2, "0")} · {moduleTitle}</span>
            <span>Lesson {index + 1} of {totalLessons} · {minutes} min</span>
          </div>
          <button
            type="button"
            onClick={() => toggle(id)}
            aria-pressed={done}
            className={done ? "button-secondary text-mint" : "button-primary"}
          >
            {done ? "✓ Completed" : "Mark lesson complete"}
          </button>
          <nav aria-label="Lesson navigation">
            {prev ? (
              <Link href={`/course/${prev.module.slug}/${prev.lesson.slug}`}>
                <span className="eyebrow block">← Previous</span>
                <strong className="text-sm font-semibold">{prev.lesson.title}</strong>
              </Link>
            ) : <span />}
            <Link className="text-right" href={next ? `/course/${next.module.slug}/${next.lesson.slug}` : "/#syllabus"}>
              <span className="eyebrow block">{next ? "Next →" : "Course overview →"}</span>
              <strong className="text-sm font-semibold">{next ? next.lesson.title : "Syllabus"}</strong>
            </Link>
          </nav>
        </footer>
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
