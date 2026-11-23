import type { Metadata } from "next";
import Link from "next/link";
import { LandingNav } from "@/components/LandingNav";
import { ProjectPreview } from "@/components/ProjectPreview";
import { Wordmark } from "@/components/Wordmark";
import { walkthroughs } from "@/lib/walkthroughs";

export const metadata: Metadata = {
  title: "Component gallery — Learn to Animate",
  description: "Try a spring-driven timer, an animated notification stack, and a shared-layout record browser.",
};

export default function Gallery() {
  return (
    <div className="landing">
      <LandingNav gallery />
      <main id="main" className="landing-column project-gallery">
        <header>
          <h1>Component gallery</h1>
          <p>Try the finished interactions, then follow a walkthrough to build the animation yourself.</p>
        </header>
        {walkthroughs.map((project) => (
          <section key={project.slug} aria-labelledby={project.slug}>
            <h2 id={project.slug}>{project.title}</h2>
            <p>{project.description}</p>
            <ProjectPreview slug={project.slug} />
            <Link className="landing-text-link" href={`/course/walkthroughs/${project.slug}/`}>
              Build the {project.title.toLowerCase()} <span aria-hidden="true">→</span>
            </Link>
          </section>
        ))}
        <footer className="landing-footer"><Wordmark /><Link href="/#syllabus">Syllabus</Link></footer>
      </main>
    </div>
  );
}
