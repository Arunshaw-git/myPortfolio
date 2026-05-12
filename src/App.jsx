import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Progress Bar
      gsap.to('#progress-bar', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3
        }
      });

      // Panel Scroll Effect
      const panels = gsap.utils.toArray('.panel');
      panels.forEach((panel, index) => {
        // Force initial state
        if (index === 0) {
          panel.classList.add('active');
          panel.classList.remove('receding');
        } else {
          panel.classList.add('receding');
          panel.classList.remove('active');
        }

        ScrollTrigger.create({
          trigger: panel,
          start: 'top 95%', // Trigger slightly before it comes into full view
          end: 'bottom 5%',
          onEnter: () => {
            panel.classList.remove('receding');
            panel.classList.add('active');
          },
          onLeave: () => {
            panel.classList.add('receding');
            panel.classList.remove('active');
          },
          onEnterBack: () => {
            panel.classList.remove('receding');
            panel.classList.add('active');
          },
          onLeaveBack: () => {
            panel.classList.add('receding');
            panel.classList.remove('active');
          }
        });
      });
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      ctx.revert();
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app">
      <div id="progress-bar"></div>
      <CursorGlow />
      <Navbar />
      
      <div className="scroll-container">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
