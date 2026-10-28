import { chromium } from "playwright";
const url = process.argv[2] || "http://localhost:3123";
const w = Number(process.argv[3] || 1440);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: w, height: 900 } });
await p.goto(url, { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
const r = await p.evaluate(() => {
  const g = (s, i = 0) => { const e = document.querySelectorAll(s)[i]; if (!e) return null; const b = e.getBoundingClientRect(); return [b.x, b.y + scrollY, b.width, b.height].map(Math.round).join(","); };
  return {
    total: document.documentElement.scrollHeight,
    menu: g(".menu"), heroCard: g(".hero-card"), tagline: g(".hero-tagline"), heroRuler: g(".hero-ruler"),
    work: g(".work"), heading: g(".work-heading"), sidebarList: g(".sidebar-list"), card0: g(".project-card"), card1: g(".project-card", 1), card7: g(".project-card", 7),
    manifesto: g(".manifesto"), line1: g(".m-line"), line6: g(".m-line", 5),
    about: g(".about"), strip: g(".strip"), strip4: g(".strip-item", 3), intro: g(".intro"), ongoingCard: g(".ongoing-card"), clients: g(".clients"), awards: g(".awards"),
    footer: g(".footer"), form: g(".subscribe"), footerLinks: g(".footer-links"), address: g(".footer-address"),
  };
});
for (const [k, v] of Object.entries(r)) console.log(k.padEnd(12), v);
await b.close();
