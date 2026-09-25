import { useSyncExternalStore } from 'react';

// O tema vive no atributo data-theme do <html> (aplicado cedo por public/theme-init.js).
const STORAGE_KEY = 'theme';
const EVENT = 'themechange';

const getSnapshot = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

// No HTML pré-renderizado não há tema conhecido: assume o escuro (padrão)
// e o React atualiza logo após a hidratação, sem divergência de markup.
const getServerSnapshot = () => 'dark';

const subscribe = (callback) => {
    window.addEventListener(EVENT, callback);
    return () => window.removeEventListener(EVENT, callback);
};

export function setTheme(theme) {
    if (theme === 'light') {
        document.documentElement.dataset.theme = 'light';
    } else {
        delete document.documentElement.dataset.theme;
    }
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch {
        // Armazenamento bloqueado: o tema vale só para esta visita
    }
    window.dispatchEvent(new Event(EVENT));
}

export function useTheme() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
