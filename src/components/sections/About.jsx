import { m } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa';
import Section from '../layout/Section';
import { profile, socials } from '../../data/profile';
import './About.css';

const stats = [
    { number: '8 meses', label: 'como Software Engineer na Nexus Labz', delay: 0.2 },
    { number: '2 apps', label: 'mobile em React Native entregues do início ao fim', delay: 0.3 },
    { number: 'Dez/2027', label: 'conclusão em Ciência da Computação (Unoesc)', delay: 0.4 },
];

const About = () => {
    return (
        <Section id="about" className="about" title="Sobre Mim">
            <div className="about-container">
                <m.div
                    className="about-text-column"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3>Software Engineer</h3>
                    <p>
                        Sou Software Engineer e estudante de Ciência da Computação. Na <strong>Nexus Labz</strong>,
                        levei um app React Native do zero à produção: arquitetura, autenticação com JWT e OAuth,
                        pagamentos, servidor com Nginx e pipeline de deploy no GitHub Actions.
                    </p>
                    <p>
                        Também desenvolvo sistemas completos para clientes e projetos próprios, com
                        <strong> TypeScript, Node.js, PHP/Laravel, Python e C#/.NET</strong> e bancos como
                        PostgreSQL, MySQL e SQL Server. Meu foco é backend: modelagem de dados, regras de
                        negócio, integrações e infraestrutura.
                    </p>

                    <div className="about-actions">
                        <a href={socials.github} target="_blank" rel="noopener noreferrer" className="premium-btn github">
                            <FaGithub className="btn-icon" aria-hidden="true" />
                            <span>GitHub</span>
                        </a>
                        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="premium-btn linkedin">
                            <FaLinkedin className="btn-icon" aria-hidden="true" />
                            <span>LinkedIn</span>
                        </a>
                        <a href={profile.resume} className="premium-btn resume" download>
                            <FaFileDownload className="btn-icon" aria-hidden="true" />
                            <span>Currículo</span>
                        </a>
                    </div>
                </m.div>

                <div className="about-stats-column">
                    <div className="stats-grid">
                        {stats.map((stat) => (
                            <m.div
                                key={stat.number}
                                className="stat-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: stat.delay }}
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
