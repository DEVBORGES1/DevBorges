import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import NexusCase from './pages/NexusCase.jsx';

// Usado só no build (scripts/prerender.mjs) para gerar o HTML estático de cada página.
const pages = {
    home: () => <App locale="pt" />,
    nexus: () => <NexusCase locale="pt" />,
    'home-en': () => <App locale="en" />,
    'nexus-en': () => <NexusCase locale="en" />,
};

export function render(pageName) {
    const Page = pages[pageName];
    if (!Page) throw new Error(`Página desconhecida para pré-renderização: ${pageName}`);

    return renderToString(
        <StrictMode>
            <Page />
        </StrictMode>,
    );
}
