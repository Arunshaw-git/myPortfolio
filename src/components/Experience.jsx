import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
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

      // Timeline line growth
      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1
          }
        }
      );

      // Timeline items
      gsap.from('.timeline-item', {
        x: -50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 75%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experienceData = [
    {
      period: 'Feb 2026 – Mar 2026',
      role: 'Full Stack Developer',
      company: 'Cleryn Global Software',
      desc: 'Developing premium E-commerce platforms and CRM systems. Leading backend architecture and world-class UI implementation.',
      tags: ['React', 'Node.js', 'GSAP'],
      filled: true
    },
    {
      period: 'Sept 2025 – Nov 2025',
      role: 'Software Developer Trainee',
      company: 'Datanalytix Technologies',
      desc: 'Developed modules for LIMS using ASP.NET MVC and Domain-Driven Design.',
      tags: ['ASP.NET MVC', 'DDD', 'SQL']
    },
    {
      period: 'Apr 2025 – Jul 2025',
      role: 'Junior MERN Developer',
      company: 'Indian Cybersecurity Solutions',
      desc: 'Built EMS with JWT auth and live notifications. Implemented real-time monitoring via Wireshark.',
      tags: ['Socket.io', 'JWT', 'Python']
    },
    {
      period: 'Dec 2024 – Feb 2025',
      role: 'Front End Developer',
      company: 'IMP Engineering & Power Ltd',
      desc: 'Designed responsive marketing landing pages within a .NET Core environment.',
      tags: ['HTML/CSS', 'Bootstrap', '.NET']
    }
  ];

  return (
    <section className="panel" id="experience" ref={sectionRef}>
      <div className="panel-content">
        <div className="container">
          <div className="section-label">Experience</div>
          <h2 className="section-heading">
            <span className="word-inner">Career</span>{' '}
            <span className="word-inner">journey</span>
          </h2>
          
          <div className="timeline">
            <div className="timeline-line"></div>
            {experienceData.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className={`timeline-dot ${item.filled ? 'filled' : ''}`}></div>
                <div className="timeline-content">
                  <div className="timeline-period">{item.period}</div>
                  <h3 className="timeline-role">{item.role}</h3>
                  <div className="timeline-company">{item.company}</div>
                  <p className="timeline-desc">{item.desc}</p>
                  <div className="timeline-tags">
                    {item.tags.map((tag, j) => (
                      <span key={j} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
