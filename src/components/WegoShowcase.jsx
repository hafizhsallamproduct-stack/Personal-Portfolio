import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from './icons';

// The move from Sketch to Figma: the two logos side by side, joined by a
// hairline. A small Sketch-yellow diamond travels along it and turns into a
// Figma-purple circle on the way, with the line filling in behind it. With
// reduced motion only the hairline shows.
const SketchToFigma = () => (
  <div className="sketch-to-figma" role="img" aria-label="From Sketch to Figma">
    <svg className="stf-logo stf-logo--sketch" viewBox="0 0 64 58" aria-hidden="true">
      <polygon points="14,2 50,2 64,20 32,56 0,20" fill="#fdb300" />
      <polygon points="0,20 32,56 14,20" fill="#ea6c00" />
      <polygon points="64,20 32,56 50,20" fill="#ea6c00" />
      <polygon points="14,20 50,20 32,56" fill="#fdad00" />
      <polygon points="14,2 0,20 14,20" fill="#fdd231" />
      <polygon points="50,2 64,20 50,20" fill="#fdd231" />
      <polygon points="14,2 50,2 32,20" fill="#feeeb7" />
      <polygon points="14,2 32,20 14,20" fill="#fdd231" />
      <polygon points="50,2 32,20 50,20" fill="#fdd231" />
    </svg>
    <span className="stf-line" aria-hidden="true">
      <span className="stf-fill"></span>
      <span className="stf-token"></span>
    </span>
    <svg className="stf-logo stf-logo--figma" viewBox="0 0 38 57" aria-hidden="true">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0acf83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#ff7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff" />
    </svg>
  </div>
);

// The design system's foundations, in three unlabelled columns: the typeface
// as a large Aa with its weights, the colour tokens as columns of
// uneven heights, and the icons, placeholders for now.
const Foundations = ({ foundations }) => (
  <div className="ds-foundations">
    <section className="ds-card" aria-label="Typography">
      {/* Guide lines at Inter's cap height, x-height and baseline. */}
      <div className="ds-type-specimen" aria-hidden="true">
        <span className="ds-type-guide ds-type-guide--cap"></span>
        <span className="ds-type-guide ds-type-guide--x"></span>
        <span className="ds-type-guide ds-type-guide--base"></span>
        <p className="ds-type-sample">Aa</p>
      </div>
      <p className="ds-type-name">{foundations.typeface}</p>
      <ul className="ds-type-weights">
        {foundations.weights.map((weight) => (
          <li key={weight}>{weight}</li>
        ))}
      </ul>
    </section>

    <section className="ds-card" aria-label="Color">
      <div className="ds-mountain">
        {foundations.colorColumns.map((column) => (
          <ul className="ds-mountain-column" key={column.hue} aria-label={column.hue}>
            {column.steps.map((color) => (
              <li className="ds-swatch" key={color.name} style={{ backgroundColor: color.hex }}>
                <span className="visually-hidden">{color.name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>

    <section className="ds-card" aria-label="Icons">
      <ul className="ds-icons" aria-hidden="true">
        {Array.from({ length: foundations.iconCount }, (unused, i) => (
          <li className="ds-icon-placeholder" key={i}></li>
        ))}
      </ul>
    </section>
  </div>
);

// A Wego case study, featured inside Portfolio as one full-width block on a
// light green fade: the label, title and summary on top, the cover image
// across the block below, the project facts and a button to the case study
// under it. The case study opens in its usual popup. `showLogo` puts the Wego
// logo over the first one; `centered` centres the text.
const WegoShowcase = ({ data, label, showLogo = false }) => {
  const titleId = `${data.slug}-showcase-title`;
  const location = useLocation();

  return (
    <article
      className={`wego-feature${data.centered ? ' wego-feature--centered' : ''}`}
      aria-labelledby={titleId}
    >
      <div className="wego-feature-head">
        {showLogo && <img className="wego-feature-logo" src={data.logo} alt="Wego logo" />}
        {label && <span className="wego-feature-label">{label}</span>}
        <h3 id={titleId} className="wego-feature-title">
          <strong>{data.titleLead}</strong>: {data.titleRest}
        </h3>
        {data.summary.map((text) => (
          <p className="wego-feature-summary" key={text}>
            {text}
          </p>
        ))}
        {data.sketchToFigma && <SketchToFigma />}
      </div>

      {data.foundations ? (
        <Foundations foundations={data.foundations} />
      ) : (
        <img
          className="wego-feature-cover"
          src={data.cover}
          alt={data.coverAlt}
          loading="lazy"
          decoding="async"
        />
      )}

      <div className="wego-feature-foot">
        <dl className="wego-feature-meta">
          {data.meta.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
        <Link
          to={`/portfolio/${data.slug}`}
          state={{ backgroundLocation: location }}
          className="wego-feature-btn"
        >
          Read Case Study
          <ArrowRight className="icon" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

export default WegoShowcase;
