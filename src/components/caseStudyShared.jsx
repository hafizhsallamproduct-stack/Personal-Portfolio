import { renderText } from './caseStudyText';

export const TableBlock = ({ block, onImageClick }) => (
  <figure className="portfolio-table-wrap">
    <table className="portfolio-table">
      <thead>
        <tr>
          {block.columns.map((col, i) => (
            <th key={i}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {block.rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{renderText(cell)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {block.mobileImage && (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
      <img
        src={block.mobileImage}
        alt={block.caption || ''}
        className="portfolio-table-mobile-img"
        loading="lazy"
        decoding="async"
        onClick={() => onImageClick?.(block.mobileImage)}
      />
    )}
    {block.caption && <figcaption className="portfolio-image-caption">{block.caption}</figcaption>}
  </figure>
);
