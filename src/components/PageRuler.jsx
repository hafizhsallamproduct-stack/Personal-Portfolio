import { useEffect, useRef, useState } from 'react';

/*
 * A design-app ruler down the card's left edge: a tick every 10px, a longer
 * one every 50px, a full one with its position every 100px. It runs the whole
 * height of the card and scrolls with it, so the numbers read as the page's
 * own coordinates. Decorative only.
 *
 * It is drawn in one segment per section, each in a quiet tone of that
 * section's own background: lighter on the black sections, darker on the
 * coloured ones (yellow, blue, red and white), so it sits into every colour
 * rather than over it.
 * The ticks and numbers stay continuous across the segments.
 */

const MAJOR = 100;

// A tone of a background colour. Towards white on black; towards black on
// everything else, gently on the light yellow and white, and more on the
// deep blue and red, where a small step would not show.
const toneOf = (rgb) => {
  const [r, g, b] = rgb;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const isBlack = Math.max(r, g, b) < 24;
  let target = 0;
  let amount = 0.14;
  if (isBlack) {
    target = 255;
    amount = 0.24;
  } else if (luminance < 0.5) {
    amount = 0.4;
  }
  const mix = (c) => Math.round(c + (target - c) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
};

const parseRgb = (value) => {
  const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
  if (!match || match[4] === '0') return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
};

const measure = (card) => {
  const cardTop = card.getBoundingClientRect().top;
  const pageRgb = parseRgb(getComputedStyle(card, '::before').backgroundColor) || [0, 0, 0];
  // The sections only: the footer is left clear.
  const blocks = [...card.querySelectorAll(':scope > main > *')];

  return blocks
    .map((el) => {
      const rect = el.getBoundingClientRect();
      const rgb = parseRgb(getComputedStyle(el).backgroundColor) || pageRgb;
      return {
        top: Math.round(rect.top - cardTop),
        height: Math.round(rect.height),
        tone: toneOf(rgb),
      };
    })
    .filter((segment) => segment.height > 0);
};

const PageRuler = () => {
  const ref = useRef(null);
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    const card = ref.current?.parentElement;
    if (!card) return undefined;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setSegments(measure(card)));
    };

    update();
    document.fonts?.ready.then(update).catch(() => {});
    // The card grows and shrinks as rows open and images load.
    const observer = new ResizeObserver(update);
    observer.observe(card);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  // End the ruler where the last section ends, so its fade-out lands there
  // rather than on the footer.
  const last = segments[segments.length - 1];
  const end = last ? last.top + last.height : 0;

  return (
    <div
      ref={ref}
      className="page-ruler"
      style={end ? { height: `${end}px` } : undefined}
      aria-hidden="true"
    >
      {segments.map(({ top, height, tone }) => {
        // The 100px marks that fall inside this segment.
        const first = Math.ceil(top / MAJOR) * MAJOR;
        const marks = [];
        for (let y = first; y < top + height; y += MAJOR) marks.push(y);

        return (
          <div
            key={top}
            className="page-ruler-segment"
            style={{
              top: `${top}px`,
              height: `${height}px`,
              '--ruler-tone': tone,
              // Shift the repeating ticks so they line up with the page, not
              // with the top of this segment.
              '--ruler-shift': `${-top}px`,
            }}
          >
            {marks.map((y) => (
              <span key={y} className="page-ruler-label" style={{ top: `${y - top}px` }}>
                {y}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PageRuler;
