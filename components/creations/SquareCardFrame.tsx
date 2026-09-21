import type { ReactNode } from "react";

type SquareCardFrameProps = {
  children: ReactNode;
  className?: string;
};

// SquareCard.svg's own viewBox (257x251) is preserved via aspect-ratio rather
// than stretched to whatever the caller's box happens to be — non-uniform
// stretch tears hand-drawn linework at extreme ratios (see AboutMe.tsx).
export function SquareCardFrame({ children, className }: SquareCardFrameProps) {
  return (
    <div className={`relative aspect-[257/251] w-full ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative hand-drawn asset, no responsive variants needed */}
      <img
        src="/creations/square-card.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      />
      <div className="absolute inset-[3%] overflow-hidden bg-white">{children}</div>
    </div>
  );
}
