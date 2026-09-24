import { LazyMotion, MotionConfig } from 'framer-motion';
import ScrollProgress from './components/layout/ScrollProgress';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import ScrollReveal from './components/ui/ScrollReveal';

const loadMotionFeatures = () => import('./motionFeatures').then((mod) => mod.default);

function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <div className="app">
          <ScrollProgress />
          <Header />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <ScrollReveal>
              <Contact />
            </ScrollReveal>
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
