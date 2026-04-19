import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import SkillsAndWork from './components/SkillsAndWork';
import Footer from './components/Footer';
import PortfolioModal from './components/PortfolioModal';

function IndexPage({ theme, toggleTheme }) {
  return (
    <>
      <Navbar theme={theme} />
      <Hero />
      
      <div className="divider divider--icons">
        <div className="divider-line"></div>
        <div className="divider-icons">
          <i className="ph ph-airplane-tilt"></i>
          <i className="ph ph-shopping-bag"></i>
          <i className="ph ph-bank"></i>
          <i className="ph ph-money"></i>
          <i className="ph ph-buildings"></i>
          <i className="ph ph-figma-logo"></i>
        </div>
        <div className="divider-line"></div>
      </div>

      <About />
      
      <div className="divider"><div className="divider-line"></div></div>
      
      <Experience />
      
      <div className="divider divider--spaced"><div className="divider-line"></div></div>
      
      <Education />
      
      <div className="divider"><div className="divider-line"></div></div>
      
      <SkillsAndWork />

      <div className="divider"><div className="divider-line"></div></div>

      <section id="contact" className="cta-section">
        <h2 className="cta-heading">Let's build something<br/>great together.</h2>
        <p className="cta-subtext">Have a project in mind? I'd love to hear about it.</p>
      </section>

      <div className="divider"><div className="divider-line"></div></div>
      
      <Footer theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    // Initial state from localStorage or default to light
    return localStorage.getItem('theme') || 'light';
  });
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

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
