import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import Section from '../layout/Section';
import { socials } from '../../data/profile';
import { useLocale } from '../../i18n/context';
import './Contact.css';

const emailConfig = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
const isEmailConfigured = Object.values(emailConfig).every(Boolean);

const contactLinks = [
    { href: socials.github, label: 'GitHub', icon: FaGithub, className: 'github', external: true },
    { href: socials.linkedin, label: 'LinkedIn', icon: FaLinkedin, className: 'linkedin', external: true },
    { href: socials.whatsapp, label: 'WhatsApp', icon: FaWhatsapp, className: 'whatsapp', external: true },
    { href: socials.email, label: 'Email', icon: FaEnvelope, className: 'email', external: false },
];

const initialForm = { name: '', email: '', message: '' };
const SUCCESS_MESSAGE_MS = 5000;

const Contact = () => {
    const { t } = useLocale();
    const [formData, setFormData] = useState(initialForm);
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const resetTimer = useRef(null);

    useEffect(() => () => clearTimeout(resetTimer.current), []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const showSuccess = () => {
        setStatus('success');
        setFormData(initialForm);
        clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => setStatus('idle'), SUCCESS_MESSAGE_MS);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Honeypot: campo invisível que só bots preenchem. Finge sucesso e não envia.
        if (e.currentTarget.elements.website.value) {
            showSuccess();
            return;
        }

        if (!isEmailConfigured) {
            setStatus('error');
            return;
        }

        setStatus('sending');
        try {
            // SDK carregado só no envio, fora do bundle inicial
            const { default: emailjs } = await import('@emailjs/browser');
            await emailjs.send(
                emailConfig.serviceId,
                emailConfig.templateId,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_name: 'João Vitor',
                },
                emailConfig.publicKey,
            );
            showSuccess();
        } catch {
            setStatus('error');
        }
    };

    const statusMessage = { success: t.contact.success, error: t.contact.error }[status];

    return (
        <Section id="contact" className="contact" title={t.contact.title}>
            <div className="contact-container">
                <div className="contact-info">
                    <h3>{t.contact.heading}</h3>
                    <p>{t.contact.text}</p>

                    <div className="contact-socials">
                        {contactLinks.map(({ href, label, icon: Icon, className, external }) => (
                            <a
                                key={label}
                                href={href}
                                className={`social-btn ${className}`}
                                {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                            >
                                <Icon aria-hidden="true" /> <span>{label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="contact-name" className="sr-only">{t.contact.name.label}</label>
                        <input
                            id="contact-name"
                            type="text"
                            name="name"
                            placeholder={t.contact.name.placeholder}
                            autoComplete="name"
                            maxLength={100}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact-email" className="sr-only">{t.contact.email.label}</label>
                        <input
                            id="contact-email"
                            type="email"
                            name="email"
                            placeholder={t.contact.email.placeholder}
                            autoComplete="email"
                            maxLength={120}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact-message" className="sr-only">{t.contact.message.label}</label>
                        <textarea
                            id="contact-message"
                            name="message"
                            rows="5"
                            placeholder={t.contact.message.placeholder}
                            maxLength={2000}
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-honeypot" aria-hidden="true">
                        <label htmlFor="contact-website">{t.contact.honeypot}</label>
                        <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </div>
                    <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                        {status === 'sending' ? t.contact.sending : t.contact.submit}
                    </button>
                    <div className="form-status" role="status" aria-live="polite">
                        {statusMessage && <p className={`status-msg ${status}`}>{statusMessage}</p>}
                    </div>
                </form>
            </div>
        </Section>
    );
};

export default Contact;
