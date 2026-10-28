"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";

// One rAF-throttled scroll/resize loop shared by every scroll-linked element.
type Updater = () => void;
const updaters = new Set<Updater>();
let queued = false;
let bound = false;

function flush() {
  queued = false;
  updaters.forEach((fn) => fn());
}

function schedule() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(flush);
}

export function subscribe(fn: Updater) {
  if (!bound && typeof window !== "undefined") {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    bound = true;
  }
  updaters.add(fn);
  schedule();
  return () => {
    updaters.delete(fn);
  };
}

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export type RevealConfig = {
  opacity: [number, number];
  y: [number, number];
  /** element top (in viewport heights) where the animation starts / ends */
  start: number;
  end: number;
};

/**
 * Scroll-linked reveal measured from the reference: opacity and translateY
 * interpolate linearly while the (untransformed) top of `measure` travels
 * from `start`·vh to `end`·vh.
 */
export function useReveal(
  measure: RefObject<HTMLElement | null>,
  targets: RefObject<HTMLElement | null>[],
  cfg: RevealConfig,
) {
  useIsoLayoutEffect(() => {
    return subscribe(() => {
      const el = measure.current;
      if (!el) return;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const p = clamp01((cfg.start * vh - top) / ((cfg.start - cfg.end) * vh));
      const o = lerp(cfg.opacity[0], cfg.opacity[1], p);
      const y = lerp(cfg.y[0], cfg.y[1], p);
      for (const t of targets) {
        const node = t.current;
        if (!node) continue;
        node.style.opacity = String(o);
        node.style.transform = y === 0 ? "none" : `translateY(${y}px)`;
      }
    });
    // targets are stable refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfg.start, cfg.end, cfg.opacity[0], cfg.opacity[1], cfg.y[0], cfg.y[1]]);
}

export const REVEALS = {
  card: { opacity: [0.6, 1], y: [30, 0], start: 1.002, end: 0.801 },
  line: { opacity: [0, 1], y: [66, 0], start: 0.81, end: 0.604 },
  strip: { opacity: [0.6, 1], y: [50, 0], start: 1.002, end: 0.71 },
  intro: { opacity: [0, 1], y: [44, 0], start: 1.002, end: 0.71 },
  aboutCard: { opacity: [0.6, 1], y: [50, 0], start: 0.879, end: 0.71 },
  logos: { opacity: [0, 1], y: [35, 0], start: 0.955, end: 0.785 },
  awards: { opacity: [0, 1], y: [25, 0], start: 0.955, end: 0.785 },
} satisfies Record<string, RevealConfig>;
