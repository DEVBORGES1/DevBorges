import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useActiveSection } from '../../hooks/useActiveSection';
import './Header.css';

const navItems = [
    { name: 'Início', id: 'hero' },
    { name: 'Sobre', id: 'about' },
    { name: 'Experiência', id: 'experience' },
    { name: 'Projetos', id: 'projects' },
    { name: 'Habilidades', id: 'skills' },
    { name: 'Contato', id: 'contact' },
];
const sectionIds = navItems.map((item) => item.id);

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const activeId = useActiveSection(sectionIds);
    const headerRef = useRef(null);
    const menuButtonRef = useRef(null);

    const closeMenu = () => setIsOpen(false);

    // Com o menu mobile aberto: trava o scroll da página, fecha com Esc,
    // com toque fora do header ou quando a tela passa para o layout desktop.
    useEffect(() => {
        if (!isOpen) return undefined;

        const { overflow } = document.body.style;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                menuButtonRef.current?.focus();
            }
        };
        const handlePointerDown = (event) => {
            if (!headerRef.current?.contains(event.target)) setIsOpen(false);
        };
        const desktopQuery = window.matchMedia('(min-width: 769px)');
        const handleViewportChange = (event) => {
            if (event.matches) setIsOpen(false);
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('pointerdown', handlePointerDown);
        desktopQuery.addEventListener('change', handleViewportChange);

        return () => {
            document.body.style.overflow = overflow;
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('pointerdown', handlePointerDown);
            desktopQuery.removeEventListener('change', handleViewportChange);
        };
    }, [isOpen]);

    const renderLinks = (onClick) =>
        navItems.map(({ name, id }) => {
            const isActive = activeId === id;
            return (
                <li key={id}>
                    <a
                        href={`#${id}`}
                        className={isActive ? 'active' : undefined}
                        aria-current={isActive ? 'location' : undefined}
                        onClick={onClick}
                    >
                        {name}
                    </a>
                </li>
            );
        });

    return (
        <header className="header" ref={headerRef}>
            <nav className="nav-container" aria-label="Navegação principal">
                <a href="#hero" className="logo" aria-label="DEVBORGES — voltar ao início">
                    &lt;DEVBORGES/&gt;
                </a>

                <ul className="nav-links">{renderLinks()}</ul>

                <button
                    ref={menuButtonRef}
                    className="mobile-menu-btn"
                    onClick={() => setIsOpen((open) => !open)}
                    aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
                    aria-expanded={isOpen}
                    aria-controls="mobile-nav"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        id="mobile-nav"
                        className="mobile-nav"
                        aria-label="Navegação principal"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="mobile-nav-links">{renderLinks(closeMenu)}</ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
