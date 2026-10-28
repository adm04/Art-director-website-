import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3123", { waitUntil: "networkidle" });
await p.waitForTimeout(1200);
const probe = () => p.evaluate(() => {
  const st = (e) => e ? `o${(+getComputedStyle(e).opacity).toFixed(3)} ${getComputedStyle(e).transform.replace("matrix(1, 0, 0, 1, 0, ", "ty").replace(")", "")}` : "-";
  const q = (s, i = 0) => document.querySelectorAll(s)[i];
  return {
    card: st(q(".hero-card")), tagline: st(q(".hero-tagline")), ruler: st(q(".hero-ruler")),
    c1: st(q(".project-card", 1)), c3: st(q(".project-card", 3)),
    line1: st(q(".m-line .reveal-inner", 0)), line3: st(q(".m-line .reveal-inner", 2)),
    strip: st(q(".strip")), intro: st(q(".intro")?.parentElement),
    side: [...document.querySelectorAll(".sidebar-item")].map((e) => (e.classList.contains("active") ? "X" : ".")).join(""),
    fontKeep: (() => { const e = document.querySelector(".footer-head .muted"); const r = document.createRange(); r.selectNodeContents(e); return Math.round(r.getBoundingClientRect().width); })(),
  };
});
// reference values recorded from the original at the same scroll positions
const expect = {
  50: "ruler o.275 ty44.9", 125: "tagline o.580 ty26.0", 500: "card o.623 ty23.4",
  1100: "c1 o.791 ty15.7 | side N0+D0? (orig at 1100: N0 only)", 2700: "c3 o.847 ty11.5",
  6900: "line1 o.578 ty27.8", 7300: "line3 o.853 ty9.7", 7900: "strip o.802 ty24.7", 8300: "intro o.583 ty18.3",
};
for (const y of [0, 50, 125, 500, 700, 1100, 1200, 1500, 2700, 6900, 7300, 7900, 8300]) {
  await p.evaluate((y) => window.scrollTo(0, y), y);
  await p.waitForTimeout(300);
  const r = await probe();
  console.log(String(y).padStart(5), JSON.stringify(r), expect[y] ? "  <= expect " + expect[y] : "");
}
// cursor label over a card
await p.evaluate(() => window.scrollTo(0, 1300)); await p.waitForTimeout(500);
await p.mouse.move(800, 400); await p.waitForTimeout(200); await p.mouse.move(820, 420); await p.waitForTimeout(1200);
console.log("cursor", await p.evaluate(() => { const e = document.querySelector(".cursor-label"); const r = e.getBoundingClientRect(); return [e.className, getComputedStyle(e).opacity, Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height), e.textContent].join(" "); }), "<= expect on, box 110x36 at ~765,402");
await b.close();
