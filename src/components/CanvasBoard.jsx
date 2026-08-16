/*
 * The board behind the page: a grid of guides with figures struck off them, the
 * way a construction drawing leaves its setting-out visible.
 *
 * Every figure is anchored to the grid, so the lines read as the edges that set
 * it out: a semicircle's diameter lies along a guide, a quarter turns the
 * corner of an intersection, a square is quartered by the two guides crossing
 * through it. Nothing floats free.
 *
 * Outlines only, one hairline weight, no fills. Drawn in SVG rather than CSS
 * gradients because a shape that stops at a line needs a real path. Laid out in
 * a fixed 1200x1000 space and sliced to the viewport, so circles stay circular
 * at any window size.
 */

const BOARD_W = 1200;
const BOARD_H = 1000;

const V_GUIDES = [120, 360, 600, 840, 1080];
const H_GUIDES = [160, 400, 640, 880];

/* Sizes are continuous rather than drawn from fixed steps, so no two figures
   match. Capped below the 240 guide spacing, which keeps a figure from
   reaching the next parallel guide. */
const R_MIN = 36;
const R_MAX = 142;

/* Clear space held between one figure and the next. Tighter packing is what
   makes the board busier; the figures still never touch. */
const GAP = 15;

/* More candidates than will fit, so the sampler keeps filling gaps until it
   genuinely runs out of room rather than stopping at a quota. */
const TARGET = 27;
const MAX_TRIES = 3000;

/* Concentric second pass, for the kinds that read well struck twice. */
const DOUBLE_CHANCE = 0.42;
const INNER_MIN = 0.46;
const INNER_MAX = 0.74;

/* Weighted so the round figures carry the composition and the rarer marks stay
   punctuation. Each entry is [kind, weight]. */
const KINDS = [
  ['semi', 4],
  ['quarter', 3],
  ['lens', 2],
  ['diamond', 2],
  ['square', 2],
  ['stripes', 1],
  ['dots', 1],
];

const CENTRED_ON_INTERSECTION = new Set(['quarter', 'square']);
const CAN_DOUBLE = new Set(['semi', 'quarter', 'diamond', 'square']);

/* Deterministic pseudo-random, so the composition is irregular but identical
   on every load and in every browser. Change SEED to deal a new arrangement. */
const SEED = 20260816;

