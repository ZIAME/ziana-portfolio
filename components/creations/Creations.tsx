"use client";

import { AnimatePresence, motion } from "motion/react";
import { Fragment, useEffect, useState, type ReactNode } from "react";
import { Reveal, SPRING_SOFT } from "@/components/motion/Reveal";
import { AlbumExpansion } from "./AlbumExpansion";
import { CreationCard } from "./CreationCard";
import { CARD_TILTS, CREATIONS, type AlbumItem, type CreationItem } from "./content";

// Matches the grid's own `sm:` breakpoint below — kept in sync so the
// expansion panel is inserted after the row it was actually opened in,
// however many columns are currently showing.
const DESKTOP_QUERY = "(min-width: 640px)";

function useGridColumns() {
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const update = () => setColumns(mql.matches ? 3 : 2);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return columns;
}

// Springs open from zero height and collapses back on close. The album
// inside crossfades when switching to another one without closing first.
function ExpansionShell({ album }: { album: AlbumItem }): ReactNode {
  return (
    // The negative top margin cancels the grid's row gap and the same space is
    // added back as padding inside, so the gap grows and shrinks with the
    // panel instead of popping in/out around it.
    <motion.div
      className="col-span-full -mt-10 overflow-hidden sm:-mt-12"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ height: SPRING_SOFT, opacity: { duration: 0.25 } }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={album.id}
          className="pt-10 sm:pt-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <AlbumExpansion album={album} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export function Creations() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const columns = useGridColumns();

  const rows: CreationItem[][] = [];
  for (let i = 0; i < CREATIONS.length; i += columns) {
    rows.push(CREATIONS.slice(i, i + columns));
  }

  // Mobile (2 cols): the album opens right under its own row so it stays in
  // view. Desktop: it opens below the whole grid.
  const opensUnderRow = columns === 2;
  const expandedAlbum = CREATIONS.find(
    (item): item is AlbumItem => item.type === "album" && item.id === expandedId,
  );

  return (
    <section className="px-6 py-16 sm:px-10 sm:py-24">
      <Reveal className="mx-auto max-w-[960px]">
        {/* The panel bleeds out by exactly its own horizontal padding, so the
            heading inside it still lines up with every other section's
            heading (all of which sit flush on the 960px container edge). */}
        <div
          className="-mx-4 rounded-3xl bg-white/60 px-4 py-10 sm:-mx-8 sm:px-8 sm:py-12"
          style={{
            backgroundImage: "radial-gradient(#d4d4d4 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          <h2 className="font-nohemi mb-10 text-3xl font-bold tracking-tight text-neutral-900 sm:mb-14 sm:text-4xl">
            My creations
          </h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-12">
            {rows.map((row, rowIndex) => {
              const rowStart = rowIndex * columns;
              const showHere =
                opensUnderRow && expandedAlbum && row.some((item) => item.id === expandedAlbum.id);

              return (
                <Fragment key={rowIndex}>
                  {row.map((item, i) => (
                    <CreationCard
                      key={item.id}
                      item={item}
                      rotation={CARD_TILTS[(rowStart + i) % CARD_TILTS.length]}
                      isExpanded={item.id === expandedId}
                      onToggle={() =>
                        setExpandedId((current) => (current === item.id ? null : item.id))
                      }
                    />
                  ))}
                  <AnimatePresence initial={false}>
                    {showHere && <ExpansionShell key={`row-${rowIndex}`} album={expandedAlbum} />}
                  </AnimatePresence>
                </Fragment>
              );
            })}
            <AnimatePresence initial={false}>
              {!opensUnderRow && expandedAlbum && (
                <ExpansionShell key="below-grid" album={expandedAlbum} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
