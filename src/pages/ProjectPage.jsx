import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaGithub, FaLock } from 'react-icons/fa';
import AppShell from '../components/layout/AppShell';
import ProjectCover from '../components/ui/ProjectCover';
import TechTags from '../components/ui/TechTags';
import AvailabilityCta from '../components/sections/AvailabilityCta';
import { getProjects } from '../data/projects';
import { useLocale } from '../i18n/context';
import { routes } from '../i18n/routes';
import '../components/ui/ProjectCard.css';
import './ProjectPage.css';

// Página de um projeto: capa, descrição, papel, stack, links e navegação anterior/próximo.
const ProjectPage = ({ id, locale = 'pt' }) => (
    <AppShell page={`project-${id}`} locale={locale}>
        <ProjectPageContent id={id} />
    </AppShell>
);

const ProjectPageContent = ({ id }) => {
    const { locale, t } = useLocale();
    const projects = getProjects(locale);
    const index = projects.findIndex((project) => project.id === id);
    const { title, description, role, category, year, tech, image, imageAlt, color, repo, demo } = projects[index];
    const previous = projects[index - 1];
    const next = projects[index + 1];

    return (
        <>
            <article className="project-page">
                <nav className="breadcrumb" aria-label={t.projects.breadcrumb}>
                    <ol>
                        <li><a href={routes.home[locale]}>{t.projects.home}</a></li>
                        <li><a href={routes.projects[locale]}>{t.projects.pageTitle}</a></li>
                        <li aria-current="page">{title}</li>
                    </ol>
                </nav>

                <ProjectCover image={image} alt={imageAlt} color={color} priority />

                <header className="project-page-header">
                    <div>
                        <span className="project-category">{t.projects.categories[category]}</span>
                        <h1>{title}</h1>
                    </div>
                    <div className="project-page-links">
                        {repo ? (
                            <a href={repo} target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                                <FaGithub aria-hidden="true" /> {t.projects.repo}
                            </a>
                        ) : (
                            <span className="project-private">
                                <FaLock aria-hidden="true" /> {t.projects.privateCode}
                            </span>
                        )}
                        {demo && (
                            <a href={demo} target="_blank" rel="noopener noreferrer" className="cta-button">
                                <FaExternalLinkAlt aria-hidden="true" /> {t.projects.demo}
                            </a>
                        )}
                    </div>
                </header>

                <div className="project-page-body">
                    <p className="project-page-description">{description}</p>
                    <dl className="project-page-facts">
                        <div>
                            <dt>{t.projects.role}</dt>
                            <dd>{role}</dd>
                        </div>
                        <div>
                            <dt>{t.projects.year}</dt>
                            <dd>{year}</dd>
                        </div>
                        <div>
                            <dt>{t.projects.stack}</dt>
                            <dd><TechTags items={tech} /></dd>
                        </div>
                    </dl>
                </div>

                <nav className="project-pager" aria-label={t.nav.items.projects}>
                    {previous && (
                        <a href={previous.href} className="project-pager-link" rel="prev">
                            <span className="project-pager-label"><FaArrowLeft aria-hidden="true" /> {t.projects.previous}</span>
                            <span className="project-pager-title">{previous.title}</span>
                        </a>
                    )}
                    {next && (
                        <a href={next.href} className="project-pager-link project-pager-link--next" rel="next">
                            <span className="project-pager-label">{t.projects.next} <FaArrowRight aria-hidden="true" /></span>
                            <span className="project-pager-title">{next.title}</span>
                        </a>
                    )}
                </nav>
            </article>

            <AvailabilityCta contactHref={`${routes.home[locale]}#contact`} />
        </>
    );
};

export default ProjectPage;
