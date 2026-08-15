import { Sun, Moon } from './icons';

const Footer = ({ theme, toggleTheme }) => {
  const isDark = theme === 'dark';
  // The label names the action, not the current state, so a screen reader
  // announces what pressing it will do.
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <footer className="footer">
      <div className="footer-links">
        <span className="footer-copyright">
          &copy; {new Date().getFullYear()} Hafizh Sallam. All rights reserved.
        </span>
      </div>
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={label}
        title={label}
      >
        {isDark ? (
          <Sun className="icon" aria-hidden="true" />
        ) : (
          <Moon className="icon" aria-hidden="true" />
        )}
      </button>
    </footer>
  );
};

export default Footer;
