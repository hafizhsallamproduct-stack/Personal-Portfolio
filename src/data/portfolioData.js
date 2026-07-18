export const experienceData = [
  {
    company: 'Wego Pte Ltd',
    logo: '/assets/wego.svg',
    logoHeight: '40px',
    duration: 'Oct 2021 — Present',
    caseStudies: [
      {
        slug: 'wego-design-system',
        label: 'Wego Design System: Built & Maintained from the Ground Up',
      },
    ],
    roles: [
      {
        title: 'Senior Product Designer II',
        isDefault: true,
        location: 'Kuala Lumpur, Malaysia',
        date: 'Oct 2024 — Present',
        details: [
          "Lead the end-to-end redesign of Wego's flight booking experience across desktop and mobile web, covering fare families, passenger details, payments, and booking details, with A/B experiments across the funnel to improve attach rates, drop-off, and conversion.",
          'Expand ancillary design with new partnership integrations.',
          'Expand payment and loyalty experience design, introducing new flows for promo codes and partner loyalty point redemption.',
          'Improve design workflows and the product delivery process, from discovery and grooming to developer handoff and design QA.',
          'Maintain and evolve the Wego Design System (new components, mobile foundations, and Figma workflow structure) and drive AI adoption in the design team, from AI-assisted workflows to design-system compliance checks against production code.',
        ],
      },
      {
        title: 'Senior Product Designer I',
        isDefault: true,
        location: 'Kuala Lumpur, Malaysia',
        date: 'Oct 2021 — Sep 2024',
        details: [
          'Built the Wego Design System from the ground up: style guide, icon and illustration guidelines, and the full mobile app foundation component library.',
          'Designed core flight search experiences across web and apps: search form revamps, Flight Search 2.0, per-leg search, and sort & filter improvements.',
          "Designed Wego's in-app AI travel assistant: conversation behaviors, voice interaction, and its integration across search and support.",
          'Supported growth initiatives with a new SEO landing-page system.',
        ],
      },
    ],
  },
  {
    company: 'RHB Banking Group',
    logo: '/assets/rhb-logo.svg',
    duration: 'Jan 2020 — Oct 2021',
    tenure: '1 year 9 months',
    roles: [
      {
        title: 'UI/UX Designer',
        location: 'Kuala Lumpur, Malaysia',
        date: 'Jan 2020 — Oct 2021',
        details: [
          'Collaborated in agile cross-functional teams to deliver end-to-end banking web experiences.',
          'Designed the FPX and other payment gateway flows for banking web and mobile app.',
          'Designed the cross-border international transfer flow for banking web and mobile app.',
          'Worked on bank back-office experiences, understanding how the underlying systems and business processes work and translating them into simple, usable management tools.',
        ],
      },
    ],
  },
  {
    company: 'AirAsia Berhad',
    logo: '/assets/airasia-logo.svg',
    duration: 'Mar 2017 — Dec 2019',
    tenure: '2 years 10 months',
    roles: [
      {
        title: 'UI/UX Designer',
        location: 'Selangor, Malaysia',
        date: 'Nov 2018 — Dec 2019',
        details: [
          'Contributing to the design evolution of AirAsia 3.0, helping transition the website from an airline platform into a super app ecosystem.',
          'Working on end-to-end UX process: research, ideation, prototyping, testing, and iteration.',
        ],
      },
      {
        title: 'Web Designer',
        location: 'Selangor, Malaysia',
        date: 'Mar 2017 — Oct 2018',
        details: [
          'Maintained and enhanced website visual design.',
          'Designed landing pages for campaigns and collaborated closely with marketing teams.',
          'Worked alongside the CRM team on a daily basis, supporting email marketing design and execution.',
        ],
      },
    ],
  },
  {
    company: 'Lelong.my — Interbase Resources',
    logo: '/assets/lelong-logo.png',
    duration: 'Nov 2015 — Feb 2017',
    tenure: '1 year 4 months',
    roles: [
      {
        title: 'Senior Web Designer',
        location: 'Selangor, Malaysia',
        date: 'Nov 2015 — Feb 2017',
        details: [
          'Managed website visual design and campaign landing pages.',
          'Developed design guidelines for major campaigns (e.g., MyCyberSale, Black Friday, Chinese New Year).',
          'Designed newsletters and social media visuals in collaboration with marketing.',
        ],
      },
    ],
  },
  {
    company: 'Searchfuse Marketing',
    duration: 'Apr 2015 — Oct 2015',
    tenure: '7 months',
    roles: [
      {
        title: 'UI Designer & Graphic Designer',
        location: 'Freelance Remote (Dubai)',
        date: 'Apr 2015 — Oct 2015',
        summary:
          'Delivered UI and graphic design solutions for various client industries including education and airlines.',
      },
    ],
  },
  {
    company: 'Freelance Designer',
    duration: '2012 — Apr 2015',
    roles: [
      {
        title: 'Freelance Designer',
        location: 'Various projects',
        date: '2012 — Apr 2015',
        summary:
          'Worked on multiple projects in graphic and web design. Also sold digital products on Creative Market and Envato.',
      },
    ],
  },
];

