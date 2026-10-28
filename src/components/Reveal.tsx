"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useReveal, type RevealConfig } from "@/lib/scroll";

type Props = {
  cfg: RevealConfig;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** Outer box is measured (never transformed); inner box receives opacity/translate. */
export function Reveal({ cfg, className, innerClassName, style, children }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useReveal(outer, [inner], cfg);
  return (
    <div ref={outer} className={className} style={style}>
      <div
        ref={inner}
        className={`reveal-inner ${innerClassName ?? ""}`}
        style={{ opacity: cfg.opacity[0], transform: `translateY(${cfg.y[0]}px)`, height: "100%" }}
      >
        {children}
      </div>
    </div>
  );
}
