import React from 'react';

const Footer = ({ theme, toggleTheme }) => {
  return (
    <footer className="footer">
      <span className="footer-copyright">&copy; 2026 Hafizh Sallam. All rights reserved.</span>
      <button className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
        <i className={`ph ${theme === 'light' ? 'ph-sun' : 'ph-moon'}`}></i>
      </button>
    </footer>
  );
};

export default Footer;
