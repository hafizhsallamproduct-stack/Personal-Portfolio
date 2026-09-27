import { useEffect, useRef, useState } from 'react';
import AvailabilityRing from './AvailabilityRing';
import {
  Translate,
  LinkedinLogo,
  ArrowDown,
  DownloadSimple,
  AirplaneTilt,
  ShoppingBag,
  Bank,
  Money,
  Buildings,
  FigmaLogo,
  HafizhLogo,
} from './icons';

// Holding the pointer on the photo this long turns it over to the logo.
const FLIP_DELAY_MS = 2000;

// The profile photo, with the logo on its back. It flips over after the
// pointer has rested on it for FLIP_DELAY_MS, and back as soon as it leaves.
const PhotoFlip = () => {
  const [flipped, setFlipped] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onEnter = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlipped(true), FLIP_DELAY_MS);
  };

  const onLeave = () => {
    clearTimeout(timer.current);
    setFlipped(false);
  };

  return (
    <div
      className={`about-photo-flip ${flipped ? 'is-flipped' : ''}`}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <div className="about-photo-flip-inner">
        <picture className="about-photo-wrapper about-photo-face">
          <source
            type="image/webp"
            srcSet="/assets/profile-256.webp 1x, /assets/profile-384.webp 1.5x"
          />
          <img
            className="about-photo"
            src="/assets/profile-384.jpg"
            alt="Hafizh Sallam"
            width="200"
            height="200"
          />
        </picture>
        <div className="about-photo-face about-photo-back" aria-hidden="true">
          <HafizhLogo className="about-photo-logo" />
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="section" tabIndex={0}>
      <div className="section-label-col">
        <AvailabilityRing>
          <PhotoFlip />
        </AvailabilityRing>
      </div>
      <div className="section-content-col">
        <div className="about-intro">
          <h1 className="about-name">Hafizh Sallam</h1>
          <p className="about-subtitle">Senior Product Designer shaping complex digital products</p>
        </div>
        <div className="about-buttons">
          <a href="#portfolio" className="about-link about-link--lead">
            View portfolio
            <ArrowDown className="icon bounce" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/hafizh-s-b7299420a/"
            className="about-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get in touch
            <LinkedinLogo className="icon" aria-hidden="true" />
          </a>
          <a href="/Hafizh-Sallam-Resume.pdf" className="about-link" download>
            Download Resume
            <DownloadSimple className="icon" aria-hidden="true" />
          </a>
        </div>
        <div className="divider-icons about-industries" aria-hidden="true">
          <AirplaneTilt className="icon" />
          <ShoppingBag className="icon" />
          <Bank className="icon" />
          <Money className="icon" />
          <Buildings className="icon" />
          <FigmaLogo className="icon" />
        </div>
        <p className="about-text">
          With 10+ years in product design, I've worked across travel, banking, and e-commerce,
          designing products from early problem definition through to implementation. At Wego, I own
          the end-to-end flight booking experience across platforms, influence product direction,
          and lead the evolution of our design system. Alongside product work, I collaborate closely
          with product, engineering, and other designers to improve design quality, workflows, and
          ways of working, including integrating AI into the design process.
        </p>
        <div className="about-stats">
          <div className="stat">
            <div className="stat-number">10+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat">
            <div className="stat-number">6+</div>
            <div className="stat-label">Companies</div>
          </div>
          <div className="stat">
            <div className="stat-number">3</div>
            <div className="stat-label">Industries</div>
          </div>
        </div>

        <div className="about-details">
          <div className="about-details-group">
            <h3 className="about-details-title">
              <Translate className="icon" aria-hidden="true" /> Languages
            </h3>
            <div className="languages-groups">
              <div className="language-group">
                <h4 className="language-group-title">Professional working proficiency</h4>
                <ul className="language-group-list">
                  <li className="language-name">English</li>
                  <li className="language-name">Malay</li>
                </ul>
              </div>
              <div className="language-group">
                <h4 className="language-group-title">Native or bilingual proficiency</h4>
                <ul className="language-group-list">
                  <li className="language-name">Indonesia</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
