import { User, Translate, LinkedinLogo, ArrowDown } from './icons';

const About = () => {
  return (
    <section id="about" className="section" tabIndex={0}>
      <div className="section-label-col">
        <span className="section-tag">
          <User className="icon" aria-hidden="true" /> About
        </span>
        <h2 className="section-title">Who I am</h2>
        <picture className="about-photo-wrapper">
          <source
            type="image/webp"
            srcSet="/assets/profile-256.webp 1x, /assets/profile-384.webp 1.5x"
          />
          <img
            className="about-photo"
            src="/assets/profile-384.jpg"
            alt="Hafizh Sallam"
            width="154"
            height="154"
          />
        </picture>
      </div>
      <div className="section-content-col">
        <div className="about-intro">
          <h1 className="about-name">Hafizh Sallam</h1>
          <p className="about-subtitle">
            Senior Product Designer crafting digital experiences across
            <br className="about-subtitle-break" /> E-Commerce, Airlines, and Banking.
          </p>
        </div>
        <div className="about-buttons">
          <a
            href="https://www.linkedin.com/in/hafizh-s-b7299420a/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Get in touch <LinkedinLogo className="icon" aria-hidden="true" />
          </a>
          <a href="#portfolio" className="btn-primary btn-primary-lg">
            View portfolio <ArrowDown className="icon bounce" aria-hidden="true" />
          </a>
        </div>
        <p className="about-text">
          A Senior Product Designer based in Kuala Lumpur, Malaysia with over 10 years of experience
          working on digital products. I've worked across different industries including e-commerce,
          travel, and banking, which has helped me understand different types of users and product
          needs.
        </p>
        <p className="about-text">
          Currently at Wego.com, I'm involved in shaping parts of the product and improving how
          things work end to end. My work includes maintaining the design system and contributing to
          key flows like flight search and checkout.
        </p>
        <p className="about-text">
          Lately, I've been exploring how to integrate AI into my workflow and how it can improve
          the design process and streamline day-to-day work.
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
          <div className="about-details-group about-details-group--inline">
            <span className="about-details-icon">🇮🇩</span>
            <p className="about-details-text">Indonesia</p>
          </div>
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
