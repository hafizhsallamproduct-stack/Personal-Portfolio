import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { experienceData } from '../data/portfolioData';
import { Briefcase, CaretUp, CaretDown } from './icons';

const isMobileViewport = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;

const ExperienceRole = ({ role }) => {
  // Desktop shows every role expanded by default; mobile starts collapsed
  // so the section stays compact.
  const [isExpanded, setIsExpanded] = useState(() => !isMobileViewport());

  // Roles without a title are shown as a plain summary (no collapsible header),
  // since the company card already carries the name and dates.
  if (!role.title) {
    return (
      <div className="experience-role">
        <p className="experience-role-summary experience-role-summary--standalone">
          {role.summary}
        </p>
      </div>
    );
  }

  return (
    <div className="experience-role">
      <button
        type="button"
        className="experience-role-header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${role.title}`}
      >
        <div className="experience-role-info">
          <div className="experience-role-title">{role.title}</div>
          <div className="experience-role-date">{role.date}</div>
        </div>
        <span className="experience-role-toggle">
          {isExpanded ? (
            <CaretUp
              className="icon"
              aria-hidden="true"
              style={{ color: 'var(--text-secondary)' }}
            />
          ) : (
            <CaretDown
              className="icon"
              aria-hidden="true"
              style={{ color: 'var(--text-secondary)' }}
            />
          )}
        </span>
      </button>
      {isExpanded && (
        <>
          {role.details ? (
            <ul className="experience-role-details">
              {role.details.map((detail, j) => (
                <li key={j}>{detail}</li>
              ))}
            </ul>
          ) : (
            <p className="experience-role-summary">{role.summary}</p>
          )}
        </>
      )}
    </div>
  );
};

const ExperienceCard = ({ exp }) => {
  const location = useLocation();

  return (
    <div className="experience-card">
      <div className="experience-card-company">
        {exp.logo && (
          <img
            className="experience-card-company-logo"
            src={exp.logo}
            alt={`${exp.company} logo`}
            loading="lazy"
            style={exp.logoHeight ? { height: exp.logoHeight } : undefined}
          />
        )}
        {exp.logoSquare && (
          <img
            className="experience-card-company-logo-square"
            src={exp.logoSquare}
            alt={`${exp.company} logo`}
            loading="lazy"
          />
        )}
        <div className="experience-card-company-name">{exp.company}</div>
        {exp.location && <div className="experience-card-company-location">{exp.location}</div>}
        <div className="experience-card-company-duration">
          <span>{exp.duration}</span>
          {exp.tenure && <span className="experience-card-company-tenure">{exp.tenure}</span>}
        </div>
      </div>
      <div className="experience-card-roles">
        {exp.roles.map((role, i) => (
          <ExperienceRole key={i} role={role} />
        ))}
        {(() => {
          const visibleCaseStudies = (exp.caseStudies || []).filter((cs) => !cs.hidden);
          if (visibleCaseStudies.length === 0) return null;
          return (
            <div className="experience-card-work">
              <h3 className="experience-card-work-title">My Work</h3>
              {visibleCaseStudies.map((caseStudy) => (
                <Link
                  key={caseStudy.slug}
                  to={`/portfolio/${caseStudy.slug}`}
                  state={{ backgroundLocation: location }}
                  className="experience-role-case-study"
                >
                  {caseStudy.label}
                </Link>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" tabIndex={0}>
      <div className="section section--header-only">
        <div className="section-label-col">
          <span className="section-tag">
            <Briefcase className="icon" aria-hidden="true" /> Experience
          </span>
          <h2 className="section-title">Where I've worked</h2>
        </div>
        <div className="section-content-col">
          <p className="experience-description">
            An overview of the companies I've worked at and the kind of work I was involved in, from
            early design tasks to shaping larger product flows.
          </p>
        </div>
      </div>

      <div className="experience-cards">
        {experienceData.map((exp, index) => (
          <ExperienceCard key={index} exp={exp} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
