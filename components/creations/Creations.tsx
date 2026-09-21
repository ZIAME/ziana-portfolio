"use client";

import { Fragment, useEffect, useState } from "react";
import { AlbumExpansion } from "./AlbumExpansion";
import { CreationCard } from "./CreationCard";
import { CARD_TILTS, CREATIONS, type CreationItem } from "./content";

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
    (item): item is Extract<CreationItem, { type: "album" }> =>
      item.type === "album" && item.id === expandedId,
  );

  return (
    <section className="px-6 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-[960px]">
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
                  {showHere && (
                    <div className="expand-in col-span-full">
                      <AlbumExpansion album={expandedAlbum} />
                    </div>
                  )}
                </Fragment>
              );
            })}
            {!opensUnderRow && expandedAlbum && (
              <div key={expandedAlbum.id} className="expand-in col-span-full">
                <AlbumExpansion album={expandedAlbum} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
