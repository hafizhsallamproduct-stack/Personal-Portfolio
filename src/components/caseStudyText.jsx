// Text wrapped in {{...}} keeps its real value in the data but renders blurred,
// so figures are hidden on screen without being lost.
const BLUR_RE = /\{\{(.+?)\}\}/g;

export const renderText = (text) => {
  if (typeof text !== 'string' || !text.includes('{{')) return text;
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = BLUR_RE.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <span key={key++} className="portfolio-blur">
        {match[1]}
      </span>
    );
    lastIndex = BLUR_RE.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
};

// Case studies that open in a popup of their own, so not in this reader's
// list.
export const OWN_POPUP = [
  'wego-design-system',
  'wego-flight-search-redesign',
  'fare-families',
  'design-hub',
];
