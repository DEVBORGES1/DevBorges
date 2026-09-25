import { useEffect, useRef, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useLocale } from '../../i18n/context';
import { routes, otherLocale } from '../../i18n/routes';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const sectionIds = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
const NO_SECTIONS = [];
const SCROLL_THRESHOLD = 40;

// Na home os links são âncoras (#secao); nas outras páginas apontam para a home do idioma (/en/#secao).
const Header = ({ page }) => {
    const { locale, t } = useLocale();
    const homePath = page === 'home' ? '' : routes.home[locale];
    const alternate = otherLocale(locale);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const activeId = useActiveSection(homePath ? NO_SECTIONS : sectionIds);
    const headerRef = useRef(null);
    const menuButtonRef = useRef(null);

    const closeMenu = () => setIsOpen(false);

    // Depois do topo da página o header vira uma "pílula" flutuante centralizada
    useEffect(() => {
        const update = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);

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
        sectionIds.map((id) => {
            const isActive = activeId === id;
            return (
                <li key={id}>
                    <a
                        href={`${homePath}#${id}`}
                        className={isActive ? 'active' : undefined}
                        aria-current={isActive ? 'location' : undefined}
                        onClick={onClick}
                    >
                        {t.nav.items[id]}
                    </a>
                </li>
            );
        });

    return (
        <header className={`header${isScrolled ? ' is-scrolled' : ''}`} ref={headerRef}>
            <nav className="nav-container" aria-label={t.nav.label}>
                <a href={`${homePath}#hero`} className="logo" aria-label={t.nav.logo}>
                    &lt;DEVBORGES/&gt;
                </a>

                <ul className="nav-links">{renderLinks()}</ul>

                <ThemeToggle />

                <a
                    href={routes[page][alternate]}
                    className="lang-switch"
                    hrefLang={t.nav.switchLanguage.hrefLang}
                    lang={t.nav.switchLanguage.hrefLang}
                    aria-label={t.nav.switchLanguage.aria}
                >
                    {t.nav.switchLanguage.label}
                </a>

                <button
                    ref={menuButtonRef}
                    className="mobile-menu-btn"
                    onClick={() => setIsOpen((open) => !open)}
                    aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
                    aria-expanded={isOpen}
                    aria-controls="mobile-nav"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <m.nav
                        id="mobile-nav"
                        className="mobile-nav"
                        aria-label={t.nav.label}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="mobile-nav-links">{renderLinks(closeMenu)}</ul>
                    </m.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
