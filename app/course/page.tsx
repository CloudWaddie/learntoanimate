import { redirect } from "next/navigation";
import { modules } from "@/lib/content";

export default function CourseIndex() {
  const first = modules[0].lessons[0];
  redirect(`/course/${modules[0].slug}/${first.slug}`);
}
