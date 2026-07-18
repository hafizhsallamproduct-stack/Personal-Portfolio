import { GraduationCap } from './icons';

const Education = () => {
  return (
    <section id="education" className="section" tabIndex={0}>
      <div className="section-label-col">
        <span className="section-tag">
          <GraduationCap className="icon" aria-hidden="true" /> Education
        </span>
        <h2 className="section-title">Background</h2>
      </div>
      <div className="education-card">
        <img
          className="education-icon"
          src="/assets/university.png"
          alt="Universiti Utara Malaysia"
          width="112"
          height="136"
          loading="lazy"
        />
        <div className="education-details">
          <div className="education-name">Universiti Utara Malaysia</div>
          <div className="education-degree">
            Bachelor of Multimedia Technology, Multimedia Design (Honours)
          </div>
          <div className="education-year">2008 — 2011</div>
        </div>
      </div>
    </section>
  );
};

export default Education;
