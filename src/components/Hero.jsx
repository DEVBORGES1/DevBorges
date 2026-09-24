import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

import cartoonImage from '../assets/projects/cartoon.webp';

const fullText = "Desenvolvedor Full Stack Especializado em desenvolver soluções web modernas.";

// Gerado uma única vez: se ficasse no render, cada tick do typewriter
// sortearia novas posições/durações e as partículas "pulariam".
const particles = Array.from({ length: 20 }, () => ({
    x: (Math.random() * 100 - 50) + '%',
    delay: Math.random() * 5 + 's',
    duration: 5 + Math.random() * 5 + 's',
    left: (50 + (Math.random() * 60 - 30)) + '%',
    digit: Math.random() > 0.5 ? '1' : '0',
}));

const Hero = () => {
    const [text, setText] = useState('');
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) return;

        let index = 0;
        const intervalId = setInterval(() => {
            setText(fullText.slice(0, index + 1));
            index++;
            if (index > fullText.length) {
                clearInterval(intervalId);
            }
        }, 50); // Typing speed

        return () => clearInterval(intervalId);
    }, [shouldReduceMotion]);

    return (
        <section id="hero" className="hero">
            <div className="hero-container">
                <div className="hero-text">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Olá, eu sou o <span className="highlight">Borges</span>
                    </motion.h1>

                    <motion.p
                        className="typewriter-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <span className="sr-only">{fullText}</span>
                        <span aria-hidden="true">
                            {shouldReduceMotion ? fullText : text}<span className="cursor">|</span>
                        </span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <a href="#projects" className="cta-button">Ver Projetos</a>
                    </motion.div>
                </div>

                <motion.div
                    className="hero-image-container"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="binary-particles" aria-hidden="true">
                        {particles.map((p, i) => (
                            <span
                                key={i}
                                style={{
                                    '--x': p.x,
                                    '--delay': p.delay,
                                    '--duration': p.duration,
                                    left: p.left
                                }}
                            >
                                {p.digit}
                            </span>
                        ))}
                    </div>
                    <img
                        src={cartoonImage}
                        alt="Avatar ilustrado de João Vitor Borges"
                        className="hero-cartoon"
                        width="730"
                        height="1000"
                        fetchPriority="high"
                    />
                </motion.div>
            </div>

            <a href="#about" className="scroll-indicator" aria-label="Scroll Down">
                <FaChevronDown />
            </a>
        </section>
    );
};

export default Hero;
