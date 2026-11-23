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
    title: "Motion fundamentals",
    tagline: "Compare timing curves and measure the cost of an animation.",
    lessons: [
      {
        slug: "why-motion",
        title: "What motion is for",
        description:
          "Identify which state changes need a visual cue.",
        minutes: 6,
      },
      {
        slug: "duration",
        title: "Choosing a duration",
        description:
          "Compare timings on the same interaction and choose a starting point.",
        minutes: 8,
      },
      {
        slug: "easing",
        title: "Reading easing curves",
        description:
          "Read a cubic bézier curve and predict how it changes a transition.",
        minutes: 12,
      },
      {
        slug: "springs",
        title: "Tuning springs",
        description:
          "Tune stiffness, damping, and mass against the same target.",
        minutes: 11,
      },
      {
        slug: "performance",
        title: "Measuring animation cost",
        description:
          "Compare animating width and transform in a performance trace.",
        minutes: 9,
      },
    ],
  },
  {
    slug: "css",
    number: 2,
    title: "CSS animation",
    tagline: "Build a press response, then explore sequences, origins, and scroll.",
    lessons: [
      {
        slug: "transitions",
        title: "CSS transitions",
        description:
          "Build a keyboard-friendly button with immediate press feedback.",
        minutes: 7,
      },
      {
        slug: "keyframes",
        title: "Keyframes and sequences",
        description:
          "Define a sequence with intermediate stops and a clear end state.",
        minutes: 8,
      },
      {
        slug: "transform-origin",
        title: "Transform origin",
        description:
          "Anchor an expanding surface to its trigger.",
        minutes: 7,
      },
      {
        slug: "scroll-driven",
        title: "Scroll-driven animation",
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
    tagline: "Animate React state, exits, and changes to list order.",
    lessons: [
      {
        slug: "motion-basics",
        title: "Animating React state",
        description:
          "Map component state to animation targets.",
        minutes: 8,
      },
      {
        slug: "enter-exit",
        title: "Enter and exit",
        description:
          "Keep a departing element mounted long enough to animate its exit.",
        minutes: 10,
      },
      {
        slug: "gestures",
        title: "Gestures",
        description:
          "Handle hover, press, and drag with appropriate input alternatives.",
        minutes: 9,
      },
      {
        slug: "layout",
        title: "Layout and shared elements",
        description:
          "Animate position changes with stable keys and trace a shared element.",
        minutes: 11,
      },
      {
        slug: "orchestration",
        title: "Orchestration",
        description:
          "Use variants and stagger to order related animations.",
        minutes: 9,
      },
    ],
  },
  {
    slug: "craft",
    number: 4,
    title: "Interaction design",
    tagline: "Test rapid input and reduced motion, then build the final project.",
    lessons: [
      {
        slug: "interruptibility",
        title: "Interruptibility",
        description:
          "Change a transition’s target while it is in progress.",
        minutes: 8,
      },
      {
        slug: "taste",
        title: "Critiquing motion",
        description:
          "Compare repeated interactions and decide which effects to keep.",
        minutes: 9,
      },
      {
        slug: "particles",
        title: "Canvas particles (optional)",
        description:
          "Build a short canvas effect for a one-time milestone.",
        minutes: 10,
      },
      {
        slug: "accessibility",
        title: "Reduced motion",
        description:
          "Design and verify a reduced-motion mode for the same interaction.",
        minutes: 7,
      },
      {
        slug: "capstone",
        title: "Final project: Issue desk",
        description:
          "Build an animated issue tracker from a working React starter.",
        minutes: 45,
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
