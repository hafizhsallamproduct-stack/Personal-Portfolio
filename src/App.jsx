import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Work from './components/Work';
import SideProjects from './components/SideProjects';
import CanvasBoard from './components/CanvasBoard';
import Footer from './components/Footer';
import SideActions from './components/SideActions';
import InboxCaseStudy from './components/InboxCaseStudy';
import OverseasCaseStudy from './components/OverseasCaseStudy';
import WegoCaseStudy from './components/WegoCaseStudy';
import { useScrollReveal } from './hooks/useScrollReveal';

function IndexPage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="page-card-mask" aria-hidden="true"></div>
      <div className="page-card">
        <Navbar />
        <main id="main">
          <About />

          <div className="divider">
            <div className="divider-line"></div>
          </div>

          <Work />

          <div className="divider">
            <div className="divider-line"></div>
          </div>

          <Experience />

          <Education />

          <Skills />

          <section id="contact" className="cta-section">
            <h2 className="cta-heading">
              Let's build something
              <br />
              great together.
            </h2>
            <p className="cta-subtext">
              I also share a few free files on the Figma Community. Take a look: they give a sense
              of how I work and organize a working file.
            </p>
            <SideProjects />
          </section>
        </main>

        <Footer />
      </div>
      <SideActions />
    </>
  );
}

function App() {
  useScrollReveal();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <>
      <CanvasBoard />

      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<IndexPage />} />
        {/* Fixed paths rank above :slug, so these never reach the reader. */}
        <Route path="/portfolio/rhb-inbox" element={<InboxCaseStudy isStandalone />} />
        <Route
          path="/portfolio/rhb-overseas-transfer"
          element={<OverseasCaseStudy isStandalone />}
        />
        <Route
          path="/portfolio/wego-design-system"
          element={<WegoCaseStudy slug="wego-design-system" isStandalone />}
        />
        <Route
          path="/portfolio/wego-flight-search-redesign"
          element={<WegoCaseStudy slug="wego-flight-search-redesign" isStandalone />}
        />
        <Route
          path="/portfolio/fare-families"
          element={<WegoCaseStudy slug="fare-families" isStandalone />}
        />
        <Route
          path="/portfolio/design-hub"
          element={<WegoCaseStudy slug="design-hub" isStandalone />}
        />
        {/* Every shown case study has a popup of its own above; any other
            case study link goes back to the home page. */}
        <Route path="/portfolio/:slug" element={<Navigate to="/" replace />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/portfolio/rhb-inbox" element={<InboxCaseStudy />} />
          <Route path="/portfolio/rhb-overseas-transfer" element={<OverseasCaseStudy />} />
          <Route
            path="/portfolio/wego-design-system"
            element={<WegoCaseStudy slug="wego-design-system" />}
          />
          <Route
            path="/portfolio/wego-flight-search-redesign"
            element={<WegoCaseStudy slug="wego-flight-search-redesign" />}
          />
          <Route path="/portfolio/fare-families" element={<WegoCaseStudy slug="fare-families" />} />
          <Route path="/portfolio/design-hub" element={<WegoCaseStudy slug="design-hub" />} />
          <Route path="/portfolio/:slug" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;
