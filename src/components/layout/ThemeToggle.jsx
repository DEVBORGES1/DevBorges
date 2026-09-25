import { FaMoon, FaSun } from 'react-icons/fa';
import { setTheme, useTheme } from '../../theme/useTheme';
import { useLocale } from '../../i18n/context';

const ThemeToggle = () => {
    const { t } = useLocale();
    const theme = useTheme();
    const isLight = theme === 'light';

    // O círculo da transição nasce no centro do botão (vale também para clique pelo teclado)
    const handleClick = (event) => {
        const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
        setTheme(isLight ? 'dark' : 'light', { x: left + width / 2, y: top + height / 2 });
    };

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={handleClick}
            aria-label={isLight ? t.nav.darkTheme : t.nav.lightTheme}
        >
            {isLight ? <FaMoon aria-hidden="true" /> : <FaSun aria-hidden="true" />}
        </button>
    );
};

export default ThemeToggle;
