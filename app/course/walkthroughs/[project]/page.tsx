import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseArticle } from "@/components/CourseArticle";
import { CodeBlock } from "@/components/lesson";
import { ProjectPreview } from "@/components/ProjectPreview";
import { walkthroughContent } from "@/lessons/walkthroughs";
import { walkthroughs } from "@/lib/walkthroughs";

type Props = { params: Promise<{ project: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return walkthroughs.map(({ slug }) => ({ project: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project } = await params;
  const entry = walkthroughs.find((item) => item.slug === project);
  return entry ? { title: `${entry.title} — Learn to Animate`, description: entry.description } : {};
}

export default async function WalkthroughPage({ params }: Props) {
  const { project } = await params;
  const index = walkthroughs.findIndex((item) => item.slug === project);
  const entry = walkthroughs[index];
  if (!entry) notFound();
  const next = walkthroughs[index + 1];
  const Content = walkthroughContent[entry.slug];
  const folder = `/projects/${entry.slug}`;
  const component = entry.source.replace(".tsx", "");

  return (
    <CourseArticle
      title={entry.title}
      description={entry.description}
      eyebrow={`Walkthrough ${index + 1} of ${walkthroughs.length} · ${entry.tags.join(" · ")}`}
      footer={
      <nav aria-label="Walkthrough navigation">
        <Link href="/gallery/"><span>← Back</span><strong>Component gallery</strong></Link>
        {next ? (
          <Link className="text-right" href={`/course/walkthroughs/${next.slug}/`}><span>Next →</span><strong>{next.title}</strong></Link>
        ) : (
          <Link className="text-right" href="/#syllabus"><span>Course overview →</span><strong>Syllabus</strong></Link>
        )}
      </nav>
    }>
      <ProjectPreview slug={entry.slug} compare />
      <p className="project-demo-instructions">{entry.tryIt}</p>

      <h2 id="setup">Run the project with motion disabled</h2>
      <p>Download the component and its stylesheet into <code>src/</code> in a React + TypeScript project. Use the entry point below. {entry.slug !== "notification-stack" && <>Install <code>motion</code> with <code>npm install motion</code>.</>} With a fresh Vite template, remove its default <code>index.css</code> import from <code>src/main.tsx</code>.</p>
      <div className="project-downloads">
        <a className="button-secondary" href={`${folder}/${entry.source}`} download><span aria-hidden="true">↓</span> {entry.source}</a>
        <a className="button-secondary" href={`${folder}/${entry.stylesheet}`} download><span aria-hidden="true">↓</span> {entry.stylesheet}</a>
      </div>
      <CodeBlock title="src/App.tsx">{`import ${component} from "./${component}";

export default function App() {
  return <${component} animated={false} />;
}`}</CodeBlock>
      <p>These are the files powering the demo. Each step points to a small change to make or a behavior to reproduce. Use the completed version above to compare.</p>

      <Content />
    </CourseArticle>
  );
}
