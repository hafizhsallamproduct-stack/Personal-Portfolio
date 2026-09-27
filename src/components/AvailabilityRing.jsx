/*
 * The availability message running round the outside of the profile photo,
 * turning slowly. No band behind it: just the words on a circle a few px out
 * from the photo's edge.
 *
 * Drawn in a 240 unit box sized for a 200px photo, one unit per px at the
 * desktop size, and scaled with the photo (see .about-photo-ring in
 * sections.css). The message repeats round the circle and is stretched with
 * textLength to meet itself exactly, so there is no gap where the loop joins.
 * Mobile draws it smaller on screen, so it gets its own line with fewer, larger
 * copies; CSS shows one or the other. Read out once, from the label.
 */

const MESSAGE = 'Always open for new opportunity';

const NBSP = String.fromCharCode(0xa0);

const SIZE = 240;
const CENTRE = SIZE / 2;
// Photo radius (100) plus a small gap, to the middle of the letters.
const RADIUS = 112;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// A full circle starting at the top and running clockwise.
const TEXT_PATH = `M ${CENTRE} ${CENTRE - RADIUS} a ${RADIUS} ${RADIUS} 0 1 1 0 ${RADIUS * 2} a ${RADIUS} ${RADIUS} 0 1 1 0 ${-RADIUS * 2}`;

// The copies, each followed by a separator. The last space is a no-break
// space: a plain trailing space is dropped, and the join would read •ALWAYS.
const loop = (copies) => `${`${MESSAGE} • `.repeat(copies).trimEnd()}${NBSP}`;

const RingText = ({ className, copies }) => (
  <text className={className} dy="0.35em">
    <textPath href="#about-photo-ring-path" textLength={CIRCUMFERENCE} lengthAdjust="spacing">
      {loop(copies)}
    </textPath>
  </text>
);

const AvailabilityRing = ({ children }) => (
  <div className="about-photo-ring">
    {children}
    <svg
      className="about-photo-ring-svg"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={MESSAGE}
    >
      <defs>
        <path id="about-photo-ring-path" d={TEXT_PATH} />
      </defs>
      <RingText className="about-photo-ring-text about-photo-ring-text--wide" copies={3} />
      <RingText className="about-photo-ring-text about-photo-ring-text--narrow" copies={2} />
    </svg>
  </div>
);

export default AvailabilityRing;
