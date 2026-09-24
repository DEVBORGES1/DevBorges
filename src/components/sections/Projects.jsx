import Section from '../layout/Section';
import StaggeredReveal, { RevealItem } from '../ui/StaggeredReveal';
import ProjectCard from '../ui/ProjectCard';
import { getProjects } from '../../data/projects';
import { useLocale } from '../../i18n/context';
import './Projects.css';

const Projects = () => {
    const { locale, t } = useLocale();
    const projects = getProjects(locale);

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
        </Section>
    );
};

export default Projects;
