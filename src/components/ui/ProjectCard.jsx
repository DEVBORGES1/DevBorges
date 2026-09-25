import Tilt from './Tilt';
import ProjectCover from './ProjectCover';
import { useLocale } from '../../i18n/context';
import './ProjectCard.css';

// Card enxuto: capa, título, categoria e ano. Descrição, stack e links ficam na página do projeto.
const ProjectCard = ({ project }) => {
    const { title, image, color, category, year, href } = project;
    const { t } = useLocale();

    return (
        <article className="project-card">
            <a href={href} className="project-card-link">
                <Tilt className="project-card-tilt" max={6} scale={1.02}>
                    <ProjectCover image={image} color={color} />
                </Tilt>
                <div className="project-card-meta">
                    <h3>{title}</h3>
                    <div className="project-card-details">
                        <span className="project-category">{t.projects.categories[category]}</span>
                        <span className="project-year">{year}</span>
                    </div>
                </div>
            </a>
        </article>
    );
};

export default ProjectCard;
