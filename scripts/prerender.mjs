// Injeta o HTML renderizado no servidor em cada página de dist/.
// Roda depois de `vite build` (cliente) e `vite build --ssr` (servidor).
import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { pages } from './pages.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = `${root}dist`;

const { render } = await import(pathToFileURL(`${root}dist-ssr/entry-server.js`).href);

// Preload das fontes latinas (Inter, Fira Code e Syne): chegam antes da primeira pintura,
// evitando a troca de fonte que desloca o texto.
const fontFiles = (await readdir(`${dist}/assets`)).filter((file) =>
    /^(inter|fira-code|syne)-latin-wght-normal-.*\.woff2$/.test(file),
);
const preloadTags = fontFiles
    .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`)
    .join('\n  ');

const placeholder = '<div id="root"></div>';
const stylesheetTag = /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g;

for (const page of pages) {
    const path = `${dist}/${page.html}`;
    const template = await readFile(path, 'utf-8');
    if (!template.includes(placeholder)) {
        throw new Error(`Placeholder ${placeholder} não encontrado em ${page.html}`);
    }

    const appHtml = render(page.name);
    let html = template.replace(placeholder, () => `<div id="root">${appHtml}</div>`);

    // Embute o CSS no HTML: elimina requisições que bloqueiam a primeira pintura.
    for (const [tag, href] of [...html.matchAll(stylesheetTag)]) {
        const css = await readFile(`${dist}${href}`, 'utf-8');
        html = html.replace(tag, () => `<style>${css}</style>`);
    }

    html = html.replace('</title>', () => `</title>\n  ${preloadTags}`);
    await writeFile(path, html);

    console.log(`Pré-renderizado: ${page.html} (${(appHtml.length / 1024).toFixed(1)} KB de HTML)`);
}

await rm(`${root}dist-ssr`, { recursive: true, force: true });
