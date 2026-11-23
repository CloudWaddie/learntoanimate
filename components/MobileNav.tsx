"use client";

import { usePathname, useRouter } from "next/navigation";
import { modules } from "@/lib/content";
import { walkthroughs } from "@/lib/walkthroughs";

export function MobileNav() {
  const router = useRouter();
  const pathname = usePathname().replace(/\/$/, "");

  return (
    <nav aria-label="Course navigation" className="mobile-lesson-nav">
      <label htmlFor="lesson-select">Course</label>
      <select
        id="lesson-select"
        value={pathname}
        onChange={(e) => router.push(e.target.value)}
      >
        {pathname === "/course" && <option value="/course">Course overview</option>}
        {modules.map((m) => (
          <optgroup key={m.slug} label={`${m.number}. ${m.title}`}>
            {m.lessons.map((l) => (
              <option key={l.slug} value={`/course/${m.slug}/${l.slug}`}>
                {l.title}
              </option>
            ))}
          </optgroup>
        ))}
        <optgroup label="Walkthroughs">
          {walkthroughs.map((project) => (
            <option key={project.slug} value={`/course/walkthroughs/${project.slug}`}>{project.title}</option>
          ))}
        </optgroup>
      </select>
    </nav>
  );
}
