// URL de cada página em cada idioma (usado no header e na troca de idioma).
export const routes = {
    home: { pt: '/', en: '/en/' },
    nexus: { pt: '/cases/nexus/', en: '/en/cases/nexus/' },
};

export const otherLocale = (locale) => (locale === 'pt' ? 'en' : 'pt');
