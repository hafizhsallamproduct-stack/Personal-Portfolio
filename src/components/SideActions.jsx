import { useEffect, useState } from 'react';
import { LinkedinLogo, DownloadSimple } from './icons';

// The hero's contact and resume actions, icon only, once the hero has scrolled
// away. On a wide window they sit in a tab on the card's right edge, sliding out
// from behind it; where the frame is too narrow for that, they float in the
// bottom right corner instead (see sections.css).
const SideActions = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const about = document.getElementById('about');
    if (!about) return undefined;

    // Shown once the hero has passed under the sticky header, not only once it
    // has left the window, so jumping to the next section brings them in.
    const update = () => {
      const headerBottom = document.querySelector('.nav-top')?.getBoundingClientRect().bottom ?? 0;
      setIsVisible(about.getBoundingClientRect().bottom <= headerBottom);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const tabIndex = isVisible ? undefined : -1;

  return (
    <div className={`side-actions ${isVisible ? 'visible' : ''}`} aria-hidden={!isVisible}>
      <div className="side-actions-clip">
        <div className="side-actions-inner">
          <a
            href="https://www.linkedin.com/in/hafizh-s-b7299420a/"
            className="side-action side-action--contact"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get in touch on LinkedIn"
            tabIndex={tabIndex}
          >
            <LinkedinLogo className="side-action-icon" aria-hidden="true" />
          </a>
          <a
            href="/Hafizh-Sallam-Resume.pdf"
            className="side-action side-action--resume"
            download
            aria-label="Download resume"
            tabIndex={tabIndex}
          >
            <DownloadSimple className="side-action-icon" aria-hidden="true" />
          </a>
        </div>
      </div>
      {/* Outside the clip so the tab's slide mask does not cut them off; shown
          by CSS while the matching action is hovered or focused. The actions
          already carry these as their accessible names. */}
      <span className="side-tip side-tip--contact" aria-hidden="true">
        Get in touch
      </span>
      <span className="side-tip side-tip--resume" aria-hidden="true">
        Download resume
      </span>
    </div>
  );
};

export default SideActions;
