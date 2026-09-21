"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BIO_TABS, BIOS, PHOTO_SRC, type BioMode } from "./content";

const FADE_MS = 180;

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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ left: number; width: number }>();

  // Tabs hug their own labels (so the toggle stays compact enough to sit
  // beside the heading on phones), which means the indicator has to measure
  // the active tab rather than assume equal halves.
  useLayoutEffect(() => {
    const el = tabRefs.current[BIO_TABS.findIndex((tab) => tab.mode === mode)];
    if (!el) return;
    const measure = () => setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [mode]);

  return (
    <div
      role="tablist"
      aria-label="Bio version"
      className="relative flex shrink-0 rounded-full bg-neutral-900/[0.06] p-0.5 sm:p-1"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0.5 rounded-full bg-white shadow-sm transition-[left,width] duration-300 ease-out sm:inset-y-1"
        style={indicator}
      />
      {BIO_TABS.map((tab, i) => (
        <button
          key={tab.mode}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          type="button"
          role="tab"
          aria-selected={tab.mode === mode}
          onClick={() => onSelect(tab.mode)}
          className={`relative z-10 rounded-full px-2.5 py-1 text-[11px] whitespace-nowrap transition-colors duration-200 sm:px-4 sm:py-1.5 sm:text-sm ${
            tab.mode === mode ? "text-neutral-900" : "text-neutral-500"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function StackRow({ stack }: { stack: { src: string; label: string }[] }) {
  return (
    <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full sm:mx-0 bg-white px-5 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <span className="text-[11px] tracking-wider text-neutral-400 uppercase">My stack</span>
      <ul className="flex items-center gap-2">
        {stack.map((icon) => (
          <li key={icon.src}>
            {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size stack icon, no responsive variants needed */}
            <img
              src={icon.src}
              alt={icon.label}
              title={icon.label}
              className="h-9 w-9 rounded-[10px] transition-transform duration-200 ease-out hover:scale-115"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AboutMe() {
  const [mode, setMode] = useState<BioMode>("professional");
  // What's actually rendered — lags `mode` by one fade so the swap happens
  // while the content is invisible.
  const [shown, setShown] = useState<BioMode>("professional");
  const [isFading, setIsFading] = useState(false);
  const [height, setHeight] = useState<number>();

  const contentRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The two bios are different lengths, so the wrapper's height is measured
  // and transitioned rather than snapping when the content swaps.
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const sync = () => setHeight(el.offsetHeight);
    sync();

    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  useEffect(() => () => void (timerRef.current && clearTimeout(timerRef.current)), []);

  const select = (next: BioMode) => {
    if (next === mode) return;
    setMode(next);
    setIsFading(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShown(next);
      setIsFading(false);
    }, FADE_MS);
  };

  const bio = BIOS[shown];

  return (
    <section id="about" aria-label="About">
      <CutBorder />
      {/* box-content so max-w applies to the content box, matching the other
          sections (padding on <section>, max-w on an inner div) exactly. */}
      <div className="mx-auto box-content max-w-[960px] px-6 py-16 sm:px-10 sm:py-24">
        {/* Most of the gap below the header lives on the content's own
            padding-top instead, so the tape can overhang the photo without
            being clipped by the height wrapper's overflow-hidden. */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-4 sm:mb-2">
          <h2 className="font-nohemi text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            About Me
          </h2>
          <BioToggle mode={mode} onSelect={select} />
        </div>

        <div
          // clip-path rather than overflow-hidden: the height animation only
          // needs clipping at the top/bottom, and this leaves the sides open
          // so the tape can hang past the photo's left edge.
          className="transition-[height] duration-300 ease-out [clip-path:inset(0_-100vw)]"
          style={{ height }}
        >
          <div
            ref={contentRef}
            className="pt-10 transition-opacity ease-out"
            style={{
              opacity: isFading ? 0 : 1,
              transitionDuration: `${isFading ? FADE_MS : 250}ms`,
            }}
          >
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
              <div className="relative w-40 shrink-0 rotate-2 self-start sm:w-48">
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
            </div>
          </div>
        </div>
      </div>
      <CutBorder />
    </section>
  );
}
