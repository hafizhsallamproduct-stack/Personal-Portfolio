import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from './icons';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The RHB Inbox, featured inside Portfolio: the logo, title, summary and a
// button to the case study on the left, an image slider running to the right
// edge with a bar per slide under it, and the project facts below. The slides scroll sideways
// (swipe, trackpad, or arrow keys once focused) and the bars jump to a slide.
// The full case study opens in its own popup. `reverse` mirrors it, the slider
// on the left and the text on the right, for the feature below another; that
// one leaves out the logo, already shown just above it. `label` numbers the
// case study over its title. With `bareSlides` the
// screens sit in the slider as they are, a strip of tablets with no frame.
// With `staticSlides` the screens just sit there: no scrolling and no bars.
const InboxShowcase = ({ data, label, reverse = false, showLogo = true }) => {
  const titleId = `${data.slug}-showcase-title`;
  const location = useLocation();
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const isStatic = Boolean(data.staticSlides);

  // Slides can differ in width (a strip of tablet screens), so the current one
  // is the slide whose starting edge is nearest the track's, and the last once
  // the track is scrolled to its end. A mirrored strip runs right to left, so
  // its slides start from the right edge.
  const edgeOffset = (track, slide) => {
    const trackBox = track.getBoundingClientRect();
    const slideBox = slide.getBoundingClientRect();
    return getComputedStyle(track).direction === 'rtl'
      ? slideBox.right - trackBox.right
      : slideBox.left - trackBox.left;
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children);
    if (Math.abs(track.scrollLeft) >= track.scrollWidth - track.clientWidth - 1) {
      setActive(slides.length - 1);
      return;
    }
    let nearest = 0;
    slides.forEach((slide, i) => {
      if (Math.abs(edgeOffset(track, slide)) < Math.abs(edgeOffset(track, slides[nearest]))) {
        nearest = i;
      }
    });
    setActive(nearest);
  };

  const goTo = (index) => {
    const track = trackRef.current;
    const slide = track?.children[index];
    if (!slide) return;
    track.scrollBy({
      left: edgeOffset(track, slide),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  return (
    <article
      className={`inbox-showcase${reverse ? ' inbox-showcase--reverse' : ''}`}
      aria-labelledby={titleId}
    >
      <div className="inbox-feature">
        <div className="inbox-feature-top">
          <div className="inbox-feature-intro">
            {showLogo && (
              <img className="inbox-brand-logo" src={data.logo} alt={`${data.company} logo`} />
            )}
            {label && <span className="inbox-eyebrow inbox-feature-label">{label}</span>}
            <h3 id={titleId} className="inbox-title">
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
              className={`inbox-slider${data.bareSlides ? ' inbox-slider--bare' : ''}${
                isStatic ? ' inbox-slider--static' : ''
              }`}
              {...(!isStatic && { 'aria-roledescription': 'carousel' })}
              aria-label={`${data.titleLead} screens`}
              {...(isStatic && { role: 'group' })}
            >
              {/* Focusable so the arrow keys scroll it. */}
              {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
              <div
                className="inbox-slider-track"
                ref={trackRef}
                {...(!isStatic && { onScroll: handleScroll, tabIndex: 0 })}
              >
                {data.slides.map((slide, i) => (
                  <div
                    className="inbox-slide"
                    key={slide.label}
                    {...(!isStatic && {
                      role: 'group',
                      'aria-roledescription': 'slide',
                      'aria-label': `${i + 1} of ${data.slides.length}: ${slide.label}`,
                    })}
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

            {!isStatic && (
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
            )}
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
