import { Link, useLocation } from 'react-router-dom';
import { workData } from '../data/portfolioData';
import { ArrowRight } from './icons';

const Work = () => {
  const location = useLocation();

  return (
    <div className="work-cards" id="work-cards-container">
      {workData.map((work) => (
        <Link
          to={`/portfolio/${work.slug}`}
          state={{ backgroundLocation: location }}
          className={`work-card ${work.isLarge ? 'work-card--large' : ''}`}
          key={work.slug}
        >
          <div className="work-card-body">
            <h3 className="work-card-title">{work.title}</h3>
            <p className="work-card-description">{work.description}</p>
            <span className="work-card-link">
              View project <ArrowRight className="icon" aria-hidden="true" />
            </span>
          </div>
          <div className="work-card-placeholder">
            {work.image && <img src={work.image} alt={work.title} className="work-card-image" />}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Work;
