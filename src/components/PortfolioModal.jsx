import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { workData } from '../data/portfolioData';
import { X } from './icons';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const PortfolioModal = ({ isStandalone }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const containerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

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
            <h1 id="portfolio-modal-heading" className="portfolio-modal-title">
              {selectedProject.title}
            </h1>
            <p className="portfolio-modal-subtitle">{selectedProject.description}</p>
            <p>
              Welcome to my online portfolio! I'm thrilled to share a curated collection of my most
              impactful projects, reflecting my passion for innovation and dedication to excellence.
            </p>
            <p>
              Each project in this portfolio represents a unique challenge and a valuable learning
              experience. From crafting intuitive user interfaces to developing robust backend
              systems, I've honed my skills in various aspects of software development.
            </p>
            <p>
              I believe in the power of collaboration and open communication. Throughout my career,
              I've had the privilege of working with talented teams, where we've collectively
              brainstormed ideas, tackled complex problems, and achieved remarkable outcomes.
            </p>
            <p>
              I'm passionate about leveraging technology to solve real-world problems and create
              positive change. My portfolio showcases a diverse range of projects, each
              demonstrating my ability to adapt to different challenges and deliver innovative
              solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
