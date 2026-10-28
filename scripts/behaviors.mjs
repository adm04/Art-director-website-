import { chromium } from "playwright";
import fs from "node:fs/promises";

const URL = "https://portfolio2026tostandout.framer.website/";
const width = Number(process.argv[2] || 1440);
const out = process.argv[3] || "docs/research/scroll-samples-desktop.json";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(2500);

const probe = () => {
  const pick = (el) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { o: cs.opacity, t: cs.transform === "none" ? "" : cs.transform, f: cs.filter === "none" ? "" : cs.filter, y: Math.round(r.y), x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height) };
  };
  const byName = (n, i = 0) => document.querySelectorAll(`[data-framer-name="${n}"]`)[i];
  const res = { scrollY: Math.round(scrollY) };
  res.menu = pick(byName("Menu"));
  res.heroUp = pick(byName("UP"));
  res.heroDown = pick(byName("Down"));
  res.heroCard = pick(byName("Exclude (2) 1"));
  res.heroOverlay = pick(byName("black overlay"));
  res.heroVideo = pick(document.querySelector('[data-framer-name="Hero"] video'));
  res.upNumbers = pick(byName("Up Numbers"));
  res.numberHide = pick(document.getElementById("number-hide"));
  res.group20 = pick(byName("Group 20 (2) 1"));
  res.mainText = pick(document.getElementById("main-card-hide"));
  res.sidebar = pick(byName("Side bar left"));
  res.sideItems = [...document.querySelectorAll('[data-framer-name="Project names"] p')].map((p) => getComputedStyle(p).color + " " + getComputedStyle(p.parentElement).transform);
  for (const id of ["honorable-studio", "rewardal", "portfolio-exp", "truva", "mobile-exp", "trupartner", "seller-dashboard", "website-exp"]) res[id] = pick(document.getElementById(id));
  res.staging = pick(byName("Staging"));
  for (const n of ["First line", "Second line", "Third line", "Fourth line", "Fifth line", "Sixth line", "Killer duck", "You and me", "Hello kitty", "Orange frog", "Trust me", "Fire frog"]) res[n] = pick(byName(n));
  res.imageCollection = pick(document.getElementById("image-colllection-ani"));
  res.intro = pick(byName("Hi, myself Ayush Halder, a product designer and art director who likes turning messy ideas into clear, useful, and memorable experiences."));
  res.aboutRewardal = pick(document.querySelector('[data-framer-name="My ongoing work"] a[data-framer-name="Rewardal"]'));
  res.logos = pick(byName("logos"));
  res.awards = pick(byName("awards"));
  res.introSpans = [...(byName("Hi, myself Ayush Halder, a product designer and art director who likes turning messy ideas into clear, useful, and memorable experiences.")?.querySelectorAll("span") || [])].map((s) => getComputedStyle(s).color).slice(0, 40);
  return res;
};

const samples = [];
const total = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y <= total; y += 100) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(260);
  samples.push(await page.evaluate(probe));
}
// settle check: repeat a few positions with long waits to separate time-based from scroll-linked
const settled = [];
for (const y of [1000, 2000, 7700, 8000, 8400, 9100, 9400, 9950]) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(2500);
  settled.push(await page.evaluate(probe));
}
await fs.writeFile(out, JSON.stringify({ samples, settled }, null, 1));
console.log(samples.length);
await browser.close();
