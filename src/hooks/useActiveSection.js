import { useEffect, useState } from 'react';

// Retorna o id da seção que está cruzando o meio da tela.
// `ids` precisa ser estável (definido fora do componente).
export function useActiveSection(ids) {
    const [activeId, setActiveId] = useState(ids[0]);

    useEffect(() => {
        if (!ids.length) return undefined;
        const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
        if (!elements.length) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            // Faixa fina logo acima do meio da viewport
            { rootMargin: '-45% 0px -50% 0px' },
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [ids]);

    return activeId;
}
