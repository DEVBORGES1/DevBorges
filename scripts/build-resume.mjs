// Gera o PDF do currículo em inglês a partir de resume/en.html.
// Uso: npm run resume  (requer o Chromium do Playwright: npx playwright install chromium)
import { chromium } from '@playwright/test';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const source = pathToFileURL(`${root}resume/en.html`).href;
const output = `${root}public/resume-joao-vitor-pereira.pdf`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(source, { waitUntil: 'networkidle' });
await page.evaluate(() => globalThis.document.fonts.ready);
await page.pdf({ path: output, preferCSSPageSize: true, printBackground: true });
await browser.close();

console.log(`Currículo gerado: public/resume-joao-vitor-pereira.pdf`);
