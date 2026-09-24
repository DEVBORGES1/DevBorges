import Tilt from './Tilt';
import TechTags from './TechTags';
import { useLocale } from '../../i18n/context';

const ProjectCard = ({ project }) => {
    const { title, description, image, imageAlt, tech, repo, demo } = project;
    const { t } = useLocale();
    const primaryLink = demo ?? repo;

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
                    {/* Atalho visual no hover; fora da ordem do Tab porque duplica os links abaixo */}
                    {primaryLink && (
                        <div className="project-overlay" aria-hidden="true">
                            <a href={primaryLink} target="_blank" rel="noopener noreferrer" className="project-link-overlay" tabIndex={-1}>
                                {t.projects.overlay}
                            </a>
                        </div>
                    )}
                </div>
                <div className="project-info">
                    <h3>{title}</h3>
                    <TechTags items={tech} />
                    <p>{description}</p>
                    <div className="project-links">
                        {repo ? (
                            <a href={repo} target="_blank" rel="noopener noreferrer" className="project-link">
                                {t.projects.repo} &rarr;
                            </a>
                        ) : (
                            <span className="project-private">{t.projects.privateCode}</span>
                        )}
                        {demo && (
                            <a href={demo} target="_blank" rel="noopener noreferrer" className="project-link">
                                {t.projects.demo} &rarr;
                            </a>
                        )}
                    </div>
                </div>
            </article>
        </Tilt>
    );
};

export default ProjectCard;
