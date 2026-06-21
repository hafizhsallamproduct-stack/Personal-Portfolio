import { Link, useLocation } from 'react-router-dom';
import { workData } from '../data/portfolioData';
import { Sparkle } from './icons';

const Work = () => {
  const location = useLocation();

  return (
    <section id="portfolio" tabIndex={0}>
      <div className="section section--header-only">
        <div className="section-label-col">
          <span className="section-tag">
            <Sparkle className="icon" aria-hidden="true" /> Portfolio
          </span>
          <h2 className="section-title">Things I've built</h2>
        </div>
        <div className="section-content-col">
          <p className="work-disclaimer">
            All work shown was created during my employment. Company logos and brand assets are
            property of their respective owners and are used here solely to identify the context of
            the work.
          </p>
        </div>
      </div>

      <div className="work-cards">
        {workData.map((work) => (
          <Link
            to={`/portfolio/${work.slug}`}
            state={{ backgroundLocation: location }}
            className={`work-card ${work.isLarge ? 'work-card--large' : ''}`}
            key={work.slug}
          >
            <div className="work-card-placeholder">
              {work.image && <img src={work.image} alt={work.title} className="work-card-image" />}
            </div>
            <div className="work-card-body">
              <h3 className="work-card-title">{work.title}</h3>
              <p className="work-card-description">{work.description}</p>
            </div>
            <div className="work-card-separator"></div>
            <div className="work-card-action">
              {work.logo ? (
                <img
                  src={work.logo}
                  alt={`${work.company} logo`}
                  className="work-card-company-logo"
                  loading="lazy"
                  style={work.logoHeight ? { height: work.logoHeight } : undefined}
                />
              ) : (
                <span className="work-card-company">{work.company}</span>
              )}
              <span className="btn-outline work-card-btn">View Details</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Work;
