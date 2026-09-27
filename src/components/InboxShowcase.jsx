import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from './icons';
import { inboxShowcase as data } from '../data/portfolioData';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The RHB Inbox, featured inside Portfolio: the logo, title, summary and a
// button to the case study on the left, an image slider running to the right
// edge with a bar per slide under it, and the project facts below. The slides scroll sideways
// (swipe, trackpad, or arrow keys once focused) and the bars jump to a slide.
// The full case study opens in its own popup.
const InboxShowcase = () => {
  const location = useLocation();
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  const goTo = (index) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({
      left: index * track.clientWidth,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  return (
    <article
      className="inbox-showcase"
      aria-labelledby="inbox-showcase-title"
      data-ruler="var(--rhb-ruler)"
    >
      <div className="inbox-feature">
        <div className="inbox-feature-top">
          <div className="inbox-feature-intro">
            <img className="inbox-brand-logo" src={data.logo} alt={`${data.company} logo`} />
            <h3 id="inbox-showcase-title" className="inbox-title">
              <strong>{data.titleLead}</strong>: {data.titleRest}
            </h3>
            <p className="inbox-feature-tags">{data.tags}</p>
            {data.summary.map((text) => (
              <p className="inbox-intro" key={text}>
                {text}
              </p>
            ))}
            <Link
              to={`/portfolio/${data.slug}`}
              state={{ backgroundLocation: location }}
              className="inbox-read-btn"
            >
              Read Case Study
              <ArrowRight className="icon" aria-hidden="true" />
            </Link>
          </div>

          <div className="inbox-feature-media">
            <div
              className="inbox-slider"
              aria-roledescription="carousel"
              aria-label="Inbox screens"
            >
              {/* Focusable so the arrow keys scroll it. */}
              {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
              <div
                className="inbox-slider-track"
                ref={trackRef}
                onScroll={handleScroll}
                tabIndex={0}
              >
                {data.slides.map((slide, i) => (
                  <div
                    className="inbox-slide"
                    key={slide.label}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${data.slides.length}: ${slide.label}`}
                  >
                    {slide.devices.map((device) => (
                      <img
                        className={`inbox-slide-img inbox-slide-img--${device.key}`}
                        key={device.key}
                        src={device.image}
                        alt={device.alt}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="inbox-slider-bars">
              {data.slides.map((slide, i) => (
                <button
                  type="button"
                  key={slide.label}
                  className={`inbox-slider-bar${i === active ? ' is-active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Show slide ${i + 1}: ${slide.label}`}
                  aria-current={i === active}
                ></button>
              ))}
            </div>
          </div>
        </div>

        <dl className="inbox-meta">
          {data.meta.map((item) => (
            <div className="inbox-meta-item" key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
};

export default InboxShowcase;
