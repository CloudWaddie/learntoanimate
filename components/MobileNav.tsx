"use client";

import { usePathname, useRouter } from "next/navigation";
import { modules } from "@/lib/content";
import { Wordmark } from "@/components/Wordmark";

export function MobileNav() {
  const router = useRouter();
  const pathname = usePathname().replace(/\/$/, "");

  return (
    <nav aria-label="Course navigation" className="flex items-center gap-3 border-b border-line bg-surface px-3 py-3 sm:px-5 lg:hidden">
      <Wordmark />
      <select
        value={pathname}
        onChange={(e) => router.push(e.target.value)}
        aria-label="Jump to lesson"
        className="ml-auto min-w-0 max-w-56 flex-1 rounded-sm border border-line-strong bg-surface px-1 py-2 text-xs text-body"
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
      </select>
    </nav>
  );
}
