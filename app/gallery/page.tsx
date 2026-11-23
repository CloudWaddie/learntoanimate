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
        <header className="gallery-header">
          <h1>Component gallery</h1>
          <p>Try the finished interactions, then follow a walkthrough to build the animation yourself.</p>
        </header>
        {walkthroughs.map((project) => (
          <section className="gallery-item" key={project.slug} aria-labelledby={project.slug}>
            <ProjectPreview slug={project.slug} />
            <div className="gallery-item-heading">
              <h2 id={project.slug}>{project.title}</h2>
              <Link className="button-secondary" href={"/course/walkthroughs/" + project.slug + "/"}>
                Build it<span className="sr-only">: {project.title}</span> <span aria-hidden="true">→</span>
              </Link>
            </div>
            <p>{project.description}</p>
            <ul className="project-tags" aria-label="Techniques">
              {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </section>
        ))}
        <footer className="landing-footer">
          <Wordmark />
          <nav aria-label="Footer">
            <Link href="/">Home</Link>
            <Link href="/#syllabus">Syllabus</Link>
            <Link href="/course/foundations/why-motion/">First lesson</Link>
          </nav>
        </footer>
      </main>
    </div>
  );
}
