"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { SPRING } from "@/components/motion/Reveal";
import type { AlbumItem } from "./content";
import { ImageLightbox } from "./ImageLightbox";
import { SquareCardFrame } from "./SquareCardFrame";

const VISIBLE_ROWS = 3;

// Small fixed rotations for the thumbnail grid — reusing CARD_TILTS at full
// strength would look too busy at this size, so these stay subtler and just
// cycle; hovering straightens a thumbnail out.
const THUMB_TILTS = [-3, 2, -2, 3, -4, 2, -3, 4, -2];

function ToolPill({ name, color, icon }: { name: string; color: string; icon?: string }) {
  return (
    <span className="flex items-center gap-1 rounded-full border border-neutral-900/10 bg-white px-2 py-0.5 text-[10px] text-neutral-700 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-xs">
      {icon ? (
        // eslint-disable-next-line @next/next/no-img-element -- fixed-size tool logo, no responsive variants needed
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="h-3 w-3 rounded-[3px] object-contain sm:h-4 sm:w-4"
        />
      ) : (
        <span
          className="flex h-3 w-3 items-center justify-center rounded-[3px] text-[7px] font-semibold text-white sm:h-4 sm:w-4 sm:rounded-[4px] sm:text-[9px]"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        >
          {name.charAt(0)}
        </span>
      )}
      {name}
    </span>
  );
}

export function AlbumExpansion({ album }: { album: AlbumItem }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Cap the scroll area at exactly three rows (a 3x3 view). Measured rather
  // than computed in CSS because a desktop scrollbar steals width from the
  // grid (~15px on Windows, 0 on phones/macOS), which shrinks each thumbnail
  // by an amount CSS can't know — a formula leaves part of row 4 peeking in.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const measure = () => {
      const first = grid.firstElementChild as HTMLElement | null;
      if (!first || grid.children.length <= VISIBLE_ROWS * 3) return setMaxHeight(undefined);
      const style = getComputedStyle(grid);
      const gap = parseFloat(style.rowGap);
      const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      setMaxHeight(VISIBLE_ROWS * first.offsetHeight + (VISIBLE_ROWS - 1) * gap + padding);
    };
    measure();
    // Watch a thumbnail as well as the grid: crossing the sm breakpoint
    // changes the gap too, so the grid can settle without its own box
    // re-firing, while the thumbnail's size always tracks what we measure.
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    if (grid.firstElementChild) observer.observe(grid.firstElementChild);
    return () => observer.disconnect();
  }, [album]);

  return (
    // Two equal halves at every size: info + pills | image grid.
    <div className="grid grid-cols-2 gap-4 pt-8 sm:gap-10 sm:pt-10">
      <div className="min-w-0">
        <h3 className="text-base font-bold text-neutral-900 sm:text-xl">{album.title}</h3>
        {album.subtitle && (
          <p className="mt-0.5 text-xs text-neutral-500 sm:mt-1 sm:text-sm">{album.subtitle}</p>
        )}
        {album.tools.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1 sm:mt-4 sm:gap-2">
            {album.tools.map((tool) => (
              <ToolPill key={tool.name} {...tool} />
            ))}
          </div>
        )}
      </div>

      {/* Fills its half of the panel; anything past nine scrolls here
          without moving the page. */}
      <div className="flex min-w-0 justify-end">
        <div className="w-full">
          <div className="overflow-y-auto" style={{ maxHeight }}>
            <div ref={gridRef} className="grid grid-cols-3 gap-1.5 p-0.5 sm:gap-3">
              {album.images.map((image, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => image.src && setOpenIndex(i)}
                  disabled={!image.src}
                  aria-label={`Open ${image.alt}`}
                  // Thumbnails deal in one after another; the stagger is
                  // capped so long albums don't keep the last ones waiting.
                  initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: THUMB_TILTS[i % THUMB_TILTS.length] }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ ...SPRING, delay: Math.min(i, 9) * 0.03 }}
                  className="block w-full"
                >
                  <SquareCardFrame>
                    {image.src ? (
                      // eslint-disable-next-line @next/next/no-img-element -- fixed-size thumbnail, no responsive variants needed
                      <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                    ) : (
                      <div className="placeholder-checker h-full w-full" />
                    )}
                    {image.extras?.length ? (
                      <span className="absolute right-1 bottom-1 rounded-full bg-neutral-900/75 px-1.5 py-0.5 text-[9px] leading-none font-medium text-white sm:text-[10px]">
                        +{image.extras.length}
                      </span>
                    ) : null}
                  </SquareCardFrame>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <ImageLightbox
            key="lightbox"
            images={album.images}
            index={openIndex}
            onChange={setOpenIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
