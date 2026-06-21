import { LinkedinLogo, ArrowDown } from './icons';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <picture className="hero-mobile-photo-wrapper">
          <source
            type="image/webp"
            srcSet="/assets/profile-256.webp 1x, /assets/profile-384.webp 1.5x"
          />
          <img
            className="hero-mobile-photo"
            src="/assets/profile-384.jpg"
            alt="Hafizh Sallam"
            width="96"
            height="96"
          />
        </picture>
        <h1 className="hero-name">Hafizh Sallam</h1>
        <p className="hero-subtitle">
          Senior Product Designer crafting digital experiences across E-Commerce, Airlines, and
          Banking.
        </p>
      </div>
      <div className="hero-buttons">
        <a
          href="https://www.linkedin.com/in/hafizh-s-b7299420a/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
          id="hero-cta"
        >
          Get in touch <LinkedinLogo className="icon" aria-hidden="true" />
        </a>
        <a href="#portfolio" className="btn-primary btn-primary-lg">
          View portfolio <ArrowDown className="icon bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
