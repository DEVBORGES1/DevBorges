import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useTheme } from '../../theme/useTheme';

// Cores sólidas (não opacidade) para o texto apagado manter contraste AA (4.6:1) sobre o fundo de cada tema.
// Ficam aqui, e não em variáveis CSS, porque o framer-motion precisa de cores concretas para interpolar.
const colors = {
    dark: { dim: '#7a7a84', lit: '#ffffff' },
    light: { dim: '#71717a', lit: '#0a0a0a' },
};

const Word = ({ children, progress, range, dim, lit }) => {
    const color = useTransform(progress, range, [dim, lit]);
    return <m.span style={{ color }}>{children}</m.span>;
};

// Quebra os parágrafos em palavras (mantendo os espaços) e numera cada palavra
// para ela receber sua fatia do progresso de rolagem.
const tokenize = (paragraphs) => {
    let totalWords = 0;
    const tokenized = paragraphs.map((segments) =>
        segments.map((segment) => {
            const strong = typeof segment !== 'string';
            const tokens = (strong ? segment.strong : segment)
                .split(/(\s+)/)
                .filter(Boolean)
                .map((text) => (text.trim() ? { text, index: totalWords++ } : { text }));
            return { strong, tokens };
        }),
    );
    return { tokenized, totalWords };
};

// Parágrafos em segmentos (strings ou { strong }) cujas palavras "acendem"
// uma a uma conforme a página rola. Com menos movimento, o texto aparece aceso.
const ScrollLitText = ({ paragraphs }) => {
    const ref = useRef(null);
    const shouldReduceMotion = usePrefersReducedMotion();
    const theme = useTheme();
    const { dim, lit } = colors[theme];
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });

    if (shouldReduceMotion) {
        return (
            <div ref={ref}>
                {paragraphs.map((segments, index) => (
                    <p key={index} style={{ color: lit }}>
                        {segments.map((segment, i) =>
                            typeof segment === 'string' ? segment : <strong key={i}>{segment.strong}</strong>,
                        )}
                    </p>
                ))}
            </div>
        );
    }

    const { tokenized, totalWords } = tokenize(paragraphs);

    const renderWords = (tokens) =>
        tokens.map((token, i) =>
            token.index === undefined ? (
                token.text
            ) : (
                <Word key={i} progress={scrollYProgress} range={[token.index / totalWords, (token.index + 1) / totalWords]} dim={dim} lit={lit}>
                    {token.text}
                </Word>
            ),
        );

    return (
        <div ref={ref}>
            {tokenized.map((segments, index) => (
                // Chave com o tema: ao trocar de tema as palavras remontam com as novas cores
                <p key={`${theme}-${index}`}>
                    {segments.map(({ strong, tokens }, i) =>
                        strong ? <strong key={i}>{renderWords(tokens)}</strong> : <span key={i}>{renderWords(tokens)}</span>,
                    )}
                </p>
            ))}
        </div>
    );
};

export default ScrollLitText;
