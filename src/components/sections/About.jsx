import { m } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa';
import Section from '../layout/Section';
import ScrollLitText from '../ui/ScrollLitText';
import { profile, socials } from '../../data/profile';
import { about } from '../../data/about';
import { useLocale } from '../../i18n/context';
import './About.css';

const About = () => {
    const { locale, t } = useLocale();
    const { paragraphs, stats } = about[locale];

    return (
        <Section id="about" className="about" title={t.about.title}>
            <div className="about-container">
                <m.div
                    className="about-text-column"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3>{t.about.role}</h3>
                    <ScrollLitText paragraphs={paragraphs} />

                    <div className="about-actions">
                        <a href={socials.github} target="_blank" rel="noopener noreferrer" className="premium-btn github">
                            <FaGithub className="btn-icon" aria-hidden="true" />
                            <span>GitHub</span>
                        </a>
                        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="premium-btn linkedin">
                            <FaLinkedin className="btn-icon" aria-hidden="true" />
                            <span>LinkedIn</span>
                        </a>
                        <a href={profile.resume[locale]} className="premium-btn resume" download>
                            <FaFileDownload className="btn-icon" aria-hidden="true" />
                            <span>{t.about.resume}</span>
                        </a>
                    </div>
                </m.div>

                <div className="about-stats-column">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <m.div
                                key={stat.number}
                                className="stat-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            >
                                <span className="stat-number">{stat.number}</span>
                                <span className="stat-label">{stat.label}</span>
                            </m.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default About;
