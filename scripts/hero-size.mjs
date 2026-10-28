import { chromium } from "playwright";
const b = await chromium.launch();
for (const [w, h] of [[1909, 868], [1440, 700], [1366, 640]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto("https://portfolio2026tostandout.framer.website/", { waitUntil: "networkidle" }); await p.waitForTimeout(800);
  const o = await p.evaluate(() => { const g = (s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return [Math.round(r.y), Math.round(r.height)].join("/"); }; return { hero: g('[data-framer-name="Hero"]'), tagline: g('[data-framer-name="Hero"] [data-framer-name="Text"]'), card: g('[data-framer-name="Exclude (2) 1"]'), cardW: Math.round(document.querySelector('[data-framer-name="Exclude (2) 1"]').getBoundingClientRect().width) }; });
  await p.goto(process.argv[2] || "https://adm04.github.io/Art-director-website-/", { waitUntil: "networkidle" }); await p.waitForTimeout(800);
  const c = await p.evaluate(() => { const g = (s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return [Math.round(r.y), Math.round(r.height)].join("/"); }; return { hero: g(".hero"), tagline: g(".hero-tagline"), card: g(".hero-card"), cardW: Math.round(document.querySelector(".hero-card").getBoundingClientRect().width) }; });
  console.log(`${w}x${h}  original ${JSON.stringify(o)}\n            clone    ${JSON.stringify(c)}`);
  if (w === 1909) await p.screenshot({ path: "docs/qa/live-1909.png" });
  await p.close();
}
await b.close();
