# Portfolio Codebase Architecture

This repository contains the source code for a dynamic, token-efficient, vanilla HTML/CSS/JS portfolio. It has been specifically modularized to improve maintainability and decouple repetitive UI components from structural markup.

## Directory Structure

```text
/
├── index.html       # The main entry document
├── app.js           # Core logic and data payload
├── style.css        # The master stylesheet entry point
├── /assets/         # Local static media (images, icons)
│   ├── profile.jpg
│   └── university.png
└── /css/            # Component-based modular stylesheets
    ├── variables.css  # Root tokens and dark/light mode
    ├── base.css       # Resets and global body styles
    ├── components.css # Micro-components (buttons, dividers)
    ├── sections.css   # Main layout blocks
    └── responsive.css # Media queries for tablet/mobile
```

## How It Works

### 1. Data-Driven UI (`app.js`)
Instead of duplicating thick BEM (Block Element Modifier) HTML structure for repetitive items (like the Experience timeline or the Bento Project Grid), **all portfolio data is stored as JSON objects at the top of `app.js`**. 
- `experienceData`: An array containing employment history.
- `workData`: An array containing portfolio projects.

The JavaScript logic dynamically iterates over these arrays and maps them into the DOM upon page load. 
> [!TIP]
> **To add a new job or project, you no longer need to touch `index.html`. Simply add a new object to the array in `app.js`.**

### 2. Modular Styling Stack (`/css`)
The CSS architecture avoids a single monolithic 1,000+ line file. High-level requests load `style.css`, which behaves purely as a router, generating `@import` statements to load granular logic securely separated by concern.

### 3. Navigation & Scrolling Context
`app.js` features a highly performant `IntersectionObserver` that completely bypasses heavy manual `window.addEventListener('scroll')` behaviors. The observer detects exactly when a `<section>` element cascades into the middle of your screen, efficiently updating the navigation highlight tags without forcing layout-reflow on the browser's main thread.
