"use client";

import Link from "next/link";
import { adjacentLessons } from "@/lib/content";
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
  const { mounted, completed, toggle } = useProgress();
  const id = `/course/${moduleSlug}/${lessonSlug}`;
  const done = mounted && completed.has(id);

  return (
    <article className="mx-auto max-w-[720px] px-6 py-14">
      <div className="text-[12px] uppercase tracking-[0.16em] text-accent/90 font-medium mb-4">
        {moduleNumber}. {moduleTitle}
      </div>
      <h1 className="text-[2.4rem] leading-[1.1] font-bold tracking-tight text-white">
        {title}
      </h1>
      <p className="mt-3 text-[15px] text-white/50 leading-relaxed">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-3 text-[12px] text-white/35">
        <span>{minutes} min read</span>
        <span className="h-1 w-1 rounded-full bg-white/20" />
        <button
          onClick={() => toggle(id)}
          className={`rounded-full border px-3 py-1 transition-colors ${
            done
              ? "border-mint/40 bg-mint/10 text-mint"
              : "border-line text-white/50 hover:border-white/30 hover:text-white"
          }`}
        >
          {done ? "Completed ✓" : "Mark complete"}
        </button>
      </div>

      <div className="mt-10 prose-course">{children}</div>

      <nav className="mt-16 grid grid-cols-2 gap-4 border-t border-line pt-8">
        {prev ? (
          <Link
            href={`/course/${prev.module.slug}/${prev.lesson.slug}`}
            className="group rounded-xl border border-line p-4 transition-colors hover:border-white/25"
          >
            <div className="text-[11px] uppercase tracking-wider text-white/35 mb-1">
              ← Previous
            </div>
            <div className="text-sm font-medium text-white/80 group-hover:text-white">
              {prev.lesson.title}
            </div>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/course/${next.module.slug}/${next.lesson.slug}`}
            className="group rounded-xl border border-line p-4 text-right transition-colors hover:border-white/25"
          >
            <div className="text-[11px] uppercase tracking-wider text-white/35 mb-1">
              Next →
            </div>
            <div className="text-sm font-medium text-white/80 group-hover:text-white">
              {next.lesson.title}
            </div>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