export const skillsData = [
  'Product Design',
  'Design Systems',
  'Prototyping',
  'User Research',
  'Web Design',
  'Web Frontend',
  'Product Management',
  'Product Planning',
  'Design Mentoring',
  'Workflow Management',
  'AI Product Adaptation',
];

export const toolsData = [
  { name: 'Figma' },
  { name: 'Sketch' },
  { name: 'Claude' },
  { name: 'Claude Design' },
  { name: 'Claude Code' },
  { name: 'Codex' },
  { name: 'Jira & Confluence' },
  { name: 'Adobe CC', strike: true },
];

export const workData = [
  {
    title: 'Wego Design System: Built & Maintained from the Ground Up',
    company: 'Wego',
    logo: '/assets/wego.svg',
    year: '2022 — Present',
    isLarge: true,
    image: '/assets/portfolio/portfolio-1.webp',
    description:
      "Led the full rebuild of Wego's design system when transitioning from Sketch to Figma, establishing foundations, components, and documentation that scale across Flight and Hotel verticals on four touchpoints.",
    intro:
      'This portfolio focuses on the journey of building and maintaining the design system rather than going deep into technical implementation details. Because the system is a long-running and still-evolving effort, the most important story is how decisions were made, how changes were introduced gradually, and how the system stayed practical as our tools, workflows, and product needs evolved.',
    introNote: 'For technical details, we can talk during the interview',
    introNoteEmoji: '😊',
    slug: 'wego-design-system',
    link: '#',
    content: [
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-wegodesignsystem-7.webp',
      },
      {
        type: 'paragraph',
        text: 'I lead the Wego Design System, from building it to guiding its direction across products. As part of a two-person team, I am responsible for maintaining and improving the system so it remains consistent, scalable, and aligned with product needs.',
      },
      {
        type: 'paragraph',
        text: 'In my day-to-day work, I review how teams apply the system, ensure components are used correctly and consistently, and introduce updates as the system evolves. This role also requires close collaboration with developers to make sure design decisions are implemented effectively and continue to support both design and engineering workflows.',
      },
      {
        type: 'paragraph',
        text: 'In my team, this is a side role I take on in addition to my main work as a designer for the flight search and booking vertical.',
      },
      { type: 'heading', text: 'Background and Problem' },
      {
        type: 'paragraph',
        text: "The Wego Design System was rebuilt when we moved from Sketch to Figma. We already had a system in Sketch, but it no longer matched the needs of the product or how the team had grown. The visual style hadn't changed much for five to six years, so the product started to feel outdated.",
      },
      {
        type: 'paragraph',
        text: 'The move to Figma gave us a chance to not just switch tools, but rethink the system. Instead of copying what we had before, we used this as an opportunity to update the visuals, refresh the design language, and build a system that better supports future product work.',
      },
      { type: 'heading', text: 'Success Criteria' },
      {
        type: 'paragraph',
        text: 'This project was structured across multiple phases, each with its own defined goals and deliverables.',
      },
      {
        type: 'timeline',
        phases: [
          {
            label: 'Phase 1: Foundation',
            title: 'Baby Phase',
            criteria: [
              'Alignment and approval secured from all key stakeholders and product verticals',
              'Core design foundations and essential components are completed, validated, and ready for production use',
              'Teams have a shared understanding of design principles, standards, and implementation approach',
            ],
          },
          {
            label: 'Phase 2: Adoption',
            title: 'Toddler Phase',
            criteria: [
              'The design system is actively used in actual designs across teams',
              'Documentation is complete, accessible, and enables consistent application of the design system',
              'Designers can efficiently create and maintain experiences using the shared system',
            ],
          },
          {
            label: 'Phase 3: Refinement',
            title: 'Child Phase',
            criteria: [
              'Components and foundations have been improved based on real-world usage and feedback',
              'Documentation accurately reflects the latest standards and component behavior',
              'The design system is mature and ready for engineering implementation at scale',
            ],
          },
          {
            label: 'Phase 4: Unification (In Progress)',
            title: 'Teen Phase',
            criteria: [
              'Design and front-end teams operate from a single, shared source of truth',
              'Design and code components achieve a high level of parity and consistency',
              'The latest design system standards are adopted across products and experiences',
              'Cross-functional teams can build, maintain, and scale products using a unified component library',
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'In Phase 4, early progress was slow because of limited resources, but it sped up significantly once we brought AI into the front-end build process. On the design side, we are revising the documentation to be AI-readable, which speeds up the workflow even more.',
      },
      { type: 'heading', text: 'The Challenge' },
      {
        type: 'paragraph',
        text: 'At the beginning, we faced a few challenges:',
      },
      {
        type: 'list',
        items: [
          'The interface was already outdated, and making big changes at once would create more inconsistency. So we needed a more gradual approach.',
          "We wanted to update the design, but we didn't have enough design and engineering capacity to redo everything at the same time.",
          'Not everyone was familiar with Figma since we had just moved from Sketch, so people also needed time to learn the new tool.',
        ],
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-wegodesignsystem-5.webp',
        alt: 'Background context for the Wego Design System rebuild',
        caption: 'Early concept for design change',
      },
      { type: 'heading', text: 'Design Research and Exploration' },
      {
        type: 'paragraph',
        text: 'We aimed to refresh the design while staying close to the current system: a more modern feel, achieved by strengthening the foundations rather than rebuilding everything from scratch.',
      },
      {
        type: 'paragraph',
        text: 'We studied established design systems and how key competitors approach theirs. This helped us answer practical questions: how to build the system well, what structure to adopt, and how to manage and scale it.',
      },
      {
        type: 'paragraph',
        text: 'We also looked into design tokens, accessibility standards, and consistency across platforms. From these insights, we created design explorations rooted in the existing system, focused on core foundations such as typography and color.',
      },
      { type: 'heading', text: 'Design Approval' },
      {
        type: 'paragraph',
        text: 'We shared a few design concepts with stakeholders and developers, walking them through our thinking to get alignment and approval. This was our first real check-in with the business side, where design decisions meet business goals.',
      },
      {
        type: 'paragraph',
        text: 'On the engineering side, we focused on understanding constraints, technical limitations, and team capacity, and on finding the most effective ways to collaborate.',
      },
      { type: 'label', text: 'Key takeaways:' },
      {
        type: 'list',
        items: [
          "Be mindful of changes. Start by refining visuals before reworking the entire flow. Reinvention can be costly if the impact isn't measurable.",
          'Trade-offs are inevitable. Balance business and design needs, accept minor compromises, and keep moving forward.',
        ],
      },
      { type: 'label', text: 'Result:' },
      {
        type: 'list',
        items: [
          'Approved design concept',
          'Identified business concerns',
          'Clear understanding of engineering constraints, limitations, and collaboration approach',
        ],
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-wegodesignsystem-2.webp',
        alt: 'Wego 2022 design concept, before and after UI comparisons across platforms',
        caption: 'Presentation slide for approval showing the before-and-after design.',
      },
      { type: 'heading', text: 'Development, Testing and Documentation' },
      {
        type: 'paragraph',
        text: 'This was the longest part of the project. With the concept approved, we went through every foundation and component one by one with the whole design team. We had designers apply the new components in their own work. This showed us whether the system held up in real scenarios, and how each designer actually works.',
      },
      {
        type: 'paragraph',
        text: 'Turns out, every designer has their own flow, and it shapes how they use components.',
      },
      { type: 'label', text: 'Key takeaways:' },
      {
        type: 'list',
        items: [
          'Library vs. foundation file: Some designers grab components from the left library panel, others prefer opening the foundation file to copy from.',
          'Right-panel vs. left-panel designers: some customize through variant options, others dig into layers and structure, often changing colors directly instead of switching variants.',
          "Nested components tripped people up: modifiers stayed hidden until you clicked the exact layer, and some designers couldn't find them.",
          'Without clear guidelines early on, designers interpreted things differently, which led to very different looks and feels across their work.',
        ],
      },
      { type: 'label', text: 'Results:' },
      {
        type: 'list',
        items: [
          'Ready-to-use design foundation',
          'Ready-to-use basic components that cover most design needs',
          'Documentation of rules on how we design and apply components',
          'Agreed-on layout style and approach',
          'Design hand-off for developer to start building it',
        ],
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-wegodesignsystem-1.webp',
        alt: 'Design foundation variables and text styles in Figma',
        caption: 'Foundation structure for typography and color',
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-wegodesignsystem-3.webp',
        alt: 'Documentation for each component',
        caption: 'Documentation for each component, where to use it and how to use it',
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-wegodesignsystem-4.webp',
        alt: 'Example of component description',
        caption: 'Example of component description',
      },
      { type: 'heading', text: 'Structure, Maintenance & Documentation' },
      { type: 'subheading', text: 'Structure' },
      {
        type: 'paragraph',
        text: 'Our team is structured by product verticals, Flight and Hotel, each covering four touchpoints: desktop, mobile web, iOS, and Android.',
      },
      {
        type: 'paragraph',
        text: 'We initially used a shared Foundation file across all touchpoints, supported by two separate component libraries: one for desktop and one for mobile. Working files were also split by touchpoint, and any vertical-specific components were managed within individual product files rather than the main library.',
      },
      {
        type: 'paragraph',
        text: 'While this setup appeared scalable at first, it became difficult to maintain with a small team. With only two designers actively managing the system, consistency began to break down, especially between the desktop and mobile libraries.',
      },
      {
        type: 'paragraph',
        text: 'We later simplified the structure to just two core files: Foundation and Components. All components now live in a single shared library, without separating desktop and mobile.',
      },
      {
        type: 'paragraph',
        text: 'This approach is more sustainable and significantly easier to maintain. Improvements in Figma have also made it more practical to manage a unified system efficiently.',
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-wegodesignsystem-8.webp',
        alt: 'Wego Design System structure diagram',
        caption:
          'Original structure: separate desktop and mobile component libraries connected to each product touchpoint and development output.',
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-wegodesignsystem-9.webp',
        alt: 'Wego Design System structure diagram',
        caption:
          'Updated structure: one shared component library for desktop and mobile, with platform-specific documentation where needed.',
      },
      { type: 'subheading', text: 'Maintenance' },
      {
        type: 'paragraph',
        text: 'Maintenance typically includes:',
      },
      {
        type: 'list',
        items: [
          'Updating the foundation when needed',
          'Fixing existing components, including adding or removing variants and features',
          'Conducting design system audits',
        ],
      },
      {
        type: 'paragraph',
        text: "We don't run audits on a strict schedule. Early on, we conducted them every three months, but as the design system matured, this shifted to every six months.",
      },
      {
        type: 'paragraph',
        text: 'Audits review both foundations and components to keep them relevant to current needs and design trends, and to catch problems designers face when using the system.',
      },
      { type: 'subheading', text: 'Documentation' },
      {
        type: 'paragraph',
        text: 'Documentation plays a key role in ensuring the design system is usable and scalable, especially with a lean team.',
      },
      {
        type: 'paragraph',
        text: 'We focus on keeping documentation clear, practical, and easy to maintain rather than overly comprehensive. The goal is to help designers and developers quickly understand how and when to use the system.',
      },
      {
        type: 'paragraph',
        text: 'Our documentation typically includes:',
      },
      {
        type: 'list',
        items: [
          'Foundations: guidelines for core elements such as color, typography, spacing, and grid. This helps keep every touchpoint consistent.',
          'Components: usage guidelines for each component, including structure, variants, states, and behavior. We also document when to use (and not use) a component to avoid misuse.',
          'Best Practices: general guidance on layout, responsiveness, and interaction patterns across desktop and mobile.',
          'Handoff Notes: key details to support collaboration with developers, including specifications, edge cases, and expected behaviors.',
        ],
      },
      {
        type: 'paragraph',
        text: 'We prioritize documenting components and patterns that are widely used or tend to cause confusion. Instead of documenting everything upfront, we take a progressive approach, adding or refining documentation as new scenarios arise.',
      },
      {
        type: 'paragraph',
        text: 'To keep documentation relevant, updates are usually done alongside component changes or during design system audits. This ensures that documentation stays aligned with the latest implementation and team needs.',
      },
      { type: 'heading', text: 'What I Learned' },
      {
        type: 'paragraph',
        text: 'The biggest lesson from this project is that a design system is more than a component library. It needs to support the product, the team, and how people actually work.',
      },
      {
        type: 'list',
        items: [
          'Small changes are easier to adopt than one big redesign. Starting with foundations helped us modernize the product without disrupting the team.',
          'A design system must be easy to use. Testing with designers showed how different workflows affect how components are applied.',
          'Good documentation should answer real questions. Clear and practical guidance helps designers and developers make faster decisions.',
          'The system structure must be easy to maintain. With a small team, one shared component library worked better than separate desktop and mobile libraries.',
          'Design and engineering need to stay aligned. The system becomes stronger when Figma, code, and documentation match.',
          'AI is more useful when the system is clear. Structured documentation makes it easier for AI and developers to understand and use the system.',
        ],
      },
      { type: 'heading', text: 'Visual Outcomes' },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-wegodesignsystem-10.webp',
        alt: 'Wego Design System icon set',
        caption:
          'A refreshed icon set designed to align with the updated foundations and visual language of the component system.',
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-wegodesignsystem-11.webp',
        alt: 'Search form evolution across three generations',
        caption:
          'The flight search form across three generations, from the original dense layout to a cleaner, more structured form that applies the updated design system foundations.',
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-wegodesignsystem-12.webp',
        alt: 'Fare selection screen evolution',
        caption:
          'Fare selection redesigned to improve clarity and scannability. The updated layout uses consistent card patterns from the design system, making it easier to compare fare tiers at a glance.',
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-wegodesignsystem-13.webp',
        alt: 'Booking form evolution across three generations',
        caption:
          'The booking flow updated to reflect the new design system: cleaner step indicators, improved information hierarchy, and consistent form components across passenger details and payment.',
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-wegodesignsystem-14.webp',
        alt: 'SEO marketing page before and after redesign',
        caption:
          'An SEO marketing page updated as part of the design system rollout, applying refreshed typography, spacing, and component patterns to improve readability and visual consistency across content-heavy pages.',
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-wegodesignsystem-15.webp',
        alt: 'Responsive grid implementation across breakpoints',
        caption:
          'The responsive grid system applied across multiple breakpoints, showing how the design system foundations adapt consistently from desktop down to mobile across complex content layouts.',
      },
    ],
  },
  {
    title: 'Redesigning the First Step: The Journey of the Search Form',
    company: 'Wego',
    logo: '/assets/wego.svg',
    year: '2022 — Present',
    description:
      "Led the end-to-end redesign of Wego's flight search experience, improving usability and conversion.",
    intro:
      'The flight search form is the first step of every booking. This case study walks through how we reviewed the form, what we found, what we changed, and what the changes mean for the business.',
    link: '#',
    slug: 'wego-flight-search-redesign',
    content: [
      {
        type: 'paragraph',
        text: 'The search form is where travelers set their route, dates, passengers, cabin class, and payment preferences. Every search starts here, so a problem on this page affects every step after it. I own this page as the designer for the flight search and booking vertical, working with product managers and with iOS and Android engineers.',
      },
      { type: 'heading', text: 'The Problem' },
      {
        type: 'paragraph',
        text: 'By 2022, the form had collected a lot of options: trip types, passengers, cabin class, payment types, and more. Each one was added for a good reason over the years, but nobody had stepped back to reorganize the whole form. Everything had the same visual weight, so the form felt busier than it needed to be.',
      },
      {
        type: 'paragraph',
        text: 'There was a second problem: the iOS and Android versions had drifted apart. Layout, copy, styles, and icons were inconsistent between the two platforms. That made the product feel less polished, and it made design and development work slower because every change had to be handled twice.',
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-searchform-1.png',
        alt: 'Audit of the Wego flight search form in July 2022',
        caption:
          'Our starting point in July 2022: what the form contained and the main issues we logged, including the iOS and Android inconsistencies.',
      },
      {
        type: 'paragraph',
        text: 'The first instinct was to remove options. But travelers in our markets do use multi-city trips, payment types, and specific passenger mixes. Removing them would hurt real users and real revenue. So the goal became simple: keep every feature, but organize the form so the most common search is fast.',
      },
      { type: 'heading', text: 'The Research' },
      {
        type: 'paragraph',
        text: 'We did two things. First, an audit of our own form. We listed every field, option, and rule, and asked one question about each: does the traveler need this right away, or can it wait one tap? Second, a comparison of five other travel apps. We looked at how they structure the search form, how their search behaves, how they handle date selection, and how they handle passengers and cabin class.',
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-searchform-2.png',
        alt: 'Detailed review of date selection, passengers, cabin class, and payment types',
        caption:
          'Reviewing each part of the form in detail: date selection, passengers, cabin class, and payment types.',
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-searchform-3.png',
        alt: 'Comparison of competitor search forms with suggestions',
        caption:
          'Comparing other travel apps and turning the differences into concrete suggestions for our own form.',
      },
      {
        type: 'label',
        text: 'Three findings shaped the redesign:',
      },
      {
        type: 'list',
        items: [
          'Most travelers only change three things: where from, where to, and the dates. Everything else is used far less often.',
          'Passengers and cabin class matter, but they are not needed immediately. They can be grouped into one row that opens when tapped.',
          'Good defaults save more time than any layout change. Pre-filling the nearby airport, a popular destination, round-trip, one adult, and economy means many travelers can search without changing anything.',
        ],
      },
      { type: 'heading', text: 'What We Changed' },
      {
        type: 'list',
        items: [
          'Moved From, To, and dates to the top of the form and gave them the most space.',
          'Grouped passengers and cabin class into one summarized row that opens into focused pickers. Payment types kept their own field.',
          'Pre-filled sensible defaults based on the traveler’s location and market, with round-trip as the default trip type.',
          'Used a single UI across all platforms, so iOS and Android look and behave the same.',
        ],
      },
      {
        type: 'image',
        url: '/assets/portfolio/portfolio-searchform-5.png',
        alt: 'Comparison of traveler and cabin class selection across travel apps',
        caption:
          'The comparison that led to one of the changes: combining travelers and cabin class into a single selection means fewer taps.',
      },
      {
        type: 'paragraph',
        text: 'Two constraints shaped the work. The business needed payment types, trip modes, and ad placements to stay, because they contribute to revenue. So nothing was removed, only reorganized. Engineering needed one set of rules for both platforms: passenger limits, date rules, and defaults are defined once, and the same UI is built on iOS and Android.',
      },
      // TODO image: before/after of the form (old layout vs current design). Export from the app design file and add here.
      { type: 'heading', text: 'What Didn’t Work' },
      {
        type: 'paragraph',
        text: 'We also explored a compact toggle for trip type (one-way, round-trip, multi-city). Instead of shipping it straight away, we agreed to test it first. Usability testing came back with mixed results, so we moved on to an A/B test. The numbers were not good enough, so we removed the toggle and kept the existing trip selection. Losing the idea was fine. Testing it before rolling it out is exactly what kept it from becoming a real problem.',
      },
      { type: 'heading', text: 'The Rollout' },
      {
        type: 'paragraph',
        text: 'We did not replace the form in one release. Because this page is used by so many travelers every day, we changed it in stages: first a cleanup that reorganized the fields and refreshed the visuals, then a rebuild on top of the design system. Each stage shipped separately, so we could watch the data and catch problems early.',
      },
      // TODO image: the form across its generations (original, cleanup, design system). Export and add here.
      { type: 'heading', text: 'The Result' },
      {
        type: 'list',
        items: [
          'The most common search now takes very few taps, because the defaults do most of the work.',
          'No feature was removed, so nothing that drives revenue was lost.',
          'iOS and Android now share one structure: one design update instead of two, and less QA.',
          'The form is built from design system components, so later changes and experiments are cheaper to design and build.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The form is a live surface, and we keep improving it through A/B tests. Recent work includes a compact version of the form on the results page and search form experiments on the homepage.',
      },
      { type: 'heading', text: 'What We Added Later' },
      {
        type: 'paragraph',
        text: 'The new structure also made it easier to add features without crowding the form again. A good example is nearby airports. Some cities have a second airport close by. A traveler flying to Dubai, for example, can often find more options by including Sharjah in the search.',
      },
      {
        type: 'paragraph',
        text: 'We started with user interviews and an MVP proposal. The first idea was to handle this on the results page, but when we walked through it with engineering, loading results for two airports at once was too heavy on performance. So we moved the option up into the search form: when a traveler picks an airport that has a nearby alternative, a toggle appears offering to include it in the search. Travelers who don’t need it never see it.',
      },
      {
        type: 'paragraph',
        text: 'That became the pattern for extending the form: show an option only when it is relevant, and keep the default view clean.',
      },
      { type: 'heading', text: 'What I Learned' },
      {
        type: 'list',
        items: [
          'Organize by importance instead of removing features.',
          'Defaults are part of the design. The fastest interaction is the one the traveler never makes.',
          'Change busy pages in stages, not all at once.',
          'Test before committing. Usability testing and A/B tests are much cheaper than fixing a wrong change in production.',
          'Business and engineering constraints are inputs to the design, not obstacles. Knowing why a feature exists leads to better decisions than pushing for a cleaner screen.',
          'Show an option only when it is relevant. A clean default view and a complete form are not in conflict.',
        ],
      },
    ],
  },
  {
    title: 'Designing with AI: An Evolving Practice',
    company: 'Wego',
    logo: '/assets/wego.svg',
    description: 'Exploring how AI tools can support the design process and improve efficiency.',
    slug: 'ai-assisted-design-workflow',
    link: '#',
  },
  {
    title: 'Flight Checkout Flow: Designing Away the Doubt',
    company: 'Wego',
    logo: '/assets/wego.svg',
    description:
      'Contributed to improving the booking and checkout experience, reducing drop-off rates.',
    slug: 'checkout-flow-optimization',
    link: '#',
  },
  {
    title: 'Banking on Trust: Designing for Security and Clarity',
    company: 'RHB Banking Group',
    logo: '/assets/rhb-logo.svg',
    logoHeight: '20px',
    description:
      'Designed the FPX payment flow and back-office banking tools, turning complex systems and business processes into simple, usable interfaces.',
    slug: 'mobile-app-experience',
    link: '#',
  },
];

export const sideProjectsData = [
  {
    title: 'Sign-in Flow for Desktop',
    image: '/assets/side-projects/project-1.webp',
    url: 'https://www.figma.com/community/file/1567910216702885020',
    source: 'Figma Community',
  },
  {
    title: 'QA Feedback Card and Note',
    image: '/assets/side-projects/project-2.webp',
    url: 'https://www.figma.com/community/file/1434434874778116780',
    source: 'Figma Community',
  },
  {
    title: 'Smooth Project — Regular Line Icons',
    image: '/assets/side-projects/project-3.webp',
    url: 'https://ui8.net/smoothproject/products/smoothproject-icon-regular-line-style',
    source: 'UI8',
  },
];
