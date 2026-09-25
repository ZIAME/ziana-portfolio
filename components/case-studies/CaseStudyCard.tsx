"use client";

import { motion } from "motion/react";
import { SPRING } from "@/components/motion/Reveal";
import type { CaseStudy } from "./content";
import { HandDrawnBorder } from "./HandDrawnBorder";

export function CaseStudyCard({ tags, role, title, description, image, imageAlt, href }: CaseStudy) {
  return (
    <motion.a
      href={href ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING}
      className="case-study-card group relative block rounded-[28px] p-4"
    >
      <div className="absolute inset-0 -z-10 rounded-[28px] bg-white opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 max-md:opacity-100" />
      <HandDrawnBorder />

      <div className="mb-4 flex items-center justify-between gap-3">
        <ul className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-neutral-900/5 px-3 py-1 text-xs text-neutral-600"
            >
              {tag}
            </li>
          ))}
        </ul>
        <span className="shrink-0 text-xs text-neutral-400">{role}</span>
      </div>

      <h3 className="text-2xl font-bold tracking-tight text-neutral-900">{title}</h3>
      <p className="mt-2 max-w-md text-[15px] text-neutral-500">{description}</p>

      <div className="mt-5 aspect-[2/1] overflow-hidden rounded-2xl bg-neutral-900/5">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element -- fixed-size case study preview, no responsive variants needed
          <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center border border-dashed border-neutral-900/15 text-xs text-neutral-400">
            Add project image
          </div>
        )}
      </div>
    </motion.a>
  );
}
