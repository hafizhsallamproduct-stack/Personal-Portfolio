import React from 'react';
import { workData } from '../data/portfolioData';
import { Link, useLocation } from 'react-router-dom';
import { MagicWand, ArrowRight } from './icons';

const SkillsAndWork = () => {
  const location = useLocation();

  return (
    <>
      <section id="skills" className="section" tabIndex={0}>
        <div className="section-label-col">
          <span className="section-tag"><MagicWand className="icon" aria-hidden="true" /> Skill & Work</span>
          <h2 className="section-title">What I do</h2>
        </div>
        <div className="skills-content">
          <div className="skills-row">
            <span className="skill-tag">Product Design</span>
            <span className="skill-tag">Design Systems</span>
            <span className="skill-tag">Prototyping</span>
            <span className="skill-tag">User Research</span>
            <span className="skill-tag">Web Design</span>
            <span className="skill-tag">Product Management</span>
            <span className="skill-tag">Product Planning</span>
            <span className="skill-tag">Design Mentoring</span>
            <span className="skill-tag">Workflow Management</span>
            <span className="skill-tag">Ai Product Adaptation</span>
          </div>
          <div className="skills-row">
            <span className="tool-tag">Figma</span>
            <span className="tool-tag">Sketch</span>
            <span className="tool-tag tool-tag--strike">Adobe CC</span>
          </div>
        </div>
      </section>

      <div className="work-cards" id="work-cards-container">
        {workData.map((work, idx) => (
          <Link 
            to={`/portfolio/${work.slug}`} 
            state={{ backgroundLocation: location }} 
            className={`work-card ${work.isLarge ? 'work-card--large' : ''}`} 
            key={idx}
          >
            <div className="work-card-body">
              <h3 className="work-card-title">{work.title}</h3>
              <p className="work-card-description">{work.description}</p>
              <span className="work-card-link">View project <ArrowRight className="icon" aria-hidden="true" /></span>
            </div>
            <div className="work-card-placeholder"></div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SkillsAndWork;
