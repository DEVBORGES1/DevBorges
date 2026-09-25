import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

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

const applyTheme = (theme) => {
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
    // flushSync: o React atualiza na hora, antes da "foto" do novo tema tirada pela transição
    flushSync(() => window.dispatchEvent(new Event(EVENT)));
};

// Troca o tema. Com `origin` ({ x, y } em px), o novo tema surge num círculo que cresce
// a partir desse ponto (View Transitions API, animação em global.css).
// Sem suporte do navegador ou com preferência por menos movimento, a troca é imediata.
export function setTheme(theme, origin) {
    const canAnimate = document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canAnimate) {
        applyTheme(theme);
        return;
    }

    const root = document.documentElement;
    if (origin) {
        root.style.setProperty('--reveal-x', `${origin.x}px`);
        root.style.setProperty('--reveal-y', `${origin.y}px`);
    }
    document.startViewTransition(() => applyTheme(theme));
}

export function useTheme() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
