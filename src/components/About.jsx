import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './About.css';

const About = () => {
  const { t } = useTranslation();

  const experiences = ['zefiro', 'prof', 'amabile', 'idea'];
  const education = ['master', 'bachelor', 'diploma'];

  return (
    <section className="about-section" id="about">
      <div className="content-container">
        <motion.h2 
          className="section-title text-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('about.title')}
        </motion.h2>

        <div className="about-editorial">
          <motion.div 
            className="editorial-bio-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="editorial-title font-mono">{t('about.profile_title')}</h3>
            <p className="oversized-text" dangerouslySetInnerHTML={{ __html: t('about.text') }}></p>
            <div className="cv-container">
              <a href="https://linkedin.com/in/lorenzo-frasconi" target="_blank" rel="noreferrer" className="view-cv-link font-mono">
                VIEW LINKEDIN ↗
              </a>
            </div>
          </motion.div>

          <div className="editorial-sections">
            <motion.div 
              className="editorial-experience"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="editorial-title font-mono">{t('about.experience.title')}</h3>
              <div className="clean-list">
                {experiences.map((exp) => (
                  <div key={exp} className="clean-list-item">
                    <div className="item-meta">
                      <span className="item-date font-mono">{t(`about.experience.${exp}_date`)}</span>
                      <span className="item-company text-gradient">{t(`about.experience.${exp}_company`)}</span>
                    </div>
                    <div className="item-content">
                      <h4 className="item-title">{t(`about.experience.${exp}_title`)}</h4>
                      <p className="item-desc">{t(`about.experience.${exp}_desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="editorial-education"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="editorial-title font-mono">{t('about.education.title')}</h3>
              <div className="education-list-rows">
                {education.map((edu) => (
                  <div key={edu} className="education-row">
                    <h4 className="education-degree">{t(`about.education.${edu}_title`)}</h4>
                    <div className="education-spacer"></div>
                    <span className="education-uni font-mono">{t(`about.education.${edu}_uni`)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
