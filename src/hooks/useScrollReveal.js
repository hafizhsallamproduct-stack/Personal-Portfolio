import { useLayoutEffect } from 'react';

/*
 * Content rises into place once as it scrolls into view. The motion lives in
 * base.css under "Scroll reveal"; this only decides which elements take part
 * and when.
 */

// [selector, delay in seconds]. Where a selector matches siblings, each one
// after the first waits a further STAGGER, so a row lands left to right.
const REVEALS = [
  ['.section-tag', 0],
  ['.section-title', 0.05],
  ['.about-photo-ring', 0.1],
  ['.about-name', 0],
  ['.about-subtitle', 0.05],
  ['.about-buttons', 0.1],
  ['.about-text', 0.1],
  ['.about-stats', 0.05],
  ['.about-details-group', 0.05],
  ['.experience-description', 0.1],
  ['.work-disclaimer', 0.1],
  ['.ledger-row', 0],
  ['.education-card', 0],
  ['.skills-row', 0],
  ['.skills-row-group', 0.05],
  ['.work-card', 0],
  // Only the Portfolio feature: the case study popup scrolls inside itself,
  // which the window listeners here never see.
  ['.inbox-showcase .inbox-feature-intro', 0],
  ['.inbox-showcase .inbox-feature-media', 0.05],
  ['.inbox-showcase .inbox-meta', 0.1],
  ['.wego-feature-head', 0],
  ['.wego-feature-cover', 0.05],
  ['.ds-card', 0.05],
  ['.wego-feature-foot', 0.1],
  ['.cta-heading', 0],
  ['.cta-subtext', 0.1],
  ['.side-project-card', 0],
];

const STAGGER = 0.05;

// An element reveals once its top clears this share of the window height.
// Anything above the window counts too, so jumping past a section with a nav
// link or an anchor never leaves it hidden behind you.
const REVEAL_LINE = 0.9;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const useScrollReveal = () => {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;

    // Tracked per run rather than by the attribute, so a remount (StrictMode
    // runs effects twice in development) picks everything up again.
    const seen = new WeakSet();
    const pending = new Set();

    const check = () => {
      const line = window.innerHeight * REVEAL_LINE;
      pending.forEach((el) => {
        if (!el.isConnected) {
          pending.delete(el);
          return;
        }
        const rect = el.getBoundingClientRect();
        // Hidden elements (display: none) have no box and are left for later.
        if (rect.width === 0 && rect.height === 0) return;
        if (rect.top < line) {
          el.classList.add('is-revealed');
          pending.delete(el);
        }
      });
    };

    const tag = () => {
      REVEALS.forEach(([selector, delay]) => {
        document.querySelectorAll(selector).forEach((el) => {
          if (seen.has(el) || el.classList.contains('is-revealed')) return;
          seen.add(el);
          const siblings = [...el.parentElement.children].filter((c) => c.matches(selector));
          const step = Math.max(siblings.indexOf(el), 0) * STAGGER;
          el.dataset.reveal = '';
          el.style.setProperty('--reveal-delay', `${delay + step}s`);
          pending.add(el);
        });
      });
      check();
    };

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(check);
    };

    tag();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    // Picks up anything mounted later, such as the home page rendering after
    // a standalone case study. Batched to a frame.
    let mountFrame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(mountFrame);
      mountFrame = requestAnimationFrame(tag);
    });
    mo.observe(document.getElementById('root'), { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(mountFrame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      mo.disconnect();
    };
  }, []);
};
