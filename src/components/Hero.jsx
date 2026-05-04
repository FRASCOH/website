import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './Hero.css';

import { Link } from 'react-router-dom';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero" id="home">
      <div className="content-container">
        <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial="hidden"
          animate="visible"
        >
          {t('hero.tagline').split(' ').map((name, index) => (
            <motion.span 
              key={index} 
              className={index === 1 ? "text-outline" : "text-filled"}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: index * 0.2, ease: "easeOut" } }
              }}
            >
              {name}
            </motion.span>
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
          <Link to="/about" className="btn btn-secondary">
            {t('nav.about')}
          </Link>
          <Link to="/projects" className="btn btn-primary">
            {t('hero.cta_projects')}
          </Link>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
