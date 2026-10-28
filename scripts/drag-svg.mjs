import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("https://portfolio2026tostandout.framer.website/honorable-studio", { waitUntil: "networkidle" });
const s = await p.evaluate(() => { const v = document.querySelector('[data-framer-name="drag"] [data-framer-name="Vector"]'); const svg = v.querySelector("svg"); const use = svg.querySelector("use"); if (use) { const id = use.getAttribute("href"); const d = document.querySelector(id); return svg.getAttribute("viewBox") + "\n" + d.innerHTML; } return svg.outerHTML; });
console.log(s.slice(0, 4000));
await b.close();
