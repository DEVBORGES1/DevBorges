import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const subscribe = (callback) => {
    const mediaQuery = window.matchMedia(QUERY);
    mediaQuery.addEventListener('change', callback);
    return () => mediaQuery.removeEventListener('change', callback);
};

const getSnapshot = () => window.matchMedia(QUERY).matches;

// No HTML pré-renderizado não há preferência conhecida: assume `false`
// e o React atualiza logo após a hidratação, sem divergência de markup.
const getServerSnapshot = () => false;

export function usePrefersReducedMotion() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
