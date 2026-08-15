import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Work from './components/Work';
import SideProjects from './components/SideProjects';
import AbstractShapes from './components/AbstractShapes';
import Footer from './components/Footer';
import PortfolioModal from './components/PortfolioModal';
import { AirplaneTilt, ShoppingBag, Bank, Money, Buildings, FigmaLogo } from './components/icons';

function IndexPage({ theme, toggleTheme }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar theme={theme} />
      <main id="main">
        <About />

        <div className="divider divider--icons">
          <div className="divider-line"></div>
          <div className="divider-icons">
            <AirplaneTilt className="icon" aria-hidden="true" />
            <ShoppingBag className="icon" aria-hidden="true" />
            <Bank className="icon" aria-hidden="true" />
            <Money className="icon" aria-hidden="true" />
            <Buildings className="icon" aria-hidden="true" />
            <FigmaLogo className="icon" aria-hidden="true" />
          </div>
          <div className="divider-line"></div>
        </div>

        <Experience />

        <div className="divider divider--spaced">
          <div className="divider-line"></div>
        </div>

        <Education />

        <div className="divider">
          <div className="divider-line"></div>
        </div>

        <Skills />

        <div className="divider">
          <div className="divider-line"></div>
        </div>

        <Work />

        <div className="divider">
          <div className="divider-line"></div>
        </div>

        <section id="contact" className="cta-section">
          <AbstractShapes />
          <h2 className="cta-heading">
            Let's build something
            <br />
            great together.
          </h2>
          <p className="cta-subtext">
            I also share a few free files on the Figma Community. Take a look: they give a sense of
            how I work and organize a working file.
          </p>
          <SideProjects />
        </section>
      </main>

      <div className="divider">
        <div className="divider-line"></div>
      </div>

      <Footer theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}

// The inline script in index.html has already resolved and applied the theme
// before first paint, so read that back rather than deciding again here. Doing
// it twice is how the two end up disagreeing on the first render.
const getInitialTheme = () => {
  const applied = document.documentElement.getAttribute('data-theme');
  return applied === 'light' ? 'light' : 'dark';
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Storage can throw in private browsing; the theme still applies for
      // this session, it just will not be remembered.
    }
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<IndexPage theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/portfolio/:slug" element={<PortfolioModal isStandalone />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/portfolio/:slug" element={<PortfolioModal />} />
        </Routes>
      )}
    </>
  );
}

export default App;
