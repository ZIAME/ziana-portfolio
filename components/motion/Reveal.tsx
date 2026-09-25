"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Soft springs shared across the site so every interaction settles the same way.
export const SPRING = { type: "spring", stiffness: 260, damping: 24 } as const;
export const SPRING_SOFT = { type: "spring", stiffness: 170, damping: 26 } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

// Fades and lifts its content in the first time it scrolls into view.
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
