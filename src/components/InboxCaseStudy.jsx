import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InboxDevice from './InboxDevice';
import { X } from './icons';
import { inboxShowcase as data } from '../data/portfolioData';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// A numbered heading with its explanation beside it, the way each part of the
// case study opens.
const BlockHeader = ({ index, heading, text }) => (
  <div className="inbox-block-header">
    <div className="inbox-block-heading">
      <span className="inbox-block-index">{String(index).padStart(2, '0')}</span>
      <h2 className="inbox-block-title">{heading}</h2>
    </div>
    <p className="inbox-block-text">{text}</p>
  </div>
);

// The home page as it opens the inbox: click the icon in the top bar and the
// panel slides open, click the page again to close it.
const Opening = ({ opening }) => {
  const [isOpen, setIsOpen] = useState(false);
  const screen = isOpen ? opening.open : opening.closed;

  return (
    <figure className="inbox-opening">
      <figcaption className="inbox-opening-hint">{opening.caption}</figcaption>
      <div className="inbox-opening-screen">
        <img src={screen.image} alt={screen.alt} decoding="async" />
        {isOpen ? (
          <button
            type="button"
            className="inbox-opening-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close the inbox"
          ></button>
        ) : (
          <button
            type="button"
            className="inbox-hotspot"
            style={{
              left: `${opening.hotspot.x * 100}%`,
              top: `${opening.hotspot.y * 100}%`,
            }}
            onClick={() => setIsOpen(true)}
            aria-label="Open the inbox"
          >
            <span className="inbox-hotspot-ring" aria-hidden="true"></span>
          </button>
        )}
      </div>
    </figure>
  );
};

const Shot = ({ shot }) => (
  <figure className="inbox-shot">
    <img src={shot.image} alt={shot.alt} loading="lazy" decoding="async" />
    <figcaption className="inbox-caption">{shot.caption}</figcaption>
  </figure>
);

// The RHB Inbox case study, in its own popup on RHB's dark blue rather than in
// the Wego case study reader. It opens and closes with the same slide as that
// reader, and also works as a page of its own when opened by its link.
const InboxCaseStudy = ({ isStandalone }) => {
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
  }, []);

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
        aria-labelledby="inbox-case-study-title"
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
          <div className="inbox-modal-body">
            <header className="inbox-hero">
              <h1 id="inbox-case-study-title" className="inbox-title">
                {data.title}
              </h1>
              <p className="inbox-intro">{data.intro}</p>
              <Opening opening={data.opening} />
            </header>

            <section className="inbox-block">
              <BlockHeader
                index={1}
                heading={data.background.heading}
                text={data.background.text}
              />
            </section>

            <section className="inbox-block">
              <BlockHeader index={2} heading={data.research.heading} text={data.research.text} />
              <ol className="inbox-findings">
                {data.research.findings.map((finding) => (
                  <li className="inbox-finding" key={finding.title}>
                    <h3 className="inbox-finding-title">{finding.title}</h3>
                    <p className="inbox-finding-text">{finding.text}</p>
                  </li>
                ))}
              </ol>
              <p className="inbox-outcome">{data.research.outcome}</p>
            </section>

            <section className="inbox-block">
              <BlockHeader index={3} heading={data.process.heading} text={data.process.text} />
              <ol className="inbox-timeline">
                {data.process.steps.map((step) => (
                  <li className="inbox-timeline-step" key={step.title}>
                    <span className="inbox-timeline-when">{step.when}</span>
                    <h3 className="inbox-finding-title">{step.title}</h3>
                    <p className="inbox-finding-text">{step.text}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="inbox-block">
              <BlockHeader index={4} heading={data.devices.heading} text={data.devices.text} />
              <div className="inbox-devices">
                {data.devices.items.map((device) => (
                  <InboxDevice device={device} key={device.key} />
                ))}
              </div>
            </section>

            <section className="inbox-block">
              <BlockHeader index={5} heading={data.filter.heading} text={data.filter.text} />
              <div className="inbox-shots">
                {data.filter.images.map((shot) => (
                  <Shot shot={shot} key={shot.image} />
                ))}
              </div>
            </section>

            <section className="inbox-block">
              <BlockHeader index={6} heading={data.messages.heading} text={data.messages.text} />
              <ul className="inbox-cards">
                {data.messages.cards.map((card) => (
                  <li className="inbox-card" key={card.image}>
                    <img src={card.image} alt={card.alt} loading="lazy" decoding="async" />
                  </li>
                ))}
              </ul>
            </section>

            <section className="inbox-block">
              <BlockHeader index={7} heading={data.details.heading} text={data.details.text} />
              <div className="inbox-shots">
                {data.details.images.map((shot) => (
                  <Shot shot={shot} key={shot.image} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxCaseStudy;
