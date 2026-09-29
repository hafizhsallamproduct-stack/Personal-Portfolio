import { useState } from 'react';
import InboxDevice from './InboxDevice';
import RhbCaseStudy, { BlockHeader, Strips, Timeline } from './RhbCaseStudy';
import { inboxShowcase as data } from '../data/portfolioData';

// The home page as it opens the inbox: click the icon in the top bar and the
// panel slides open, click the page again to close it.
const Opening = ({ opening }) => {
  const [isOpen, setIsOpen] = useState(false);
  const screen = isOpen ? opening.open : opening.closed;

  return (
    <figure className="inbox-opening">
      <figcaption className="inbox-opening-hint">{opening.caption}</figcaption>
      <div className="inbox-opening-screen">
        <img src={screen.image} alt={screen.alt} decoding="async" />
        {isOpen ? (
          <button
            type="button"
            className="inbox-opening-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close the inbox"
          ></button>
        ) : (
          <button
            type="button"
            className="inbox-hotspot"
            style={{
              left: `${opening.hotspot.x * 100}%`,
              top: `${opening.hotspot.y * 100}%`,
            }}
            onClick={() => setIsOpen(true)}
            aria-label="Open the inbox"
          >
            <span className="inbox-hotspot-ring" aria-hidden="true"></span>
          </button>
        )}
      </div>
    </figure>
  );
};

// The RHB Inbox case study.
const InboxCaseStudy = ({ isStandalone }) => (
  <RhbCaseStudy data={data} titleId="inbox-case-study-title" isStandalone={isStandalone}>
    <header className="inbox-hero">
      <h1 id="inbox-case-study-title" className="inbox-title">
        <strong>{data.titleLead}</strong>: {data.titleRest}
      </h1>
      <p className="inbox-intro">{data.intro}</p>
      <Opening opening={data.opening} />
    </header>

    <section className="inbox-block">
      <BlockHeader index={1} heading={data.background.heading} text={data.background.text} />
    </section>

    <section className="inbox-block">
      <BlockHeader index={2} heading={data.process.heading} text={data.process.text} />
      <Timeline steps={data.process.steps} />
    </section>

    <section className="inbox-block">
      <BlockHeader index={3} heading={data.research.heading} text={data.research.text} />
      <ol className="inbox-findings">
        {data.research.findings.map((finding) => (
          <li className="inbox-finding" key={finding.title}>
            <h3 className="inbox-finding-title">{finding.title}</h3>
            <p className="inbox-finding-text">{finding.text}</p>
          </li>
        ))}
      </ol>
      <p className="inbox-outcome">{data.research.outcome}</p>
    </section>

    <section className="inbox-block">
      <BlockHeader index={4} heading={data.devices.heading} text={data.devices.text} />
      <div className="inbox-devices">
        {data.devices.items.map((device) => (
          <InboxDevice device={device} key={device.key} />
        ))}
      </div>
    </section>

    <section className="inbox-block">
      <BlockHeader index={5} heading={data.filter.heading} text={data.filter.text} />
      <Strips
        groups={[{ images: data.filter.images }]}
        frame="desktop"
        name="Date filter screens"
      />
    </section>

    <section className="inbox-block">
      <BlockHeader index={6} heading={data.messages.heading} text={data.messages.text} />
      <ul className="inbox-cards">
        {data.messages.cards.map((card) => (
          <li className="inbox-card" key={card.image}>
            <img src={card.image} alt={card.alt} loading="lazy" decoding="async" />
          </li>
        ))}
      </ul>
    </section>

    <section className="inbox-block">
      <BlockHeader index={7} heading={data.details.heading} text={data.details.text} />
      <Strips groups={[{ images: data.details.images }]} frame="desktop" name="Message screens" />
    </section>

    <section className="inbox-block">
      <BlockHeader index={8} heading={data.announcements.heading} text={data.announcements.text} />
      <Strips groups={data.announcements.groups} frame="desktop" name="Announcement screens" />
    </section>

    <section className="inbox-block">
      <BlockHeader index={9} heading={data.app.heading} text={data.app.text} />
      <Strips groups={data.app.groups} frame="phone" name="mobile app screens" />
    </section>
  </RhbCaseStudy>
);

export default InboxCaseStudy;
