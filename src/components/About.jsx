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

        <div className="about-grid">
          {/* Colonna Sinistra: Bio, Stats, Skill e ORA Istruzione per bilanciare */}
          <div className="about-column">
            <motion.div 
              className="bio-card glass-panel"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-mono">{t('about.profile_title')}</h3>
              <p>{t('about.text')}</p>
              
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number">4+</span>
                  <span className="stat-label">{t('about.stats.exp')}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">{t('about.stats.projects')}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">M.Sc.</span>
                  <span className="stat-label">{t('about.stats.security')}</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="skills-section glass-panel"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-mono">{t('about.skills_title')}</h3>
              <div className="skills-grid">
                <span className="skill-badge">NIS2 / ISO 27001</span>
                <span className="skill-badge">Risk Management</span>
                <span className="skill-badge">SIEM / QRadar</span>
                <span className="skill-badge">Ethical Hacking</span>
                <span className="skill-badge">Agile / Scrum</span>
                <span className="skill-badge">PHP / JavaScript / C++</span>
                <span className="skill-badge">Python / SQL</span>
                <span className="skill-badge">Cloud Security</span>
              </div>
            </motion.div>

            {/* Spostato qui per allineamento perfetto */}
            <motion.div 
              className="education-section glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-mono">{t('about.education.title')}</h3>
              <div className="education-list">
                {education.map((edu, index) => (
                  <div key={edu} className="edu-item-simple">
                    <h4>{t(`about.education.${edu}_title`)}</h4>
                    <span className="edu-uni">{t(`about.education.${edu}_uni`)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Colonna Destra: Solo Esperienza Lavorativa (che è la parte più corposa) */}
          <div className="about-column">
            <h3 className="column-title font-mono">{t('about.experience.title')}</h3>
            <div className="experience-list">
              {experiences.map((exp, index) => (
                <motion.div 
                  key={exp}
                  className="exp-item glass-panel"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="exp-header">
                    <h4>{t(`about.experience.${exp}_title`)}</h4>
                    <span className="exp-date font-mono">{t(`about.experience.${exp}_date`)}</span>
                  </div>
                  <span className="exp-company text-gradient">{t(`about.experience.${exp}_company`)}</span>
                  <p className="exp-desc">{t(`about.experience.${exp}_desc`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
