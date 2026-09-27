import { useEffect, useRef, useState } from 'react';

/*
 * A design-app ruler down the card's left edge: a tick every 10px, a longer
 * one every 50px, a full one with its position every 100px. It runs the whole
 * height of the card and scrolls with it, so the numbers read as the page's
 * own coordinates. Decorative only.
 *
 * It is drawn in one segment per section, each in a quiet tone of that
 * section's own background: lighter on the black sections, darker on the
 * coloured ones (yellow, blue, red and white), always by the same step in lightness, so
 * it sits into every colour rather than over it.
 * The ticks and numbers stay continuous across the segments. An area inside a
 * section with its own background (marked data-ruler) gets its own segment
 * too, so the ruler follows it rather than the section around it. An area can
 * name its own tone in the attribute, where the mixed one would read wrong.
 */

const MAJOR = 100;

// Perceived lightness (CIELAB L*, 0 to 100) of a colour.
const lightnessOf = (rgb) => {
  const [r, g, b] = rgb.map((c) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return y > 216 / 24389 ? 116 * Math.cbrt(y) - 16 : (24389 / 27) * y;
};

// How much lighter or darker the ruler is than the section behind it, the
// same step on every colour so it reads equally quiet on each.
const RULER_STEP = 12;

// A tone of a background colour: towards white on black, towards black on
// everything else, mixed until it is RULER_STEP lighter or darker.
const toneOf = (rgb) => {
  const isBlack = Math.max(...rgb) < 24;
  const target = isBlack ? 255 : 0;
  const base = lightnessOf(rgb);
  const mixed = (amount) => rgb.map((c) => Math.round(c + (target - c) * amount));
  let low = 0;
  let high = 1;
  for (let i = 0; i < 16; i += 1) {
    const mid = (low + high) / 2;
    if (Math.abs(lightnessOf(mixed(mid)) - base) < RULER_STEP) low = mid;
    else high = mid;
  }
  const [r, g, b] = mixed(high);
  return `rgb(${r}, ${g}, ${b})`;
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

  const span = (el, fallback) => {
    const rect = el.getBoundingClientRect();
    const rgb = parseRgb(getComputedStyle(el).backgroundColor) || fallback;
    return {
      top: Math.round(rect.top - cardTop),
      bottom: Math.round(rect.bottom - cardTop),
      tone: el.dataset?.ruler || toneOf(rgb),
      rgb,
    };
  };

  // Each marked area is painted over the spans before it, in document order,
  // so an area inside another one lands on top of it.
  const paint = (spans, area) => {
    const cut = spans.flatMap((s) => {
      if (s.bottom <= area.top || s.top >= area.bottom) return [s];
      const pieces = [];
      if (s.top < area.top) pieces.push({ ...s, bottom: area.top });
      if (s.bottom > area.bottom) pieces.push({ ...s, top: area.bottom });
      return pieces;
    });
    return [...cut, area].sort((a, b) => a.top - b.top);
  };

  return blocks
    .flatMap((el) => {
      const block = span(el, pageRgb);
      return [...el.querySelectorAll('[data-ruler]')].reduce(
        (spans, area) => paint(spans, span(area, block.rgb)),
        [block]
      );
    })
    .map(({ top, bottom, tone }) => ({ top, height: bottom - top, tone }))
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
