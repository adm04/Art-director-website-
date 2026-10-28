"use client";

import { asset } from "@/lib/asset";
import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { RichLine } from "@/components/RichLine";
import { REVEALS } from "@/lib/scroll";

// Final sticker boxes from the reference, in vw relative to the line they ride with.
const STICKERS: { line: number; src: string; left: number; top: number; width: number }[] = [
  { line: 0, src: "/stickers/fire-frog.png", left: 65.49, top: 5.07, width: 7.01 },
  { line: 1, src: "/stickers/kitty.png", left: 22.01, top: -4.38, width: 10 },
  { line: 2, src: "/stickers/trust-me.png", left: 57.99, top: 1.32, width: 10 },
  { line: 3, src: "/stickers/orange-frog.png", left: 20.49, top: 6.11, width: 9.03 },
  { line: 4, src: "/stickers/duck.png", left: 49.51, top: 5.69, width: 10.97 },
  { line: 5, src: "/stickers/me-and-you.png", left: 7.99, top: 7.43, width: 25.97 },
];

export function Manifesto() {
  return (
    <section className="manifesto" aria-label="Manifesto">
      {site.manifesto.map((line, i) => (
        <Reveal key={i} cfg={REVEALS.line} className="m-line">
          <span className="text">
            <RichLine parts={line} />
          </span>
          {STICKERS.filter((s) => s.line === i).map((s) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.src}
              src={asset(s.src)}
              alt=""
              className="sticker"
              style={{ left: `calc(${s.left}vw - var(--m-pad))`, top: `${s.top}vw`, width: `${s.width}vw` }}
            />
          ))}
        </Reveal>
      ))}
    </section>
  );
}
