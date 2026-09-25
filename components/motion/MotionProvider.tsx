"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// reducedMotion="user" keeps opacity fades but drops movement for anyone with
// "reduce motion" turned on in their OS.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
