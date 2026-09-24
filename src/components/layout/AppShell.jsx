import { LazyMotion, MotionConfig } from 'framer-motion';
import LocaleProvider from '../../i18n/LocaleProvider';
import ScrollProgress from './ScrollProgress';
import Header from './Header';
import Footer from './Footer';

const loadMotionFeatures = () => import('../../motionFeatures').then((mod) => mod.default);

// Estrutura comum a todas as páginas: idioma, animações sob demanda, header, conteúdo e rodapé.
// `page` é a chave da página em src/i18n/routes.js.
const AppShell = ({ children, page = 'home', locale = 'pt' }) => (
    <LocaleProvider locale={locale}>
        <LazyMotion features={loadMotionFeatures} strict>
            <MotionConfig reducedMotion="user">
                <div className="app">
                    <ScrollProgress />
                    <Header page={page} />
                    <main>{children}</main>
                    <Footer />
                </div>
            </MotionConfig>
        </LazyMotion>
    </LocaleProvider>
);

export default AppShell;
