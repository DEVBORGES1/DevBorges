// Injeta o HTML renderizado no servidor dentro de dist/index.html.
// Roda depois de `vite build` (cliente) e `vite build --ssr` (servidor).
import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const indexPath = `${root}dist/index.html`;
const serverEntry = pathToFileURL(`${root}dist-ssr/entry-server.js`).href;

const { render } = await import(serverEntry);
const appHtml = render();

const template = await readFile(indexPath, 'utf-8');
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
    throw new Error(`Placeholder ${placeholder} não encontrado em dist/index.html`);
}

let html = template.replace(placeholder, `<div id="root">${appHtml}</div>`);

// Embute o CSS no HTML: elimina uma requisição que bloqueia a primeira pintura.
const stylesheetTag = /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g;
for (const [tag, href] of [...html.matchAll(stylesheetTag)]) {
    const css = await readFile(`${root}dist${href}`, 'utf-8');
    html = html.replace(tag, () => `<style>${css}</style>`);
}

// Preload das fontes latinas (Inter e Fira Code): chegam antes da primeira pintura,
// evitando a troca de fonte que desloca o texto do hero.
const fontFiles = (await readdir(`${root}dist/assets`)).filter((file) =>
    /^(inter|fira-code)-latin-wght-normal-.*\.woff2$/.test(file),
);
const preloadTags = fontFiles
    .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`)
    .join('\n  ');
html = html.replace('</title>', () => `</title>\n  ${preloadTags}`);

await writeFile(indexPath, html);
await rm(`${root}dist-ssr`, { recursive: true, force: true });

console.log(`Pré-renderização concluída: ${(appHtml.length / 1024).toFixed(1)} KB de HTML em dist/index.html`);
