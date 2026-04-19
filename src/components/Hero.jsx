import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-badge">
        <div className="hero-badge-dot"></div>
        <span className="hero-badge-text">Available for opportunities</span>
      </div>
      <div className="hero-content">
        <img src="assets/profile.jpg" alt="Hafizh Sallam" className="hero-mobile-photo" />
        <h1 className="hero-name">Hafizh Sallam</h1>
        <p className="hero-subtitle">Senior Product Designer crafting digital experiences across E-Commerce, Airlines, and Banking.</p>
      </div>
      <div className="hero-buttons">
        <a href="https://www.linkedin.com/in/hafizh-s-b7299420a/" target="_blank" rel="noopener noreferrer" className="btn-secondary" id="hero-cta">
          Get in touch <i className="ph ph-linkedin-logo"></i>
        </a>
        <a href="#skills" className="btn-primary btn-primary-lg">
          View my work <i className="ph ph-arrow-down bounce"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
