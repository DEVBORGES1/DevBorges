import { projectIds } from '../data/projectContent.js';

const localePrefix = { pt: '', en: '/en' };

export const projectRoute = (id, locale) => `${localePrefix[locale]}/projects/${id}/`;

// URL de cada página em cada idioma (usado no header e na troca de idioma).
// Cada projeto tem sua página: chave `project-<id>`.
export const routes = {
    home: { pt: '/', en: '/en/' },
    nexus: { pt: '/cases/nexus/', en: '/en/cases/nexus/' },
    projects: { pt: '/projects/', en: '/en/projects/' },
    ...Object.fromEntries(
        projectIds.map((id) => [`project-${id}`, { pt: projectRoute(id, 'pt'), en: projectRoute(id, 'en') }]),
    ),
};

export const otherLocale = (locale) => (locale === 'pt' ? 'en' : 'pt');
