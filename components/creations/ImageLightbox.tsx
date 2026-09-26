"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SPRING } from "@/components/motion/Reveal";
import { SKETCH_BLOB_PATH } from "@/components/ui/SketchButton";
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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={SPRING}
      // Same hand-drawn outline as the hero's social buttons, in white.
      className={`absolute top-1/2 z-10 -mt-[21px] flex h-[42px] w-[46px] items-center justify-center text-white/75 transition-colors hover:text-white sm:-mt-6 sm:h-12 sm:w-[53px] ${
        direction === "prev" ? "left-2 sm:left-5" : "right-2 sm:right-5"
      }`}
    >
      <svg viewBox="0 0 46 42" fill="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
        <path d={SKETCH_BLOB_PATH} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} className="relative h-4 w-4" aria-hidden="true">
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
      // Side padding leaves a dark lane for the arrows so they never sit on
      // top of the image.
      className={`fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 py-4 backdrop-blur-sm sm:py-10 ${
        hasMany ? "px-14 sm:px-24" : "px-4 sm:px-10"
      }`}
    >
      <motion.button
        type="button"
        onClick={onClose}
        aria-label="Close"
        whileHover={{ scale: 1.12, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        transition={SPRING}
        className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center opacity-80 transition-opacity hover:opacity-100 sm:top-6 sm:right-6"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- hand-drawn icon, fixed size */}
        <img src="/buttons/cross.svg" alt="" aria-hidden="true" className="h-7 w-7 select-none" />
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
          <motion.div
            key={image.src}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ ...SPRING, opacity: { duration: 0.2 } }}
            className="flex max-h-full max-w-full flex-col items-center gap-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- full-size album image, no responsive variants needed */}
            <img
              src={image.src}
              alt={image.alt}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-full rounded-lg object-contain shadow-2xl sm:max-w-[min(100%,1100px)] ${
                image.link ? "max-h-[calc(100dvh-8rem)] sm:max-h-[calc(100dvh-11rem)]" : "max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-5rem)]"
              }`}
            />
            {image.link && (
              <a
                href={image.link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-1.5 text-sm text-neutral-900 shadow-md transition-colors hover:bg-white"
              >
                {image.link.label}
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </motion.div>
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
