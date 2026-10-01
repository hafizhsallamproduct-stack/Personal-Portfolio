import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from './icons';

// The move from Sketch to Figma, and on to Claude: the three logos in a row,
// joined by hairlines tinted from one tool's colour to the next. Three small
// shapes travel along each line, a third of a loop apart, turning from the
// first tool's shape and colour into the next one's: a Sketch-yellow diamond
// into a Figma-purple circle, then that circle into a Claude-orange diamond.
// With reduced motion only the hairlines show.
const SketchToFigma = () => (
  <div className="sketch-to-figma" role="img" aria-label="From Sketch to Figma to Claude">
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
      <span className="stf-token"></span>
      <span className="stf-token"></span>
    </span>
    <svg className="stf-logo stf-logo--figma" viewBox="0 0 38 57" aria-hidden="true">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0acf83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#ff7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff" />
    </svg>
    <span className="stf-line stf-line--claude" aria-hidden="true">
      <span className="stf-fill"></span>
      <span className="stf-token"></span>
      <span className="stf-token"></span>
      <span className="stf-token"></span>
    </span>
    <img className="stf-logo stf-logo--claude" src="/assets/claude-logo.svg" alt="" />
  </div>
);

// The design system's foundations, in three unlabelled columns: the typeface
// as a large Aa with its weights, the colour tokens as columns of
// uneven heights, and the product icons in square frames.
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
        {foundations.icons.map((icon) => (
          <li className="ds-icon" key={icon}>
            <img src={icon} alt="" loading="lazy" decoding="async" />
          </li>
        ))}
      </ul>
    </section>
  </div>
);

// A Wego case study, featured inside Portfolio as one full-width block on a
// light green fade: the label, title and summary on top, the cover image
// across the block below, the project facts and a button to the case study
// under it. The case study opens in its usual popup. `showLogo` puts the Wego
// logo over the first one; `centered` centres the text; `dark` sets it on
// the dark green of the Wego case study popup.
const WegoShowcase = ({ data, label, showLogo = false, dark = false }) => {
  const titleId = `${data.slug}-showcase-title`;
  const location = useLocation();

  return (
    <article
      className={`wego-feature${data.centered ? ' wego-feature--centered' : ''}${
        dark ? ' wego-feature--dark' : ''
      }`}
      aria-labelledby={titleId}
    >
      <div className="wego-feature-head">
        {showLogo && (
          <img
            className="wego-feature-logo"
            src={dark ? '/assets/wego-dark.svg' : data.logo}
            alt="Wego logo"
          />
        )}
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

// A Wego case study as one row of a list, laid out like the old Portfolio
// cards without the card: the cover on the left, the label, title and
// summary in the middle, then a button to the case study. The whole row opens the case study's usual popup.
export const WegoRow = ({ data, label }) => {
  const location = useLocation();

  return (
    <Link
      to={`/portfolio/${data.slug}`}
      state={{ backgroundLocation: location }}
      className="wego-row"
    >
      <img
        className="wego-row-cover"
        src={data.cover}
        alt={data.coverAlt}
        loading="lazy"
        decoding="async"
      />
      <div className="wego-row-body">
        {label && <span className="wego-feature-label">{label}</span>}
        <h3 className="wego-row-title">
          <strong>{data.titleLead}</strong>: {data.titleRest}
        </h3>
        {data.summary.map((text) => (
          <p className="wego-row-summary" key={text}>
            {text}
          </p>
        ))}
      </div>
      <div className="wego-row-action">
        <span className="wego-feature-btn">
          Read Case Study
          <ArrowRight className="icon" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
};

export default WegoShowcase;
