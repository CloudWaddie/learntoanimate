import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { Wordmark } from "@/components/Wordmark";

export default function CourseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="course-bar">
        <Wordmark compact />
        <nav aria-label="Course shortcuts">
          <Link href="/#syllabus">Syllabus</Link>
          <Link href="/course/craft/capstone/">Final project</Link>
        </nav>
      </header>
      <MobileNav />
      <div className="course-shell">
        <Sidebar />
        <main id="main">{children}</main>
      </div>
    </>
  );
}
