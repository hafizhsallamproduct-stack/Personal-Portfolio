import { Routes, Route, useLocation } from 'react-router-dom';
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
import PageRuler from './components/PageRuler';
import PortfolioModal from './components/PortfolioModal';
import InboxCaseStudy from './components/InboxCaseStudy';
import { useScrollReveal } from './hooks/useScrollReveal';

function IndexPage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="page-card-mask" aria-hidden="true"></div>
      <div className="page-card">
        <PageRuler />
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
        {/* A fixed path ranks above :slug, so this one never reaches the reader. */}
        <Route path="/portfolio/rhb-inbox" element={<InboxCaseStudy isStandalone />} />
        <Route path="/portfolio/:slug" element={<PortfolioModal isStandalone />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/portfolio/rhb-inbox" element={<InboxCaseStudy />} />
          <Route path="/portfolio/:slug" element={<PortfolioModal />} />
        </Routes>
      )}
    </>
  );
}

export default App;
