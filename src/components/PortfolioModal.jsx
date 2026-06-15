import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { workData } from '../data/portfolioData';
import { X, Sun, Moon, HafizhLogo } from './icons';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const ContentBlock = ({ block, onImageClick }) => {
  switch (block.type) {
    case 'heading':
      return <h2 className="portfolio-content-heading">{block.text}</h2>;
    case 'subheading':
      return <h3 className="portfolio-content-subheading">{block.text}</h3>;
    case 'paragraph':
      return <p>{block.text}</p>;
    case 'image':
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <figure
          className="portfolio-content-image"
          onClick={() => block.url && onImageClick?.(block.url)}
        >
          <div className="portfolio-image-wrap">
            {block.url && (
              <img src={block.url} alt={block.alt || ''} className="portfolio-detail-img" />
            )}
          </div>
          {block.caption && (
            <figcaption className="portfolio-image-caption">{block.caption}</figcaption>
          )}
        </figure>
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
    case 'timeline':
      return (
        <div className="portfolio-timeline">
          {block.phases.map((phase, i) => (
            <div key={i} className="portfolio-timeline-phase">
              <div className="portfolio-timeline-spine">
                <div className="portfolio-timeline-dot" />
                {i < block.phases.length - 1 && <div className="portfolio-timeline-line" />}
              </div>
              <div className="portfolio-timeline-body">
                <p className="portfolio-timeline-label">{phase.label}</p>
                <p className="portfolio-timeline-title">{phase.title} Success Criteria</p>
                <ul className="portfolio-timeline-list">
                  {phase.criteria.map((c, j) => (
                    <li key={j}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
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
  const [isClosing, setIsClosing] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState(null);
  const lightboxUrlRef = useRef(null);
  useEffect(() => {
    lightboxUrlRef.current = lightboxUrl;
  }, [lightboxUrl]);
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'light'
  );
  const containerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const isClosingRef = useRef(false);

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
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsClosing(true);
    setTimeout(() => {
      if (location.state?.backgroundLocation) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }, 600);
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
        if (lightboxUrlRef.current) {
          setLightboxUrl(null);
        } else {
          handleClose();
        }
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
    <>
      {/* Lightbox */}
      {lightboxUrl && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className="lightbox-overlay" onClick={() => setLightboxUrl(null)}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
          <img
            src={lightboxUrl}
            alt=""
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={`portfolio-modal-overlay open${isClosing ? ' closing' : ''}${isStandalone ? ' standalone' : ''}`}
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
              <HafizhLogo className="nav-logo-icon" />
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
                  <div className="portfolio-modal-nav-thumb">
                    {project.image && (
                      <img
                        src={project.image}
                        alt=""
                        className="portfolio-modal-nav-thumb-img"
                        aria-hidden="true"
                      />
                    )}
                  </div>
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
                {selectedProject.intro && (
                  <p className="portfolio-modal-subtitle">{selectedProject.intro}</p>
                )}
                {selectedProject.introNote && (
                  <p className="portfolio-modal-subtitle portfolio-modal-subtitle-note">
                    <span className="portfolio-modal-subtitle-note-text">
                      {selectedProject.introNote}
                    </span>
                    {selectedProject.introNoteEmoji && (
                      <span className="portfolio-modal-subtitle-note-emoji" aria-hidden="true">
                        {selectedProject.introNoteEmoji}
                      </span>
                    )}
                  </p>
                )}
              </div>
              {selectedProject.content ? (
                selectedProject.content.map((block, idx) => (
                  <ContentBlock key={idx} block={block} onImageClick={setLightboxUrl} />
                ))
              ) : (
                <p className="portfolio-content-placeholder-text">
                  Case study coming soon. Check back for the full project breakdown.
                </p>
              )}
              <div className="portfolio-modal-bottom-spacer" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioModal;
