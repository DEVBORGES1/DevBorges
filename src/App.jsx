import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';

import Experience from './components/Experience';
import ScrollProgress from './components/ScrollProgress';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <ScrollProgress />
        <Header />
        <main>
          <Hero />
          <ScrollReveal>
            <About />
          </ScrollReveal>
          <Skills />
          <Experience />
          <Projects />
          <ScrollReveal>
            <Contact />
          </ScrollReveal>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
