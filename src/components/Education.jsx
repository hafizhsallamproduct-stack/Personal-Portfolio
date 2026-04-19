import React from 'react';

const Education = () => {
  return (
    <section id="education" className="section">
      <div className="section-label-col">
        <span className="section-tag"><i className="ph ph-graduation-cap"></i> Education</span>
        <h2 className="section-title">Background</h2>
      </div>
      <div className="education-card">
        <img className="education-icon" src="assets/university.png" alt="Universiti Utara Malaysia" />
        <div className="education-details">
          <div className="education-name">Universiti Utara Malaysia</div>
          <div className="education-degree">Bachelor of Multimedia Technology, Multimedia Design (Honours)</div>
          <div className="education-year">2008 — 2011</div>
        </div>
      </div>
    </section>
  );
};

export default Education;
