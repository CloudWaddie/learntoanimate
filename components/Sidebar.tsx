"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { allLessons, modules, totalLessons } from "@/lib/content";
import { useProgress } from "@/lib/progress";
import { walkthroughs } from "@/lib/walkthroughs";

type Mode = "lessons" | "walkthroughs";

export function Sidebar() {
  const pathname = usePathname().replace(/\/$/, "");
  const [choice, setChoice] = useState<{ path: string; mode: Mode }>();
  const tab = choice?.path === pathname ? choice.mode
    : pathname.startsWith("/course/walkthroughs/") ? "walkthroughs" : "lessons";
  const { mounted, completed } = useProgress();
  const count = mounted
    ? allLessons.filter(({ module, lesson }) => completed.has(`/course/${module.slug}/${lesson.slug}`)).length
    : 0;

  return (
    <aside className="lesson-sidebar">
      <div className="sidebar-switch" role="group" aria-label="Course navigation mode">
        <button type="button" aria-pressed={tab === "lessons"} onClick={() => setChoice({ path: pathname, mode: "lessons" })}>Fundamentals</button>
        <button type="button" aria-pressed={tab === "walkthroughs"} onClick={() => setChoice({ path: pathname, mode: "walkthroughs" })}>Walkthroughs</button>
      </div>

      <nav aria-label={tab === "lessons" ? "Course lessons" : "Course walkthroughs"}>
        {tab === "lessons" ? modules.map((module) => (
          <div key={module.slug} className="sidebar-module">
            <div className="sidebar-module-heading">
              <span>Module {String(module.number).padStart(2, "0")}</span>
              <strong>{module.title}</strong>
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
                      className="sidebar-link"
                    >
                      {lesson.title}
                      {done && <span className="ml-auto shrink-0 text-mint" aria-hidden="true">✓</span>}
                      {done && <span className="sr-only"> (complete)</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )) : (
          <div className="sidebar-module">
            <div className="sidebar-module-heading"><strong>Project walkthroughs</strong></div>
            <ul>
              {walkthroughs.map(({ slug, title }) => {
                const href = `/course/walkthroughs/${slug}`;
                return (
                  <li key={href}>
                    <Link className="sidebar-link" href={href} aria-current={pathname === href ? "page" : undefined}>
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
      <div className="sidebar-progress">
        <div className="flex items-baseline justify-between gap-2 text-xs text-muted">
          <span id="progress-label">Course progress</span>
          <span>{count} / {totalLessons}</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-labelledby="progress-label" aria-valuenow={count} aria-valuemax={totalLessons}>
          <div className="course-progress-value h-full bg-accent transition-[width] duration-300" style={{ width: `${count / totalLessons * 100}%` }} />
        </div>
      </div>
    </aside>
  );
}
