"use client";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect } from "react";

/** Degrees of phone tilt (from the starting pose) that map to full intensity. */
const TILT_RANGE = 25;

type Layer = {
  src: string;
  alt: string;
  /** Max rotation in degrees applied at the edge of the viewport. */
  rotateIntensity: number;
  /** Max translation in pixels applied at the edge of the viewport. */
  translateIntensity: number;
  /** Spring stiffness — lower = more lag/weight. */
  stiffness: number;
  zIndex: number;
  priority?: boolean;
};

// Depth order back to front: lettering, then the pen, then the character on
// top (matches the source art). Back layers trail more (feel distant/heavy)
// and move least; the pen is still treated as the closest/most independent
// element, reacting fastest, even though it renders under her hand.
const LAYERS: Layer[] = [
  { src: "/hero/letters-an.png", alt: "", rotateIntensity: 2, translateIntensity: 5, stiffness: 45, zIndex: 0 },
  { src: "/hero/letters-ia.png", alt: "", rotateIntensity: 3.5, translateIntensity: 9, stiffness: 50, zIndex: 1 },
  { src: "/hero/pen.png", alt: "", rotateIntensity: 4, translateIntensity: 9, stiffness: 150, zIndex: 10 },
  {
    src: "/hero/character.png",
    alt: "Illustrated portrait of Ziana Saif",
    rotateIntensity: 5,
    translateIntensity: 12,
    stiffness: 110,
    zIndex: 20,
    priority: true,
  },
];

function TiltLayer({
  layer,
  pointerX,
  pointerY,
}: {
  layer: Layer;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const spring = { stiffness: layer.stiffness, damping: 20, mass: 1 };
  const px = useSpring(pointerX, spring);
  const py = useSpring(pointerY, spring);
  const rotateY = useTransform(px, (v) => v * layer.rotateIntensity);
  const rotateX = useTransform(py, (v) => -v * layer.rotateIntensity);
  const x = useTransform(px, (v) => v * layer.translateIntensity);
  const y = useTransform(py, (v) => v * layer.translateIntensity);

  return (
    <motion.div className="absolute inset-0" style={{ zIndex: layer.zIndex, rotateX, rotateY, x, y }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size decorative layers, no responsive variants needed */}
      <img
        src={layer.src}
        alt={layer.alt}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
        draggable={false}
        loading={layer.priority ? "eager" : "lazy"}
      />
    </motion.div>
  );
}

export function TiltIllustration() {
  // -1..1 on each axis; the layers spring toward these, so updates never
  // re-render React.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    const clamp = (v: number) => Math.min(1, Math.max(-1, v));
    const update = (x: number, y: number) => {
      pointerX.set(clamp(x));
      pointerY.set(clamp(y));
    };

    const handleMouseMove = (e: MouseEvent) => {
      update((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };

    const handleWindowLeave = () => update(0, 0);

    // Touch devices: drive the same tilt from the phone's orientation.
    // Readings are relative to how the phone was held on the first event
    // (nobody holds a phone flat), and ±TILT_RANGE degrees maps to the full
    // -1..1 range the layers use.
    let baseline: { beta: number; gamma: number } | null = null;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      baseline ??= { beta: e.beta, gamma: e.gamma };
      update((e.gamma - baseline.gamma) / TILT_RANGE, (e.beta - baseline.beta) / TILT_RANGE);
    };

    // iOS gates motion data behind a permission prompt that can only be
    // raised from a user gesture, so ask on the first tap anywhere. Other
    // platforms don't have requestPermission and just start listening.
    const Orientation = window.DeviceOrientationEvent as
      | (typeof DeviceOrientationEvent & { requestPermission?: () => Promise<PermissionState> })
      | undefined;
    const isTouch = window.matchMedia("(hover: none)").matches;
    // Listen on both: iOS reliably fires touchend for any tap (it often skips
    // click on non-interactive areas), while other touch setups may only
    // deliver click. Whichever arrives first asks once and unhooks both.
    const requestOnGesture = () => {
      window.removeEventListener("touchend", requestOnGesture);
      window.removeEventListener("click", requestOnGesture);
      Orientation?.requestPermission?.()
        .then((state) => {
          if (state === "granted") window.addEventListener("deviceorientation", handleOrientation);
        })
        .catch(() => {});
    };

    if (isTouch && Orientation) {
      if (typeof Orientation.requestPermission === "function") {
        window.addEventListener("touchend", requestOnGesture);
        window.addEventListener("click", requestOnGesture);
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleWindowLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleWindowLeave);
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("touchend", requestOnGesture);
      window.removeEventListener("click", requestOnGesture);
    };
  }, [pointerX, pointerY]);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[480px]"
      style={{ perspective: "1200px" }}
    >
      {LAYERS.map((layer) => (
        <TiltLayer key={layer.src} layer={layer} pointerX={pointerX} pointerY={pointerY} />
      ))}
    </div>
  );
}
