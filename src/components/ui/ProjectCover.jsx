// Capa padronizada: moldura na cor do projeto com o print numa "janela" escura centralizada.
// `alt` vazio quando a capa é decorativa (o card já é nomeado pelo título).
const ProjectCover = ({ image, alt = '', color, priority = false }) => (
    <div className="project-cover" style={{ '--cover-color': color }}>
        <div className="project-cover-window">
            <img
                src={image}
                alt={alt}
                width="800"
                height="500"
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : undefined}
                decoding="async"
            />
        </div>
    </div>
);

export default ProjectCover;
