import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ number, name, desc, tags, featured, link, image }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 6;
      const rotateX = -((y - centerY) / centerY) * 6;

      card.style.transform = `perspective(900px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseEnter = () => {
      card.style.transition = 'transform 0.08s linear';
    };

    const handleMouseLeave = () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={`project-card ${featured ? 'featured' : ''}`} ref={cardRef}>
      <div className="project-visual">
        {image && <img src={image} alt={name} loading="lazy" />}
      </div>
      <div className="project-info">
        <div className="project-tags">
          {tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
        </div>
        <h3 className="project-name">{name}</h3>
        <p className="project-desc">{desc}</p>
        <a href={link || "#"} target="_blank" rel="noopener noreferrer" className="project-link">View Project →</a>
      </div>
    </div>
  );
};

const Projects = () => {
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

      // Featured project
      gsap.from('.project-card.featured', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      });

      // Other projects
      gsap.from('.project-card:not(.featured)', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projectsData = [
    {
      number: '01',
      name: 'Reddit Stock Sentiment',
      desc: 'Full-stack system analyzing Reddit discussions to generate stock insights. Features Python data pipelines and Node.js APIs.',
      tags: ['Python', 'Node.js', 'MySQL', 'Redis'],
      featured: true,
      link: 'https://redditstocks.netlify.app',
      image: '/projects photos/reddit_sentiment.jpeg'
    },
    {
      number: '02',
      name: 'Employee Monitoring (EMS)',
      desc: 'Role-based monitoring system with real-time website tracking (Wireshark), automated screenshots, and USB detection.',
      tags: ['MERN Stack', 'Python', 'Socket.io', 'MySQL', 'JWT'],
      link: 'https://www.linkedin.com/feed/update/urn:li:activity:7357317541653790720/',
      image: '/projects photos/EMS.png'
    },
    {
      number: '03',
      name: 'Premium Ecommerce',
      desc: 'High-end clothing brand platform with world-class UI, scroll-based animations, and custom CMS development.',
      tags: ['React', 'Node.js', 'Premium UI'],
      link: 'https://blumbzatelier.com',
      image: '/projects photos/blumbatelier.jpeg'
    }
  ];

  return (
    <section className="panel" id="projects" ref={sectionRef}>
      <div className="panel-content">
        <div className="container">
          <div className="section-label">Projects</div>
          <h2 className="section-heading">
            <span className="word-inner">Featured</span>{' '}
            <span className="word-inner">work</span>
          </h2>

          <div className="projects-grid">
            {projectsData.map((project, i) => (
              <ProjectCard key={i} {...project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
