import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("https://portfolio2026tostandout.framer.website/", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
for (const y of [0, 500, 900, 1200, 3000, 6500, 7000, 7600]) {
  await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(400);
  const r = await p.evaluate(() => {
    const hero = document.querySelector('[data-framer-name="Hero"]');
    const b = hero.getBoundingClientRect();
    const out = { hero: [Math.round(b.y), Math.round(b.height), getComputedStyle(hero).opacity, getComputedStyle(hero).position, getComputedStyle(hero).top] };
    for (const n of ["Down", "Text", "UP", "Number PX", "black overlay", "Exclude (2) 1"]) {
      const els = hero.querySelectorAll(`[data-framer-name="${n}"]`);
      out[n] = [...els].map(e => { const c = getComputedStyle(e); const r = e.getBoundingClientRect(); return `o${c.opacity} v${c.visibility} y${Math.round(r.y)} ${c.transform}`; });
    }
    return out;
  });
  console.log(y, JSON.stringify(r));
}
await b.close();
