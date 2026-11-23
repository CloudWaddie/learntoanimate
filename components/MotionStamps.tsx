import Link from "next/link";

const stamps = [
  { name: "CSS transitions", shape: "lines", mark: "≋", href: "/course/css/transitions/" },
  { name: "What motion is for", shape: "idea", mark: "✦", href: "/course/foundations/why-motion/" },
  { name: "Gestures", shape: "gesture", mark: "➤", href: "/course/motion/gestures/" },
  { name: "Tuning springs", shape: "spring", mark: "∿", href: "/course/foundations/springs/" },
  { name: "Choosing a duration", shape: "clock", mark: "", href: "/course/foundations/duration/" },
  { name: "Animating React state", shape: "code", mark: "‹/›", href: "/course/motion/motion-basics/" },
];

export function MotionStamps() {
  return (
    <div className="motion-stamps" aria-label="Explore course topics">
      {stamps.map(({ name, shape, mark, href }) => (
        <Link key={shape} href={href} className={`stamp stamp-${shape}`} aria-label={name} title={name}>
          <span className="stamp-surface" aria-hidden="true">
            <span className="stamp-mark">{mark}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
