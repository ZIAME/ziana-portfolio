import type { ReactNode } from "react";
import { newTabProps } from "@/lib/contact";

type RoundSketchButtonProps = {
  href: string;
  ariaLabel: string;
  className?: string;
  children: ReactNode;
};

// RoundButton.svg and RoundButtonHovered.svg trace the exact same path — only
// the stroke color differs (#9F9F9F -> black) — so this is inlined once with
// currentColor and the hover color swap happens in CSS instead of crossfading
// two images.
export function RoundSketchButton({ href, ariaLabel, className, children }: RoundSketchButtonProps) {
  return (
    <a
      href={href}
      {...newTabProps(href)}
      aria-label={ariaLabel}
      className={`group relative inline-flex h-[32px] w-[35px] shrink-0 items-center justify-center text-[#9F9F9F] transition-colors hover:text-black ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 46 42"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      >
        <path
          d="M2.73167 13.8466C4.05635 12.0604 8.51968 4.35544 12.983 2.12775C15.2365 1.53105 27.8957 -0.907022 31.8348 2.12936C39.4267 7.98148 49.8372 22.6469 43.0289 32.2986C41.2905 34.7629 37.6635 38.9173 33.6746 40.3839C32.4195 40.8453 27.1442 41.3955 20.0658 40.909C17.1718 40.7101 15.206 40.8863 12.983 39.7116C5.68515 35.855 -3.57425 22.3492 2.73167 13.8466Z"
          stroke="currentColor"
          strokeWidth="1.2734"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </a>
  );
}

type MediumSketchButtonProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

// Each state is a genuinely different hand-drawn pass (not just a recolor),
// and hover/pressed bake in a drop-shadow / inner-shadow filter respectively
// — effects an arbitrary sketchy blob shape can't get from plain CSS
// box-shadow. So these stay as three layered, crossfaded image assets rather
// than one inlined+recolored SVG like the round button.
export function MediumSketchButton({ href, className, children }: MediumSketchButtonProps) {
  return (
    <a
      href={href}
      {...newTabProps(href)}
      // Box matches the default state's artwork ratio (136x41) — centering
      // text in the larger hover/pressed canvases (extra room for their
      // shadow filters) offset it from the shape visible at rest. Each state
      // is sized as a % of the default's width (hover 138/136, pressed
      // 134/136), so all three scale together and stay aligned at any size.
      className={`group relative inline-flex aspect-[136/41] w-[92px] items-center justify-center sm:w-[136px] ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative hand-drawn button chrome, fixed size by design */}
      <img
        src="/buttons/medium-default.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-auto w-full max-w-none select-none transition-opacity group-hover:opacity-0 group-active:opacity-0"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative hand-drawn button chrome, fixed size by design */}
      <img
        src="/buttons/medium-hover.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-auto w-[101.47%] max-w-none select-none opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-0"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative hand-drawn button chrome, fixed size by design */}
      <img
        src="/buttons/medium-pressed.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10 h-auto w-[98.53%] max-w-none select-none opacity-0 transition-opacity group-active:opacity-100"
      />
      <span className="relative z-20 text-xs text-neutral-800 sm:text-sm">{children}</span>
    </a>
  );
}
