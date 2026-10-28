import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("https://portfolio2026tostandout.framer.website/", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
for (let y = 0; y <= 500; y += 25) {
  await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(250);
  const r = await p.evaluate(() => {
    const hero = document.querySelector('[data-framer-name="Hero"]');
    const t = hero.querySelector('[data-framer-name="Text"]');
    const n = hero.querySelectorAll('[data-framer-name="Number PX"]')[1];
    const f = (e) => { const c = getComputedStyle(e); return c.opacity + " " + c.transform.replace("matrix(1, 0, 0, 1, 0, ", "ty").replace(")", ""); };
    return f(t) + " | " + f(n);
  });
  console.log(y, r);
}
await b.close();
