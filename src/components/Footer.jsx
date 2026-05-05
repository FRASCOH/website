import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CodeXml, Briefcase } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer-giant" id="contact">
      <div className="content-container">
        <div className="footer-top-info">
          <motion.p 
            className="footer-sub-message font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('footer.cta_sub')}
          </motion.p>
        </div>

        <div className="footer-cta-container">
          <a href="mailto:lorenzo.frasconi99@gmail.com" className="giant-cta-link text-gradient">
            {t('footer.cta_main')} ↗
          </a>
        </div>
        
        <div className="footer-info-grid">
          <div className="info-item">
            <span className="info-label font-mono">{t('footer.location_label')}</span>
            <span className="info-value">{t('footer.location_value')}</span>
          </div>
          <div className="info-item">
            <span className="info-label font-mono">{t('footer.social_label')}</span>
            <div className="info-socials">
              <a href="https://linkedin.com/in/lorenzo-frasconi" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/FRASCOH" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="font-mono">LF.</span>
          <p className="copyright">© {new Date().getFullYear()} Lorenzo Frasconi. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
