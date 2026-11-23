"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { modules, totalLessons } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export function Sidebar() {
  const pathname = usePathname();
  const { mounted, completed } = useProgress();
  const pct = mounted ? Math.round((completed.size / totalLessons) * 100) : 0;

  return (
    <aside className="w-72 shrink-0 border-r border-line h-screen sticky top-0 overflow-y-auto flex flex-col bg-surface/50">
      <div className="px-5 pt-6 pb-4">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(255,122,69,0.8)]" />
          <span className="font-semibold tracking-tight text-[15px]">
            Learn to Animate
          </span>
        </Link>
        <div className="mt-5">
          <div className="flex items-baseline justify-between text-[11px] text-white/40 mb-1.5">
            <span>Progress</span>
            <span>
              {mounted ? completed.size : 0}/{totalLessons} · {pct}%
            </span>
          </div>
          <div className="h-1 rounded-full bg-white/8 overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 pb-8">
        {modules.map((m) => (
          <div key={m.slug} className="mt-5 first:mt-2">
            <div className="px-2 mb-1.5 text-[11px] uppercase tracking-[0.14em] text-white/35 font-medium">
              {m.number}. {m.title}
            </div>
            <ul>
              {m.lessons.map((l) => {
                const href = `/course/${m.slug}/${l.slug}`;
                const active = pathname === href;
                const done = mounted && completed.has(href);
                return (
                  <li key={l.slug}>
                    <Link
                      href={href}
                      className={`group flex items-center gap-2.5 rounded-lg px-2 py-[7px] text-[13.5px] transition-colors ${
                        active
                          ? "bg-accent-soft text-accent"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] transition-colors ${
                          done
                            ? "border-mint/60 bg-mint/15 text-mint"
                            : active
                              ? "border-accent/60 text-accent"
                              : "border-white/15 text-transparent group-hover:border-white/30"
                        }`}
                      >
                        ✓
                      </span>
                      <span className="truncate">{l.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-line px-5 py-4 text-[11px] text-white/30">
        Inspired by the craft of{" "}
        <a
          href="https://emilkowal.ski"
          className="underline decoration-white/20 underline-offset-2 hover:text-white/60"
        >
          emilkowal.ski
        </a>
      </div>
    </aside>
  );
}
