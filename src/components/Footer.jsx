import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CodeXml, Briefcase } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(20px)' },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <footer className="footer-giant" id="contact">
      <motion.div 
        className="content-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="footer-top-info">
          <motion.p 
            className="footer-sub-message font-mono"
            variants={itemVariants}
          >
            {t('footer.cta_sub')}
          </motion.p>
        </div>

        <motion.div className="footer-cta-container" variants={ctaVariants}>
          <a href="mailto:lorenzo.frasconi99@gmail.com" className="giant-cta-link text-gradient">
            {t('footer.cta_main')} ↗
          </a>
        </motion.div>
        
        <div className="footer-info-grid">
          <motion.div className="info-item" variants={itemVariants}>
            <span className="info-label font-mono">{t('footer.location_label')}</span>
            <span className="info-value">{t('footer.location_value')}</span>
          </motion.div>
          <motion.div className="info-item" variants={itemVariants}>
            <span className="info-label font-mono">{t('footer.social_label')}</span>
            <div className="info-socials">
              <a href="https://linkedin.com/in/lorenzo-frasconi" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/FRASCOH" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </motion.div>
        </div>

        <motion.div className="footer-bottom" variants={itemVariants}>
          <span className="font-mono">LF.</span>
          <p className="copyright">© {new Date().getFullYear()} Lorenzo Frasconi. {t('footer.rights')}</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
