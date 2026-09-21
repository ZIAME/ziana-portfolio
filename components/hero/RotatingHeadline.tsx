"use client";

import { useEffect, useRef, useState } from "react";
import { HEADLINE_WORDS } from "./content";

const TYPING_SPEED_MS = 70;
const DELETING_SPEED_MS = 35;
const PAUSE_AFTER_TYPE_MS = 1500;
const PAUSE_AFTER_DELETE_MS = 300;

export function RotatingHeadline() {
  const [text, setText] = useState(HEADLINE_WORDS[0] ?? "");
  const wordIndexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (HEADLINE_WORDS.length < 2) return;

    function step(charIndex: number, deleting: boolean) {
      const word = HEADLINE_WORDS[wordIndexRef.current];
      setText(word.slice(0, charIndex));

      if (deleting) {
        if (charIndex > 0) {
          timeoutRef.current = setTimeout(() => step(charIndex - 1, true), DELETING_SPEED_MS);
        } else {
          wordIndexRef.current = (wordIndexRef.current + 1) % HEADLINE_WORDS.length;
          timeoutRef.current = setTimeout(() => step(0, false), PAUSE_AFTER_DELETE_MS);
        }
        return;
      }

      if (charIndex < word.length) {
        timeoutRef.current = setTimeout(() => step(charIndex + 1, false), TYPING_SPEED_MS);
      } else {
        timeoutRef.current = setTimeout(() => step(charIndex, true), PAUSE_AFTER_TYPE_MS);
      }
    }

    // First word is already fully shown on mount — pause, then start deleting.
    timeoutRef.current = setTimeout(
      () => step(HEADLINE_WORDS[0].length, true),
      PAUSE_AFTER_TYPE_MS,
    );

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <h1 className="text-balance px-4 text-center text-4xl leading-tight font-light tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
      <span aria-hidden="true">
        {text}
        <span className="cursor-blink ml-0.5 inline-block font-light">|</span>
      </span>
      <span className="sr-only">{HEADLINE_WORDS.join(" — ")}</span>
    </h1>
  );
}
