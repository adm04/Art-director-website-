"use client";

import { useEffect, useRef, useState } from "react";

/** White "View work" label that trails the pointer over any [data-cursor] element. */
export function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const target = { x: -200, y: -200 };
    const pos = { x: -200, y: -200 };
    let id = 0;
    let first = true;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (first) {
        pos.x = target.x;
        pos.y = target.y;
        first = false;
      }
      const hit = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(hit ? hit.getAttribute("data-cursor") : null);
    };
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.25;
      pos.y += (target.y - pos.y) * 0.25;
      const el = ref.current;
      if (el) el.style.transform = `translate(${pos.x - el.offsetWidth / 2}px, ${pos.y - el.offsetHeight / 2}px)`;
      id = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove);
    id = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div ref={ref} className={`cursor-label${label ? " on" : ""}`} aria-hidden="true">
      {label ?? "View work"}
    </div>
  );
}
