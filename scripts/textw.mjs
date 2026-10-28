import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const url of ["https://portfolio2026tostandout.framer.website/", "http://localhost:3123"]) {
  await p.goto(url, { waitUntil: "networkidle" }); await p.waitForTimeout(1200);
  console.log(url, JSON.stringify(await p.evaluate(() => {
    const out = {};
    for (const t of ["Keep in touch.", "Get updates when I post", "Email", "Work &", "Social:"]) {
      const el = [...document.querySelectorAll("p, span, label, h2")].find((e) => e.childElementCount === 0 && e.textContent.trim() === t);
      if (!el) continue; const r = document.createRange(); r.selectNodeContents(el);
      const cs = getComputedStyle(el);
      out[t] = [Math.round(r.getBoundingClientRect().width * 10) / 10, cs.fontFamily.slice(0, 30), cs.fontSize, cs.fontWeight, cs.letterSpacing, cs.fontFeatureSettings, cs.fontVariationSettings, cs.fontOpticalSizing];
    }
    out.fonts = [...document.fonts].filter(f => /inter/i.test(f.family) && f.status === "loaded").map(f => f.family + " " + f.weight + " " + f.style).slice(0, 8);
    return out;
  })));
}
await b.close();
