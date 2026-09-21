import type { CSSProperties } from "react";
import type { CreationItem } from "./content";
import { SquareCardFrame } from "./SquareCardFrame";

function InfoIcon() {
  return (
    <span className="group/info absolute top-2 right-2 z-10">
      <span className="flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-neutral-900/40 bg-white text-[11px] text-neutral-700">
        i
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute top-full right-0 mt-1.5 w-max max-w-[160px] rounded-md bg-neutral-900 px-2.5 py-1.5 text-[11px] leading-snug text-white opacity-0 transition-opacity duration-150 group-hover/info:opacity-100"
      >
        You will be redirected to an external link
      </span>
    </span>
  );
}

type CreationCardProps = {
  item: CreationItem;
  rotation: { rest: number; hover: number };
  isExpanded?: boolean;
  onToggle?: () => void;
};

export function CreationCard({ item, rotation, isExpanded, onToggle }: CreationCardProps) {
  const style = {
    "--rot-rest": `${rotation.rest}deg`,
    "--rot-hover": `${rotation.hover}deg`,
  } as CSSProperties;

  const artwork = item.cover ? (
    // eslint-disable-next-line @next/next/no-img-element -- fixed-size creation cover, no responsive variants needed
    <img src={item.cover} alt="" className="h-full w-full object-cover" />
  ) : (
    <div className="placeholder-checker h-full w-full" />
  );

  // The link card has no caption, so its artwork fills the frame edge to edge.
  if (item.type === "link") {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        className="tilt-card mx-auto block w-full max-w-[150px] sm:max-w-[192px]"
      >
        <SquareCardFrame>
          <div className="relative h-full w-full">
            {artwork}
            <InfoIcon />
          </div>
        </SquareCardFrame>
      </a>
    );
  }

  // Album cards are polaroids: artwork inset at the top, caption inside the
  // frame below it. Percentage padding resolves against the card's width, so
  // these proportions hold at every card size.
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isExpanded}
      style={style}
      className="tilt-card mx-auto block w-full max-w-[150px] sm:max-w-[192px]"
    >
      <SquareCardFrame>
        <div className="flex h-full w-full flex-col px-[10%] pt-[8%] pb-[5%]">
          <div className="w-full flex-1 overflow-hidden rounded-lg">{artwork}</div>
          <span className="mt-[7%] text-center text-[13px] leading-tight text-neutral-800 sm:text-[15px]">
            {item.title}
          </span>
        </div>
      </SquareCardFrame>
    </button>
  );
}
