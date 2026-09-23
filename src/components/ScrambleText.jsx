import { useLayoutEffect, useRef, useState } from 'react';

/*
 * Text that arrives as random characters and settles, letter by letter from
 * the left, into the real words.
 *
 * Each letter gets its own box, measured from the real text before the first
 * paint and held at that width, so the random characters never shift or
 * rewrap the line while they cycle. Words stay unbreakable and spaces and
 * hyphens stay plain text, so lines break exactly where the finished text
 * breaks. Once every letter has landed the plain text goes back in, with its
 * kerning and selection intact.
 *
 * Screen readers get the real text throughout, from a visually hidden copy.
 */

// No wide letters (M, W, m, w, %, &): they spill out of the narrow boxes held
// for letters like i and l, and crowd the neighbours.
const GLYPHS = 'ABCDEFGHIJKLNOPQRSTUVXYZabcdefghijklnopqrstuvxyz0123456789#*+=?/<>';

// How often an unsettled letter swaps to another random character, in ms.
const TICK = 50;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

// Words, and the spaces and hyphens between them. Breaks are allowed only in
// the separators, which stay plain text.
const tokenize = (text) =>
  text
    .split(/(\s+|-)/)
    .filter(Boolean)
    .map((part) => ({ part, separator: /^(\s+|-)$/.test(part) }));

const ScrambleText = ({ text, delay = 0, stagger = 0.03, settle = 0.35 }) => {
  const [done, setDone] = useState(() => prefersReducedMotion());
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (done) return undefined;
    const chars = [...rootRef.current.querySelectorAll('.scramble-char')];

    // Hold each box at the width of its real letter, then swap in noise, all
    // before the browser paints.
    const widths = chars.map((el) => el.getBoundingClientRect().width);
    chars.forEach((el, i) => {
      el.style.width = `${widths[i]}px`;
      el.textContent = randomGlyph();
    });

    // When each letter lands, in ms from now: a lead-in, then left to right.
    const lands = chars.map((el, i) => (delay + settle + i * stagger) * 1000);
    const start = performance.now();
    let last = 0;
    let frame = 0;

    const step = (now) => {
      const elapsed = now - start;
      const tick = elapsed - last >= TICK;
      if (tick) last = elapsed;
      let pending = 0;
      chars.forEach((el, i) => {
        if (el.dataset.settled) return;
        if (elapsed >= lands[i]) {
          el.textContent = el.dataset.char;
          el.dataset.settled = 'true';
        } else {
          pending += 1;
          if (tick) el.textContent = randomGlyph();
        }
      });
      if (pending) frame = requestAnimationFrame(step);
      else setDone(true);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [done, delay, stagger, settle]);

  if (done) return text;

  return (
    <>
      <span className="visually-hidden">{text}</span>
      <span ref={rootRef} className="scramble" aria-hidden="true">
        {tokenize(text).map(({ part, separator }, w) =>
          separator ? (
            part
          ) : (
            <span key={w} className="scramble-word">
              {[...part].map((char, c) => (
                <span key={c} className="scramble-char" data-char={char}>
                  {char}
                </span>
              ))}
            </span>
          )
        )}
      </span>
    </>
  );
};

export default ScrambleText;
