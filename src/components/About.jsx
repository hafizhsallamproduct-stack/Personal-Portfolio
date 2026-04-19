import React from 'react';

const About = () => {
  return (
    <section id="about" className="section" tabIndex={0}>
      <div className="section-label-col">
        <span className="section-tag"><i className="ph ph-user"></i> About</span>
        <h2 className="section-title">Who I am</h2>
        <img className="about-photo" src="assets/profile.jpg" alt="Hafizh Sallam" />
      </div>
      <div className="section-content-col">
        <p className="about-text">A Senior Product Designer based in Kuala Lumpur, Malaysia with over 10 years of experience working on digital products. I've worked across different industries including e-commerce, travel, and banking, which has helped me understand different types of users and product needs.</p>
        <p className="about-text">Currently at Wego.com, I'm involved in shaping parts of the product and improving how things work end to end. My work includes maintaining the design system and contributing to key flows like flight search and checkout.</p>
        <p className="about-text">Currently, I'm exploring how to integrate AI into my workflow and how it can improve the design process and streamline day-to-day work.</p>
        <div className="about-stats">
          <div className="stat">
            <div className="stat-number">10+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat">
            <div className="stat-number">6+</div>
            <div className="stat-label">Companies</div>
          </div>
          <div className="stat">
            <div className="stat-number">3</div>
            <div className="stat-label">Industries</div>
          </div>
        </div>

        <div className="about-details">
          <div className="about-details-group about-details-group--inline">
            <span className="about-details-icon">🇮🇩</span>
            <p className="about-details-text">Indonesia</p>
          </div>
          <div className="about-details-group">
            <h3 className="about-details-title"><i className="ph ph-translate"></i> Languages</h3>
            <div className="languages-grid">
              <div className="language-item">
                <span className="language-name">English</span>
                <span className="language-proficiency">Professional working proficiency</span>
              </div>
              <div className="language-item">
                <span className="language-name">Indonesia</span>
                <span className="language-proficiency">Professional working proficiency</span>
              </div>
              <div className="language-item">
                <span className="language-name">Malay</span>
                <span className="language-proficiency">Professional working proficiency</span>
              </div>
              <div className="language-item">
                <span className="language-name">Minangkabau</span>
                <span className="language-proficiency">Native or bilingual proficiency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
