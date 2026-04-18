// --- Data ---
const experienceData = [
  {
    company: "Wego Pte Ltd",
    duration: "Oct 2021 — Present",
    roles: [
      {
        title: "Senior Product Designer II",
        location: "Kuala Lumpur, Malaysia",
        date: "Oct 2024 — Present",
        details: [
          "Support product design leadership in improving design delivery and team quality standards.",
          "Optimize cross-functional workflows to improve collaboration between product, engineering, and stakeholders.",
          "Lead end-to-end design initiatives from discovery to implementation.",
          "Maintain and evolve the Wego Design System, integrating AI-driven enhancements to improve scalability and efficiency."
        ]
      },
      {
        title: "Senior Product Designer I",
        location: "Kuala Lumpur, Malaysia",
        date: "Oct 2021 — Sep 2024",
        details: [
          "Developed and scaled the Wego Design System, including comprehensive documentation and governance.",
          "Led complex end-to-end product design initiatives across multiple verticals.",
          "Partnered closely with product managers and engineers to align user needs with business goals.",
          "Improved design consistency and usability across core product experiences."
        ]
      }
    ]
  },
  {
    company: "RHB Banking Group",
    duration: "Jan 2020 — Oct 2021<br>1 year 9 months",
    roles: [
      {
        title: "UI/UX Designer",
        location: "Kuala Lumpur, Malaysia",
        date: "Jan 2020 — Oct 2021",
        details: [
          "Collaborated in agile cross-functional teams to deliver end-to-end banking web experiences.",
          "Designed user flows, wireframes, prototypes, and UI solutions for digital banking products.",
          "Contributed to improving usability and digital customer journeys."
        ]
      }
    ]
  },
  {
    company: "AirAsia Berhad",
    duration: "Mar 2017 — Dec 2019<br>2 years 10 months",
    roles: [
      {
        title: "UI/UX Designer",
        location: "Selangor, Malaysia",
        date: "Nov 2018 — Dec 2019",
        details: [
          "Contributing to the design evolution of AirAsia 3.0, helping transition the website from an airline platform into a super app ecosystem.",
          "Working on end-to-end UX process: research, ideation, prototyping, testing, and iteration."
        ]
      },
      {
        title: "Web Designer",
        location: "Selangor, Malaysia",
        date: "Mar 2017 — Oct 2018",
        details: [
          "Maintained and enhanced website visual design.",
          "Designed landing pages for campaigns and collaborated closely with marketing teams.",
          "Worked alongside the CRM team on a daily basis, supporting email marketing design and execution."
        ]
      }
    ]
  },
  {
    company: "Lelong.my — Interbase Resources",
    duration: "Nov 2015 — Feb 2017<br>1 year 4 months",
    roles: [
      {
        title: "Senior Web Designer",
        location: "Selangor, Malaysia",
        date: "Nov 2015 — Feb 2017",
        details: [
          "Managed website visual design and campaign landing pages.",
          "Developed design guidelines for major campaigns (e.g., MyCyberSale, Black Friday, Chinese New Year).",
          "Designed newsletters and social media visuals in collaboration with marketing."
        ]
      }
    ]
  },
  {
    company: "Searchfuse Marketing",
    duration: "Apr 2015 — Oct 2015<br>7 months",
    roles: [
      {
        title: "UI Designer & Graphic Designer",
        location: "Freelance Remote (Dubai)",
        date: "Apr 2015 — Oct 2015",
        summary: "Delivered UI and graphic design solutions for various client industries including education and airlines."
      }
    ]
  },
  {
    company: "Freelance Designer",
    duration: "2012 — Apr 2015",
    roles: [
      {
        title: "Freelance Designer",
        location: "Various projects",
        date: "2012 — Apr 2015",
        summary: "Worked on multiple projects in graphic and web design. Also sold digital products on Creative Market and Envato."
      }
    ]
  }
];

const workData = [
  {
    title: "Wego Flight Search Redesign",
    description: "Led the end-to-end redesign of Wego's flight search experience, improving usability and conversion.",
    link: "#",
    isLarge: true
  },
  {
    title: "Wego Design System",
    description: "Built and maintained a scalable design system ensuring consistency in components and tokens.",
    link: "#"
  },
  {
    title: "AI-Assisted Design Workflow",
    description: "Exploring how AI tools can support the design process and improve efficiency.",
    link: "#"
  },
  {
    title: "Checkout Flow Optimization",
    description: "Contributed to improving the booking and checkout experience, reducing drop-off rates.",
    link: "#"
  },
  {
    title: "Mobile App Experience",
    description: "Designed key mobile flows for travel booking across iOS and Android platforms.",
    link: "#"
  }
];

// --- Render Functions ---
function renderExperience() {
  const container = document.getElementById('experience-cards-container');
  if (!container) return;

  const html = experienceData.map(exp => `
    <div class="experience-card">
      <div class="experience-card-company">
        <div class="experience-card-company-name">${exp.company}</div>
        <div class="experience-card-company-duration">${exp.duration}</div>
      </div>
      <div class="experience-card-roles">
        ${exp.roles.map(role => `
          <div class="experience-role">
            <div class="experience-role-info">
              <div class="experience-role-title">${role.title}</div>
              <div class="experience-role-location">${role.location}</div>
              ${role.details ? `
                <ul class="experience-role-details">
                  ${role.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
              ` : `
                <p class="experience-role-summary">${role.summary}</p>
              `}
            </div>
            <div class="experience-role-date">${role.date}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
}

function renderWorks() {
  const container = document.getElementById('work-cards-container');
  if (!container) return;

  const html = workData.map(work => `
    <a href="${work.link}" class="work-card ${work.isLarge ? 'work-card--large' : ''}">
      <div class="work-card-body">
        <h3 class="work-card-title">${work.title}</h3>
        <p class="work-card-description">${work.description}</p>
        <span class="work-card-link">View project <i class="ph ph-arrow-right"></i></span>
      </div>
      <div class="work-card-placeholder"></div>
    </a>
  `).join('');

  container.innerHTML = html;
}

// --- Init & UI Logic ---
document.addEventListener('DOMContentLoaded', () => {
  renderExperience();
  renderWorks();

  // Scroll observation & Navbar logic
  const navFixed = document.getElementById('navFixed');
  const navTop = document.querySelector('.nav-top');
  const navLinks = document.querySelectorAll('.nav-fixed .nav-link');
  const anchors = document.querySelectorAll('#about, #experience, #education, #skills, #contact');

  if (navTop && navFixed) {
    const observer = new IntersectionObserver(([entry]) => {
      navFixed.classList.toggle('visible', !entry.isIntersecting);
    }, { rootMargin: '120px 0px 0px 0px', threshold: 0 });
    observer.observe(navTop);
  }

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
      const icon = isLight ? 'ph-sun' : 'ph-moon';
      document.querySelectorAll('.theme-toggle i').forEach(i => {
        i.className = 'ph ' + icon;
      });
    });
  });

  if (anchors.length > 0 && navLinks.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const current = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
          });
        }
      });
    }, { rootMargin: '-120px 0px -40% 0px' });

    anchors.forEach(el => sectionObserver.observe(el));
  }
});
