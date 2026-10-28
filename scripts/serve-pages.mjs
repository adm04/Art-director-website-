// Serves ./out under /Art-director-website-/ to mimic GitHub Pages.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const BASE = "/Art-director-website-";
const ROOT = path.resolve("out");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".mp4": "video/mp4", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".txt": "text/plain" };
http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split("?")[0]);
  if (!u.startsWith(BASE)) { res.writeHead(404); return res.end(); }
  let f = path.join(ROOT, u.slice(BASE.length));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end("404"); }
  res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(4567, () => console.log("serving on 4567"));
