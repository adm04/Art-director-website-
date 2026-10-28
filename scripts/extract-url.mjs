import { chromium } from "playwright";
import fs from "node:fs/promises";

const URL = process.argv[4] || "https://portfolio2026tostandout.framer.website/";
const width = Number(process.argv[2] || 1440);
const out = process.argv[3] || "docs/research/layers-desktop.json";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
await page.evaluate(async () => {
  for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 100));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(2000);

const data = await page.evaluate(() => {
  const keep = ["display","position","top","left","right","bottom","width","height","flexDirection","justifyContent","alignItems","gap","padding","backgroundColor","backgroundImage","borderRadius","border","boxShadow","overflow","opacity","transform","zIndex","color","fontFamily","fontSize","fontWeight","fontStyle","lineHeight","letterSpacing","textAlign","textDecoration","mixBlendMode","filter","backdropFilter","objectFit","transition"];
  const skip = new Set(["none","normal","auto","0px","rgba(0, 0, 0, 0)","static","visible","1","start","0px none rgb(0, 0, 0)"]);
  const nodes = [];
  const all = document.querySelectorAll("[data-framer-name], h1, h2, h3, h4, h5, h6, p, a, img, video, svg, input, button");
  for (const el of all) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const cs = getComputedStyle(el);
    const s = {};
    for (const k of keep) { const v = cs[k]; if (v && !skip.has(v)) s[k] = v; }
    let depth = 0; for (let p = el.parentElement; p; p = p.parentElement) depth++;
    const direct = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(" ").trim();
    nodes.push({
      d: depth,
      tag: el.tagName.toLowerCase(),
      name: el.getAttribute("data-framer-name"),
      id: el.id || undefined,
      rect: [Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)],
      text: ["h1","h2","h3","h4","h5","h6","p","a","span","button"].includes(el.tagName.toLowerCase()) ? el.textContent.trim().slice(0, 140) : (direct || undefined),
      src: el.currentSrc || el.src || undefined,
      href: el.getAttribute("href") || undefined,
      svg: el.tagName === "svg" || el.tagName === "SVG" ? el.outerHTML.slice(0, 4000) : undefined,
      s,
    });
  }
  const sheets = [...document.styleSheets].flatMap((sh) => { try { return [...sh.cssRules].map((r) => r.cssText); } catch { return []; } });
  return { nodes, keyframes: sheets.filter((t) => t.startsWith("@keyframes")), media: sheets.filter((t) => t.startsWith("@media")).map((t) => t.slice(0, 120)) };
});
await fs.writeFile(out, JSON.stringify(data, null, 1));
console.log(data.nodes.length, data.keyframes.length);
await browser.close();
