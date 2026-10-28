"use client";

import { forwardRef, useRef, type CSSProperties } from "react";
import { useReveal, type RevealConfig } from "@/lib/scroll";

type Props = {
  name: string;
  href: string;
  index: number;
  image?: string;
  video?: string;
  cfg: RevealConfig;
  className?: string;
  style?: CSSProperties;
};

/** Project tile: outer div is the measured layout box, the link inside is revealed on scroll. */
export const ProjectCard = forwardRef<HTMLDivElement, Props>(function ProjectCard(
  { name, href, index, image, video, cfg, className = "", style },
  measureRef,
) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLAnchorElement>(null);
  useReveal(outer, [inner], cfg);

  return (
    <div
      ref={(node) => {
        outer.current = node;
        if (typeof measureRef === "function") measureRef(node);
        else if (measureRef) measureRef.current = node;
      }}
      style={style}
    >
      <a
        ref={inner}
        href={href}
        className={`project-card reveal-inner ${className}`}
        data-cursor="View work"
        style={{ opacity: cfg.opacity[0], transform: `translateY(${cfg.y[0]}px)` }}
      >
        {video ? (
          <video src={video} autoPlay loop muted playsInline />
        ) : image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} />
        ) : (
          <div className="placeholder-media">
            <span className="num">{String(index + 1).padStart(2, "0")}</span>
            <span className="hint">Add project media in src/content/site.ts</span>
          </div>
        )}
        <span className="project-label">{name}</span>
      </a>
    </div>
  );
});
