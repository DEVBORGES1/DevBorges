import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import NexusCase from './pages/NexusCase.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import { projectIds } from './data/projectContent.js';

// Usado só no build (scripts/prerender.mjs) para gerar o HTML estático de cada página.
const pages = {
    home: () => <App locale="pt" />,
    nexus: () => <NexusCase locale="pt" />,
    'home-en': () => <App locale="en" />,
    'nexus-en': () => <NexusCase locale="en" />,
    projects: () => <ProjectsPage locale="pt" />,
    'projects-en': () => <ProjectsPage locale="en" />,
    ...Object.fromEntries(
        projectIds.flatMap((id) => [
            [`project-${id}`, () => <ProjectPage id={id} locale="pt" />],
            [`project-${id}-en`, () => <ProjectPage id={id} locale="en" />],
        ]),
    ),
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
