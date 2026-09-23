import Button from './Button';
import AvailabilityRing from './AvailabilityRing';
import ScrambleText from './ScrambleText';
import { Translate, LinkedinLogo, ArrowDown, DownloadSimple } from './icons';

const About = () => {
  return (
    <section id="about" className="section" tabIndex={0}>
      <div className="section-label-col">
        <AvailabilityRing>
          <picture className="about-photo-wrapper">
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
        </AvailabilityRing>
      </div>
      <div className="section-content-col">
        <div className="about-intro">
          <h1 className="about-name">
            <ScrambleText text="Hafizh Sallam" stagger={0.04} />
          </h1>
          <p className="about-subtitle">
            <ScrambleText
              text="Senior Product Designer crafting digital experiences across"
              delay={0.2}
              stagger={0.012}
            />
            <br className="about-subtitle-break" />{' '}
            <ScrambleText text="E-Commerce, Airlines, and Banking." delay={0.5} stagger={0.012} />
          </p>
        </div>
        <div className="about-buttons">
          <Button href="#portfolio" icon={ArrowDown} iconClassName="icon bounce">
            View portfolio
          </Button>
          <Button
            variant="outline"
            href="https://www.linkedin.com/in/hafizh-s-b7299420a/"
            target="_blank"
            rel="noopener noreferrer"
            icon={LinkedinLogo}
          >
            Get in touch
          </Button>
          <Button variant="outline" href="/Hafizh-Sallam-Resume.pdf" download icon={DownloadSimple}>
            Download Resume
          </Button>
        </div>
        <p className="about-text">
          A Senior Product Designer based in Kuala Lumpur, Malaysia with over 10 years of experience
          working on digital products. I've worked across different industries including e-commerce,
          travel, and banking, which has helped me understand different types of users and product
          needs.
        </p>
        <p className="about-text">
          Currently at Wego.com, I'm the Design Lead for two areas: the design system, and flight
          booking, which covers the full checkout flow. I report to the Product Design Director. Our
          team is flat, so I also guide three senior designers on craft and direction. Lately, I've
          been exploring how AI can improve my design process and simplify day-to-day work.
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
