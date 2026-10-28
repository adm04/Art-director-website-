import { chromium } from "playwright";
import fs from "node:fs/promises";
const b64 = (await fs.readFile("docs/design-references/assets/MQz3fWPr2GqKr04eZhHTd4nKEz0.png")).toString("base64");
const browser = await chromium.launch();
const page = await browser.newPage();
const data = await page.evaluate(async (src) => {
  const img = new Image(); img.src = src; await img.decode();
  const sx = Math.round(img.width * 1130 / 2000), sw = Math.round(img.width * 222 / 2000);
  const c = document.createElement("canvas"); c.width = sw; c.height = img.height;
  c.getContext("2d").drawImage(img, sx, 0, sw, img.height, 0, 0, sw, img.height);
  return c.toDataURL("image/png").split(",")[1];
}, "data:image/png;base64," + b64);
await fs.writeFile("public/stickers/balloon-dog.png", Buffer.from(data, "base64"));
await browser.close();
