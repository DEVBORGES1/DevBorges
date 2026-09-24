import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const About = () => {
    const stats = [
        { number: '1+', label: 'Ano de Experiência', delay: 0.2 },
        { number: '10+', label: 'Projetos Entregues', delay: 0.3 },
        { number: '5+', label: 'Tecnologias Dominadas', delay: 0.4 },
    ];

    return (
        <section id="about" className="about">
            <h2>Sobre Mim</h2>

            <div className="about-container">
                <motion.div
                    className="about-text-column"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3>Developer Full Stack</h3>
                    <p>
                        Sou um desenvolvedor apaixonado por criar soluções robustas e escaláveis.
                        Com foco em <strong>JavaScript, React, Node.js e Ecossistema Web</strong>,
                        transformo ideias complexas em interfaces elegantes e funcionais.
                    </p>
                    <p>
                        Atualmente, estou me aprofundando em arquitetura de software,
                        segurança cibernética e automação com IA. Meu objetivo é construir
                        sistemas que não apenas funcionem, mas que ofereçam uma experiência
                        excepcional ao usuário.
                    </p>

                    <div className="about-actions">
                        <a href="https://github.com/DEVBORGES1" target="_blank" rel="noopener noreferrer" className="premium-btn github">
                            <FaGithub className="btn-icon" />
                            <span>GitHub</span>
                        </a>
                        <a href="https://www.linkedin.com/in/joão-vitor-53875a1a1" target="_blank" rel="noopener noreferrer" className="premium-btn linkedin">
                            <FaLinkedin className="btn-icon" />
                            <span>LinkedIn</span>
                        </a>
                        {/* 
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="premium-btn resume">
                            <FaFileDownload className="btn-icon" />
                            <span>Currículo</span>
                        </a>
                        */}
                    </div>
                </motion.div>

                <div className="about-stats-column">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="stat-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: stat.delay }}
                            >
                                <span className="stat-number">{stat.number}</span>
                                <span className="stat-label">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
