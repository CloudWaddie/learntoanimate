import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { TimingFigure } from "@/components/TimingFigure";
import { modules, totalLessons } from "@/lib/content";

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <Wordmark />
        <nav aria-label="Main navigation">
          <a href="#syllabus">Syllabus</a>
          <Link href="/course/craft/capstone">Final project</Link>
        </nav>
      </header>

      <main id="main">
        <section className="landing-hero" aria-labelledby="landing-title">
          <div>
            <div className="eyebrow hero-kicker">A practical course in web motion</div>
            <h1 id="landing-title">Learn to<br />animate.</h1>
            <p>Design motion that makes interfaces easier to use. Start with timing and easing, then build and test an animated issue tracker in React.</p>
            <Link className="button-primary" href={`/course/${modules[0].slug}/${modules[0].lessons[0].slug}`}>
              Start the course <span aria-hidden="true">↗</span>
            </Link>
            <p className="hero-prereq">Basic HTML and CSS. React from module 03.</p>
          </div>
          <TimingFigure />
        </section>

        <section id="syllabus" className="syllabus" aria-labelledby="syllabus-title">
          <header className="syllabus-heading">
            <h2 id="syllabus-title">Syllabus</h2>
            <span className="eyebrow">{modules.length} modules / {totalLessons} lessons</span>
          </header>
          {modules.map((module) => (
            <section className="syllabus-module" key={module.slug}>
              <div className="syllabus-intro">
                <span className="eyebrow module-number">{String(module.number).padStart(2, "0")}</span>
                <div>
                  <h3>{module.title}</h3>
                  <p>{module.tagline}</p>
                </div>
              </div>
              <ul>
                {module.lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    <Link href={`/course/${module.slug}/${lesson.slug}`}>
                      <span>{lesson.title}</span>
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </section>
      </main>
      <footer className="landing-footer">
        <Wordmark />
        <a href="#syllabus">Back to syllabus ↑</a>
      </footer>
    </div>
  );
}
