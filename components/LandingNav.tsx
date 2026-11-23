import Link from "next/link";

export function LandingNav({ gallery = false }: { gallery?: boolean }) {
  return (
    <header className="landing-header">
      <nav aria-label="Main navigation">
        <Link href={gallery ? "/" : "/gallery/"}>{gallery ? "Home" : "Gallery"}</Link>
        <Link href="/#syllabus">Syllabus</Link>
        <Link className="button-gold" href="/course/foundations/why-motion/">Start learning</Link>
      </nav>
    </header>
  );
}
