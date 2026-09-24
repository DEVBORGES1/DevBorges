import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Cores sólidas (não opacidade) para o texto apagado manter contraste AA (4.6:1) sobre o fundo.
const DIM = '#7a7a84';
const LIT = '#ffffff';

const Word = ({ children, progress, range }) => {
    const color = useTransform(progress, range, [DIM, LIT]);
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
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });

    if (shouldReduceMotion) {
        return (
            <div ref={ref}>
                {paragraphs.map((segments, index) => (
                    <p key={index} style={{ color: LIT }}>
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
                <Word key={i} progress={scrollYProgress} range={[token.index / totalWords, (token.index + 1) / totalWords]}>
                    {token.text}
                </Word>
            ),
        );

    return (
        <div ref={ref}>
            {tokenized.map((segments, index) => (
                <p key={index}>
                    {segments.map(({ strong, tokens }, i) =>
                        strong ? <strong key={i}>{renderWords(tokens)}</strong> : <span key={i}>{renderWords(tokens)}</span>,
                    )}
                </p>
            ))}
        </div>
    );
};

export default ScrollLitText;
