"use client";

import Link from "next/link";
import { CourseArticle } from "@/components/CourseArticle";
import { adjacentLessons, allLessons, totalLessons } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export function LessonChrome({
  moduleSlug,
  lessonSlug,
  title,
  minutes,
  description,
  moduleTitle,
  moduleNumber,
  children,
}: {
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  minutes: number;
  description: string;
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
    <CourseArticle
      title={title}
      description={description}
      eyebrow={`${moduleTitle} · Lesson ${index + 1} of ${totalLessons} · ${minutes} min`}
      footer={
      <>
        <div className="lesson-complete">
          <span>{done ? "Lesson complete. Nice work." : "Finished this lesson?"}</span>
          <button
            type="button"
            onClick={() => toggle(id)}
            aria-pressed={done}
            className={done ? "button-secondary text-mint" : "button-primary"}
          >
            {done ? "✓ Completed" : "Mark lesson complete"}
          </button>
        </div>
        <nav aria-label="Lesson navigation">
          {prev ? (
            <Link href={`/course/${prev.module.slug}/${prev.lesson.slug}`}>
              <span>← Previous</span>
              <strong>{prev.lesson.title}</strong>
            </Link>
          ) : <span />}
          <Link className="text-right" href={next ? `/course/${next.module.slug}/${next.lesson.slug}` : "/#syllabus"}>
            <span>{next ? "Next →" : "Course overview →"}</span>
            <strong>{next ? next.lesson.title : "Syllabus"}</strong>
          </Link>
        </nav>
      </>
    }>
      {children}
    </CourseArticle>
  );
}
