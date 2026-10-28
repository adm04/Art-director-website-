import { chromium } from "playwright";
import fs from "node:fs/promises";

const URL = "https://portfolio2026tostandout.framer.website/";
const OUT = "docs/research";
const REF = "docs/design-references";

async function autoScroll(page) {
  await page.evaluate(async () => {
    const step = 300;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });
}

const browser = await chromium.launch();
for (const [name, width, height] of [["desktop", 1440, 900], ["tablet", 768, 1024], ["mobile", 390, 844]]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 90000 });
  await autoScroll(page);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${REF}/full-${name}.png`, fullPage: true });

  if (name === "desktop") {
    await fs.writeFile(`${OUT}/rendered.html`, await page.content());
    const info = await page.evaluate(() => {
      const abs = (u) => { try { return new URL(u, location.href).href; } catch { return u; } };
      return {
        title: document.title,
        scrollHeight: document.documentElement.scrollHeight,
        meta: [...document.querySelectorAll("meta")].map((m) => ({ name: m.getAttribute("name") || m.getAttribute("property"), content: m.content })).filter((m) => m.name),
        links: [...document.querySelectorAll("link")].map((l) => ({ rel: l.rel, href: l.href, sizes: l.sizes?.toString() })),
        images: [...document.querySelectorAll("img")].map((img) => ({
          src: img.currentSrc || img.src, srcset: img.srcset, alt: img.alt,
          w: img.naturalWidth, h: img.naturalHeight,
          rect: (() => { const r = img.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)]; })(),
          objectFit: getComputedStyle(img).objectFit,
        })),
        videos: [...document.querySelectorAll("video")].map((v) => ({ src: v.currentSrc || v.src || v.querySelector("source")?.src, poster: v.poster, autoplay: v.autoplay, loop: v.loop, muted: v.muted })),
        backgroundImages: [...document.querySelectorAll("*")].map((el) => getComputedStyle(el).backgroundImage).filter((b) => b && b !== "none" && b.includes("url(")),
        svgCount: document.querySelectorAll("svg").length,
        fontFaces: [...document.fonts].map((f) => ({ family: f.family, weight: f.weight, style: f.style, status: f.status })),
        fontFaceRules: [...document.styleSheets].flatMap((s) => { try { return [...s.cssRules]; } catch { return []; } })
          .filter((r) => r.constructor.name === "CSSFontFaceRule").map((r) => r.cssText),
        usedFamilies: [...new Set([...document.querySelectorAll("body *")].map((el) => getComputedStyle(el).fontFamily))],
        bodyBg: getComputedStyle(document.body).backgroundColor,
        anchors: [...document.querySelectorAll("a")].map((a) => ({ href: a.href, text: a.textContent.trim().slice(0, 80) })),
        hasLenis: !!document.querySelector(".lenis, [data-lenis-prevent]") || document.documentElement.className.includes("lenis"),
      };
    });
    await fs.writeFile(`${OUT}/recon.json`, JSON.stringify(info, null, 2));
    const text = await page.evaluate(() => document.body.innerText);
    await fs.writeFile(`${OUT}/page-text.txt`, text);
  }
  await page.close();
}
await browser.close();
console.log("done");
