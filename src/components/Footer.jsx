import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { CodeXml, Briefcase } from 'lucide-react';
import lorenzoImg from '../images/lorenzo.png';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const footerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(smoothProgress, [0, 0.8], [0, 1]);
  const scale = useTransform(smoothProgress, [0, 1], [0.9, 1]);
  const y = useTransform(smoothProgress, [0, 1], [50, 0]);
  const blur = useTransform(smoothProgress, [0, 0.8], ["blur(20px)", "blur(0px)"]);

  const [flyers, setFlyers] = useState([]);

  const triggerFly = () => {
    const flyerId = Date.now();
    const newFlyer = {
      id: flyerId,
      yStart: Math.random() * 100 - 10, // Full viewport range
      yEnd: (Math.random() - 0.5) * 60, // Random slant up or down
      rotation: Math.random() * 50 + 30, // 30 to 80 degrees
      duration: Math.random() * 2 + 2, // 2 to 4 seconds
    };
    
    setFlyers(prev => [...prev, newFlyer]);
    
    // Cleanup after finish
    setTimeout(() => {
      setFlyers(prev => prev.filter(f => f.id !== flyerId));
    }, 5000);
  };

  return (
    <footer className="footer-giant" id="contact" ref={footerRef}>
      <AnimatePresence>
        {flyers.map(flyer => (
          <motion.img 
            key={flyer.id}
            src={lorenzoImg} 
            className="flying-avatar-easter"
            initial={{ x: '-100vw', y: `${flyer.yStart}vh`, rotate: flyer.rotation, opacity: 0 }}
            animate={{ x: '100vw', y: `${flyer.yStart + flyer.yEnd}vh`, rotate: flyer.rotation, opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: flyer.duration, 
              ease: "easeInOut",
              opacity: { duration: 0.4 }
            }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="content-container"
        style={{ opacity, scale, y, filter: blur }}
      >
        <div className="footer-top-info">
          <p className="footer-sub-message font-mono">
            {t('footer.cta_sub')}
          </p>
        </div>

        <div className="footer-cta-container">
          <a href="mailto:lorenzo.frasconi99@gmail.com" className="giant-cta-link text-gradient">
            {t('footer.cta_main')}
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
          <div 
            className="info-item session-info-item clickable" 
            onClick={() => window.dispatchEvent(new CustomEvent('toggleTerminal'))}
          >
            <span className="info-label font-mono">SESSION_METADATA</span>
            <div className="sniffer-wrapper font-mono">
              <div className="sniffer-line">IP: 192.168.1.{Math.floor(Math.random() * 254) + 1}</div>
              <div className="sniffer-line">OS: {typeof window !== 'undefined' ? (window.navigator.platform.includes('Mac') ? 'macOS' : window.navigator.platform.includes('Win') ? 'Windows' : 'Linux') : 'UNKNOWN'}</div>
              <div className="sniffer-line status-secure">SECURE: TRUE</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <a href="#home"><span className="font-mono">LF.</span></a>
          <p className="copyright">
            © {new Date().getFullYear()} <span className="clickable-name clickable" onClick={triggerFly}>Lorenzo Frasconi</span>. {t('footer.rights')}
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
