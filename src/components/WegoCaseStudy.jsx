import { useState } from 'react';
import RhbCaseStudy, { CaseStudyTitle } from './RhbCaseStudy';
import { TableBlock } from './caseStudyShared';
import { renderText } from './caseStudyText';
import { Moon, Sun } from './icons';
import { wegoShowcases, workData } from '../data/portfolioData';

// A Wego case study in the same popup and layout as the RHB ones, on a dark
// cool green, built from the case study's existing content without changing
// any of it. The opening image and paragraphs go in the hero; each heading
// then starts a numbered section, with the text that follows it beside the
// heading, as in the RHB blocks, and runs of images in a sideways strip.

// Splits the content into the hero part (before the first heading) and one
// section per heading.
const toSections = (content) => {
  const hero = [];
  const sections = [];
  content.forEach((block) => {
    if (block.type === 'heading') sections.push({ heading: block.text, blocks: [] });
    else if (sections.length) sections[sections.length - 1].blocks.push(block);
    else hero.push(block);
  });
  return { hero, sections };
};

// Groups a section's blocks into runs of text, runs of images and runs of
// images marked `stack`, so images can break out into a strip, or stack one
// above the other across the content column, while text stays in its column.
const toRuns = (blocks) =>
  blocks.reduce((runs, block) => {
    const kind = block.stack
      ? 'stack'
      : block.type === 'image' || block.type === 'carousel'
        ? 'images'
        : 'text';
    const last = runs[runs.length - 1];
    if (last && last.kind === kind) last.blocks.push(block);
    else runs.push({ kind, blocks: [block] });
    return runs;
  }, []);

