import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow', {
        y: -30,
        opacity: 0,
        duration: 1,
        delay: 0.3
      });

      gsap.from('.hero-status', {
        y: -30,
        opacity: 0,
        duration: 1,
        delay: 0.4
      });

      gsap.from('.hero-title .line', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.5
      });

      gsap.from('.hero-tags', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 1.1
      });

      gsap.from('.scroll-cue', {
        opacity: 0,
        duration: 1,
        delay: 1.5
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="panel" id="hero" ref={sectionRef}>
      <div className="panel-content">
        <div className="hero-background">
          <video autoPlay muted loop playsInline>
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
          <div className="hero-grid"></div>
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">Full Stack Developer</div>
          <div className="hero-status">
            <span className="status-dot"></span>
            Available for new opportunities
          </div>
          <div className="hero-title">
            <span className="line">ARUN</span>
            <span className="line">SHAW.</span>
          </div>
          <div className="hero-tags">
            <span>*MERN Stack</span>
            <span>*Bachelor of Computer Application</span>
            <span>*SQL</span>
            <span>*JavaScript</span>
            <span>*Python</span>
          </div>
          <div className="hero-footer-left">DSGN-2026</div>
          <div className="hero-footer-right">↗ Scroll to explore</div>
          <div className="scroll-cue">
            <span>SCROLL</span>
            <div className="scroll-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
