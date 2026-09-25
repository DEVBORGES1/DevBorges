import Section from '../layout/Section';
import StaggeredReveal, { RevealItem } from '../ui/StaggeredReveal';
import ProjectCard from '../ui/ProjectCard';
import { getProjects } from '../../data/projects';
import { useLocale } from '../../i18n/context';
import { routes } from '../../i18n/routes';
import './Projects.css';

// Na home só os destaques; a lista completa (com filtros) fica em /projects.
const Projects = () => {
    const { locale, t } = useLocale();
    const projects = getProjects(locale).filter((project) => project.featured);

    return (
        <Section id="projects" className="projects" title={t.projects.title}>
            <StaggeredReveal>
                <div className="projects-grid">
                    {projects.map((project) => (
                        <RevealItem key={project.id} className="reveal-item-wrapper">
                            <ProjectCard project={project} />
                        </RevealItem>
                    ))}
                </div>
            </StaggeredReveal>

            <div className="projects-more">
                <a href={routes.projects[locale]} className="cta-button secondary">
                    {t.projects.viewAll} &rarr;
                </a>
            </div>
        </Section>
    );
};

export default Projects;
