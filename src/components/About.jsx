import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './About.css';

const About = () => {
  const { t } = useTranslation();

  const experiences = ['zefiro', 'prof', 'amabile', 'idea'];
  const education = ['master', 'bachelor', 'diploma'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  return (
    <section className="about-section" id="about">
      <div className="content-container">
        <motion.h2 
          className="section-title text-gradient"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('about.title')}
        </motion.h2>

        <div className="about-editorial">
          <motion.div 
            className="editorial-bio-block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h3 variants={itemVariants} className="editorial-title font-mono">{t('about.profile_title')}</motion.h3>
            <motion.p variants={itemVariants} className="oversized-text" dangerouslySetInnerHTML={{ __html: t('about.text') }}></motion.p>
            <motion.div variants={itemVariants} className="cv-container">
              <a href="https://linkedin.com/in/lorenzo-frasconi" target="_blank" rel="noreferrer" className="view-cv-link font-mono">
                VIEW LINKEDIN ↗
              </a>
            </motion.div>
          </motion.div>

          <div className="editorial-sections">
            <motion.div 
              className="editorial-experience"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h3 variants={itemVariants} className="editorial-title font-mono">{t('about.experience.title')}</motion.h3>
              <div className="clean-list">
                {experiences.map((exp) => (
                  <motion.div key={exp} variants={itemVariants} className="clean-list-item">
                    <div className="item-meta">
                      <span className="item-date font-mono">{t(`about.experience.${exp}_date`)}</span>
                      <span className="item-company text-gradient">{t(`about.experience.${exp}_company`)}</span>
                    </div>
                    <div className="item-content">
                      <h4 className="item-title">{t(`about.experience.${exp}_title`)}</h4>
                      <p className="item-desc">{t(`about.experience.${exp}_desc`)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="editorial-education"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h3 variants={itemVariants} className="editorial-title font-mono">{t('about.education.title')}</motion.h3>
              <div className="education-list-rows">
                {education.map((edu) => (
                  <motion.div key={edu} variants={itemVariants} className="education-row">
                    <h4 className="education-degree">{t(`about.education.${edu}_title`)}</h4>
                    <div className="education-spacer"></div>
                    <span className="education-uni font-mono">{t(`about.education.${edu}_uni`)}</span>
                  </motion.div>
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
