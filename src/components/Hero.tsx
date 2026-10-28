"use client";

import { asset } from "@/lib/asset";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { Ruler } from "@/components/Ruler";
import { RichLine } from "@/components/RichLine";
import { clamp01, subscribe } from "@/lib/scroll";

// Each hero layer fades out and drifts down 62px over its own scrollY window (in vh).
const EXITS = {
  ruler: [0, 0.077],
  tagline: [0.101, 0.191],
  card: [0.252, 1.06],
} as const;

export function Hero() {
  const card = useRef<HTMLDivElement>(null);
  const tagline = useRef<HTMLParagraphElement>(null);
  const ruler = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      subscribe(() => {
        const vh = window.innerHeight;
        const y = window.scrollY;
        const layers: [HTMLElement | null, readonly [number, number]][] = [
          [card.current, EXITS.card],
          [tagline.current, EXITS.tagline],
          [ruler.current, EXITS.ruler],
        ];
        for (const [el, [from, to]] of layers) {
          if (!el) continue;
          const p = clamp01((y - from * vh) / ((to - from) * vh));
          el.style.opacity = String(1 - p);
          el.style.transform = p === 0 ? "none" : `translateY(${62 * p}px)`;
        }
      }),
    [],
  );

  return (
    <section className="hero" aria-label="Intro">
      <video className="hero-video" src={asset("/media/hero.mp4")} poster={asset("/media/hero-poster.jpg")} autoPlay loop muted playsInline />
      <div className="hero-overlay" />
      <div className="hero-card-wrap">
        <div className="hero-card-size">
          <div ref={card} className="hero-card">
            <span className="kicker serif">I’m a</span>
            <span className="role left">
              {site.role.left[0]}
              <br />
              {site.role.left[1]}
            </span>
            <svg className="slash" viewBox="0 0 110 275" preserveAspectRatio="none" aria-hidden="true">
              <line x1="110" y1="0" x2="0" y2="275" stroke="#000" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="role right">
              {site.role.right[0]}
              <br />
              {site.role.right[1]}
            </span>
            <span className="square" />
            <span className="name">
              <span>{site.name.first}</span>
              <span>{site.name.last}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="hero-down">
        <p ref={tagline} className="hero-tagline">
          {site.tagline.map((line, i) => (
            <span key={i} style={{ display: "block" }}>
              <RichLine parts={line} />
            </span>
          ))}
        </p>
        <Ruler ref={ruler} className="hero-ruler" />
      </div>
    </section>
  );
}
