import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { workData } from '../data/portfolioData';
import { X, Sun, Moon } from './icons';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const ContentBlock = ({ block }) => {
  switch (block.type) {
    case 'heading':
      return <h2 className="portfolio-content-heading">{block.text}</h2>;
    case 'subheading':
      return <h3 className="portfolio-content-subheading">{block.text}</h3>;
    case 'paragraph':
      return <p>{block.text}</p>;
    case 'image':
      return (
        <div className="portfolio-content-image">
          {block.url && (
            <img src={block.url} alt={block.alt || ''} className="portfolio-detail-img" />
          )}
        </div>
      );
    case 'label':
      return <p className="portfolio-content-label">{block.text}</p>;
    case 'list':
      return (
        <ul className="portfolio-content-list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    default:
      return (
        <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>
          Unknown block type: {block.type}
        </div>
      );
  }
};

const PortfolioModal = ({ isStandalone }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'light'
  );
  const containerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const selectedProject = workData.find((w) => w.slug === slug) || workData[0];

  const startResizing = useCallback(
    (mouseDownEvent) => {
      const startWidth = sidebarWidth;
      const startPosition = mouseDownEvent.clientX;

      function onMouseMove(mouseMoveEvent) {
        const newWidth = startWidth + mouseMoveEvent.clientX - startPosition;
        setSidebarWidth(Math.max(250, Math.min(newWidth, 800)));
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.body.style.cursor = 'unset';
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'col-resize';
    },
    [sidebarWidth]
  );

  useEffect(() => {
    if (!isStandalone) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isStandalone]);

  const handleClose = useCallback(() => {
    if (location.state?.backgroundLocation) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    return () => {
      const prev = previouslyFocusedRef.current;
      if (prev instanceof HTMLElement && document.contains(prev)) {
        prev.focus();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== 'Tab' || !containerRef.current) return;

      const focusable = Array.from(
        containerRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  return (
    // Overlay click-to-close is an enhancement; Escape and the close button
    // cover keyboard users.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={`portfolio-modal-overlay open ${isStandalone ? 'standalone' : ''}`}
      onClick={handleClose}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <div
        ref={containerRef}
        className="portfolio-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-heading"
      >
        {/* Sidebar Left - Dynamic width limitation */}
        <div className="portfolio-modal-sidebar" style={{ width: sidebarWidth }}>
          <div className="portfolio-modal-sidebar-header">
            <div className="nav-logo-icon">H</div>
            <div className="portfolio-modal-sidebar-info">
              <h2>Portfolio</h2>
              <p>Hafizh Sallam</p>
            </div>
          </div>
          <div className="portfolio-modal-sidebar-nav">
            {workData.map((project, idx) => (
              <Link
                key={idx}
                to={`/portfolio/${project.slug}`}
                state={location.state}
                replace
                className={`portfolio-modal-nav-item ${project.slug === selectedProject.slug ? 'active' : ''}`}
              >
                <div className="portfolio-modal-nav-thumb"></div>
                <span>{project.title}</span>
              </Link>
            ))}
          </div>
          <div className="portfolio-modal-sidebar-footer">
            <button className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === 'light' ? (
                <Sun className="icon" aria-hidden="true" />
              ) : (
                <Moon className="icon" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Resizer Handle — drag-to-resize is inherently mouse-only */}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className="portfolio-modal-resizer"
          onMouseDown={startResizing}
          aria-label="Resize sidebar"
        ></div>

        {/* Floating close button */}
        <button
          ref={closeButtonRef}
          className="portfolio-modal-close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <X className="icon" aria-hidden="true" />
        </button>

        {/* Main Text Content Right */}
        <div className="portfolio-modal-main">
          {/* Max-width 768px constraint container */}
          <div className="portfolio-modal-content">
            <div className="portfolio-modal-header">
              <h1 id="portfolio-modal-heading" className="portfolio-modal-title">
                {selectedProject.title}
              </h1>
              {selectedProject.year && (
                <p className="portfolio-modal-year">{selectedProject.year}</p>
              )}
            </div>
            {selectedProject.content ? (
              selectedProject.content.map((block, idx) => <ContentBlock key={idx} block={block} />)
            ) : (
              <p className="portfolio-content-placeholder-text">
                Case study coming soon. Check back for the full project breakdown.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
