import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Pass an installed Sharp module path to regenerate assets without adding a runtime dependency.
const require = createRequire(import.meta.url);
const sharp = require(process.argv[2] || "sharp");
const source = fileURLToPath(new URL("../public/favicon.svg", import.meta.url));
const output = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

await sharp(source).resize(192, 192).png().toFile(output("favicon.png"));
await sharp(source).resize(180, 180).png().toFile(output("apple-touch-icon.png"));

const sizes = [16, 32, 48, 96, 192];
const images = await Promise.all(sizes.map((size) => sharp(source).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((image, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile(output("favicon.ico"), Buffer.concat([header, ...images]));
