"use client";

import Link from "next/link";
import { adjacentLessons, allLessons, totalLessons } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export function LessonChrome({
  moduleSlug,
  lessonSlug,
  title,
  description,
  minutes,
  moduleTitle,
  moduleNumber,
  children,
}: {
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  description: string;
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

  return (
    <article className="course-article">
      <header className="lesson-header">
        <div className="eyebrow text-accent">Module {String(moduleNumber).padStart(2, "0")} / {moduleTitle}</div>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="lesson-meta eyebrow">
          <span>Lesson {index + 1} of {totalLessons}</span>
          <span>~{minutes} min</span>
        </div>
      </header>

      <div className="prose-course">{children}</div>

      <footer className="lesson-footer">
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
  );
}
