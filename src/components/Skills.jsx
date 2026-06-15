import { skillsData, toolsData } from '../data/portfolioData';
import { MagicWand } from './icons';

const Skills = () => {
  return (
    <section id="skills" className="section" tabIndex={0}>
      <div className="section-label-col">
        <span className="section-tag">
          <MagicWand className="icon" aria-hidden="true" /> Skill & Work
        </span>
        <h2 className="section-title">What I do</h2>
      </div>
      <div className="skills-content">
        <div className="skills-row">
          {skillsData.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
        <div className="skills-row-group">
          <span className="skills-row-label">I am familiar with</span>
          <div className="skills-row">
            {toolsData.map((tool) => (
              <span key={tool.name} className={`tool-tag ${tool.strike ? 'tool-tag--strike' : ''}`}>
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
