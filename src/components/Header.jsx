import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navItems = [
        { name: 'Início', href: '#hero' },
        { name: 'Sobre', href: '#about' },
        { name: 'Habilidade e Tecnologias', href: '#skills' },
        { name: 'Jornada', href: '#experience' },
        { name: 'Projetos', href: '#projects' },
        { name: 'Contato', href: '#contact' },
    ];

    return (
        <header className="header">
            <nav className="nav-container">
                <div className="logo">
                    &lt;DEVBORGES/&gt;
                </div>

                {/* Desktop Navigation */}
                <ul className="nav-links">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <a href={item.href}>{item.name}</a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </nav>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-nav"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="mobile-nav-links">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
