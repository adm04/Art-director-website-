import { chromium } from "playwright";
const base = process.argv[2] || "http://localhost:4567/Art-director-website-/";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const bad = [];
p.on("response", (r) => { if (r.status() >= 400) bad.push(r.status() + " " + r.url()); });
p.on("requestfailed", (r) => { if (!r.url().endsWith(".mp4")) bad.push("FAILED " + r.url()); });
for (const path of ["", "project-01/", "project-03/"]) {
  await p.goto(base + path, { waitUntil: "networkidle", timeout: 90000 });
  await p.waitForTimeout(800);
  const info = await p.evaluate(() => ({ title: document.title, styled: getComputedStyle(document.querySelector(".menu")).position, h: document.documentElement.scrollHeight }));
  console.log(path || "/", JSON.stringify(info));
}
await p.goto(base, { waitUntil: "networkidle" });
await p.evaluate(() => window.scrollTo(0, 7300)); await p.waitForTimeout(1200);
await p.screenshot({ path: "docs/qa/pages-manifesto.png" });
// click-through: home card -> project page
await p.evaluate(() => window.scrollTo(0, 1300)); await p.waitForTimeout(600);
await p.locator(".project-card").nth(1).click({ force: true }); await p.waitForTimeout(1500);
console.log("after click:", p.url());
console.log(bad.length ? "BAD:\n" + [...new Set(bad)].join("\n") : "no failed requests");
await b.close();
