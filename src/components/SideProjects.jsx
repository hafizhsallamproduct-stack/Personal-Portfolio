import { useState } from 'react';
import { sideProjectsData } from '../data/portfolioData';
import { ArrowRight } from './icons';

const SideProjectThumb = ({ project }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = project.image && !imgFailed;

  return (
    <div className="side-project-thumb">
      {showImage ? (
        <img
          src={project.image}
          alt={project.title}
          className="side-project-thumb-img"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="side-project-thumb-placeholder">
          <span>{project.source || 'Project'}</span>
        </div>
      )}
    </div>
  );
};

const SideProjects = () => {
  return (
    <div className="side-projects">
      {sideProjectsData.map((project) => (
        <a
          key={project.url}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="side-project-card"
        >
          <SideProjectThumb project={project} />
          <div className="side-project-body">
            <h3 className="side-project-title">{project.title}</h3>
            <span className="side-project-open">
              {project.source ? `Open on ${project.source}` : 'Open file'}
              <ArrowRight className="icon" aria-hidden="true" />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SideProjects;
