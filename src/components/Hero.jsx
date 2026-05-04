import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero" id="home">
      <div className="content-container">
        <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t('hero.tagline').split('|').map((part, index) => (
            <span key={index} className={index === 0 ? "text-gradient" : ""}>
              {part}{index === 0 && <br/>}
            </span>
          ))}
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#projects" className="btn btn-primary">
            {t('hero.cta_projects')}
          </a>
          <a href="https://linkedin.com/in/lorenzo-frasconi" target="_blank" rel="noreferrer" className="btn btn-secondary">
            {t('hero.cta_contact')}
          </a>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
