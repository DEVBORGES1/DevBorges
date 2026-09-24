import { FaArrowLeft, FaArrowDown, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import AppShell from '../components/layout/AppShell';
import TechTags from '../components/ui/TechTags';
import { nexusCase } from '../data/cases/nexus';
import { socials } from '../data/profile';
import './CaseStudy.css';

const ArchitectureNode = ({ title, tech, details }) => (
    <li className="arch-node">
        <strong>{title}</strong>
        <span className="arch-tech">{tech}</span>
        <ul>
            {details.map((detail) => (
                <li key={detail}>{detail}</li>
            ))}
        </ul>
    </li>
);

const NexusCase = () => {
    const { eyebrow, title, lead, facts, challenge, architecture, decisions, role, stack, note } = nexusCase;

    return (
        <AppShell homePath="/">
            <article className="case">
                <header className="case-hero">
                    <a href="/#experience" className="case-back">
                        <FaArrowLeft aria-hidden="true" /> Voltar ao portfólio
                    </a>
                    <p className="case-eyebrow">{eyebrow}</p>
                    <h1>{title}</h1>
                    <p className="case-lead">{lead}</p>

                    <dl className="case-facts">
                        {facts.map(({ label, value }) => (
                            <div key={label}>
                                <dt>{label}</dt>
                                <dd>{value}</dd>
                            </div>
                        ))}
                    </dl>
                </header>

                <section className="case-section" aria-labelledby="case-challenge">
                    <h2 id="case-challenge">O desafio</h2>
                    {challenge.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </section>

                <section className="case-section" aria-labelledby="case-architecture">
                    <h2 id="case-architecture">Arquitetura</h2>
                    <p>Visão geral de como as partes se conectam, do app até o banco de dados, e de como o código chega à produção.</p>

                    <div className="arch">
                        <ol className="arch-flow" aria-label="Fluxo de uma requisição, do app ao banco de dados">
                            {architecture.flow.map((step) =>
                                step.connector ? (
                                    <li key={step.connector} className="arch-connector">
                                        <FaArrowDown aria-hidden="true" />
                                        <span>{step.connector}</span>
                                    </li>
                                ) : (
                                    <ArchitectureNode key={step.title} {...step} />
                                ),
                            )}
                        </ol>

                        <ul className="arch-side" aria-label="Entrega do código">
                            <ArchitectureNode {...architecture.delivery} />
                        </ul>
                    </div>
                </section>

                <section className="case-section" aria-labelledby="case-decisions">
                    <h2 id="case-decisions">Decisões técnicas</h2>
                    <div className="case-decisions">
                        {decisions.map(({ title: decisionTitle, text }) => (
                            <div key={decisionTitle} className="case-card">
                                <h3>{decisionTitle}</h3>
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="case-section" aria-labelledby="case-role">
                    <h2 id="case-role">Meu papel</h2>
                    <ul className="case-list">
                        {role.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section className="case-section" aria-labelledby="case-stack">
                    <h2 id="case-stack">Stack</h2>
                    <TechTags items={stack} />
                    <p className="case-note">{note}</p>
                </section>

                <section className="case-cta" aria-labelledby="case-cta-title">
                    <h2 id="case-cta-title">Quer conversar sobre esse projeto?</h2>
                    <p>Posso detalhar a arquitetura e as decisões em uma conversa.</p>
                    <div className="case-cta-actions">
                        <a href="/#contact" className="cta-button">
                            <FaEnvelope aria-hidden="true" /> Entrar em contato
                        </a>
                        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                            <FaLinkedin aria-hidden="true" /> LinkedIn
                        </a>
                    </div>
                </section>
            </article>
        </AppShell>
    );
};

export default NexusCase;
