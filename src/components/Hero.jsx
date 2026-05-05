import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import lorenzoImg from '../images/lorenzo.png';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero" id="home">
      <div className="hero-top-left font-mono">
        PMO & TECHNOLOGY SECURITY
      </div>

      <div className="hero-scroll-indicator font-mono">
        <span>SCROLL</span>
        <div className="scroll-line"></div>
      </div>

      <div className="content-container">
        <div className="hero-main">
          <motion.h1
            className="hero-display-name"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="lorenzo-wrapper">
              Lorenzo
              <motion.div
                className="hero-character-floating"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img src={lorenzoImg} alt="Stylized Character" />
              </motion.div>
            </span>
            <br />
            Frasconi
          </motion.h1>
        </div>

        <div className="hero-bottom">
          <div className="hero-bio-short">
            <p>{t('hero.subtitle')}</p>
          </div>

          <div className="hero-badges-stack">
            <div className="badge-pill available">
              <span className="dot"></span>
              AVAILABLE FOR WORK
            </div>
            <div className="badge-pill">
              MILAN, ITALY
            </div>
            <div className="badge-pill">
              M.SC. CYBERSECURITY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
