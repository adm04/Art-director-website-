"use client";

import { asset } from "@/lib/asset";
import { Fragment, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Ruler } from "@/components/Ruler";
import { ProjectCard } from "@/components/ProjectCard";
import { REVEALS, subscribe } from "@/lib/scroll";

// Sidebar list is [name0, dash0, name1, dash1, …, nameN]. Active windows are
// expressed as the card's layout top in viewport heights (measured on the reference).
const NAME_ON: [number, number] = [-0.356, 0.522];
const DASH_ON: [number, number] = [-0.8, -0.022];
const within = (v: number, [lo, hi]: [number, number]) => v > lo && v <= hi;

export function Work() {
  const { projects } = site;
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState<boolean[]>(() => Array(projects.length * 2 - 1).fill(false));

  useEffect(
    () =>
      subscribe(() => {
        const vh = window.innerHeight;
        const next: boolean[] = [];
        cards.current.forEach((el, i) => {
          const top = el ? el.getBoundingClientRect().top / vh : Infinity;
          next.push(within(top, NAME_ON));
          if (i < projects.length - 1) next.push(within(top, DASH_ON));
        });
        setActive((prev) => (prev.every((v, i) => v === next[i]) ? prev : next));
      }),
    [projects.length],
  );

  return (
    <section className="work" id="work-section">
      <div className="work-ruler-wrap">
        <div className="fade" style={{ backgroundImage: `url(${asset("/media/ruler-fade.png")})` }} />
        <Ruler labelFirst />
      </div>
      <div className="work-gap" />
      <div className="projects-row">
        <aside className="sidebar">
          <div className="sidebar-list">
            {projects.map((p, i) => (
              <Fragment key={p.id}>
                <a href={`#${p.id}`} className={`sidebar-item name${active[i * 2] ? " active" : ""}`}>
                  {p.name}
                </a>
                {i < projects.length - 1 && (
                  <span className={`sidebar-item dash${active[i * 2 + 1] ? " active" : ""}`}>-</span>
                )}
              </Fragment>
            ))}
          </div>
        </aside>
        <div className="work-right">
          <h2 className="work-heading">
            <span>Things I’ve</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/stickers/balloon-dog.png")} alt="" />
            <span className="serif">made.</span>
          </h2>
          <div className="first-gap" />
          {projects.map((p, i) => (
            <Fragment key={p.id}>
              {i > 0 && <div className="project-gap" />}
              <div id={p.id} style={{ scrollMarginTop: "70px" }}>
                <ProjectCard
                  ref={(el) => {
                    cards.current[i] = el;
                  }}
                  name={p.name}
                  href={`/${p.id}`}
                  index={i}
                  image={p.image}
                  video={p.video}
                  cfg={REVEALS.card}
                />
              </div>
            </Fragment>
          ))}
          <div className="project-end" />
        </div>
      </div>
    </section>
  );
}
