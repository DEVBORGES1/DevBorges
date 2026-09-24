import Tilt from './Tilt';
import TechTags from './TechTags';

const ProjectCard = ({ project }) => {
    const { title, description, image, imageAlt, tech, repo, demo } = project;

    return (
        <Tilt className="tilt-card-wrapper" max={10} scale={1.03}>
            <article className="project-card">
                <div className="project-image-container">
                    <img
                        src={image}
                        alt={imageAlt}
                        className="project-image"
                        width="800"
                        height="420"
                        loading="lazy"
                        decoding="async"
                    />
                    {/* Atalho visual no hover; fora da ordem do Tab porque duplica o link "Ver no GitHub" abaixo */}
                    <div className="project-overlay" aria-hidden="true">
                        <a href={demo ?? repo} target="_blank" rel="noopener noreferrer" className="project-link-overlay" tabIndex={-1}>
                            Ver Projeto
                        </a>
                    </div>
                </div>
                <div className="project-info">
                    <h3>{title}</h3>
                    <TechTags items={tech} />
                    <p>{description}</p>
                    <div className="project-links">
                        <a href={repo} target="_blank" rel="noopener noreferrer" className="project-link">
                            Ver no GitHub &rarr;
                        </a>
                        {demo && (
                            <a href={demo} target="_blank" rel="noopener noreferrer" className="project-link">
                                Ver site &rarr;
                            </a>
                        )}
                    </div>
                </div>
            </article>
        </Tilt>
    );
};

export default ProjectCard;
