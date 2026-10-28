import { chromium } from "playwright";

const URL = process.argv[2] || "https://portfolio2026tostandout.framer.website/";
const width = Number(process.argv[3] || 1440);
const height = Number(process.argv[4] || 900);
const prefix = process.argv[5] || "slice-desktop";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(2500);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
let i = 0;
for (let y = 0; y < total; y += height) {
  await page.mouse.wheel(0, i === 0 ? 0 : height);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `docs/design-references/inner/${prefix}-${String(i).padStart(2, "0")}.png` });
  i++;
}
console.log(total, i);
await browser.close();
