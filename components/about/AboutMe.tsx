"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { Reveal, SPRING, SPRING_SOFT } from "@/components/motion/Reveal";
import { BIO_TABS, BIOS, PHOTO_SRC, type BioMode } from "./content";

// Full-bleed dashed divider. Kept at the SVG's native 17px height and
// cropped horizontally (object-cover) instead of scaled to fit, so the
// dashes stay the same size on a phone as on a 1920px screen.
function CutBorder() {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- decorative divider, no responsive variants needed
    <img
      src="/about/cut-border.svg"
      alt=""
      aria-hidden="true"
      className="pointer-events-none block h-[17px] w-full object-cover object-left select-none"
    />
  );
}

function BioToggle({
  mode,
  onSelect,
}: {
  mode: BioMode;
  onSelect: (next: BioMode) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Bio version"
      className="relative flex shrink-0 rounded-full bg-neutral-900/[0.06] p-0.5 sm:p-1"
    >
      {BIO_TABS.map((tab) => {
        const active = tab.mode === mode;
        return (
          <button
            key={tab.mode}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(tab.mode)}
            className={`relative rounded-full px-2.5 py-1 text-[11px] whitespace-nowrap transition-colors duration-200 sm:px-4 sm:py-1.5 sm:text-sm ${
              active ? "text-neutral-900" : "text-neutral-500"
            }`}
          >
            {/* The pill moves between tabs as one shared element, so it
                springs across instead of jumping. */}
            {active && (
              <motion.span
                layoutId="bio-toggle-indicator"
                transition={SPRING}
                className="absolute inset-0 rounded-full bg-white shadow-sm"
              />
            )}
            <span className="relative">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function StackRow({ stack }: { stack: { src: string; label: string }[] }) {
  return (
    <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:mx-0">
      <span className="text-[11px] tracking-wider text-neutral-400 uppercase">My stack</span>
      <ul className="flex items-center gap-2">
        {stack.map((icon) => (
          <li key={icon.src}>
            <motion.img
              src={icon.src}
              alt={icon.label}
              title={icon.label}
              whileHover={{ scale: 1.18, rotate: -4 }}
              whileTap={{ scale: 0.92 }}
              transition={SPRING}
              className="h-9 w-9 rounded-[10px]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AboutMe() {
  const [mode, setMode] = useState<BioMode>("professional");
  const [height, setHeight] = useState<number>();
  const contentRef = useRef<HTMLDivElement>(null);

  // The two bios are different lengths, so the wrapper's height is measured
  // and sprung toward rather than snapping when the content swaps.
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const sync = () => setHeight(el.offsetHeight);
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const bio = BIOS[mode];

  return (
    <section id="about" aria-label="About">
      <CutBorder />
      {/* box-content so max-w applies to the content box, matching the other
          sections (padding on <section>, max-w on an inner div) exactly. */}
      <Reveal className="mx-auto box-content max-w-[960px] px-6 py-16 sm:px-10 sm:py-24">
        {/* Most of the gap below the header lives on the content's own
            padding-top instead, so the tape can overhang the photo without
            being clipped by the height wrapper. */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-4 sm:mb-2">
          <h2 className="font-nohemi text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            About Me
          </h2>
          <BioToggle mode={mode} onSelect={setMode} />
        </div>

        <motion.div
          // clip-path rather than overflow-hidden: the height animation only
          // needs clipping at the top/bottom, and this leaves the sides open
          // so the tape can hang past the photo's left edge.
          className="[clip-path:inset(0_-100vw)]"
          initial={false}
          animate={{ height: height ?? "auto" }}
          transition={SPRING_SOFT}
        >
          <div ref={contentRef} className="pt-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex flex-col gap-8 sm:flex-row sm:gap-12"
              >
                <div className="relative w-40 shrink-0 rotate-2 self-center sm:w-48 sm:self-start">
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.12)]">
                    {/* eslint-disable-next-line @next/next/no-img-element -- replaceable personal photo, no responsive variants needed */}
                    <img src={PHOTO_SRC} alt="Ziana Saif" className="h-full w-full object-cover" />
                  </div>
                  {/* Sits outside the rounded photo (which clips its own
                      overflow) and straddles the corner, so it reads as tape
                      stuck on top rather than artwork inside the frame. */}
                  {/* eslint-disable-next-line @next/next/no-img-element -- decorative hand-drawn asset, no responsive variants needed */}
                  <img
                    src="/about/tape.svg"
                    alt=""
                    aria-hidden="true"
                    // Percentages (of the photo's box) so the tape keeps the
                    // reference's size and position at every photo width.
                    className="pointer-events-none absolute top-[-6.5%] left-[-10%] w-[38%] max-w-none select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
                  />
                </div>

                <div className="flex-1">
                  {bio.paragraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className={`text-[15px] leading-relaxed text-neutral-700 sm:text-base ${
                        i === 0 ? "" : "mt-5"
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                  <StackRow stack={bio.stack} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </Reveal>
      <CutBorder />
    </section>
  );
}
