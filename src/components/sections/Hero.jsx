import { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaFileDownload } from 'react-icons/fa';

import cartoonImage from '../../assets/projects/cartoon.webp';
import cartoonImageSmall from '../../assets/projects/cartoon-440.webp';
import { profile } from '../../data/profile';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useLocale } from '../../i18n/context';
import './Hero.css';

const fullText = profile.role;

// Gerador pseudoaleatório com semente fixa (mulberry32): as partículas saem
// iguais no HTML pré-renderizado e no navegador, evitando divergência na hidratação.
const createRandom = (seed) => () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const random = createRandom(2024);

// Gerado uma única vez: se ficasse no render, cada tick do typewriter
// sortearia novas posições/durações e as partículas "pulariam".
const particles = Array.from({ length: 20 }, () => ({
    x: (random() * 100 - 50).toFixed(2) + '%',
    delay: (random() * 5).toFixed(2) + 's',
    duration: (5 + random() * 5).toFixed(2) + 's',
    left: (50 + (random() * 60 - 30)).toFixed(2) + '%',
    digit: random() > 0.5 ? '1' : '0',
}));

const Hero = () => {
    const { locale, t } = useLocale();
    const [text, setText] = useState('');
    const sectionRef = useRef(null);
    const shouldReduceMotion = usePrefersReducedMotion();

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

    // Pausa as animações infinitas (partículas, flutuação, seta) quando o hero sai da tela
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return undefined;
        const observer = new IntersectionObserver(([entry]) => {
            section.classList.toggle('is-offscreen', !entry.isIntersecting);
        });
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    // Entradas animadas em CSS (Hero.css), não com framer-motion: assim o conteúdo
    // pré-renderizado aparece sem esperar o JavaScript carregar (melhor LCP).
    return (
        <section id="hero" className="hero" ref={sectionRef}>
            <div className="hero-container">
                <div className="hero-text">
                    <h1 className="hero-enter hero-enter--title">
                        <span className="hero-greeting">{t.hero.greeting}</span>{' '}
                        João Vitor <span className="highlight">Pereira</span>
                    </h1>

                    <p className="typewriter-text hero-enter hero-enter--fade" style={{ '--enter-delay': '0.3s' }}>
                        <span className="sr-only">{fullText}</span>
                        {/* Texto completo invisível reserva a altura final: a digitação não empurra o layout */}
                        <span className="typewriter-ghost" aria-hidden="true">{fullText}|</span>
                        <span className="typewriter-typed" aria-hidden="true">
                            {shouldReduceMotion ? fullText : text}<span className="cursor">|</span>
                        </span>
                    </p>

                    <p className="hero-summary">
                        {profile.summary[locale]}
                    </p>

                    <div className="hero-actions hero-enter hero-enter--pop" style={{ '--enter-delay': '0.6s' }}>
                        <a href="#projects" className="cta-button">{t.hero.projectsCta}</a>
                        <a href={profile.resume[locale]} className="cta-button secondary" download>
                            <FaFileDownload aria-hidden="true" /> {t.hero.resumeCta}
                        </a>
                    </div>
                </div>

                <div className="hero-image-container hero-enter hero-enter--slide" style={{ '--enter-delay': '0.2s' }}>
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
                        srcSet={`${cartoonImageSmall} 440w, ${cartoonImage} 730w`}
                        sizes="(max-width: 768px) 220px, 365px"
                        alt={t.hero.avatarAlt}
                        className="hero-cartoon"
                        width="730"
                        height="1000"
                        fetchPriority="high"
                    />
                </div>
            </div>

            <a href="#about" className="scroll-indicator" aria-label={t.hero.scrollDown}>
                <FaChevronDown />
            </a>
        </section>
    );
};

export default Hero;
