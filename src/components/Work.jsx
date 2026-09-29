import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import InboxShowcase from './InboxShowcase';
import { inboxShowcase, overseasShowcase, workData } from '../data/portfolioData';
import { Sparkle, Clock } from './icons';

const WIP_MESSAGE = 'I am currently working on this section, work in progress';

// Running text across the top of the section while it is being reworked. The
// track holds the message twice over and slides by half its width, so the
// loop joins without a jump. Read out once, from the label.
const WipBanner = () => {
  const group = (
    <span className="wip-group">
      {/* Enough copies of the message to run past a wide window. */}
      {Array.from({ length: 4 }, (unused, i) => (
        <span key={i} className="wip-item">
          <Clock className="icon" />
          {WIP_MESSAGE}
        </span>
      ))}
    </span>
  );

  return (
    <div className="wip-banner" role="note" aria-label={WIP_MESSAGE}>
      <div className="wip-track" aria-hidden="true">
        {group}
        {group}
      </div>
    </div>
  );
};

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

      {/* The RHB case studies, one after the other on the same navy. */}
      <div className="inbox-showcases">
        <InboxShowcase data={inboxShowcase} label="Case study 1" />
        <InboxShowcase data={overseasShowcase} label="Case study 2" reverse showLogo={false} />
      </div>

      <WipBanner />

      <div className="work-cards">
        {workData
          .filter((work) => !work.hidden)
          .map((work) => (
            <Link
              to={`/portfolio/${work.slug}`}
              state={{ backgroundLocation: location }}
              className={`work-card ${work.isLarge ? 'work-card--large' : ''}`}
              key={work.slug}
            >
              <div className="work-card-placeholder">
                {work.image && (
                  <img
                    src={work.image}
                    alt={work.title}
                    className="work-card-image"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
              <div className="work-card-body">
                <h3 className="work-card-title">{work.title}</h3>
                <p className="work-card-description">{work.description}</p>
              </div>
              <div className="work-card-separator"></div>
              <div className="work-card-action">
                {work.logo ? (
                  <img
                    src={work.logoDark || work.logo}
                    alt={`${work.company} logo`}
                    className="work-card-company-logo"
                    loading="lazy"
                    style={work.logoHeight ? { height: work.logoHeight } : undefined}
                  />
                ) : (
                  <span className="work-card-company">{work.company}</span>
                )}
                <Button as="span" variant="outline" className="work-card-btn">
                  View Details
                </Button>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default Work;
