import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') !== 'false'
  );
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <nav id="nav" className={isScrolled ? 'scrolled' : ''}>
      <div className="nav-left">APS.</div>
      <div className="nav-center">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="nav-right">
        <button id="theme-toggle" className="theme-btn" onClick={toggleTheme}>
          {isDarkMode ? '☾' : '☀'}
        </button>
        <button className="hire-btn">Hire Me</button>
      </div>
    </nav>
  );
};

export default Navbar;
