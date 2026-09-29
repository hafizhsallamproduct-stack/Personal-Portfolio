import RhbCaseStudy, { BlockHeader, Strips, Timeline } from './RhbCaseStudy';
import { overseasShowcase as data } from '../data/portfolioData';

// One step of the way in: the screen, with a ring on what the customer clicks
// next, and what they do there.
const FlowStep = ({ step, index }) => (
  <li className="inbox-flow-step">
    <div className="inbox-flow-screen">
      <img src={step.image} alt={step.alt} loading="lazy" decoding="async" />
      {step.hotspot && (
        <span
          className="inbox-flow-marker"
          style={{ left: `${step.hotspot.x * 100}%`, top: `${step.hotspot.y * 100}%` }}
          aria-hidden="true"
        >
          <span className="inbox-hotspot-ring"></span>
        </span>
      )}
    </div>
    <span className="inbox-timeline-when">Step {index + 1}</span>
    <h3 className="inbox-finding-title">{step.title}</h3>
    <p className="inbox-finding-text">{step.text}</p>
  </li>
);

// The product psychology behind a section's decisions, under its screens.
const Psychology = ({ principles }) => (
  <ul
    className={`inbox-findings inbox-psychology${principles.length === 2 ? ' inbox-findings--two' : ''}`}
  >
    {principles.map((principle) => (
      <li className="inbox-finding" key={principle.title}>
        <h3 className="inbox-finding-title">{principle.title}</h3>
        <p className="inbox-finding-text">{principle.text}</p>
      </li>
    ))}
  </ul>
);

// The RHB Overseas Transfer case study.
const OverseasCaseStudy = ({ isStandalone }) => (
  <RhbCaseStudy data={data} titleId="overseas-case-study-title" isStandalone={isStandalone}>
    <header className="inbox-hero">
      <h1 id="overseas-case-study-title" className="inbox-title">
        <strong>{data.titleLead}</strong>: {data.titleRest}
      </h1>
      <p className="inbox-intro">{data.intro}</p>
      <figure className="inbox-hero-shot">
        <img src={data.hero.image} alt={data.hero.alt} decoding="async" />
      </figure>
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
      <ol className="inbox-findings inbox-findings--two">
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
      <BlockHeader index={4} heading={data.flow.heading} text={data.flow.text} />
      {/* The same wide strip as the payment method screens below. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div
        className="inbox-strip"
        tabIndex={0}
        role="region"
        aria-label="Steps to Overseas Transfer"
      >
        <ol className="inbox-flow">
          {data.flow.steps.map((step, i) => (
            <FlowStep step={step} index={i} key={step.title} />
          ))}
        </ol>
      </div>
    </section>

    <section className="inbox-block">
      <BlockHeader
        index={5}
        heading={data.method.heading}
        text={data.method.text}
        note={data.method.note}
      />
      <Strips groups={data.method.groups} name="screens" />
      <Psychology principles={data.method.psychology} />
    </section>

    <section className="inbox-block">
      <BlockHeader index={6} heading={data.form.heading} text={data.form.text} />
      <Strips groups={data.form.groups} frame="tablet" name="form screens" />
      <Psychology principles={data.form.psychology} />
    </section>

    <section className="inbox-block">
      <BlockHeader index={7} heading={data.mobile.heading} text={data.mobile.text} />
      <Strips groups={data.mobile.groups} frame="phone" name="mobile app screens" />
    </section>
  </RhbCaseStudy>
);

export default OverseasCaseStudy;
