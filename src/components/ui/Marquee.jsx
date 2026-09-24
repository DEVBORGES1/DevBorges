import { useLocale } from '../../i18n/context';
import './Marquee.css';

// Faixa de áreas de atuação rolando sem parar entre seções.
// A lista aparece duas vezes para o loop ficar contínuo; a cópia fica oculta dos leitores de tela.
const Marquee = () => {
    const { t } = useLocale();
    const { label, items } = t.marquee;

    const renderList = (hidden) => (
        <ul className="marquee-list" aria-hidden={hidden || undefined}>
            {items.map((item) => (
                <li key={item}>
                    {item}
                    <span className="marquee-separator" aria-hidden="true">✦</span>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="marquee" role="region" aria-label={label}>
            <div className="marquee-track">
                {renderList(false)}
                {renderList(true)}
            </div>
        </div>
    );
};

export default Marquee;
