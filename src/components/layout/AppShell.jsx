import { LazyMotion, MotionConfig } from 'framer-motion';
import ScrollProgress from './ScrollProgress';
import Header from './Header';
import Footer from './Footer';

const loadMotionFeatures = () => import('../../motionFeatures').then((mod) => mod.default);

// Estrutura comum a todas as páginas: animações sob demanda, header, conteúdo e rodapé.
const AppShell = ({ children, homePath }) => (
    <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
            <div className="app">
                <ScrollProgress />
                <Header homePath={homePath} />
                <main>{children}</main>
                <Footer />
            </div>
        </MotionConfig>
    </LazyMotion>
);

export default AppShell;
