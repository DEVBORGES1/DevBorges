const TechTags = ({ items }) => {
    if (!items?.length) return null;

    return (
        <div className="project-tags">
            {items.map((item) => (
                <span key={item} className="tech-tag">{item}</span>
            ))}
        </div>
    );
};

export default TechTags;
