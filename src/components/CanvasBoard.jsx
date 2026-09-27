/*
 * The board behind the page: an 8 column grid of vertical hairlines.
 *
 * Only the seven inner lines are drawn. The outer edges are the page card's
 * own edges. Positioned in percentages rather than a viewBox, so the columns stay
 * equal at any window width instead of being cropped.
 */

const COLUMNS = 8;

const GUIDES = Array.from({ length: COLUMNS - 1 }, (unused, i) => `${((i + 1) * 100) / COLUMNS}%`);

const CanvasBoard = () => (
  <svg className="canvas-board" aria-hidden="true" focusable="false">
    {/* crispEdges snaps each 1px stroke to one pixel. Antialiased across two at
        half strength, the guides would read fainter than their colour. */}
    <g stroke="var(--board-line)" strokeWidth="1" shapeRendering="crispEdges">
      {GUIDES.map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="100%" />
      ))}
    </g>
  </svg>
);

export default CanvasBoard;
