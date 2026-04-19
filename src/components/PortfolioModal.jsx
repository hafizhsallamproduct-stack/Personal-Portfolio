import React, { useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { workData } from '../data/portfolioData';

const PortfolioModal = ({ isStandalone }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarWidth, setSidebarWidth] = React.useState(400);

  const selectedProject = workData.find(w => w.slug === slug) || workData[0];

  const startResizing = React.useCallback((mouseDownEvent) => {
    const startWidth = sidebarWidth;
    const startPosition = mouseDownEvent.clientX;

    function onMouseMove(mouseMoveEvent) {
      const newWidth = startWidth + mouseMoveEvent.clientX - startPosition;
      setSidebarWidth(Math.max(250, Math.min(newWidth, 800)));
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = 'unset';
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.body.style.cursor = 'col-resize';
  }, [sidebarWidth]);

  useEffect(() => {
    if (!isStandalone) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = 'unset'; };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isStandalone]);

  const handleClose = () => {
    if (location.state?.backgroundLocation) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className={`portfolio-modal-overlay open ${isStandalone ? 'standalone' : ''}`} onClick={handleClose}>
      <div className="portfolio-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Sidebar Left - Dynamic width limitation */}
        <div className="portfolio-modal-sidebar" style={{ width: sidebarWidth }}>
          <div className="portfolio-modal-sidebar-header">
            <div className="nav-logo-icon">H</div>
            <div className="portfolio-modal-sidebar-info">
              <h2>Portfolio</h2>
              <p>Hafizh Sallam</p>
            </div>
          </div>
          <div className="portfolio-modal-sidebar-nav">
            {workData.map((project, idx) => (
              <Link 
                key={idx} 
                to={`/portfolio/${project.slug}`}
                state={location.state}
                replace
                className={`portfolio-modal-nav-item ${project.slug === selectedProject.slug ? 'active' : ''}`}
              >
                <div className="portfolio-modal-nav-thumb"></div>
                <span>{project.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Resizer Handle */}
        <div className="portfolio-modal-resizer" onMouseDown={startResizing} aria-label="Resize sidebar"></div>

        {/* Floating close button */}
        <button className="portfolio-modal-close" onClick={handleClose} aria-label="Close modal">
          <i className="ph ph-x"></i>
        </button>

        {/* Main Text Content Right */}
        <div className="portfolio-modal-main">
          
          {/* Max-width 768px constraint container */}
          <div className="portfolio-modal-content">
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>{selectedProject.title}</h1>
            <p style={{ fontSize: '20px', fontWeight: '300', lineHeight: '32px', color: 'var(--text-secondary)' }}>{selectedProject.description}</p>
            <div style={{ height: '32px' }}></div>
            <p>Welcome to my online portfolio! I'm thrilled to share a curated collection of my most impactful projects, reflecting my passion for innovation and dedication to excellence.</p>
            <p>Each project in this portfolio represents a unique challenge and a valuable learning experience. From crafting intuitive user interfaces to developing robust backend systems, I've honed my skills in various aspects of software development.</p>
            <p>I believe in the power of collaboration and open communication. Throughout my career, I've had the privilege of working with talented teams, where we've collectively brainstormed ideas, tackled complex problems, and achieved remarkable outcomes.</p>
            <p>I'm passionate about leveraging technology to solve real-world problems and create positive change. My portfolio showcases a diverse range of projects, each demonstrating my ability to adapt to different challenges and deliver innovative solutions.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PortfolioModal;
