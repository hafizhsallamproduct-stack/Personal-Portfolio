import { useEffect, useState, useRef } from 'react';
import { HafizhLogo, LinkedinLogo, List, X } from './icons';

const SECTION_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Expertise' },
  { href: '#portfolio', label: 'Portfolio' },
];

const SectionLinks = ({ activeHash, onLinkClick }) => (
  <>
    {SECTION_LINKS.map(({ href, label }) => (
      <a
        key={href}
        href={href}
        className={`nav-link ${activeHash === href ? 'active' : ''}`}
        onClick={onLinkClick}
      >
        {label}
      </a>
    ))}
  </>
);

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
    // Scroll-spy: the active section is the last one whose top has crossed a
    // trigger line near the top of the viewport. Robust for short sections.
    const TRIGGER_OFFSET = 140;

    const updateActive = () => {
      const sections = Array.from(document.querySelectorAll('section[id], footer[id]'));
      let current = '';
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= TRIGGER_OFFSET) {
          current = '#' + el.id;
        }
      }
      setActiveHash((prev) => (prev === current ? prev : current));
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const hamburgerIcon = isMobileMenuOpen ? (
    <X className="icon" aria-hidden="true" />
  ) : (
    <List className="icon" aria-hidden="true" />
  );

  return (
    <>
      <header className="nav-top" ref={navTopRef}>
        <nav className="nav">
          <a href="#top" className="nav-logo" aria-label="Back to home">
            <HafizhLogo className="nav-logo-icon" />
          </a>

          <button
            className="hamburger-menu"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {hamburgerIcon}
          </button>

          <div className={`nav-links ${isMobileMenuOpen ? 'nav-links--open' : ''}`}>
            <SectionLinks onLinkClick={closeMobileMenu} />
          </div>
        </nav>
      </header>

      <header className={`nav-fixed ${isFixedVisible ? 'visible' : ''}`} id="navFixed">
        <nav className="nav">
          <a href="#top" className="nav-logo" aria-label="Back to home">
            <HafizhLogo className="nav-logo-icon" />
            <span className="nav-logo-text">Hafizh Sallam</span>
          </a>

          <div className="nav-controls-mobile">
            <button
              className="hamburger-menu"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {hamburgerIcon}
            </button>
          </div>

          <div className={`nav-links ${isMobileMenuOpen ? 'nav-links--open' : ''}`}>
            <SectionLinks activeHash={activeHash} onLinkClick={closeMobileMenu} />
            <a
              href="https://www.linkedin.com/in/hafizh-s-b7299420a/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline nav-link-cta-desktop"
              onClick={closeMobileMenu}
            >
              Get in touch <LinkedinLogo className="icon" aria-hidden="true" />
            </a>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
