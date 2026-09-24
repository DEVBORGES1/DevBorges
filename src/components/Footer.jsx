import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-socials">
                <a href="https://www.instagram.com/itsjvborges/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                    <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/in/joão-vitor-53875a1a1" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                    <FaLinkedin />
                </a>
                <a href="https://wa.me/5549999685965" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                    <FaWhatsapp />
                </a>
            </div>

            <div className="footer-status">
                <div className="status-dot"></div>
                <span>Disponível para projetos</span>
            </div>
            <p>&copy; {new Date().getFullYear()} João Vitor Pereira (Borges). Todos os direitos reservados.</p>
        </footer>
    );
};

export default Footer;
