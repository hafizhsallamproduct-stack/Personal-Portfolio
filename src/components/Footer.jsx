import React from 'react';
import { Sun, Moon } from './icons';

const Footer = ({ theme, toggleTheme }) => {
  return (
    <footer className="footer">
      <span className="footer-copyright">&copy; 2026 Hafizh Sallam. All rights reserved.</span>
      <button className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
        {theme === 'light' ? <Sun className="icon" aria-hidden="true" /> : <Moon className="icon" aria-hidden="true" />}
      </button>
    </footer>
  );
};

export default Footer;
