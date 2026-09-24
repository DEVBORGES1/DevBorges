import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
// Fontes hospedadas junto com o site (sem requisição bloqueante ao Google Fonts)
import '@fontsource-variable/inter';
import '@fontsource-variable/fira-code';
import './index.css';

// No build o HTML já vem pré-renderizado (scripts/prerender.mjs): hidrata.
// No `npm run dev` o #root está vazio: renderiza do zero.
export function mount(element) {
    const container = document.getElementById('root');
    const app = <StrictMode>{element}</StrictMode>;

    if (container.hasChildNodes()) {
        hydrateRoot(container, app);
    } else {
        createRoot(container).render(app);
    }
}
