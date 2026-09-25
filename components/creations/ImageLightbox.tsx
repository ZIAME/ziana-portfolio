"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SPRING } from "@/components/motion/Reveal";
import type { AlbumImage } from "./content";

type ImageLightboxProps = {
  images: AlbumImage[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

function ArrowButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={SPRING}
      className={`absolute top-1/2 z-10 -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md transition-colors hover:bg-white sm:-mt-6 sm:h-12 sm:w-12 ${
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
    </motion.button>
  );
}

// Slides in from the side you're moving toward and out the opposite side.
const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 60, scale: 0.96 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -60, scale: 0.96 }),
};

export function ImageLightbox({ images, index, onChange, onClose }: ImageLightboxProps) {
  const image = images[index];
  const hasMany = images.length > 1;
  // 1 = moving forward, -1 = moving back; 0 on first open (no sideways slide).
  const [direction, setDirection] = useState(0);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    onChange((index + dir + images.length) % images.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (hasMany && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        const dir = e.key === "ArrowRight" ? 1 : -1;
        setDirection(dir);
        onChange((index + dir + images.length) % images.length);
      }
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
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 p-4 backdrop-blur-sm sm:p-10"
    >
      <motion.button
        type="button"
        onClick={onClose}
        aria-label="Close"
        whileHover={{ scale: 1.08, rotate: 90 }}
        whileTap={{ scale: 0.92 }}
        transition={SPRING}
        className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md transition-colors hover:bg-white sm:top-6 sm:right-6"
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
        </svg>
      </motion.button>

      {hasMany && <ArrowButton direction="prev" onClick={() => go(-1)} />}

      <AnimatePresence mode="popLayout" custom={direction}>
        {image.extras?.length ? (
          // Grouped pieces open as one scrollable stack: the main image, then
          // its close-ups / process videos.
          <motion.div
            key={image.src}
            onClick={(e) => e.stopPropagation()}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ ...SPRING, opacity: { duration: 0.2 } }}
            className="flex max-h-full w-full max-w-[min(100%,760px)] flex-col items-center gap-4 overflow-y-auto overscroll-contain rounded-lg px-10 sm:px-16"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- full-size album image, no responsive variants needed */}
            <img src={image.src} alt={image.alt} className="w-full rounded-lg shadow-2xl" />
            {image.extras.map((media) =>
              media.type === "video" ? (
                <video
                  key={media.src}
                  src={media.src}
                  aria-label={media.alt}
                  className="w-full rounded-lg shadow-2xl"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- full-size album image, no responsive variants needed
                <img key={media.src} src={media.src} alt={media.alt} className="w-full rounded-lg shadow-2xl" />
              ),
            )}
          </motion.div>
        ) : (
          <motion.img
            key={image.src}
            src={image.src}
            alt={image.alt}
            onClick={(e) => e.stopPropagation()}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ ...SPRING, opacity: { duration: 0.2 } }}
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl sm:max-w-[min(100%,1100px)]"
          />
        )}
      </AnimatePresence>

      {hasMany && <ArrowButton direction="next" onClick={() => go(1)} />}

      {hasMany && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs text-neutral-700 tabular-nums">
          {index + 1} / {images.length}
        </span>
      )}
    </motion.div>,
    document.body,
  );
}
