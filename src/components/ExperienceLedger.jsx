import { useId, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, HafizhLogo } from './icons';

/*
 * The Experience list as a ledger: one full-width row per company, like an
 * index, with each company's roles folded away until its row is opened.
 */

// The company's square mark, Hafizh's own mark for freelance work, or the
// company's initials in a circle where it has neither.
const CompanyMark = ({ exp }) =>
  exp.mark === 'self' ? (
    <HafizhLogo className="exp-mark exp-mark--self" aria-hidden="true" />
  ) : exp.logoSquare ? (
    <img className="exp-mark" src={exp.logoSquare} alt="" loading="lazy" />
  ) : (
    <span className="exp-mark exp-mark--initials" aria-hidden="true">
      {exp.company
        .split(' ')
        .slice(0, 2)
        .map((word) => word[0])
        .join('')}
    </span>
  );

const latestRole = (exp) => exp.roles.find((role) => role.title)?.title;

// A company's detail: each role with its bullets or summary, then the case
// studies for that company.
const RoleDetails = ({ exp }) => {
  const location = useLocation();
  const caseStudies = (exp.caseStudies || []).filter((cs) => !cs.hidden);

  return (
    <div className="exp-details">
      {exp.roles.map((role, i) => (
        <div key={i} className="exp-role">
          {role.title && (
            <div className="exp-role-head">
              <span className="exp-role-title">{role.title}</span>
              <span className="exp-role-date">{role.date}</span>
            </div>
          )}
          {role.details ? (
            <ul className="exp-role-list">
              {role.details.map((detail, j) => (
                <li key={j}>{detail}</li>
              ))}
            </ul>
          ) : (
            <p className="exp-role-summary">{role.summary}</p>
          )}
        </div>
      ))}
      {caseStudies.length > 0 && (
        <div className="exp-work">
          <span className="exp-work-label">My Work</span>
          <div className="exp-work-links">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                to={`/portfolio/${cs.slug}`}
                state={{ backgroundLocation: location }}
                className="exp-work-link"
              >
                {cs.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// A panel that folds open by animating its grid row from 0fr to 1fr, so the
// height follows the content without measuring it.
const Fold = ({ id, open, children }) => (
  <div id={id} className={`exp-fold ${open ? 'is-open' : ''}`} inert={open ? undefined : ''}>
    <div className="exp-fold-inner">{children}</div>
  </div>
);

const useOpenSet = (initial) => {
  const [open, setOpen] = useState(() => new Set(initial));
  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return [open, toggle];
};

// Each row: years, company, latest role, and a plus that turns into a cross
// while the row is open.
const ExperienceLedger = ({ data }) => {
  const [open, toggle] = useOpenSet([]);
  const baseId = useId();

  return (
    <ol className="ledger">
      {data.map((exp, i) => {
        const isOpen = open.has(i);
        const panelId = `${baseId}-${i}`;
        const earlier = exp.roles.filter((role) => role.title).length - 1;
        return (
          // The open state is a data attribute rather than a class: the scroll
          // reveal adds a class to this row, and React rewriting className on
          // toggle would strip it and hide the row again.
          <li key={exp.company} className="ledger-row" data-open={isOpen || undefined}>
            <button
              type="button"
              className="ledger-head"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(i)}
            >
              <span className="ledger-years">{exp.duration}</span>
              <span className="ledger-company">
                <CompanyMark exp={exp} />
                <span className="ledger-company-text">
                  <span className="ledger-name">{exp.company}</span>
                  {exp.location && <span className="ledger-location">{exp.location}</span>}
                </span>
              </span>
              <span className="ledger-role">
                {latestRole(exp)}
                {earlier > 0 && (
                  <span className="ledger-more">
                    +{earlier} earlier role{earlier > 1 ? 's' : ''}
                  </span>
                )}
              </span>
              <span className="ledger-toggle" aria-hidden="true">
                <Plus className="icon" />
              </span>
            </button>
            <Fold id={panelId} open={isOpen}>
              <div className="ledger-panel">
                <RoleDetails exp={exp} />
              </div>
            </Fold>
          </li>
        );
      })}
    </ol>
  );
};

export default ExperienceLedger;
