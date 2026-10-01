import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from './icons';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// A numbered heading with its explanation beside it, the way each part of an
// RHB case study opens.
// A case study's title in its popup: the bold lead alone on the first line,
// the rest from the second, starting with a capital as a line of its own.
export const CaseStudyTitle = ({ id, lead, rest }) => (
  <h1 id={id} className="inbox-title">
    <strong className="inbox-title-lead">{lead}:</strong>{' '}
    {rest.charAt(0).toUpperCase() + rest.slice(1)}
  </h1>
);

// `note` adds a short line of its own under the text.
export const BlockHeader = ({ index, heading, text, note }) => (
  <div className="inbox-block-header">
    <div className="inbox-block-heading">
      <span className="inbox-block-index">{String(index).padStart(2, '0')}</span>
      <h2 className="inbox-block-title">{heading}</h2>
    </div>
    <div>
      {text && <p className="inbox-block-text">{text}</p>}
      {note && <p className="inbox-block-text inbox-block-note">{note}</p>}
    </div>
  </div>
);

// A screen in a strip, with a label, title and a line of text under it.
// With `frame` ('desktop', 'tablet' or 'phone'), the screen sits in a frame of that
// device's shape and a taller one scrolls inside it, so every screen in the
// strip is the same size.
export const StripShot = ({ shot, index, frame }) => (
  <figure className="inbox-shot">
    {frame ? (
      // Focusable so the arrow keys scroll a tall screen.
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      <div
        className={`inbox-strip-frame inbox-strip-frame--${frame}`}
        tabIndex={0}
        role="region"
        aria-label={shot.title}
      >
        <img src={shot.image} alt={shot.alt} loading="lazy" decoding="async" />
      </div>
    ) : (
      <img src={shot.image} alt={shot.alt} loading="lazy" decoding="async" />
    )}
    <figcaption>
      <span className="inbox-timeline-when">Screen {index + 1}</span>
      <span className="inbox-finding-title">{shot.title}</span>
      <span className="inbox-finding-text">{shot.text}</span>
    </figcaption>
  </figure>
);

// A carousel per group, each wider than the text column: a strip of large
// screens that scrolls sideways, focusable so the arrow keys scroll it too.
// A group's `label` sits over its strip, and its own `frame` overrides the
// one given here.
export const Strips = ({ groups, frame, name }) =>
  groups.map((group) => (
    <div className="inbox-method-group" key={group.label ?? name}>
      {group.label && <h3 className="inbox-group-label">{group.label}</h3>}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div
        className="inbox-strip"
        tabIndex={0}
        role="region"
        aria-label={group.label ? `${group.label} ${name}` : name}
      >
        {group.images.map((shot, i) => (
          <StripShot shot={shot} index={i} key={shot.image} frame={group.frame ?? frame} />
        ))}
      </div>
    </div>
  ));

// The design process as a row of steps, each with when it happened.
export const Timeline = ({ steps }) => (
  <ol className="inbox-timeline">
    {steps.map((step) => (
      <li className="inbox-timeline-step" key={step.title}>
        <span className="inbox-timeline-when">{step.when}</span>
        <h3 className="inbox-finding-title">{step.title}</h3>
        <p className="inbox-finding-text">{step.text}</p>
      </li>
    ))}
  </ol>
);

// An RHB case study, in its own popup on RHB's dark blue rather than in the
// Wego case study reader. It opens and closes with the same slide as that
// reader, and also works as a page of its own when opened by its link. The
// case study's own sections go in as children.
const RhbCaseStudy = ({ data, titleId, isStandalone, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isClosing, setIsClosing] = useState(false);
  const isClosingRef = useRef(false);
  const containerRef = useRef(null);
  const closeButtonRef = useRef(null);

  const handleClose = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsClosing(true);
    setTimeout(() => {
      if (location.state?.backgroundLocation) navigate(-1);
      else navigate('/');
    }, 600);
  }, [location.state, navigate]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${data.title} — Hafizh Sallam`;
    return () => {
      document.title = previousTitle;
    };
  }, [data.title]);

  useEffect(() => {
    if (isStandalone) return undefined;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isStandalone]);

  // Focus moves into the popup and returns to the button that opened it.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();
    return () => {
      if (previouslyFocused instanceof HTMLElement && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, []);

  // Escape closes; Tab stays inside the popup.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }
      if (event.key !== 'Tab' || !containerRef.current) return;

      const focusable = Array.from(containerRef.current.querySelectorAll(FOCUSABLE_SELECTOR));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={`portfolio-modal-overlay open${isClosing ? ' closing' : ''}`}
      onClick={handleClose}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <div
        ref={containerRef}
        className="portfolio-modal-container inbox-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="portfolio-modal-close inbox-modal-close"
          onClick={handleClose}
          aria-label="Close case study"
        >
          <X className="icon" aria-hidden="true" />
        </button>

        <div className="inbox-modal-scroll">
          <div className="inbox-brandbar">
            <img className="inbox-brandbar-logo" src={data.logo} alt={`${data.company} logo`} />
            <span className="inbox-eyebrow">Case study</span>
          </div>
          <div className="inbox-modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default RhbCaseStudy;
