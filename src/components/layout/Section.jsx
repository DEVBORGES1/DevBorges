const Section = ({ id, className = '', title, children }) => (
    <section id={id} className={`section ${className}`.trim()}>
        {title && <h2 className="section-title">{title}</h2>}
        {children}
    </section>
);

export default Section;
