import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("https://portfolio2026tostandout.framer.website/", { waitUntil: "networkidle" }); await p.waitForTimeout(1200);
const r = await p.evaluate(() => {
  const seen = new Map();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    const t = n.textContent.trim(); if (!t || t === "|" || /^\d+ px$/.test(t)) continue;
    const el = n.parentElement; const cs = getComputedStyle(el);
    const key = t.slice(0, 40);
    if (seen.has(key)) continue;
    seen.set(key, [cs.fontFamily.split(",")[0], cs.fontSize, cs.fontWeight, cs.lineHeight, cs.letterSpacing, cs.color].join(" / "));
  }
  return [...seen].map(([k, v]) => k.padEnd(42) + v);
});
console.log(r.join("\n"));
await b.close();
