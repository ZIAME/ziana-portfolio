"use client";

import { useEffect, useState } from "react";

const HIDE_AFTER_PX = 24;

export function ScrollPrompt() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY < HIDE_AFTER_PX);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <p
      className="text-center text-sm whitespace-nowrap text-neutral-500 transition-opacity duration-300 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden={!visible}
    >
      <span aria-hidden="true">↓</span> Scroll down to see my work{" "}
      <span aria-hidden="true">↓</span>
    </p>
  );
}
