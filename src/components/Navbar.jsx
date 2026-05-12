import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') !== 'false'
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav id="nav" className={`${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <div className="nav-left">AS</div>
      
      <div className={`nav-center ${isMobileMenuOpen ? 'active' : ''}`}>
        <a href="#about" onClick={closeMobileMenu}>About</a>
        <a href="#projects" onClick={closeMobileMenu}>Projects</a>
        <a href="#skills" onClick={closeMobileMenu}>Skills</a>
        <a href="#experience" onClick={closeMobileMenu}>Experience</a>
        <a href="#contact" onClick={closeMobileMenu}>Contact</a>
        
        {/* Mobile-only Hire Button inside menu */}
        <a href="mailto:arunshaw08@gmail.com" className="hire-btn mobile-only" onClick={closeMobileMenu}>
          Hire Me
        </a>
      </div>

      <div className="nav-right">
        <button id="theme-toggle" className="theme-btn" onClick={toggleTheme}>
          {isDarkMode ? '☾' : '☀'}
        </button>
        <a href="mailto:arunshaw08@gmail.com" className="hire-btn desktop-only">Hire Me</a>
        
        <button className="menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
