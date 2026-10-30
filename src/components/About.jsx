import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
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
  const certifications = ['cism', 'cs50_cyber', 'cs50_tech', 'aws_security'];
  const competitions = ['fit_seminar', 'hack_in_towers', 'cyberchallenge'];
  const teaching = ['volta', 'calam', 'marconi'];

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

  const certificationLinks = {
    cism: "https://www.isaca.org/credentialing/cism",
    cs50_cyber: "https://cs50.harvard.edu/cybersecurity/",
    cs50_tech: "https://cs50.harvard.edu/technology/",
    aws_security: "https://www.coursera.org/"
  };

  const competitionLinks = {
    fit_seminar: "https://erasmus-plus.ec.europa.eu/",
    hack_in_towers: "https://github.com/FRASCOH",
    cyberchallenge: "https://cyberchallenge.it/"
  };

  const teachingLinks = {
    volta: "https://www.isii.it/",
    calam: "https://www.calam.it/",
    marconi: "https://www.isii.it/"
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
            {/* 1. ESPERIENZA LAVORATIVA */}
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

            {/* 2. ISTRUZIONE ACCADEMICA */}
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

            {/* 3. SUB-GRID A DUE COLONNE PERFETTAMENTE ALLINEATA: CERTIFICAZIONI & COMPETIZIONI */}
            <div className="editorial-grid-two-col">
              {/* CERTIFICAZIONI */}
              <div className="editorial-cert-column">
                <AboutItem>
                  <h3 className="editorial-title font-mono">{t('about.certifications.title')}</h3>
                </AboutItem>
                <div className="dual-col-list">
                  {certifications.map((cert) => (
                    <AboutItem key={cert}>
                      <a 
                        href={certificationLinks[cert]} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="dual-col-row clickable"
                      >
                        <div className="dual-col-main">
                          <h4 className="dual-col-title">
                            {t(`about.certifications.items.${cert}.title`)}
                          </h4>
                          <span className="dual-col-sub font-mono">
                            {t(`about.certifications.items.${cert}.issuer`)}
                          </span>
                        </div>
                        <div className={`dual-col-badge font-mono ${cert === 'cism' ? 'progress-badge' : ''}`}>
                          <span>
                            {cert === 'cism'
                              ? t(`about.certifications.items.${cert}.status`)
                              : t(`about.certifications.items.${cert}.issuer`)}
                          </span>
                          <ArrowUpRight size={14} className="dual-col-arrow" />
                        </div>
                      </a>
                    </AboutItem>
                  ))}
                </div>
              </div>

              {/* COMPETIZIONI CYBER */}
              <div className="editorial-comp-column">
                <AboutItem>
                  <h3 className="editorial-title font-mono">{t('about.competitions.title')}</h3>
                </AboutItem>
                <div className="dual-col-list">
                  {competitions.map((comp) => (
                    <AboutItem key={comp}>
                      <a 
                        href={competitionLinks[comp]} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="dual-col-row clickable"
                      >
                        <div className="dual-col-main">
                          <div className="dual-col-title-wrap">
                            <span className="dual-col-year font-mono">{t(`about.competitions.items.${comp}.year`)}</span>
                            <h4 className="dual-col-title">
                              {t(`about.competitions.items.${comp}.title`)}
                            </h4>
                          </div>
                          <span className="dual-col-sub font-mono">
                            {t(`about.competitions.items.${comp}.subtitle`)}
                          </span>
                        </div>
                        <div className={`dual-col-badge font-mono ${comp === 'fit_seminar' ? 'gold-badge' : ''}`}>
                          <span>{t(`about.competitions.items.${comp}.rank`)}</span>
                          <ArrowUpRight size={14} className="dual-col-arrow" />
                        </div>
                      </a>
                    </AboutItem>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. ALTRE ESPERIENZE DI DOCENZA */}
            <div className="editorial-teaching">
              <AboutItem>
                <h3 className="editorial-title font-mono">{t('about.teaching.title')}</h3>
              </AboutItem>
              <div className="dual-col-list">
                {teaching.map((teach) => (
                  <AboutItem key={teach}>
                    <a 
                      href={teachingLinks[teach]} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="dual-col-row clickable"
                    >
                      <div className="dual-col-main">
                        <h4 className="dual-col-title">
                          {t(`about.teaching.items.${teach}.role`)}
                        </h4>
                        <span className="dual-col-sub font-mono">
                          {t(`about.teaching.items.${teach}.date`)}
                        </span>
                      </div>
                      <div className="dual-col-badge font-mono">
                        <span>{t(`about.teaching.items.${teach}.institution`)}</span>
                        <ArrowUpRight size={14} className="dual-col-arrow" />
                      </div>
                    </a>
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
