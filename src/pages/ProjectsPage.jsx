import { useState } from 'react';
import AppShell from '../components/layout/AppShell';
import ProjectCard from '../components/ui/ProjectCard';
import AvailabilityCta from '../components/sections/AvailabilityCta';
import { getProjects } from '../data/projects';
import { useLocale } from '../i18n/context';
import { routes } from '../i18n/routes';
import './ProjectsPage.css';

// Arquivo completo de projetos, com filtro por categoria.
const ProjectsPage = ({ locale = 'pt' }) => (
    <AppShell page="projects" locale={locale}>
        <ProjectsPageContent />
    </AppShell>
);

const ProjectsPageContent = () => {
    const { locale, t } = useLocale();
    const [activeCategory, setActiveCategory] = useState('all');
    const projects = getProjects(locale);
    const categories = [...new Set(projects.map((project) => project.category))];
    const tabs = [{ id: 'all', label: t.projects.all }, ...categories.map((id) => ({ id, label: t.projects.categories[id] }))];

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter((project) => project.category === activeCategory);

    return (
        <>
            <div className="projects-page">
                <header className="projects-page-header">
                    <p className="page-eyebrow">
                        <span aria-hidden="true">✦</span> {t.projects.pageEyebrow}
                    </p>
                    <h1>{t.projects.pageTitle}</h1>
                    <p>{t.projects.pageIntro}</p>
                </header>

                <div className="projects-page-filters" role="group" aria-label={t.projects.filterLabel}>
                    {tabs.map(({ id, label }) => (
                        <button
                            key={id}
                            type="button"
                            className={`tab-btn ${activeCategory === id ? 'active' : ''}`}
                            aria-pressed={activeCategory === id}
                            onClick={() => setActiveCategory(id)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>

            <AvailabilityCta contactHref={`${routes.home[locale]}#contact`} />
        </>
    );
};

export default ProjectsPage;
