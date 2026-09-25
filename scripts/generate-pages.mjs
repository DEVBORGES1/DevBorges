// Gera os HTML de entrada de /projects/ e de cada projeto (pt e en) e o public/sitemap.xml.
// Rode `npm run pages` depois de adicionar ou editar um projeto em src/data/projectContent.js.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectIds, projectText } from '../src/data/projectContent.js';
import { projectRoute, routes } from '../src/i18n/routes.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const site = 'https://devborges.vercel.app';
const author = 'João Vitor Pereira';

const escape = (text) =>
    text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const htmlLang = { pt: 'pt-BR', en: 'en' };
const ogLocale = { pt: 'pt_BR', en: 'en_US' };

const projectsIndex = {
    pt: {
        title: `Projetos | ${author}`,
        description: `Todos os projetos de ${author}: apps mobile, sistemas full stack, sites para clientes e ferramentas com IA.`,
    },
    en: {
        title: `Projects | ${author}`,
        description: `All projects by ${author}: mobile apps, full stack systems, client websites and AI tools.`,
    },
};

const template = ({ locale, path, alternates, title, description, script, project }) => `<!doctype html>
<html lang="${htmlLang[locale]}"${project ? ` data-project="${project}"` : ''}>

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <script src="/theme-init.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#050505" />
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}" />
  <link rel="canonical" href="${site}${path}" />
  <link rel="alternate" hreflang="pt-BR" href="${site}${alternates.pt}" />
  <link rel="alternate" hreflang="en" href="${site}${alternates.en}" />
  <link rel="alternate" hreflang="x-default" href="${site}${alternates.pt}" />

  <meta property="og:type" content="${project ? 'article' : 'website'}" />
  <meta property="og:locale" content="${ogLocale[locale]}" />
  <meta property="og:site_name" content="DEVBORGES" />
  <meta property="og:url" content="${site}${path}" />
  <meta property="og:title" content="${escape(title)}" />
  <meta property="og:description" content="${escape(description)}" />
  <meta property="og:image" content="${site}/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${author} — Software Engineer · Full Stack" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escape(title)}" />
  <meta name="twitter:description" content="${escape(description)}" />
  <meta name="twitter:image" content="${site}/og-image.jpg" />
</head>

<body>
  <div id="root"></div>
  <script type="module" src="${script}"></script>
</body>

</html>
`;

// Caminho do HTML de entrada a partir da URL: /en/projects/rcp/ -> en/projects/rcp/index.html
const htmlFile = (path) => `${path.slice(1)}index.html`;

const write = async (file, content) => {
    await mkdir(dirname(`${root}${file}`), { recursive: true });
    await writeFile(`${root}${file}`, content);
    console.log(`Gerado: ${file}`);
};

for (const locale of ['pt', 'en']) {
    const path = routes.projects[locale];
    await write(htmlFile(path), template({
        locale,
        path,
        alternates: routes.projects,
        ...projectsIndex[locale],
        script: '/src/pages/projects/main.jsx',
    }));

    for (const id of projectIds) {
        const { title, description } = projectText[locale][id];
        const projectPath = projectRoute(id, locale);
        await write(htmlFile(projectPath), template({
            locale,
            path: projectPath,
            alternates: routes[`project-${id}`],
            title: `${title} | ${author}`,
            description,
            script: '/src/pages/project/main.jsx',
            project: id,
        }));
    }
}

// Sitemap com todas as páginas e suas versões em cada idioma
const sitemapEntries = Object.values(routes).flatMap((alternates) =>
    ['pt', 'en'].map((locale) => `  <url>
    <loc>${site}${alternates[locale]}</loc>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${site}${alternates.pt}" />
    <xhtml:link rel="alternate" hreflang="en" href="${site}${alternates.en}" />
  </url>`),
);

await write('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.join('\n')}
</urlset>
`);
