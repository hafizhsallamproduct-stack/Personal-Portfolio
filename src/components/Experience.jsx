import { useState } from 'react';
import { experienceData } from '../data/portfolioData';
import { Briefcase, CaretUp, CaretDown } from './icons';

const ExperienceRole = ({ role }) => {
  const [isExpanded, setIsExpanded] = useState(Boolean(role.isDefault));

  return (
    <div className="experience-role">
      <div className="experience-role-header">
        <div className="experience-role-info">
          <div className="experience-role-title">{role.title}</div>
          <div className="experience-role-location">{role.location}</div>
          <div className="experience-role-date-mobile">{role.date}</div>
        </div>
        <button
          className="experience-role-date"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${role.title}`}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            padding: 0,
          }}
        >
          <span className="experience-role-date-text">{role.date}</span>
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
        </button>
      </div>
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
        <div className="experience-card-company-name">{exp.company}</div>
        <div className="experience-card-company-duration">
          <span>{exp.duration}</span>
          {exp.tenure && <span className="experience-card-company-tenure">{exp.tenure}</span>}
        </div>
      </div>
      <div className="experience-card-roles">
        {exp.roles.map((role, i) => (
          <ExperienceRole key={i} role={role} />
        ))}
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <>
      <section id="experience" className="section section--header-only" tabIndex={0}>
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
      </section>

      <div className="experience-cards" id="experience-cards-container">
        {experienceData.map((exp, index) => (
          <ExperienceCard key={index} exp={exp} />
        ))}
      </div>
    </>
  );
};

export default Experience;
