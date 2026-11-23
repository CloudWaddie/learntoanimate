import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";

export function LandingNav({ gallery = false }: { gallery?: boolean }) {
  return (
    <header className="landing-header">
      <Wordmark />
      <nav aria-label="Main navigation">
        <Link href="/gallery/" aria-current={gallery ? "page" : undefined}>Gallery</Link>
        <Link href="/#syllabus">Syllabus</Link>
        <Link className="button-gold" href="/course/foundations/why-motion/">Start learning</Link>
      </nav>
    </header>
  );
}
