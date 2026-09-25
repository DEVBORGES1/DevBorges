import { FaLinkedin } from 'react-icons/fa';
import { socials } from '../../data/profile';
import { useLocale } from '../../i18n/context';
import './AvailabilityCta.css';

// Bloco de chamada entre as seções: status de disponibilidade + convite para contato.
// Fora da home, `contactHref` aponta para o formulário na home do idioma.
const AvailabilityCta = ({ contactHref = '#contact' }) => {
    const { t } = useLocale();
    const { status, heading, highlight, text, contact } = t.cta;

    return (
        <section className="availability-cta" aria-labelledby="availability-cta-title">
            <div className="availability-cta-card">
                <p className="availability-badge">
                    <span className="availability-dot" aria-hidden="true" />
                    {status}
                </p>
                <h2 id="availability-cta-title" className="availability-title">
                    {heading} <span className="highlight">{highlight}</span>
                </h2>
                <p className="availability-text">{text}</p>
                <div className="availability-actions">
                    <a href={contactHref} className="cta-button">{contact}</a>
                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                        <FaLinkedin aria-hidden="true" /> LinkedIn
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AvailabilityCta;
