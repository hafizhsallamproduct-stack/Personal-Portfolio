import React, { useEffect, useState, useRef } from 'react';

const Navbar = () => {
  const [isFixedVisible, setIsFixedVisible] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navTopRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsFixedVisible(true);
      } else {
        setIsFixedVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveHash('#' + entry.target.id);
        }
      });
    }, { rootMargin: '-120px 0px -40% 0px' });

    sections.forEach(el => observer.observe(el));
    return () => {
      sections.forEach(el => observer.unobserve(el));
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="nav-top" ref={navTopRef}>
        <nav className="nav">
          <a href="#top" className="nav-logo" aria-label="Back to home">
            <div className="nav-logo-icon">H</div>
          </a>
          
          <button className="hamburger-menu" onClick={toggleMobileMenu} aria-label="Toggle menu">
            <i className={`ph ${isMobileMenuOpen ? 'ph-x' : 'ph-list'}`}></i>
          </button>

          <div className={`nav-links ${isMobileMenuOpen ? 'nav-links--open' : ''}`}>
            <a href="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#experience" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Experience</a>
            <a href="#education" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Education</a>
            <a href="#skills" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>My work</a>
          </div>
        </nav>
      </header>

      <header className={`nav-fixed ${isFixedVisible ? 'visible' : ''}`} id="navFixed">
        <nav className="nav">
          <a href="#top" className="nav-logo" aria-label="Back to home">
            <div className="nav-logo-icon">H</div>
            <span className="nav-logo-text">Hafizh Sallam</span>
          </a>
          
          <button className="hamburger-menu" onClick={toggleMobileMenu} aria-label="Toggle menu">
            <i className={`ph ${isMobileMenuOpen ? 'ph-x' : 'ph-list'}`}></i>
          </button>

          <div className={`nav-links ${isMobileMenuOpen ? 'nav-links--open' : ''}`}>
            <a href="#about" className={`nav-link ${activeHash === '#about' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#experience" className={`nav-link ${activeHash === '#experience' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Experience</a>
            <a href="#education" className={`nav-link ${activeHash === '#education' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Education</a>
            <a href="#skills" className={`nav-link ${activeHash === '#skills' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>My work</a>
            <a href="https://www.linkedin.com/in/hafizh-s-b7299420a/" target="_blank" rel="noopener noreferrer" className="btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Get in touch <i className="ph ph-linkedin-logo"></i></a>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
