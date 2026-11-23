"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/Wordmark";
import { allLessons, modules, totalLessons } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export function Sidebar() {
  const pathname = usePathname().replace(/\/$/, "");
  const { mounted, completed } = useProgress();
  const count = mounted
    ? allLessons.filter(({ module, lesson }) => completed.has(`/course/${module.slug}/${lesson.slug}`)).length
    : 0;

  return (
    <aside className="sticky top-0 hidden h-dvh flex-col overflow-y-auto border-r border-line bg-surface lg:flex">
      <div className="border-b border-line px-5 py-5">
        <Wordmark />
        <div className="mt-5 flex items-baseline justify-between gap-2 text-xs text-muted">
          <span id="progress-label">Course progress</span>
          <span className="font-mono">{count} / {totalLessons}</span>
        </div>
        <div
          className="mt-2 h-1 overflow-hidden bg-surface-2"
          role="progressbar"
          aria-labelledby="progress-label"
          aria-valuenow={count}
          aria-valuemax={totalLessons}
        >
          <div className="course-progress-value h-full bg-accent transition-[width] duration-300" style={{ width: `${count / totalLessons * 100}%` }} />
        </div>
      </div>

      <nav className="px-3 py-4" aria-label="Course lessons">
        {modules.map((module) => (
          <div key={module.slug} className="mb-4">
            <div className="eyebrow mb-1 px-2.5">
              {String(module.number).padStart(2, "0")} / {module.title}
            </div>
            <ul>
              {module.lessons.map((lesson) => {
                const href = `/course/${module.slug}/${lesson.slug}`;
                const active = pathname === href;
                const done = mounted && completed.has(href);
                return (
                  <li key={lesson.slug}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-baseline gap-2 rounded-sm px-2.5 py-1.5 text-[13px] hover:bg-stage ${active ? "bg-accent-soft font-semibold text-accent" : "text-body"}`}
                    >
                      <span className="w-3 shrink-0 text-xs text-mint" aria-hidden="true">{done ? "✓" : ""}</span>
                      {lesson.title}
                      {done && <span className="sr-only"> (complete)</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
