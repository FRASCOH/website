import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './About.css';

const AboutItem = ({ children }) => {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(smoothProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);
  const y = useTransform(smoothProgress, [0.05, 0.15, 0.85, 0.95], [30, 0, 0, -30]);
  const blur = useTransform(smoothProgress, [0.05, 0.15, 0.85, 0.95], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]);

  return (
    <motion.div ref={itemRef} style={{ opacity, y, filter: blur }}>
      {children}
    </motion.div>
  );
};

const About = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  const experiences = ['zefiro', 'prof', 'amabile', 'idea'];
  const education = ['master', 'bachelor', 'diploma'];

  const experienceLinks = {
    zefiro: "https://it.wikipedia.org/wiki/Zefiro_Net",
    prof: "https://personale.unipr.it/it/ugovdocenti/person/224780",
    amabile: "https://amabilejewels.it/",
    idea: "https://4idea.it/"
  };

  const educationLinks = {
    master: "https://www.unimi.it/it",
    bachelor: "https://www.unipr.it/",
    diploma: "https://www.isii.it/"
  };

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="content-container">
        <AboutItem>
          <h2 className="section-title text-gradient">
            {t('about.title')}
          </h2>
        </AboutItem>

        <div className="about-editorial">
          <div className="editorial-bio-block">
            <AboutItem>
              <h3 className="editorial-title font-mono">{t('about.profile_title')}</h3>
            </AboutItem>
            <AboutItem>
              <p className="oversized-text" dangerouslySetInnerHTML={{ __html: t('about.text') }}></p>
            </AboutItem>
            <AboutItem>
              <div className="cv-container">
                <a href="https://linkedin.com/in/lorenzo-frasconi" target="_blank" rel="noreferrer" className="view-cv-link font-mono">
                  VIEW LINKEDIN ↗
                </a>
              </div>
            </AboutItem>
          </div>

          <div className="editorial-sections">
            <div className="editorial-experience">
              <AboutItem>
                <h3 className="editorial-title font-mono">{t('about.experience.title')}</h3>
              </AboutItem>
              <div className="clean-list">
                {experiences.map((exp) => (
                  <AboutItem key={exp}>
                    <div className="clean-list-item">
                      <div className="item-meta">
                        <span className="item-date font-mono">{t(`about.experience.${exp}_date`)}</span>
                        <a
                          href={experienceLinks[exp]}
                          target="_blank"
                          rel="noreferrer"
                          className="item-company text-gradient clickable"
                        >
                          {t(`about.experience.${exp}_company`)}
                        </a>
                      </div>
                      <div className="item-content">
                        <h4 className="item-title">{t(`about.experience.${exp}_title`)}</h4>
                        <p className="item-desc">{t(`about.experience.${exp}_desc`)}</p>
                      </div>
                    </div>
                  </AboutItem>
                ))}
              </div>
            </div>

            <div className="editorial-education">
              <AboutItem>
                <h3 className="editorial-title font-mono">{t('about.education.title')}</h3>
              </AboutItem>
              <div className="education-list-rows">
                {education.map((edu) => (
                  <AboutItem key={edu}>
                    <div className="education-row">
                      <h4 className="education-degree">{t(`about.education.${edu}_title`)}</h4>
                      <div className="education-spacer"></div>
                      <a 
                        href={educationLinks[edu]} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="education-uni font-mono clickable"
                      >
                        {t(`about.education.${edu}_uni`)}
                      </a>
                    </div>
                  </AboutItem>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
