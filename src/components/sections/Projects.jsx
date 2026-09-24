import Section from '../layout/Section';
import StaggeredReveal, { RevealItem } from '../ui/StaggeredReveal';
import ProjectCard from '../ui/ProjectCard';
import { projects } from '../../data/projects';
import './Projects.css';

const Projects = () => (
    <Section id="projects" className="projects" title="Meus Projetos">
        <StaggeredReveal>
            <div className="projects-grid">
                {projects.map((project) => (
                    <RevealItem key={project.title} className="reveal-item-wrapper">
                        <ProjectCard project={project} />
                    </RevealItem>
                ))}
            </div>
        </StaggeredReveal>
    </Section>
);

export default Projects;
