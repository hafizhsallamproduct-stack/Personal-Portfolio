import { useEffect, useState } from 'react';
import { HafizhLogo, List, X } from './icons';

const SECTION_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Expertise' },
];

const SectionLinks = ({ activeHash, onLinkClick }) => {
  const handleClick = (event, href) => {
    // Smooth-scroll to the target section ourselves. Relying on native hash
    // anchoring is unreliable under the router (and when a hash is already in
    // the URL), so we scroll the element into view directly.
    const target = document.querySelector(href);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', href);
    }
    onLinkClick?.(event);
  };

  return (
    <>
      {SECTION_LINKS.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className={`nav-link ${activeHash === href ? 'active' : ''}`}
          onClick={(event) => handleClick(event, href)}
        >
          {label}
        </a>
      ))}
    </>
  );
};

const Navbar = () => {
  const [activeHash, setActiveHash] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // The name joins the logo only once the page has scrolled, while the hero
  // below already shows it large.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 120);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <header className={`nav-top ${isScrolled ? 'nav-top--scrolled' : ''}`}>
      <nav className="nav">
        <a href="#top" className="nav-logo" aria-label="Back to home">
          <HafizhLogo className="nav-logo-icon" />
          <span className="nav-logo-text">Hafizh Sallam</span>
          <span className="nav-logo-identity" aria-hidden="true">
            <span className="nav-logo-identity-name">Hafizh Sallam</span>
            <span className="nav-logo-identity-role">Senior Product Designer</span>
          </span>
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
