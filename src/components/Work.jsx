import InboxShowcase from './InboxShowcase';
import WegoShowcase, { WegoRow } from './WegoShowcase';
import { inboxShowcase, overseasShowcase, wegoShowcases } from '../data/portfolioData';
import { Sparkle } from './icons';

const Work = () => {
  return (
    <section id="portfolio" tabIndex={0}>
      <div className="section section--header-only">
        <div className="section-label-col">
          <span className="section-tag">
            <Sparkle className="icon" aria-hidden="true" /> Portfolio
          </span>
          <h2 className="section-title">Things I've built</h2>
        </div>
        <div className="section-content-col">
          <p className="work-disclaimer">
            All work shown was created during my employment. Company logos and brand assets are
            property of their respective owners and are used here solely to identify the context of
            the work.
          </p>
        </div>
      </div>

      {/* The RHB case studies, one after the other on the same navy. */}
      <div className="inbox-showcases">
        <InboxShowcase data={inboxShowcase} label="Case study 1" />
        <InboxShowcase data={overseasShowcase} label="Case study 2" reverse showLogo={false} />
      </div>

      {/* The Wego case studies on the dark green of their case study popup:
          the design system as a full-width block with the logo, then the rest
          as rows of a list, split by dividers. */}
      <div className="wego-features">
        <WegoShowcase data={wegoShowcases[0]} label="Case study 3" showLogo dark />
        <div className="wego-rows wego-rows--dark">
          {wegoShowcases.slice(1).map((showcase, i) => (
            <WegoRow data={showcase} label={`Case study ${i + 4}`} key={showcase.slug} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
