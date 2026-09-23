import { readFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import ts from "typescript";

const root = join(import.meta.dirname, "..");
const source = await readFile(join(root, "src/lib/portfolio.ts"), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { projects } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const template = await readFile(join(root, "dist/index.html"), "utf8");
const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

for (const project of projects) {
  const title = `${project.title} | MellowCat`;
  const description = project.seoDescription.ko;
  const url = `https://mellowcat.xyz${project.path}`;
  const image = `https://mellowcat.xyz${project.image}`;
  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`)
    .replace('<div id="root"></div>', `<div id="root"><main><h1>${escapeHtml(project.title)}</h1><p>${escapeHtml(project.summary.ko)}</p><p>${escapeHtml(description)}</p><img src="${project.image}" alt="${escapeHtml(project.imageAlt.ko)}" /></main></div>`);
  const destination = join(root, "dist", project.path.slice(1));
  await mkdir(destination, { recursive: true });
  await writeFile(join(destination, "index.html"), html);
}
