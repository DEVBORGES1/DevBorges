import { LocaleContext } from './context';
import { strings } from './strings';

const LocaleProvider = ({ locale, children }) => (
    <LocaleContext.Provider value={{ locale, t: strings[locale] }}>{children}</LocaleContext.Provider>
);

export default LocaleProvider;