const TextBlock = ({ block }) => {
  switch (block.type) {
    case 'paragraph':
      return <p className="inbox-block-text">{renderText(block.text)}</p>;
    case 'subheading':
      return <h3 className="wego-cs-subheading">{block.text}</h3>;
    case 'label':
      return <p className="wego-cs-label">{block.text}</p>;
    case 'note':
      return <p className="inbox-outcome">{renderText(block.text)}</p>;
    case 'list':
      return (
        <ul className="wego-cs-list">
          {block.items.map((item, i) => (
            <li key={i}>{renderText(item)}</li>
          ))}
        </ul>
      );
    case 'table':
      return <TableBlock block={block} />;
    case 'timeline':
      return (
        <ol className="inbox-timeline wego-cs-timeline">
          {block.phases.map((phase) => (
            <li className="inbox-timeline-step" key={phase.label}>
              <span className="inbox-timeline-when">{phase.label}</span>
              <h3 className="inbox-finding-title">{phase.title} Success Criteria</h3>
              <ul className="wego-cs-list">
                {phase.criteria.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      );
    default:
      return null;
  }
};

// One image in a strip, with its caption under it. An image with a dark
// version gets the same light and dark switch as in the reader.
const StripImage = ({ image }) => {
  const [theme, setTheme] = useState('light');
  const src = theme === 'dark' && image.urlDark ? image.urlDark : image.url;
  return (
    <figure className="inbox-shot">
      <div className="wego-cs-image">
        <img src={src} alt={image.alt || ''} loading="lazy" decoding="async" />
        {image.urlDark && (
          <div className="portfolio-image-theme-toggle">
            <button
              type="button"
              className={theme === 'light' ? 'active' : ''}
              onClick={() => setTheme('light')}
              aria-label="Show light version"
              aria-pressed={theme === 'light'}
            >
              <Sun className="icon" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={theme === 'dark' ? 'active' : ''}
              onClick={() => setTheme('dark')}
              aria-label="Show dark version"
              aria-pressed={theme === 'dark'}
            >
              <Moon className="icon" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      {image.caption && (
        <figcaption>
          {/* A short title and the caption under it. */}
          {image.title && <span className="inbox-finding-title">{image.title}</span>}
          <span className="inbox-finding-text">{renderText(image.caption)}</span>
        </figcaption>
      )}
    </figure>
  );
};

// A run of images and carousels: one sideways strip wider than the column,
// a carousel's images laid out in it one after another.
const ImageStrip = ({ blocks }) => {
  const images = blocks.flatMap((block) => (block.type === 'carousel' ? block.items : [block]));
  return (
    // Focusable so the arrow keys scroll it.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className="inbox-strip wego-cs-strip" tabIndex={0} role="region" aria-label="Images">
      {images.map((image, i) => (
        <StripImage image={image} key={`${image.url}-${i}`} />
      ))}
    </div>
  );
};

const WegoCaseStudy = ({ slug, isStandalone }) => {
  const work = workData.find((w) => w.slug === slug);
  // The title as its Portfolio preview shows it: the lead in bold, then the
  // rest.
  const preview = wegoShowcases.find((w) => w.slug === slug);
  const { hero, sections } = toSections(work.content);
  const heroImage = hero.find((block) => block.type === 'image');
  const heroText = hero.filter((block) => block.type !== 'image');
  const titleId = `${slug}-case-study-title`;
  const shell = { title: work.title, logo: '/assets/wego-dark.svg', company: work.company };

  return (
    <div className="wego-cs">
      <RhbCaseStudy data={shell} titleId={titleId} isStandalone={isStandalone}>
        <header className="inbox-hero">
          {preview ? (
            <CaseStudyTitle id={titleId} lead={preview.titleLead} rest={preview.titleRest} />
          ) : (
            <h1 id={titleId} className="inbox-title">
              {work.title}
            </h1>
          )}
          {work.year && <p className="wego-cs-year">{work.year}</p>}
          {work.intro && <p className="inbox-intro">{work.intro}</p>}
          {work.introNote && (
            <p className="inbox-intro">
              {work.introNote}
              {work.introNoteEmoji && <span aria-hidden="true"> {work.introNoteEmoji}</span>}
            </p>
          )}
          {heroImage && (
            <figure className="inbox-hero-shot">
              <img src={heroImage.url} alt={heroImage.alt || ''} decoding="async" />
              {heroImage.caption && (
                <figcaption className="wego-cs-hero-caption">
                  {heroImage.title && (
                    <span className="inbox-finding-title">{heroImage.title}</span>
                  )}
                  <span className="inbox-finding-text">{renderText(heroImage.caption)}</span>
                </figcaption>
              )}
            </figure>
          )}
          {heroText.length > 0 && (
            <div className="wego-cs-hero-text">
              {heroText.map((block, i) => (
                <TextBlock block={block} key={i} />
              ))}
            </div>
          )}
        </header>

        {sections.map((section, index) => {
          const runs = toRuns(section.blocks);
          const opening = runs[0]?.kind === 'text' ? runs.shift() : null;
          return (
            <section className="inbox-block" key={section.heading}>
              <div className="inbox-block-header">
                <div className="inbox-block-heading">
                  <span className="inbox-block-index">{String(index + 1).padStart(2, '0')}</span>
                  <h2 className="inbox-block-title">{section.heading}</h2>
                </div>
                {opening && (
                  <div className="wego-cs-text">
                    {opening.blocks.map((block, j) => (
                      <TextBlock block={block} key={j} />
                    ))}
                  </div>
                )}
              </div>
              {runs.map((run, i) =>
                run.kind === 'stack' ? (
                  <div className="wego-cs-stack" key={i}>
                    {run.blocks.map((block) => (
                      <StripImage image={block} key={block.url} />
                    ))}
                  </div>
                ) : run.kind === 'images' &&
                  run.blocks.length === 1 &&
                  run.blocks[0].type === 'image' ? (
                  // A single image on its own spans the content column.
                  <div className="wego-cs-stack" key={i}>
                    <StripImage image={run.blocks[0]} />
                  </div>
                ) : run.kind === 'images' ? (
                  <ImageStrip blocks={run.blocks} key={i} />
                ) : (
                  <div className="wego-cs-body" key={i}>
                    {run.blocks.map((block, j) => (
                      <TextBlock block={block} key={j} />
                    ))}
                  </div>
                )
              )}
            </section>
          );
        })}

        <p className="wego-cs-credit">Hafizh Sallam · Claude (co-author)</p>
      </RhbCaseStudy>
    </div>
  );
};

export default WegoCaseStudy;
