"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { modules } from "@/lib/content";

export function MobileNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-surface/95 px-4 py-3 backdrop-blur lg:hidden">
      <Link href="/" className="flex shrink-0 items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="text-[13px] font-semibold">Learn to Animate</span>
      </Link>
      <select
        value={pathname}
        onChange={(e) => router.push(e.target.value)}
        aria-label="Jump to lesson"
        className="min-w-0 flex-1 rounded-lg border border-line bg-bg px-2 py-1.5 text-[13px] text-white/80"
      >
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
    </div>
  );
}
