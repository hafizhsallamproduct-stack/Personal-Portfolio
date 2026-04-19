import React from 'react';

const About = () => {
  return (
    <section id="about" className="section">
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
      </div>
    </section>
  );
};

export default About;