const mulberry32 = (seed) => {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/* --- Figures. Each takes an anchor and a radius, and returns path data. --- */

const semi = ({ x, y, axis, sweep }, r) =>
  axis === 'v'
    ? `M ${x} ${y - r} A ${r} ${r} 0 0 ${sweep} ${x} ${y + r}`
    : `M ${x - r} ${y} A ${r} ${r} 0 0 ${sweep} ${x + r} ${y}`;

// Sweep follows the sign pair, so the quarter bows away from the corner
// instead of doubling back through it.
const quarter = ({ x, y, sx, sy }, r) =>
  `M ${x + sx * r} ${y} A ${r} ${r} 0 0 ${sx * sy > 0 ? 1 : 0} ${x} ${y + sy * r}`;

// Two arcs between the same pair of points, bowing opposite ways. The second
// arc reverses direction, so the same sweep flag sends it round the other side.
const lens = ({ x, y, axis }, r) => {
  const R = r * 1.3;
  return axis === 'v'
    ? `M ${x} ${y - r} A ${R} ${R} 0 0 1 ${x} ${y + r} A ${R} ${R} 0 0 1 ${x} ${y - r}`
    : `M ${x - r} ${y} A ${R} ${R} 0 0 1 ${x + r} ${y} A ${R} ${R} 0 0 1 ${x - r} ${y}`;
};

const diamond = ({ x, y }, r) =>
  `M ${x} ${y - r} L ${x + r} ${y} L ${x} ${y + r} L ${x - r} ${y} Z`;

const square = ({ x, y }, r) => {
  const s = r * 0.7;
  return `M ${x - s} ${y - s} H ${x + s} V ${y + s} H ${x - s} Z`;
};

// A comb of lines running parallel to the guide, stepping away from it.
const stripes = ({ x, y, axis, sx, sy }, r) => {
  const count = 4;
  const step = (r * 0.85) / count;
  const half = r * 0.7;
  return Array.from({ length: count }, (unused, i) =>
    axis === 'v'
      ? `M ${x + sx * step * (i + 1)} ${y - half} V ${y + half}`
      : `M ${x - half} ${y + sy * step * (i + 1)} H ${x + half}`
  );
};

// A row of small circles running along the guide.
const dots = ({ x, y, axis }, r) => {
  const count = 4;
  const rd = Math.max(3, r * 0.075);
  const step = (r * 2) / (count + 1);
  return Array.from({ length: count }, (unused, i) => {
    const cx = axis === 'v' ? x : x - r + step * (i + 1);
    const cy = axis === 'v' ? y - r + step * (i + 1) : y;
    return `M ${cx - rd} ${cy} a ${rd} ${rd} 0 1 0 ${rd * 2} 0 a ${rd} ${rd} 0 1 0 ${-rd * 2} 0`;
  });
};

const FIGURES = { semi, quarter, lens, diamond, square, stripes, dots };

/* Stripes reach further than their nominal radius, so they are held to a wider
   berth than the rest when testing for clashes. */
const boundOf = (kind, r) => (kind === 'stripes' ? r * 1.2 : r);

const buildPaths = () => {
  const rand = mulberry32(SEED);
  const pick = (list) => list[Math.floor(rand() * list.length)];

  const weighted = KINDS.flatMap(([kind, weight]) => Array(weight).fill(kind));

  /* Each figure is treated as one circle for placement: its centre, and the
     radius that contains it. That makes "do not cross" a single test, so
     candidates are proposed and thrown away until one lands clear of
     everything already placed. */
  const placed = [];

  for (let tries = 0; tries < MAX_TRIES && placed.length < TARGET; tries += 1) {
    const kind = pick(weighted);
    const r = R_MIN + rand() * (R_MAX - R_MIN);
    const axis = rand() < 0.5 ? 'v' : 'h';
    let x;
    let y;

    if (CENTRED_ON_INTERSECTION.has(kind)) {
      x = pick(V_GUIDES);
      y = pick(H_GUIDES);
    } else if (axis === 'v') {
      x = pick(V_GUIDES);
      y = r + rand() * (BOARD_H - r * 2);
    } else {
      x = r + rand() * (BOARD_W - r * 2);
      y = pick(H_GUIDES);
    }

    const bound = boundOf(kind, r);
    const crosses = placed.some((p) => Math.hypot(p.x - x, p.y - y) < p.bound + bound + GAP);

    if (!crosses) {
      placed.push({
        kind,
        x,
        y,
        r,
        bound,
        axis,
        sweep: rand() < 0.5 ? 0 : 1,
        sx: rand() < 0.5 ? -1 : 1,
        sy: rand() < 0.5 ? -1 : 1,
        inner:
          CAN_DOUBLE.has(kind) && rand() < DOUBLE_CHANCE
            ? r * (INNER_MIN + rand() * (INNER_MAX - INNER_MIN))
            : null,
      });
    }
  }

  // The inner copy shares its centre, side and sweep with the outer, so a pair
  // reads as one figure struck twice rather than two that happen to be close.
  return placed.flatMap((anchor) => {
    const draw = FIGURES[anchor.kind];
    const out = [draw(anchor, anchor.r)];
    if (anchor.inner) out.push(draw(anchor, anchor.inner));
    return out.flat();
  });
};

const PATHS = buildPaths();

const CanvasBoard = () => (
  <svg
    className="canvas-board"
    viewBox={`0 0 ${BOARD_W} ${BOARD_H}`}
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    <g stroke="var(--ring-line)" strokeWidth="1" fill="none">
      {/* crispEdges on the straight guides only. A 1px stroke centred on a whole
          coordinate is antialiased across two pixels at half strength each,
          which left the guides reading fainter than their colour. Snapping them
          to one pixel gives the stated weight exactly, at any viewport size.
          The arcs stay antialiased, as curves have to be. */}
      {V_GUIDES.map((x) => (
        <line
          key={`v${x}`}
          x1={x}
          y1="0"
          x2={x}
          y2={BOARD_H}
          vectorEffect="non-scaling-stroke"
          shapeRendering="crispEdges"
        />
      ))}
      {H_GUIDES.map((y) => (
        <line
          key={`h${y}`}
          x1="0"
          y1={y}
          x2={BOARD_W}
          y2={y}
          vectorEffect="non-scaling-stroke"
          shapeRendering="crispEdges"
        />
      ))}
      {PATHS.map((d, i) => (
        <path key={i} d={d} vectorEffect="non-scaling-stroke" />
      ))}
    </g>
  </svg>
);

export default CanvasBoard;
