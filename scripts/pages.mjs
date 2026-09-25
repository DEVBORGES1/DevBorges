// Lista única das páginas do site, usada pelo vite.config.js (entradas do build),
// pelo scripts/prerender.mjs e pelo scripts/generate-pages.mjs.
// `name` é a chave da página em src/entry-server.jsx; `html` é o HTML de entrada.
import { projectIds } from '../src/data/projectContent.js';

export const pages = [
    { name: 'home', html: 'index.html' },
    { name: 'nexus', html: 'cases/nexus/index.html' },
    { name: 'home-en', html: 'en/index.html' },
    { name: 'nexus-en', html: 'en/cases/nexus/index.html' },
    { name: 'projects', html: 'projects/index.html' },
    { name: 'projects-en', html: 'en/projects/index.html' },
    ...projectIds.flatMap((id) => [
        { name: `project-${id}`, html: `projects/${id}/index.html` },
        { name: `project-${id}-en`, html: `en/projects/${id}/index.html` },
    ]),
];
