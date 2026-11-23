export type Lesson = {
  slug: string;
  title: string;
  description: string;
  minutes: number;
};

export type Module = {
  slug: string;
  number: number;
  title: string;
  tagline: string;
  lessons: Lesson[];
};

export const modules: Module[] = [
  {
    slug: "foundations",
    number: 1,
    title: "Foundations of Motion",
    tagline: "Why things move, and how to make them feel right",
    lessons: [
      {
        slug: "why-motion",
        title: "Why We Animate",
        description:
          "What animation is actually for — feedback, continuity, and character.",
        minutes: 6,
      },
      {
        slug: "duration",
        title: "Duration & Timing",
        description:
          "How long an animation should last, and why shorter is usually better.",
        minutes: 8,
      },
      {
        slug: "easing",
        title: "The Art of Easing",
        description:
          "Cubic béziers, standard curves, and how easing shapes personality.",
        minutes: 12,
      },
      {
        slug: "springs",
        title: "Spring Physics",
        description:
          "Stiffness, damping, and why springs feel alive where easings feel scripted.",
        minutes: 11,
      },
      {
        slug: "performance",
        title: "Animating at 60fps",
        description:
          "Transform, opacity, the compositor, and how to never drop a frame.",
        minutes: 9,
      },
    ],
  },
  {
    slug: "css",
    number: 2,
    title: "CSS in Practice",
    tagline: "Transitions, keyframes, and the modern CSS toolkit",
    lessons: [
      {
        slug: "transitions",
        title: "Transitions Done Right",
        description:
          "The humble transition — where most animations should start and end.",
        minutes: 7,
      },
      {
        slug: "keyframes",
        title: "Keyframes & Sequences",
        description:
          "Multi-step motion, fill modes, and when keyframes beat transitions.",
        minutes: 8,
      },
      {
        slug: "transform-origin",
        title: "Origin & The Details",
        description:
          "transform-origin, scale-from-edge menus, and the details nobody teaches.",
        minutes: 7,
      },
      {
        slug: "scroll-driven",
        title: "Scroll-Driven Animation",
        description:
          "animation-timeline, view(), and scroll-linked motion without JavaScript.",
        minutes: 9,
      },
    ],
  },
  {
    slug: "motion",
    number: 3,
    title: "Motion for React",
    tagline: "Declarative animation with the Motion library",
    lessons: [
      {
        slug: "motion-basics",
        title: "Motion Basics",
        description:
          "animate, initial, exit — the three props that do most of the work.",
        minutes: 8,
      },
      {
        slug: "enter-exit",
        title: "Enter & Exit",
        description:
          "AnimatePresence, unmounting gracefully, and why exits are the hard part.",
        minutes: 10,
      },
      {
        slug: "gestures",
        title: "Gestures",
        description:
          "Hover, tap, and drag — animations driven by the user's own hands.",
        minutes: 9,
      },
      {
        slug: "layout",
        title: "Layout & Shared Elements",
        description:
          "layout, layoutId, FLIP — animations that survive DOM changes.",
        minutes: 11,
      },
      {
        slug: "orchestration",
        title: "Orchestration",
        description:
          "Variants, stagger, and choreographing many elements as one.",
        minutes: 9,
      },
    ],
  },
  {
    slug: "craft",
    number: 4,
    title: "Craft & Taste",
    tagline: "The difference between animation that works and animation that sings",
    lessons: [
      {
        slug: "interruptibility",
        title: "Interruptibility",
        description:
          "Users don't wait. Design every animation to be interrupted mid-flight.",
        minutes: 8,
      },
      {
        slug: "taste",
        title: "Taste & Judgment",
        description:
          "Frequency, restraint, origin, overshoot — the taste layer of motion.",
        minutes: 9,
      },
      {
        slug: "particles",
        title: "Particles & Delight",
        description:
          "Canvas bursts, springs-as-juice, and the flourishes that make people smile.",
        minutes: 10,
      },
      {
        slug: "accessibility",
        title: "Motion for Everyone",
        description:
          "prefers-reduced-motion, vestibular safety, and respectful defaults.",
        minutes: 7,
      },
      {
        slug: "capstone",
        title: "Capstone: A Polished Menu",
        description:
          "Bring it all together — build a dropdown menu worthy of a design award.",
        minutes: 12,
      },
    ],
  },
];

export const allLessons: { module: Module; lesson: Lesson }[] = modules.flatMap(
  (m) => m.lessons.map((lesson) => ({ module: m, lesson })),
);

export function findLesson(moduleSlug: string, lessonSlug: string) {
  const module = modules.find((m) => m.slug === moduleSlug);
  const lesson = module?.lessons.find((l) => l.slug === lessonSlug);
  if (!module || !lesson) return null;
  return { module, lesson };
}

export function adjacentLessons(moduleSlug: string, lessonSlug: string) {
  const idx = allLessons.findIndex(
    (x) => x.module.slug === moduleSlug && x.lesson.slug === lessonSlug,
  );
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx >= 0 && idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  };
}

export const totalLessons = allLessons.length;
