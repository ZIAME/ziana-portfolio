"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { AlbumImage } from "./content";

type ImageLightboxProps = {
  images: AlbumImage[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

function ArrowButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md transition-colors hover:bg-white sm:h-12 sm:w-12 ${
        direction === "prev" ? "left-3 sm:left-6" : "right-3 sm:right-6"
      }`}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4" aria-hidden="true">
        <path
          d={direction === "prev" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function ImageLightbox({ images, index, onChange, onClose }: ImageLightboxProps) {
  const image = images[index];
  const hasMany = images.length > 1;
  const prev = () => onChange((index - 1 + images.length) % images.length);
  const next = () => onChange((index + 1) % images.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && hasMany) onChange((index - 1 + images.length) % images.length);
      else if (e.key === "ArrowRight" && hasMany) onChange((index + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, hasMany, onChange, onClose]);

  // Stop the page scrolling behind the popup.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  if (!image?.src) return null;

  // Portalled to <body> so no tilted/transformed ancestor can trap the
  // fixed overlay inside its own box.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      className="expand-in fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 p-4 backdrop-blur-sm sm:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md transition-colors hover:bg-white sm:top-6 sm:right-6"
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
        </svg>
      </button>

      {hasMany && <ArrowButton direction="prev" onClick={prev} />}

      {/* eslint-disable-next-line @next/next/no-img-element -- full-size album image, no responsive variants needed */}
      <img
        key={image.src}
        src={image.src}
        alt={image.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full rounded-lg object-contain shadow-2xl sm:max-w-[min(100%,1100px)]"
      />

      {hasMany && <ArrowButton direction="next" onClick={next} />}

      {hasMany && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs text-neutral-700">
          {index + 1} / {images.length}
        </span>
      )}
    </div>,
    document.body,
  );
}
