import { chromium } from "playwright";
import fs from "node:fs/promises";

const BASE = "https://portfolio2026tostandout.framer.website/";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const out = {};

await p.goto(BASE + "honorable-studio", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);

// leaf fonts
out.fonts = await p.evaluate(() => {
  const seen = {}; const w = document.createTreeWalker(document.querySelector("main"), NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) { const t = n.textContent.trim(); if (!t || seen[t.slice(0, 30)]) continue; const cs = getComputedStyle(n.parentElement); seen[t.slice(0, 30)] = [cs.fontFamily.split(",")[0], cs.fontSize, cs.fontWeight, cs.lineHeight, cs.letterSpacing, cs.color, cs.textAlign].join(" / "); }
  return seen;
});

const st = () => p.evaluate(() => {
  const f = (e) => { if (!e) return null; const c = getComputedStyle(e); const r = e.getBoundingClientRect(); return `o${(+c.opacity).toFixed(3)} y${Math.round(r.y)} x${Math.round(r.x)} ${c.transform === "none" ? "" : c.transform}`; };
  const q = (s, i = 0) => document.querySelectorAll(s)[i];
  const res = {};
  document.querySelectorAll('[data-framer-name="hero"] > div').forEach((d, i) => (res["hero" + i + ":" + (d.getAttribute("data-framer-name") || "").slice(0, 14)] = f(d)));
  res.video1 = f(q('[data-framer-name="product video"]', 0));
  res.info = f(q('[data-framer-name="Info"]'));
  res.top = f(q('[data-framer-name="top"]'));
  res.tags = f(q('[data-framer-name="Info"] [data-framer-name="down"]'));
  res.video2 = f(q('[data-framer-name="product video"]', 1));
  res.images = f(q('[data-framer-name="images"]'));
  res.video3 = f(q('[data-framer-name="product video"]', 2));
  res.seeWork = f(q('[data-framer-name="See work"]'));
  res.firstCard = f(q('[data-framer-name="See work"] a'));
  return res;
});

out.scroll = [];
const total = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y <= total; y += 150) {
  await p.evaluate((y) => window.scrollTo(0, y), y);
  await p.waitForTimeout(250);
  out.scroll.push([y, await st()]);
}

// carousel: auto-moving over time?
await p.evaluate(() => document.querySelector('[data-framer-name="See work"]').scrollIntoView({ block: "center" }));
await p.waitForTimeout(800);
const cardXs = () => p.evaluate(() => [...document.querySelectorAll('[data-framer-name="See work"] a')].map((a) => Math.round(a.getBoundingClientRect().x)).join(","));
out.carousel = { t0: await cardXs() };
await p.waitForTimeout(2000); out.carousel.t2 = await cardXs();
await p.waitForTimeout(2000); out.carousel.t4 = await cardXs();
// carousel container styles
out.carousel.container = await p.evaluate(() => {
  const proj = document.querySelector('[data-framer-name="See work"] [data-framer-name="Projects"]');
  const chain = []; let e = document.querySelector('[data-framer-name="See work"] a');
  for (let i = 0; i < 6 && e && e !== proj.parentElement; i++, e = e.parentElement) { const c = getComputedStyle(e); chain.push([e.tagName, e.getAttribute("data-framer-name"), c.display, c.overflow, c.cursor, c.transform, c.gap, c.touchAction, c.maskImage?.slice(0, 80)].join(" ~ ")); }
  return chain;
});
// drag
const box = await p.evaluate(() => { const r = document.querySelector('[data-framer-name="See work"] [data-framer-name="Projects"]').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
await p.mouse.move(box.x, box.y); await p.mouse.down(); await p.mouse.move(box.x - 300, box.y, { steps: 10 }); await p.mouse.up();
await p.waitForTimeout(100); out.carousel.afterDrag100 = await cardXs();
await p.waitForTimeout(1500); out.carousel.afterDrag1600 = await cardXs();
// hover on a card
await p.mouse.move(box.x, box.y); await p.waitForTimeout(800);
out.carousel.hoverCursor = await p.evaluate(() => { const l = [...document.querySelectorAll("p")].find((x) => x.textContent.trim() === "View work"); return l ? "label visible" : "no label"; });
await p.screenshot({ path: "docs/design-references/inner/hs-carousel-hover.png" });

// other pages: template check
out.pages = {};
for (const slug of ["rewardal", "portfolio-exp", "truva", "app-exp", "trupartner", "seller-dashboard", "website-exp"]) {
  await p.goto(BASE + slug, { waitUntil: "networkidle" });
  await p.waitForTimeout(800);
  out.pages[slug] = await p.evaluate(() => {
    const main = document.querySelector("main");
    const secs = [...main.children].map((s) => `${s.getAttribute("data-framer-name")} ${Math.round(s.getBoundingClientRect().height)} [${[...s.children].map((c) => (c.getAttribute("data-framer-name") || c.tagName) + ":" + Math.round(c.getBoundingClientRect().height)).join(", ")}]`);
    return { height: document.documentElement.scrollHeight, secs, texts: [...main.querySelectorAll("p")].map((x) => x.textContent.trim()).filter(Boolean).slice(0, 14) };
  });
}
await fs.writeFile("docs/research/inner/probe.json", JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.fonts, null, 1));
console.log(JSON.stringify(out.carousel, null, 1));
for (const [k, v] of Object.entries(out.pages)) console.log("##", k, v.height, "\n  " + v.secs.join("\n  "), "\n  TEXT:", v.texts.join(" | "));
await b.close();
