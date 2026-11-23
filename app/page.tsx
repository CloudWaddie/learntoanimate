import Link from "next/link";
import { MotionStamps } from "@/components/MotionStamps";
import { LandingComparison } from "@/components/LandingComparison";
import { TimingFigure } from "@/components/TimingFigure";
import { Wordmark } from "@/components/Wordmark";
import { modules, totalLessons } from "@/lib/content";

const firstLesson = "/course/foundations/why-motion/";

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <nav aria-label="Main navigation">
          <a href="#syllabus">Syllabus</a>
          <Link className="button-gold" href={firstLesson}>Start learning</Link>
        </nav>
      </header>

      <main id="main">
        <section className="landing-hero" aria-labelledby="landing-title">
          <MotionStamps />
          <h1 id="landing-title">How do you make motion<br className="hidden sm:inline" /> feel right?</h1>
          <p>Learn to animate web interfaces through interactive examples, short exercises, and a project you can build.</p>
          <span className="hero-credit"><span aria-hidden="true" /> Learn to Animate</span>
        </section>

        <div className="landing-column">
          <section className="landing-section" aria-labelledby="start-title">
            <h2 id="start-title">Start the course</h2>
            <p>Work through {totalLessons} lessons at your own pace. Start with CSS and bring in React when you’re ready to animate state, exits, and layout.</p>
            <div className="course-invite">
              <span>Begin with <strong>What motion is for</strong></span>
              <Link className="button-gold" href={firstLesson}>Open first lesson</Link>
            </div>
          </section>

          <section className="landing-section" aria-labelledby="comparison-title">
            <h2 id="comparison-title">Try the same interaction two ways</h2>
            <p>Both versions open the same panel. The transition on the left builds speed slowly. The one on the right responds quickly and eases into place. Open both and see which gives you a clearer response.</p>
            <LandingComparison />
          </section>

          <section className="landing-section" aria-labelledby="practice-title">
            <h2 id="practice-title">See what an easing curve does</h2>
            <p>Change the curve and replay the motion. Both runs take 600 milliseconds. Look for when each curve covers most of the distance.</p>
            <TimingFigure />
            <Link className="landing-text-link" href="/course/foundations/easing/">Read the easing lesson <span aria-hidden="true">→</span></Link>
          </section>

          <section id="syllabus" className="landing-section syllabus" aria-labelledby="syllabus-title">
            <h2 id="syllabus-title">What you’ll learn</h2>
            <p>Start with timing and easing, work through CSS and Motion for React, and finish by building an issue tracker.</p>
            {modules.map((module) => (
              <details className="syllabus-module" key={module.slug} open={module.number === 1}>
                <summary>
                  <span className="syllabus-index">Module {String(module.number).padStart(2, "0")}</span>
                  <strong>{module.title}</strong>
                  <span className="syllabus-chevron" aria-hidden="true" />
                </summary>
                <div>
                  <p>{module.tagline}</p>
                  <ul>
                    {module.lessons.map((lesson) => (
                      <li key={lesson.slug}>
                        <Link href={`/course/${module.slug}/${lesson.slug}/`}>
                          {lesson.title}<span aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </section>

          <section className="landing-section landing-project" aria-labelledby="project-title">
            <h2 id="project-title">Build an animated issue tracker</h2>
            <p>Use the Issue desk starter to animate a sortable list and a details panel. Then test keyboard focus, rapid input, and reduced motion.</p>
            <Link className="button-gold" href="/course/craft/capstone/">Explore the project</Link>
          </section>

          <footer className="landing-footer">
            <Wordmark />
            <a href="#syllabus">Syllabus</a>
          </footer>
        </div>
      </main>
    </div>
  );
}
