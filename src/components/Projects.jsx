import StaggeredReveal, { RevealItem } from './StaggeredReveal';
import { Tilt } from 'react-tilt';
import { projects } from '../data/projects';

const Projects = () => {
    const defaultOptions = {
        reverse: false,
        max: 15,
        perspective: 1000,
        scale: 1.05,
        speed: 400,
        transition: true,
        axis: null,
        reset: true,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        glare: true,
        "max-glare": 0.3,
    }

    return (
        <section id="projects" className="projects">
            <h2>Meus Projetos</h2>
            <StaggeredReveal>
                <div className="projects-grid">
                    {projects.map((project) => (
                        <RevealItem key={project.title} className="reveal-item-wrapper">
                            <Tilt options={defaultOptions} className="tilt-card-wrapper">
                                <div className="project-card">
                                    <div className="project-image-container">
                                        <img
                                            src={project.image}
                                            alt={project.imageAlt}
                                            className="project-image"
                                            width="800"
                                            height="420"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        {/* Atalho visual no hover; fora da ordem do Tab porque duplica o link "Ver no GitHub" abaixo */}
                                        <div className="project-overlay" aria-hidden="true">
                                            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-link-overlay" tabIndex={-1}>
                                                Ver Projeto
                                            </a>
                                        </div>
                                    </div>
                                    <div className="project-info">
                                        <h3>{project.title}</h3>
                                        <div className="project-tags">
                                            {project.tech.map((t) => (
                                                <span key={t} className="tech-tag">{t}</span>
                                            ))}
                                        </div>
                                        <p>{project.description}</p>
                                        <div className="project-links">
                                            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-link">
                                                Ver no GitHub &rarr;
                                            </a>
                                            {project.demo && (
                                                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                                                    Ver site &rarr;
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Tilt>
                        </RevealItem>
                    ))}
                </div>
            </StaggeredReveal>
        </section>
    );
};

export default Projects;
