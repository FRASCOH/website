import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import lorenzoImg from '../images/lorenzo.png';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll({
    layoutEffect: false
  });
  
  // Optimized spring for smooth tracking without heavy overhead
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    mass: 1,
    restDelta: 0.1
  });

  // Define scroll range with less delay, starts much earlier
  const start = 60;
  const end = 1000;

  // Top Left & Scroll Indicator (fade out earlier)
  const metaOpacity = useTransform(smoothScrollY, [0, 150], [1, 0]);
  const metaBlur = useTransform(smoothScrollY, [0, 150], ["blur(0px)", "blur(10px)"]);

  // Lorenzo: Left + Glassmorphism Dissolve
  const lorenzoX = useTransform(smoothScrollY, [start, end], [0, -600]);
  const lorenzoOpacity = useTransform(smoothScrollY, [start, end - 400], [1, 0]);
  const lorenzoBlur = useTransform(smoothScrollY, [start, end - 200], ["blur(0px)", "blur(10px)"]);

  // Frasconi: Right + Glassmorphism Dissolve
  const frasconiX = useTransform(smoothScrollY, [start, end], [0, 600]);
  const frasconiOpacity = useTransform(smoothScrollY, [start, end - 400], [1, 0]);
  const frasconiBlur = useTransform(smoothScrollY, [start, end - 200], ["blur(0px)", "blur(10px)"]);
  
  // Character: up, parabolic left, fade
  const charY = useTransform(smoothScrollY, [start, end + 200], [0, -1000]);
  const charX = useTransform(smoothScrollY, [start, end + 200], [0, -400]);
  const charOpacity = useTransform(smoothScrollY, [start, end - 200], [1, 0]);

  // Bio: Zoom 2x + Glassmorphism Dissolve
  const bioScale = useTransform(smoothScrollY, [start, end - 400], [1, 2]);
  const bioOpacity = useTransform(smoothScrollY, [start, end - 400], [1, 0]);
  const bioBlur = useTransform(smoothScrollY, [start, end - 400], ["blur(0px)", "blur(8px)"]);

  // Badges: Zoom 2x + Glassmorphism Dissolve
  const badgesScale = useTransform(smoothScrollY, [start, end - 400], [1, 2]);
  const badgesOpacity = useTransform(smoothScrollY, [start, end - 400], [1, 0]);
  const badgesBlur = useTransform(smoothScrollY, [start, end - 400], ["blur(0px)", "blur(8px)"]);

  return (
    <section className="hero" id="home">
      <motion.div 
        className="hero-top-left font-mono"
        style={{ opacity: metaOpacity, filter: metaBlur }}
      >
        PMO & TECHNOLOGY SECURITY
      </motion.div>

      <motion.div 
        className="hero-scroll-indicator font-mono"
        style={{ opacity: metaOpacity, filter: metaBlur }}
      >
        <span>SCROLL</span>
        <div className="scroll-line"></div>
      </motion.div>

      <div className="content-container">
        <div className="hero-main">
          <motion.h1
            className="hero-display-name"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              className="lorenzo-wrapper" 
              style={{ 
                x: lorenzoX, 
                opacity: lorenzoOpacity,
                filter: lorenzoBlur,
                display: 'inline-block' 
              }}
            >
              Lorenzo
              <motion.div
                className="hero-character-floating"
                style={{ 
                  x: charX, 
                  y: charY, 
                  opacity: charOpacity 
                }}
              >
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src={lorenzoImg} alt="Stylized Character" />
                </motion.div>
              </motion.div>
            </motion.span>
            <br />
            <motion.span 
              style={{ 
                x: frasconiX, 
                opacity: frasconiOpacity,
                filter: frasconiBlur,
                display: 'inline-block' 
              }}
            >
              Frasconi
            </motion.span>
          </motion.h1>
        </div>

        <div className="hero-bottom">
          <motion.div 
            className="hero-bio-short"
            style={{ 
              scale: bioScale,
              opacity: bioOpacity,
              filter: bioBlur
            }}
          >
            <p>{t('hero.subtitle')}</p>
          </motion.div>

          <motion.div 
            className="hero-badges-stack"
            style={{ 
              scale: badgesScale,
              opacity: badgesOpacity, 
              filter: badgesBlur
            }}
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
