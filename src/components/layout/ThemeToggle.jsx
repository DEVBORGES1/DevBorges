import { FaMoon, FaSun } from 'react-icons/fa';
import { setTheme, useTheme } from '../../theme/useTheme';
import { useLocale } from '../../i18n/context';

const ThemeToggle = () => {
    const { t } = useLocale();
    const theme = useTheme();
    const isLight = theme === 'light';

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            aria-label={isLight ? t.nav.darkTheme : t.nav.lightTheme}
        >
            {isLight ? <FaMoon aria-hidden="true" /> : <FaSun aria-hidden="true" />}
        </button>
    );
};

export default ThemeToggle;
