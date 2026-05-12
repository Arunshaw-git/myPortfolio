import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from('.section-heading .word-inner', {
        y: '110%',
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      });

      // Parallax blobs
      gsap.to('.blob-1', {
        y: -140,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });

      gsap.to('.blob-2', {
        y: -70,
        x: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2.5
        }
      });

      // Highlight cards
      gsap.from('.highlight-card', {
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="panel" id="about" ref={sectionRef}>
      <div className="panel-content">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>

        <div className="container">
          <div className="about-grid">
            <div className="about-left">
              <div className="section-label">About</div>
              <h2 className="section-heading">
                <span className="word-inner">The</span>{' '}
                <span className="word-inner">developer</span>{' '}
                <span className="word-inner">behind</span>{' '}
                <span className="word-inner">the</span>{' '}
                <span className="word-inner">code.</span>
              </h2>
              <p>I'm a <strong>Full Stack Developer</strong> with strong hands-on experience in the <strong>MERN stack</strong>, <strong>ASP.NET MVC</strong>, and enterprise-grade systems. I have a proven ability to build secure, scalable web applications from responsive frontends to complex database designs.</p>
              <p>Experienced in both startup-style agile environments and enterprise <strong>Domain-Driven architectures</strong>. My focus is on writing robust, maintainable code that delivers real-world value through thoughtful user experiences and high-performance backends.</p>
              <p>I have completed my <strong>Bachelor of Computer Application</strong> in June 2025 from IAER, Kolkata.</p>
            </div>

            <div className="about-right">
              <div className="highlight-card">
                <div className="card-label">Education</div>
                <div className="card-value">Graduate '25</div>
                <div className="card-desc">BCA, IAER Kolkata (CGPA: 7.9)</div>
              </div>
              <div className="highlight-card">
                <div className="card-label">Focus</div>
                <div className="card-value">MERN & .NET</div>
                <div className="card-desc">Enterprise Scale Apps</div>
              </div>
              <div className="highlight-card">
                <div className="card-label">Experience</div>
                <div className="card-value">Full Stack</div>
                <div className="card-desc">End-to-end Development</div>
              </div>
              <div className="highlight-card">
                <div className="card-label">Availability</div>
                <div className="card-value">Open</div>
                <div className="card-desc">To new opportunities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
