import AppShell from './components/layout/AppShell';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import ScrollReveal from './components/ui/ScrollReveal';

function App({ locale = 'pt' }) {
  return (
    <AppShell page="home" locale={locale}>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
    </AppShell>
  );
}

export default App;
