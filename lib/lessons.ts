import type { ComponentType } from "react";

const registry: Record<string, () => Promise<{ default: ComponentType }>> = {
  "foundations/why-motion": () => import("@/lessons/foundations/why-motion"),
  "foundations/duration": () => import("@/lessons/foundations/duration"),
  "foundations/easing": () => import("@/lessons/foundations/easing"),
  "foundations/springs": () => import("@/lessons/foundations/springs"),
  "foundations/performance": () =>
    import("@/lessons/foundations/performance"),
  "css/transitions": () => import("@/lessons/css/transitions"),
  "css/keyframes": () => import("@/lessons/css/keyframes"),
  "css/transform-origin": () => import("@/lessons/css/transform-origin"),
  "css/scroll-driven": () => import("@/lessons/css/scroll-driven"),
  "motion/motion-basics": () => import("@/lessons/motion/motion-basics"),
  "motion/enter-exit": () => import("@/lessons/motion/enter-exit"),
  "motion/gestures": () => import("@/lessons/motion/gestures"),
  "motion/layout": () => import("@/lessons/motion/layout"),
  "motion/orchestration": () => import("@/lessons/motion/orchestration"),
  "craft/interruptibility": () =>
    import("@/lessons/craft/interruptibility"),
  "craft/taste": () => import("@/lessons/craft/taste"),
  "craft/particles": () => import("@/lessons/craft/particles"),
  "craft/accessibility": () => import("@/lessons/craft/accessibility"),
  "craft/capstone": () => import("@/lessons/craft/capstone"),
};

export function getLessonComponent(moduleSlug: string, lessonSlug: string) {
  return registry[`${moduleSlug}/${lessonSlug}`] ?? null;
}
