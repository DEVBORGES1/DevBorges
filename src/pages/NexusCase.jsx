import { FaArrowLeft, FaArrowDown, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import AppShell from '../components/layout/AppShell';
import TechTags from '../components/ui/TechTags';
import { getNexusCase } from '../data/cases/nexus';
import { socials } from '../data/profile';
import { useLocale } from '../i18n/context';
import { routes } from '../i18n/routes';
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

// O AppShell fornece o idioma; o conteúdo fica em um componente interno para poder usar useLocale().
const NexusCase = ({ locale = 'pt' }) => (
    <AppShell page="nexus" locale={locale}>
        <NexusCaseContent />
    </AppShell>
);

const NexusCaseContent = () => {
    const { locale, t } = useLocale();
    const { eyebrow, title, lead, facts, challenge, architecture, decisions, role, stack, note } = getNexusCase(locale);
    const home = routes.home[locale];

    return (
        <article className="case">
            <header className="case-hero">
                <a href={`${home}#experience`} className="case-back">
                    <FaArrowLeft aria-hidden="true" /> {t.caseStudy.back}
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
                <h2 id="case-challenge">{t.caseStudy.challenge}</h2>
                {challenge.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
            </section>

            <section className="case-section" aria-labelledby="case-architecture">
                <h2 id="case-architecture">{t.caseStudy.architecture}</h2>
                <p>{t.caseStudy.architectureIntro}</p>

                <div className="arch">
                    <ol className="arch-flow" aria-label={t.caseStudy.architectureFlow}>
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

                    <ul className="arch-side" aria-label={t.caseStudy.architectureDelivery}>
                        <ArchitectureNode {...architecture.delivery} />
                    </ul>
                </div>
            </section>

            <section className="case-section" aria-labelledby="case-decisions">
                <h2 id="case-decisions">{t.caseStudy.decisions}</h2>
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
                <h2 id="case-role">{t.caseStudy.role}</h2>
                <ul className="case-list">
                    {role.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </section>

            <section className="case-section" aria-labelledby="case-stack">
                <h2 id="case-stack">{t.caseStudy.stack}</h2>
                <TechTags items={stack} />
                <p className="case-note">{note}</p>
            </section>

            <section className="case-cta" aria-labelledby="case-cta-title">
                <h2 id="case-cta-title">{t.caseStudy.ctaTitle}</h2>
                <p>{t.caseStudy.ctaText}</p>
                <div className="case-cta-actions">
                    <a href={`${home}#contact`} className="cta-button">
                        <FaEnvelope aria-hidden="true" /> {t.caseStudy.ctaContact}
                    </a>
                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                        <FaLinkedin aria-hidden="true" /> LinkedIn
                    </a>
                </div>
            </section>
        </article>
    );
};

export default NexusCase;
