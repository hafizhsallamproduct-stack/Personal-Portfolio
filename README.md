# Portfolio Codebase Architecture

This repository contains the source code for a dynamic, modern React-based portfolio. It has been recently migrated from vanilla HTML/JS to a React (Vite) application to improve maintainability and scalability, leveraging component-driven development and modern build tools.

## Directory Structure

```text
/
├── index.html       # The main entry document
├── package.json     # Project configuration and dependencies
├── vite.config.js   # Vite configuration
├── public/          # Static assets
└── src/             # React source files
    ├── main.jsx     # React entry point
    ├── App.jsx      # Root component routing and layout
    ├── data/        # Data payloads
    │   └── portfolioData.js # JSON structured data for the portfolio
    ├── components/  # React components
    │   ├── About.jsx
    │   ├── Education.jsx
    │   ├── Experience.jsx
    │   ├── Footer.jsx
    │   ├── Hero.jsx
    │   ├── Navbar.jsx
    │   ├── PortfolioModal.jsx
    │   └── SkillsAndWork.jsx
    └── styles/      # Styling configuration
        ├── index.css
        └── css/         # Component-based modular stylesheets
            ├── variables.css
            ├── base.css
            ├── components.css
            ├── sections.css
            ├── modal.css
            └── responsive.css
```

## How It Works

### 1. Data-Driven React Components (`/src/data`)
Instead of duplicating JSX structure for repetitive items (like the Experience timeline or the Bento Project Grid), **all portfolio data is stored as modular exports inside `src/data/portfolioData.js`**. 
- `experiences`: An array containing employment history.
- `projects`: An array containing portfolio projects.
- `navLinks`: An array generating dynamic navigation.

The React components dynamically iterate over these arrays and map them into the DOM. 
> [!TIP]
> **To add a new job or project, you no longer need to touch structural component files. Simply add a new object to the appropriate array in `src/data/portfolioData.js`.**

### 2. Component-Based Architecture (`/src/components`)
The UI is broken down into specific feature-based components (Hero, Navbar, Experience, SkillsAndWork, etc.). These isolated components maintain their own local logic (such as the mobile hamburger menu in `Navbar.jsx` or the expanded details in `Experience.jsx`).

### 3. Modular Styling Stack (`/src/styles/css`)
The CSS architecture avoids a single monolithic 1,000+ line file. `index.css` acts as the master entrypoint, utilizing `@import` statements to load granular styles that separate concerns clearly across variables, base layout, reusable components, and specific sections.

### 4. Navigation & Scrolling Context
The application utilizes an `IntersectionObserver` via custom React effects (within `Navbar.jsx`) to detect exactly when a section flows into the middle of the screen. This dynamically highlights the current section in the active navigation menu, improving the user scrolling experience seamlessly.
