import { chromium } from "playwright";
const url = process.argv[2]; const w = Number(process.argv[3] || 1440);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: w, height: 900 } });
await p.goto(url, { waitUntil: "networkidle" }); await p.waitForTimeout(1000);
const r = await p.evaluate(() => {
  const g = (s, i = 0) => { const e = document.querySelectorAll(s)[i]; if (!e) return null; const b = e.getBoundingClientRect(); return [b.x, b.y + scrollY, b.width, b.height].map(Math.round).join(","); };
  return { total: document.documentElement.scrollHeight, hero: g(".case-hero") || g(".showcase-hero"), down: g(".case-hero-down"), title: g(".showcase-title"),
    panel1: g(".media-panel"), info: g(".case-info"), statement: g(".case-statement"), tags: g(".case-tags"), gallery: g(".case-gallery"), pair: g(".media-pair"),
    discover: g(".discover"), viewport: g(".discover-viewport"), card0: g(".discover-card", 8), footer: g(".footer") };
});
for (const [k, v] of Object.entries(r)) console.log(k.padEnd(10), v);
const xs = () => p.evaluate(() => [...document.querySelectorAll(".discover-card")].slice(8, 11).map((a) => Math.round(a.getBoundingClientRect().x)).join(","));
console.log("ticker t0", await xs()); await p.waitForTimeout(2000); console.log("ticker t2", await xs());
await b.close();
