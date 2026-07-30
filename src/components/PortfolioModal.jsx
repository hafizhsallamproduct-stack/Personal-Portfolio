import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { workData, wipData } from '../data/portfolioData';
import {
  X,
  HafizhLogo,
  Sun,
  Moon,
  CaretLeft,
  CaretRight,
  CaretUp,
  CaretDown,
  ArrowSquareOut,
} from './icons';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Text wrapped in {{...}} keeps its real value in the data but renders blurred,
// so figures are hidden on screen without being lost.
const BLUR_RE = /\{\{(.+?)\}\}/g;

const renderText = (text) => {
  if (typeof text !== 'string' || !text.includes('{{')) return text;
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = BLUR_RE.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <span key={key++} className="portfolio-blur">
        {match[1]}
      </span>
    );
    lastIndex = BLUR_RE.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
};

const ImageBlock = ({ block, onImageClick }) => {
  const [imageTheme, setImageTheme] = useState('light');
  const src = imageTheme === 'dark' && block.urlDark ? block.urlDark : block.url;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <figure className="portfolio-content-image" onClick={() => src && onImageClick?.(src)}>
      <div className="portfolio-image-wrap">
        {block.url && (
          <img
            src={block.url}
            alt={block.alt || ''}
            className="portfolio-detail-img"
            loading="lazy"
            decoding="async"
          />
        )}
        {block.urlDark && (
          <img
            src={block.urlDark}
            alt=""
            aria-hidden={imageTheme !== 'dark'}
            className={`portfolio-detail-img portfolio-detail-img-dark ${
              imageTheme === 'dark' ? 'visible' : ''
            }`}
            loading="lazy"
            decoding="async"
          />
        )}
        {block.urlDark && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div className="portfolio-image-theme-toggle" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={imageTheme === 'light' ? 'active' : ''}
              onClick={() => setImageTheme('light')}
              aria-label="Show light version"
              aria-pressed={imageTheme === 'light'}
            >
              <Sun className="icon" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={imageTheme === 'dark' ? 'active' : ''}
              onClick={() => setImageTheme('dark')}
              aria-label="Show dark version"
              aria-pressed={imageTheme === 'dark'}
            >
              <Moon className="icon" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      {block.caption && (
        <figcaption className="portfolio-image-caption">{renderText(block.caption)}</figcaption>
      )}
    </figure>
  );
};

