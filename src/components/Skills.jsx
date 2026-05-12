import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const terminalRef = useRef(null);
  const [terminalLines, setTerminalLines] = useState([]);
  const [isTypingDone, setIsTypingDone] = useState(false);

  const skillsData = [
    { name: 'mern_stack', pct: 95, bars: 12 },
    { name: 'javascript_react', pct: 92, bars: 12 },
    { name: 'nodejs_express', pct: 88, bars: 11 },
    { name: 'sql_databases', pct: 85, bars: 11 },
    { name: 'asp_net_mvc', pct: 80, bars: 10 },
    { name: 'python_scraping', pct: 75, bars: 10 }
  ];

  const techChips = [
    "⚛️ React", "🟢 Node.js", "🍃 MongoDB", "🐘 SQL/MySQL", 
    "🔷 ASP.NET", "📘 TypeScript", "🐍 Python", "🔴 Redis", 
    "🔗 Socket.io", "📦 Git", "🎨 UI/UX Design", "🔥 Firebase"
  ];

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

      // Tech chips animation
      gsap.from('.tech-chip', {
        scale: 0.85,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      });

      // Terminal animation trigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        once: true,
        onEnter: startTyping
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const startTyping = async () => {
    for (let i = 0; i < skillsData.length; i++) {
      const skill = skillsData[i];
      const targetLine = `> ${skill.name.padEnd(20)} ${skill.pct.toString().padStart(3)}%  ${'█'.repeat(skill.bars)}${'░'.repeat(13 - skill.bars)}`;
      
      let currentText = "";
      for (let j = 0; j < targetLine.length; j++) {
        currentText += targetLine[j];
        setTerminalLines(prev => [...prev.slice(0, i), currentText]);
        await new Promise(resolve => setTimeout(resolve, 16));
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const statusLine = '> status: all systems ready ✓';
    let currentStatus = "";
    for (let j = 0; j < statusLine.length; j++) {
      currentStatus += statusLine[j];
      setTerminalLines(prev => [...prev.slice(0, skillsData.length), currentStatus]);
      await new Promise(resolve => setTimeout(resolve, 16));
    }
    setIsTypingDone(true);
  };

  return (
    <section className="panel" id="skills" ref={sectionRef}>
      <div className="panel-content">
        <div className="container">
          <div className="skills-grid">
            <div className="skills-left">
              <div className="terminal">
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <div className="terminal-title">skills.sh</div>
                </div>
                <div className="terminal-body" ref={terminalRef}>
                  <div id="terminal-content">
                    {terminalLines.map((line, i) => (
                      <div key={i}>
                        {i === terminalLines.length - 1 && isTypingDone ? (
                          <span style={{ color: '#E8D5B0' }}>{line}</span>
                        ) : (
                          line
                        )}
                      </div>
                    ))}
                  </div>
                  {!isTypingDone && <span className="cursor">▋</span>}
                </div>
              </div>
            </div>
            
            <div className="skills-right">
              <div className="section-label">Skills</div>
              <h2 className="section-heading">
                <span className="word-inner">Technologies</span>
              </h2>
              <div className="tech-grid">
                {techChips.map((tech, i) => (
                  <div key={i} className="tech-chip">{tech}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
