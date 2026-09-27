import { experienceData } from '../data/portfolioData';
import { Briefcase } from './icons';
import ExperienceLedger from './ExperienceLedger';

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

      <div className="ledger-wrap">
        <ExperienceLedger data={experienceData} />
      </div>
    </section>
  );
};

export default Experience;
