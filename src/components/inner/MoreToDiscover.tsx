"use client";

import Link from "next/link";
import { asset } from "@/lib/asset";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { DragHand } from "@/components/icons";

// Measured on the reference: the ticker drifts right at 20px/s, loops forever,
// and can be flung by dragging (momentum, then the drift resumes).
const SPEED = 20;
const FRICTION = 0.95; // per 60fps frame
const COPIES = 3;

export function MoreToDiscover() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const el = track.current;
    const vp = viewport.current;
    if (!el || !vp) return;

    let offset = 118; // first card sits 118px into the row on load (reference)
    let velocity = 0;
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let lastT = 0;
    let prev = performance.now();
    let id = 0;

    const setWidth = () => el.scrollWidth / COPIES;
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!dragging) {
        if (Math.abs(velocity) > 5) {
          offset += velocity * dt;
          velocity *= Math.pow(FRICTION, dt * 60);
        } else {
          velocity = 0;
          offset += SPEED * dt;
        }
      }
      const w = setWidth();
      if (w > 0) {
        const wrapped = ((offset % w) + w) % w;
        el.style.transform = `translate3d(${wrapped - w}px,0,0)`;
      }
      id = requestAnimationFrame(frame);
    };
    id = requestAnimationFrame(frame);

    const down = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      velocity = 0;
      lastX = e.clientX;
      lastT = performance.now();
      vp.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      offset += dx;
      moved += Math.abs(dx);
      velocity = (dx / Math.max(1, now - lastT)) * 1000;
      lastX = e.clientX;
      lastT = now;
    };
    const up = () => {
      dragging = false;
    };
    // A drag shouldn't also open the card under the pointer.
    const click = (e: MouseEvent) => {
      if (moved > 5) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    vp.addEventListener("pointerdown", down);
    vp.addEventListener("pointermove", move);
    vp.addEventListener("pointerup", up);
    vp.addEventListener("pointercancel", up);
    vp.addEventListener("click", click, true);
    return () => {
      cancelAnimationFrame(id);
      vp.removeEventListener("pointerdown", down);
      vp.removeEventListener("pointermove", move);
      vp.removeEventListener("pointerup", up);
      vp.removeEventListener("pointercancel", up);
      vp.removeEventListener("click", click, true);
    };
  }, []);

  return (
    <section className="inner-section discover-section">
      <div className="discover">
        <div className="discover-head">
          <span>More to discover</span>
          <span className="drag">
            Drag
            <DragHand />
          </span>
        </div>
        <div ref={viewport} className="discover-viewport">
          <div ref={track} className="discover-track">
            {Array.from({ length: COPIES }, (_, c) =>
              site.projects.map((p) => (
                <Link
                  key={`${c}-${p.id}`}
                  href={`/${p.id}`}
                  className="discover-card"
                  data-cursor="View work"
                  draggable={false}
                  aria-hidden={c > 0 || undefined}
                  tabIndex={c > 0 ? -1 : undefined}
                >
                  {p.video ? (
                    <video src={asset(p.video)} autoPlay loop muted playsInline />
                  ) : p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={asset(p.image)} alt="" draggable={false} />
                  ) : (
                    <div className="placeholder-media" />
                  )}
                  <span className="project-label">{p.name}</span>
                </Link>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
