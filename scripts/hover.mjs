import { chromium } from "playwright";
import fs from "node:fs/promises";

const URL = "https://portfolio2026tostandout.framer.website/";
const browser = await chromium.launch();

if (false) // 1000px layout check
{
  const page = await browser.newPage({ viewport: { width: 1000, height: 900 } });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "docs/design-references/w1000-hero.png" });
  await page.evaluate(() => window.scrollTo(0, 1100));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "docs/design-references/w1000-work.png" });
  const r = await page.evaluate(() => {
    const g = (n) => { const e = document.querySelector(`[data-framer-name="${n}"]`); if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y + scrollY), Math.round(b.width), Math.round(b.height)]; };
    return { side: g("Side bar left"), right: g("Right"), card: g("Honorable studio"), menu: g("Menu"), mainText: g("Main text"), firstLine: g("First line"), ongoing: g("My ongoing work"), logos: g("logos") };
  });
  console.log("w1000", JSON.stringify(r));
  await page.close();
}

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(2000);

const snap = (sel) => page.evaluate((sel) => {
  const el = document.querySelector(sel);
  if (!el) return null;
  const out = [];
  for (const e of [el, ...el.querySelectorAll("*")].slice(0, 30)) {
    const cs = getComputedStyle(e);
    out.push([e.tagName, e.getAttribute("data-framer-name"), cs.opacity, cs.transform, cs.color, cs.backgroundColor, cs.textDecorationLine, cs.cursor, cs.filter, cs.scale, cs.boxShadow].join("~"));
  }
  return out;
}, sel);

const targets = [
  ["navWork", '[data-framer-name="low"] a[href*="work"]'],
  ["navLinkedIn", '[data-framer-name="low"] a[href*="linkedin"]'],
  ["navLogo", '[data-framer-name="Frame 1073716227"]'],
  ["banner", '[data-framer-name="up"] a'],
  ["sideName", '[data-framer-name="Project names"] a'],
  ["card", "#rewardal"],
  ["joinWaitlist", '[data-framer-name="down"]'],
  ["footerHome", '[data-framer-name="Home"] a'],
  ["emailBtn", 'button[data-framer-name="Default"]'],
  ["aboutCard", '[data-framer-name="My ongoing work"] a[data-framer-name="Rewardal"]'],
];
const res = {};
for (const [k, sel] of targets) {
  const loc = page.locator(sel).first();
  if (!(await loc.count())) { res[k] = "missing"; continue; }
  await loc.scrollIntoViewIfNeeded();
  await page.mouse.move(5, 5);
  await page.waitForTimeout(900);
  const a = await snap(sel);
  await loc.hover({ force: true });
  await page.waitForTimeout(250);
  const mid = await snap(sel);
  await page.waitForTimeout(1200);
  const b = await snap(sel);
  if (!a || !b) { res[k] = ["DOM changed on hover: before=" + JSON.stringify(a).slice(0,600) + " after=" + JSON.stringify(b).slice(0,600)]; continue; }
  const diff = a.map((v, i) => (v !== b[i] ? `${i}: ${v}  =>  ${b[i]}  (mid ${mid[i]})` : null)).filter(Boolean);
  res[k] = diff;
  if (k === "card") await page.screenshot({ path: "docs/design-references/hover-card.png" });
}
// cursor follower check on card
await fs.writeFile("docs/research/hover.json", JSON.stringify(res, null, 1));
for (const [k, v] of Object.entries(res)) console.log("##", k, Array.isArray(v) ? v.join("\n   ") : v);
await browser.close();
