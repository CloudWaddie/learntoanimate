import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findLesson, modules } from "@/lib/content";
import { getLessonComponent } from "@/lib/lessons";
import { LessonChrome } from "@/components/LessonChrome";

type Params = { module: string; lesson: string };

export function generateStaticParams(): Params[] {
  return modules.flatMap((m) =>
    m.lessons.map((l) => ({ module: m.slug, lesson: l.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { module: m, lesson: l } = await params;
  const found = findLesson(m, l);
  if (!found) return {};
  return {
    title: `${found.lesson.title} — Learn to Animate`,
    description: found.lesson.description,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { module: moduleSlug, lesson: lessonSlug } = await params;
  const found = findLesson(moduleSlug, lessonSlug);
  const loader = getLessonComponent(moduleSlug, lessonSlug);
  if (!found || !loader) notFound();

  const Content = (await loader()).default;

  return (
    <LessonChrome
      moduleSlug={moduleSlug}
      lessonSlug={lessonSlug}
      title={found.lesson.title}
      description={found.lesson.description}
      minutes={found.lesson.minutes}
      moduleTitle={found.module.title}
      moduleNumber={found.module.number}
    >
      <Content />
    </LessonChrome>
  );
}
