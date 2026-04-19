import React, { useEffect } from 'react';

const PortfolioModal = ({ isOpen, onClose, selectedProject }) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`portfolio-modal-overlay open`} onClick={onClose}>
      <div className="portfolio-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Sidebar Left - 400px fixed limit */}
        <div className="portfolio-modal-sidebar">
          <div className="portfolio-modal-sidebar-header">
            <div style={{ width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: 'var(--logo-bg)', fontSize: '32px', fontWeight: '700', color: 'var(--logo-text)', flexShrink: 0 }}>
              H
            </div>
            <div className="portfolio-modal-sidebar-info">
              <h2>Portfolio</h2>
              <p>Hafizh Sallam</p>
            </div>
          </div>
          <div className="portfolio-modal-sidebar-nav">
            {[1, 2, 3, 4].map(num => (
              <div key={num} className={`portfolio-modal-nav-item ${num === 1 ? 'active' : ''}`}>
                <div className="portfolio-modal-nav-thumb"></div>
                <span>CreativeSpark Portfolio</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Text Content Right - Floating close button */}
        <div className="portfolio-modal-main">
          <button className="portfolio-modal-close" onClick={onClose} aria-label="Close modal">
            <i className="ph ph-x"></i>
          </button>
          
          {/* Max-width 768px constraint container */}
          <div className="portfolio-modal-content">
            <p>Welcome to my online portfolio! I'm thrilled to share a curated collection of my most impactful projects, reflecting my passion for innovation and dedication to excellence.</p>
            <p>Each project in this portfolio represents a unique challenge and a valuable learning experience. From crafting intuitive user interfaces to developing robust backend systems, I've honed my skills in various aspects of software development.</p>
            <p>I believe in the power of collaboration and open communication. Throughout my career, I've had the privilege of working with talented teams, where we've collectively brainstormed ideas, tackled complex problems, and achieved remarkable outcomes.</p>
            <p>My goal is to create solutions that not only meet the needs of clients but also exceed their expectations. I'm committed to staying up-to-date with the latest industry trends and technologies, ensuring that my work is always cutting-edge and relevant.</p>
            <p>I'm excited about the opportunity to contribute my skills and expertise to your organization. Whether you're looking for a seasoned developer to join your team or a consultant to help you with a specific project, I'm confident that I can deliver exceptional results.</p>
            <p>Thank you for taking the time to explore my portfolio. I invite you to delve into the details of each project and discover the stories behind them. If you have any questions or would like to discuss potential collaborations, please don't hesitate to reach out.</p>
            <p>I'm passionate about leveraging technology to solve real-world problems and create positive change. My portfolio showcases a diverse range of projects, each demonstrating my ability to adapt to different challenges and deliver innovative solutions.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PortfolioModal;
