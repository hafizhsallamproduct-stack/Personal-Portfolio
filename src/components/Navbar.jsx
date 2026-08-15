import { useEffect, useState, useRef } from 'react';
import { HafizhLogo, List, X } from './icons';

const SECTION_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Expertise' },
  { href: '#portfolio', label: 'Portfolio' },
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
  const [isFixedVisible, setIsFixedVisible] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navTopRef = useRef(null);
  const navFixedRef = useRef(null);

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

  // Point the lit segment of the header rule at the active link. Each header is
  // measured on its own: the fixed one carries a wider logo, so its links do
  // not line up with the top one's.
  useEffect(() => {
    const positionBeam = (header) => {
      const nav = header?.querySelector('.nav');
      if (!nav) return;

      const active = nav.querySelector('.nav-link.active');
      // No active section yet, or the links are stacked in the mobile menu
      // rather than laid out along the rule.
      if (!active || active.offsetParent === null) {
        nav.style.setProperty('--beam-opacity', '0');
        return;
      }

      const navBox = nav.getBoundingClientRect();
      const linkBox = active.getBoundingClientRect();
      nav.style.setProperty('--beam-x', `${linkBox.left - navBox.left}px`);
      nav.style.setProperty('--beam-w', `${linkBox.width}px`);
      nav.style.setProperty('--beam-opacity', '1');
    };

    const update = () => {
      positionBeam(navTopRef.current);
      positionBeam(navFixedRef.current);
    };

    update();
    // Fonts land after first paint and shift the links sideways, so measure
    // again once they are ready.
    document.fonts?.ready.then(update).catch(() => {});
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [activeHash, isMobileMenuOpen]);

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

      <header
        className={`nav-fixed ${isFixedVisible ? 'visible' : ''}`}
        id="navFixed"
        ref={navFixedRef}
      >
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
    </>
  );
};

export default Navbar;
