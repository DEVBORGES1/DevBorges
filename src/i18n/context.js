import { createContext, useContext } from 'react';
import { strings } from './strings';

export const LocaleContext = createContext({ locale: 'pt', t: strings.pt });

// Idioma da página atual e textos de interface correspondentes.
export const useLocale = () => useContext(LocaleContext);
