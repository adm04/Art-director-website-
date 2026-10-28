import fs from "node:fs/promises";
import path from "node:path";
const recon = JSON.parse(await fs.readFile("docs/research/recon.json", "utf8"));
const urls = new Set();
for (const i of recon.images) urls.add(i.src.split("?")[0]);
for (const v of recon.videos) { if (v.src) urls.add(v.src); if (v.poster) urls.add(v.poster.split("?")[0]); }
const dir = "docs/design-references/assets";
await fs.mkdir(dir, { recursive: true });
const list = [...urls];
for (let i = 0; i < list.length; i += 4) {
  await Promise.all(list.slice(i, i + 4).map(async (u) => {
    try { const r = await fetch(u); if (!r.ok) throw new Error(r.status); await fs.writeFile(path.join(dir, path.basename(new URL(u).pathname)), Buffer.from(await r.arrayBuffer())); }
    catch (e) { console.error("FAIL", u, e.message); }
  }));
}
console.log(list.length);
