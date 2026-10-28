import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://portfolio2026tostandout.framer.website/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.evaluate(() => window.scrollTo(0, 1300)); await page.waitForTimeout(800);
await page.mouse.move(800, 400); await page.waitForTimeout(800);
await page.mouse.move(820, 420); await page.waitForTimeout(1200);
const r = await page.evaluate(() => {
  const els = [...document.querySelectorAll("body *")].filter(e => e.childElementCount === 0 && e.textContent.trim() === "View work");
  return els.map(e => { const out = []; for (let n = e; n && n !== document.body; n = n.parentElement) { const cs = getComputedStyle(n); const b = n.getBoundingClientRect(); out.push([n.tagName, n.getAttribute("data-framer-name"), [b.x,b.y,b.width,b.height].map(Math.round).join(","), cs.position, cs.backgroundColor, cs.color, cs.fontFamily, cs.fontSize, cs.fontWeight, cs.letterSpacing, cs.lineHeight, cs.padding, cs.borderRadius, cs.border, cs.transform, cs.opacity, cs.pointerEvents, cs.zIndex].join(" ~ ")); if (out.length > 6) break; } return out; });
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
