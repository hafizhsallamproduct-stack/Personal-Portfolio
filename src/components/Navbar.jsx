import { useEffect, useState, useRef } from 'react';
import { LinkedinLogo, List, X } from './icons';

const SECTION_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'My work' },
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
  const [showMobileCta, setShowMobileCta] = useState(false);
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-120px 0px -40% 0px' }
    );

    sections.forEach((el) => observer.observe(el));
    return () => {
      sections.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const heroCta = document.getElementById('hero-cta');
    if (!heroCta) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Show mobile CTA if hero CTA is NOT intersecting (out of view)
          setShowMobileCta(!entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    observer.observe(heroCta);
    return () => observer.unobserve(heroCta);
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
            <div className="nav-logo-icon">H</div>
          </a>

          <button className="hamburger-menu" onClick={toggleMobileMenu} aria-label="Toggle menu">
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
            <div className="nav-logo-icon">H</div>
            <span className="nav-logo-text">Hafizh Sallam</span>
          </a>

          <div className="nav-controls-mobile">
            <a
              href="https://www.linkedin.com/in/hafizh-s-b7299420a/"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-outline nav-mobile-cta ${showMobileCta ? 'visible' : ''}`}
              onClick={closeMobileMenu}
            >
              Get in touch <LinkedinLogo className="icon" aria-hidden="true" />
            </a>

            <button className="hamburger-menu" onClick={toggleMobileMenu} aria-label="Toggle menu">
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
