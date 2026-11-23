import Link from "next/link";
import type { ReactNode } from "react";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const stamps: { name: string; shape: string; href: string; icon: ReactNode }[] = [
  {
    name: "CSS transitions",
    shape: "lines",
    href: "/course/css/transitions/",
    icon: <><path {...stroke} d="M4 19C11 19 9 5 20 5" /><circle cx="4" cy="19" r="2.2" fill="currentColor" /><circle cx="20" cy="5" r="2.2" fill="currentColor" /></>,
  },
  {
    name: "What motion is for",
    shape: "idea",
    href: "/course/foundations/why-motion/",
    icon: <path fill="currentColor" d="M12 2.5l2 7.5 7.5 2-7.5 2-2 7.5-2-7.5-7.5-2 7.5-2z" />,
  },
  {
    name: "Gestures",
    shape: "gesture",
    href: "/course/motion/gestures/",
    icon: <path fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" d="M5 4l14.5 6-6 2.2L11 18.5z" />,
  },
  {
    name: "Tuning springs",
    shape: "spring",
    href: "/course/foundations/springs/",
    icon: <path {...stroke} d="M3 12h2.5l1.5-6 3 12 3-12 3 12 1.5-6H21" />,
  },
  {
    name: "Choosing a duration",
    shape: "clock",
    href: "/course/foundations/duration/",
    icon: <><circle {...stroke} cx="12" cy="13.5" r="7.5" /><path {...stroke} d="M12 13.5V9.5M9.5 3h5M12 3v3" /></>,
  },
  {
    name: "Animating React state",
    shape: "code",
    href: "/course/motion/motion-basics/",
    icon: <path {...stroke} d="M8.5 7.5L4 12l4.5 4.5M15.5 7.5L20 12l-4.5 4.5" />,
  },
];

export function MotionStamps() {
  return (
    <div className="motion-stamps" role="group" aria-label="Explore course topics">
      {stamps.map(({ name, shape, href, icon }, index) => (
        <Link key={shape} href={href} className={"stamp stamp-" + shape} aria-label={name} title={name} style={{ "--i": index } as React.CSSProperties}>
          <span className="stamp-surface" aria-hidden="true">
            <svg className="stamp-mark" viewBox="0 0 24 24">{icon}</svg>
          </span>
        </Link>
      ))}
    </div>
  );
}
