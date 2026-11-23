import Link from "next/link";
import { MotionStamps } from "@/components/MotionStamps";
import { LandingNav } from "@/components/LandingNav";
import { LandingComparison } from "@/components/LandingComparison";
import { LandingShowcase } from "@/components/LandingShowcase";
import { TimingFigure } from "@/components/TimingFigure";
import { Wordmark } from "@/components/Wordmark";
import { modules, totalLessons } from "@/lib/content";
import { walkthroughs } from "@/lib/walkthroughs";

const firstLesson = "/course/foundations/why-motion/";

export default function Landing() {
  return (
    <div className="landing">
      <LandingNav />

      <main id="main">
        <section className="landing-hero" aria-labelledby="landing-title">
          <MotionStamps />
          <h1 id="landing-title">How do you make motion<br className="hidden sm:inline" /> feel right?</h1>
          <p>Learn to animate web interfaces through interactive examples, short exercises, and components you build yourself.</p>
          <div className="hero-actions">
            <Link className="button-gold button-large" href={firstLesson}>Start learning</Link>
            <Link className="button-secondary button-large" href="/gallery/">Browse the gallery</Link>
          </div>
          <ul className="hero-meta">
            <li>{totalLessons} lessons</li>
            <li>{walkthroughs.length} component walkthroughs</li>
            <li>CSS and Motion for React</li>
          </ul>
        </section>

        <div className="landing-column">
          <section className="landing-section" aria-labelledby="project-title">
            <h2 id="project-title">Build components worth shipping</h2>
            <p>Each walkthrough starts from a working component with motion turned off. Try the finished versions here, then add the animation yourself.</p>
            <LandingShowcase />
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
            <p>Start with timing and easing, then put CSS and Motion for React to work in the component walkthroughs.</p>
            <div className="syllabus-list">
              {modules.map((module) => (
                <details className="syllabus-module" key={module.slug} open={module.number === 1}>
                  <summary>
                    <span className="syllabus-index" aria-hidden="true">{String(module.number).padStart(2, "0")}</span>
                    <strong>{module.title}</strong>
                    <span className="syllabus-count">{module.lessons.length} lessons</span>
                    <span className="syllabus-chevron" aria-hidden="true" />
                  </summary>
                  <div>
                    <p>{module.tagline}</p>
                    <ul>
                      {module.lessons.map((lesson) => (
                        <li key={lesson.slug}>
                          <Link href={"/course/" + module.slug + "/" + lesson.slug + "/"}>
                            {lesson.title}<span>{lesson.minutes} min</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="landing-section course-invite" aria-labelledby="start-title">
            <div>
              <h2 id="start-title">Start with the first lesson</h2>
              <p>What motion is for takes about six minutes. Your progress is saved in this browser.</p>
            </div>
            <Link className="button-gold button-large" href={firstLesson}>Start learning</Link>
          </section>

          <footer className="landing-footer">
            <Wordmark />
            <nav aria-label="Footer">
              <Link href="/gallery/">Gallery</Link>
              <a href="#syllabus">Syllabus</a>
              <Link href={firstLesson}>First lesson</Link>
            </nav>
          </footer>
        </div>
      </main>
    </div>
  );
}
