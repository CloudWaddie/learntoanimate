import Link from "next/link";
import { modules } from "@/lib/content";

export default function CourseIndex() {
  const first = modules[0].lessons[0];

  return (
    <section className="course-article">
      <header className="lesson-header">
        <h1>Course overview</h1>
        <p>Start with the first lesson or choose a topic from the syllabus.</p>
      </header>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link className="button-primary" href={`/course/${modules[0].slug}/${first.slug}`}>{first.title} →</Link>
        <Link className="button-secondary" href="/#syllabus">View syllabus</Link>
      </div>
    </section>
  );
}
