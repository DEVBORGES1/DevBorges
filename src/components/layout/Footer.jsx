import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { profile, socials } from '../../data/profile';
import './Footer.css';

const footerLinks = [
    { href: socials.github, label: 'GitHub', icon: FaGithub },
    { href: socials.linkedin, label: 'LinkedIn', icon: FaLinkedin },
    { href: socials.whatsapp, label: 'WhatsApp', icon: FaWhatsapp },
    { href: socials.instagram, label: 'Instagram', icon: FaInstagram },
];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-socials">
                {footerLinks.map(({ href, label, icon: Icon }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={label}>
                        <Icon />
                    </a>
                ))}
            </div>

            <div className="footer-status">
                <div className="status-dot"></div>
                <span>Aberto a novas oportunidades</span>
            </div>
            <p>&copy; {new Date().getFullYear()} {profile.name} ({profile.brand}). Todos os direitos reservados.</p>
        </footer>
    );
};

export default Footer;