const CarouselBlock = ({ block, onImageClick }) => {
  const [index, setIndex] = useState(0);
  const items = block.items || [];
  const count = items.length;
  const current = items[index] || {};

  const go = (next) => setIndex((i) => (i + next + count) % count);

  if (count === 0) return null;

  return (
    <figure className="portfolio-carousel">
      <div className="portfolio-carousel-stage">
        {count > 1 && (
          <button
            type="button"
            className="portfolio-carousel-arrow portfolio-carousel-arrow--prev"
            onClick={() => go(-1)}
            aria-label="Previous image"
          >
            <CaretLeft className="icon" aria-hidden="true" />
          </button>
        )}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <img
          src={current.url}
          alt={current.alt || ''}
          className="portfolio-carousel-main"
          loading="lazy"
          decoding="async"
          onClick={() => current.url && onImageClick?.({ items, index })}
        />
        {count > 1 && (
          <button
            type="button"
            className="portfolio-carousel-arrow portfolio-carousel-arrow--next"
            onClick={() => go(1)}
            aria-label="Next image"
          >
            <CaretRight className="icon" aria-hidden="true" />
          </button>
        )}
      </div>
      {count > 1 && (
        <div className="portfolio-carousel-thumbs">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              className={`portfolio-carousel-thumb ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
            >
              <img src={item.url} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
      {current.caption && (
        <figcaption className="portfolio-image-caption">{renderText(current.caption)}</figcaption>
      )}
    </figure>
  );
};

const ZOOM_MIN = 1;
const ZOOM_MAX = 5;
const ZOOM_STEP = 0.25;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const Lightbox = ({ source, onClose }) => {
  // source is either a string URL or { items: [{url}], index }.
  const gallery = typeof source === 'string' ? [{ url: source }] : source.items || [];
  const [galleryIndex, setGalleryIndex] = useState(
    typeof source === 'string' ? 0 : source.index || 0
  );
  const galleryCount = gallery.length;
  const url = gallery[galleryIndex]?.url;

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isPinching, setIsPinching] = useState(false);
  const dragRef = useRef(null);
  // Active touch/pointer positions, keyed by pointerId, for pinch handling.
  const pointersRef = useRef(new Map());
  const pinchRef = useRef(null);

  const reset = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  // Move between gallery images, resetting zoom/pan for the new one.
  const goTo = useCallback(
    (next) => {
      if (galleryCount < 2) return;
      setGalleryIndex((i) => (i + next + galleryCount) % galleryCount);
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    },
    [galleryCount]
  );

  const setZoomTo = useCallback((value) => {
    setZoom(() => {
      const next = clamp(value, ZOOM_MIN, ZOOM_MAX);
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const zoomBy = useCallback((delta) => {
    setZoom((z) => {
      const next = clamp(z + delta, ZOOM_MIN, ZOOM_MAX);
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // Keyboard controls: +/- zoom, arrows pan, 0 reset, Esc close.
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
        case '+':
        case '=':
          event.preventDefault();
          zoomBy(ZOOM_STEP);
          break;
        case '-':
        case '_':
          event.preventDefault();
          zoomBy(-ZOOM_STEP);
          break;
        case '0':
          event.preventDefault();
          reset();
          break;
        case 'ArrowUp':
          event.preventDefault();
          setOffset((o) => ({ ...o, y: o.y + 40 }));
          break;
        case 'ArrowDown':
          event.preventDefault();
          setOffset((o) => ({ ...o, y: o.y - 40 }));
          break;
        case 'ArrowLeft':
          event.preventDefault();
          // When zoomed in, arrows pan; otherwise they browse the gallery.
          if (zoom > 1) setOffset((o) => ({ ...o, x: o.x + 40 }));
          else goTo(-1);
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (zoom > 1) setOffset((o) => ({ ...o, x: o.x - 40 }));
          else goTo(1);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [onClose, reset, zoomBy, goTo, zoom]);

  const handleWheel = (event) => {
    event.preventDefault();
    zoomBy(event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP);
  };

  const pinchDistance = () => {
    const points = Array.from(pointersRef.current.values());
    const dx = points[0].x - points[1].x;
    const dy = points[0].y - points[1].y;
    return Math.hypot(dx, dy);
  };

  const handlePointerDown = (event) => {
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    event.currentTarget.setPointerCapture?.(event.pointerId);

    if (pointersRef.current.size === 2) {
      // Start of a pinch: remember the finger spread and the current zoom.
      dragRef.current = null;
      setIsDragging(false);
      setIsPinching(true);
      pinchRef.current = { startDistance: pinchDistance(), startZoom: zoom };
    } else if (pointersRef.current.size === 1 && zoom > 1) {
      dragRef.current = { startX: event.clientX, startY: event.clientY, origin: offset };
      setIsDragging(true);
    }
  };

  const handlePointerMove = (event) => {
    if (pointersRef.current.has(event.pointerId)) {
      pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }

    // Two fingers down: pinch to zoom.
    if (pointersRef.current.size === 2 && pinchRef.current) {
      const scale = pinchDistance() / pinchRef.current.startDistance;
      setZoomTo(pinchRef.current.startZoom * scale);
      return;
    }

    // One finger down and zoomed in: pan.
    if (dragRef.current) {
      setOffset({
        x: dragRef.current.origin.x + (event.clientX - dragRef.current.startX),
        y: dragRef.current.origin.y + (event.clientY - dragRef.current.startY),
      });
    }
  };

  const handlePointerUp = (event) => {
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size < 2) {
      pinchRef.current = null;
      setIsPinching(false);
    }
    dragRef.current = null;
    setIsDragging(false);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="lightbox-overlay" onClick={onClose} onWheel={handleWheel}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="lightbox-controls" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={() => zoomBy(-ZOOM_STEP)} aria-label="Zoom out">
          &minus;
        </button>
        <button type="button" onClick={reset} aria-label="Reset zoom">
          {Math.round(zoom * 100)}%
        </button>
        <button type="button" onClick={() => zoomBy(ZOOM_STEP)} aria-label="Zoom in">
          +
        </button>
      </div>
      {galleryCount > 1 && (
        <button
          type="button"
          className="lightbox-arrow lightbox-arrow--prev"
          onClick={(e) => {
            e.stopPropagation();
            goTo(-1);
          }}
          aria-label="Previous image"
        >
          <CaretLeft className="icon" aria-hidden="true" />
        </button>
      )}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <img
        src={url}
        alt=""
        className={`lightbox-img ${isDragging || isPinching ? 'interacting' : ''}`}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
        }}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={() => (zoom > 1 ? reset() : zoomBy(1))}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
      {galleryCount > 1 && (
        <button
          type="button"
          className="lightbox-arrow lightbox-arrow--next"
          onClick={(e) => {
            e.stopPropagation();
            goTo(1);
          }}
          aria-label="Next image"
        >
          <CaretRight className="icon" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

// Renders a table on desktop. On mobile, if the block has a mobileImage, the
// table is swapped for that image (a wide table is easier to read as a graphic
// on small screens).
const TableBlock = ({ block, onImageClick }) => (
  <figure className="portfolio-table-wrap">
    <table className="portfolio-table">
      <thead>
        <tr>
          {block.columns.map((col, i) => (
            <th key={i}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {block.rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{renderText(cell)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {block.mobileImage && (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
      <img
        src={block.mobileImage}
        alt={block.caption || ''}
        className="portfolio-table-mobile-img"
        loading="lazy"
        decoding="async"
        onClick={() => onImageClick?.(block.mobileImage)}
      />
    )}
    {block.caption && <figcaption className="portfolio-image-caption">{block.caption}</figcaption>}
  </figure>
);

const ContentBlock = ({ block, onImageClick }) => {
  switch (block.type) {
    case 'heading':
      return <h2 className="portfolio-content-heading">{block.text}</h2>;
    case 'subheading':
      return <h3 className="portfolio-content-subheading">{block.text}</h3>;
    case 'paragraph':
      return <p>{renderText(block.text)}</p>;
    case 'note':
      return <p className="portfolio-content-note">{renderText(block.text)}</p>;
    case 'image':
      return <ImageBlock block={block} onImageClick={onImageClick} />;
    case 'carousel':
      return <CarouselBlock block={block} onImageClick={onImageClick} />;
    case 'label':
      return <p className="portfolio-content-label">{block.text}</p>;
    case 'list':
      return (
        <ul className="portfolio-content-list">
          {block.items.map((item, i) => (
            <li key={i}>{renderText(item)}</li>
          ))}
        </ul>
      );
    case 'table':
      return <TableBlock block={block} onImageClick={onImageClick} />;
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
  // Collapsed by default: these have no page to open, so they should not
  // compete with the published studies above them.
  const [isWipExpanded, setIsWipExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState(null);
  const lightboxUrlRef = useRef(null);
  useEffect(() => {
    lightboxUrlRef.current = lightboxUrl;
  }, [lightboxUrl]);
  const containerRef = useRef(null);
  const mainRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const isClosingRef = useRef(false);

  const visibleProjects = workData.filter((w) => !w.hidden);
  const matchedProject = workData.find((w) => w.slug === slug);
  // Hidden case studies are not reachable by direct URL: fall back to the first visible one.
  const selectedProject =
    matchedProject && !matchedProject.hidden ? matchedProject : visibleProjects[0];

  // Switching case studies swaps the content but leaves the scroll position
  // where it was, so a new study can open halfway down. Back to the top.
  useEffect(() => {
    // Assigning scrollTop rather than scrollTo, so it jumps without animating
    // and without depending on support for behavior: 'instant'.
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [selectedProject.slug]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${selectedProject.title} — Hafizh Sallam`;
    return () => {
      document.title = previousTitle;
    };
  }, [selectedProject.title]);

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
      {lightboxUrl && <Lightbox source={lightboxUrl} onClose={() => setLightboxUrl(null)} />}
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
              {visibleProjects.map((project, idx) => (
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
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                  <span className="portfolio-modal-nav-text">
                    {project.title}
                    {project.company && (
                      <span className="portfolio-modal-nav-company">{project.company}</span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
            {wipData.length > 0 && (
              <div className="portfolio-modal-sidebar-wip">
                <button
                  type="button"
                  className="portfolio-modal-sidebar-wip-title"
                  onClick={() => setIsWipExpanded(!isWipExpanded)}
                  aria-expanded={isWipExpanded}
                >
                  Portfolio in progress
                  {isWipExpanded ? (
                    <CaretUp className="icon" aria-hidden="true" />
                  ) : (
                    <CaretDown className="icon" aria-hidden="true" />
                  )}
                </button>
                {isWipExpanded &&
                  wipData.map((item) => (
                    // Not a link: these are being written up, so there is no
                    // page to open yet.
                    <div key={item.title} className="portfolio-modal-wip-item">
                      <div className="portfolio-modal-nav-thumb portfolio-modal-wip-thumb">WIP</div>
                      <span className="portfolio-modal-nav-text">
                        {item.title}
                        {item.company && (
                          <span className="portfolio-modal-nav-company">{item.company}</span>
                        )}
                      </span>
                    </div>
                  ))}
              </div>
            )}
            <a
              href="https://www.behance.net/hafizhsallam"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-modal-sidebar-external"
            >
              Check my old portfolio (before Wego)
              <ArrowSquareOut className="icon" aria-hidden="true" />
            </a>
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
          <div className="portfolio-modal-main" ref={mainRef}>
            {/* Max-width 768px constraint container */}
            <div className="portfolio-modal-content">
              {selectedProject.image && (
                <img
                  className="portfolio-modal-hero"
                  src={selectedProject.image}
                  alt={selectedProject.title}
                />
              )}
              <div className="portfolio-modal-header">
                <h1 id="portfolio-modal-heading" className="portfolio-modal-title">
                  {selectedProject.title}
                </h1>
                {selectedProject.year && (
                  <p className="portfolio-modal-byline">{selectedProject.year}</p>
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
              <p className="portfolio-modal-credit">Hafizh Sallam · Claude (co-author)</p>
              <div className="portfolio-modal-bottom-spacer" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioModal;
