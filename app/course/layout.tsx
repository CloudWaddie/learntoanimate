import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";

export default function CourseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="course-shell">
      <Sidebar />
      <div className="min-w-0">
        <MobileNav />
        <main id="main">{children}</main>
      </div>
    </div>
  );
}
