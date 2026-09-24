import { m } from 'framer-motion';
import Section from '../layout/Section';
import TechTags from '../ui/TechTags';
import { getExperience } from '../../data/experience';
import { useLocale } from '../../i18n/context';
import { routes } from '../../i18n/routes';
import './Experience.css';

const Experience = () => {
    const { locale, t } = useLocale();
    const experience = getExperience(locale);

    return (
        <Section id="experience" className="experience" title={t.experience.title}>
            <div className="timeline-container">
                <div className="timeline-line"></div>
                {experience.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <m.article
                            key={item.id}
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
                                    <a href={routes[item.caseStudy][locale]} className="timeline-case-link">
                                        {t.experience.caseLink} &rarr;
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
