import { m } from 'framer-motion';
import Section from '../layout/Section';
import TechTags from '../ui/TechTags';
import { experience } from '../../data/experience';
import './Experience.css';

const Experience = () => {
    return (
        <Section id="experience" className="experience" title="Experiência">
            <div className="timeline-container">
                <div className="timeline-line"></div>
                {experience.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <m.article
                            key={`${item.title}-${item.org}`}
                            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <div className="timeline-icon" aria-hidden="true">
                                <Icon />
                            </div>
                            <div className="timeline-content">
                                <span className="timeline-date">{item.period}</span>
                                <h3>{item.title}</h3>
                                <p className="timeline-org">
                                    {item.link ? (
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">{item.org}</a>
                                    ) : item.org}
                                </p>
                                <ul className="timeline-highlights">
                                    {item.highlights.map((text) => (
                                        <li key={text}>{text}</li>
                                    ))}
                                </ul>
                                <TechTags items={item.tech} />
                                {item.caseStudy && (
                                    <a href={item.caseStudy} className="timeline-case-link">
                                        Ler o case study &rarr;
                                    </a>
                                )}
                            </div>
                        </m.article>
                    );
                })}
            </div>
        </Section>
    );
};

export default Experience;
