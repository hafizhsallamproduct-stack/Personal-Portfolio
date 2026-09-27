import { skillsData, toolsData } from '../data/portfolioData';
import { MagicWand } from './icons';

// The figures in the row of stats. Years and industries match the About
// section; the skill and tool counts come straight from the lists below.
const STATS = [
  { value: '10+', label: 'years in product design' },
  {
    value: `${skillsData.length} + ${toolsData.filter((tool) => !tool.strike).length}`,
    label: 'core skills & tools',
  },
  { value: '3', label: 'industries' },
];

const Skills = () => {
  return (
    <section id="skills" className="section" tabIndex={0}>
      <div className="section-label-col">
        <span className="section-tag">
          <MagicWand className="icon" aria-hidden="true" /> Expertise
        </span>
        <h2 className="section-title">Skill and Knowledge</h2>
      </div>

      <div className="skills-content">
        <ul className="skills-stats">
          {STATS.map((stat) => (
            <li key={stat.label} className="skills-stat">
              <span className="skills-stat-value">{stat.value}</span>
              <span className="skills-stat-label">{stat.label}</span>
            </li>
          ))}
        </ul>

        <div className="skills-row">
          {skillsData.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
        <div className="skills-row-group">
          <span className="skills-row-label">Tools I use</span>
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
