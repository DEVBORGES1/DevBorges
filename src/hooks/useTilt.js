import { useEffect, useRef } from 'react';

// Inclinação 3D que segue o cursor. Só ativa com mouse (sem efeito em touch)
// e é desligada quando o sistema pede menos movimento.
export function useTilt({ max = 10, scale = 1.03, perspective = 1000 } = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;

        const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!canHover || reduceMotion) return undefined;

        let frame = 0;

        const handleMove = (event) => {
            const rect = el.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                el.style.transform =
                    `perspective(${perspective}px) rotateX(${(-y * max * 2).toFixed(2)}deg) ` +
                    `rotateY(${(x * max * 2).toFixed(2)}deg) scale(${scale})`;
            });
        };

        const handleLeave = () => {
            cancelAnimationFrame(frame);
            el.style.transform = '';
        };

        el.addEventListener('pointermove', handleMove);
        el.addEventListener('pointerleave', handleLeave);

        return () => {
            cancelAnimationFrame(frame);
            el.removeEventListener('pointermove', handleMove);
            el.removeEventListener('pointerleave', handleLeave);
        };
    }, [max, scale, perspective]);

    return ref;
}
