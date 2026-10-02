// Gera os PDFs do currículo a partir de resume/pt.html e resume/en.html.
// Uso: npm run resume  (requer o Chromium do Playwright: npx playwright install chromium)
import { chromium } from '@playwright/test';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const resumes = [
    { source: 'resume/pt.html', output: 'public/curriculo-joao-vitor-pereira.pdf' },
    { source: 'resume/en.html', output: 'public/resume-joao-vitor-pereira.pdf' },
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const { source, output } of resumes) {
    await page.goto(pathToFileURL(`${root}${source}`).href, { waitUntil: 'networkidle' });
    await page.evaluate(() => globalThis.document.fonts.ready);
    await page.pdf({ path: `${root}${output}`, preferCSSPageSize: true, printBackground: true });
    console.log(`Currículo gerado: ${output}`);
}
await browser.close();
