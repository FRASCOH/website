import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useHackerMode } from '../context/HackerContext';
import lorenzoImg from '../images/lorenzo.png';
import lorenzoHackImg from '../images/lorenzo_hack.png';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();
  const { isHackerMode, setIsHackerMode, toLeet } = useHackerMode();

  const [isPressing, setIsPressing] = useState(false);
  const [pressProgress, setPressProgress] = useState(0);
  const pressTimer = useRef(null);
  const progressInterval = useRef(null);

  const handlePressStart = (e) => {
    setIsPressing(true);
    setPressProgress(0);
    
    const startTime = Date.now();
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / 2000) * 100, 100);
      setPressProgress(progress);
    }, 30);

    pressTimer.current = setTimeout(() => {
      setIsHackerMode(!isHackerMode);
      setIsPressing(false);
      setPressProgress(0);
      clearInterval(progressInterval.current);
    }, 2000);
  };

  const handlePressEnd = () => {
    clearTimeout(pressTimer.current);
    clearInterval(progressInterval.current);
    setIsPressing(false);
    setPressProgress(0);
  };

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

  // Define scroll range, starts immediately
  const start = 0;
  const end = 1000;

  // Top Left & Scroll Indicator (fade out earlier)
  const metaOpacity = useTransform(smoothScrollY, [0, 150], [1, 0]);
  const metaBlur = useTransform(smoothScrollY, [0, 150], ["blur(0px)", "blur(10px)"]);

  // Lorenzo: Left + Glassmorphism Dissolve
  const lorenzoX = useTransform(smoothScrollY, [start, end], [0, -600]);
  const lorenzoOpacity = useTransform(smoothScrollY, [start, end - 200], [1, 0]);
  const lorenzoBlur = useTransform(smoothScrollY, [start, end - 100], ["blur(0px)", "blur(8px)"]);

  // Frasconi: Right + Glassmorphism Dissolve
  const frasconiX = useTransform(smoothScrollY, [start, end], [0, 600]);
  const frasconiOpacity = useTransform(smoothScrollY, [start, end - 200], [1, 0]);
  const frasconiBlur = useTransform(smoothScrollY, [start, end - 100], ["blur(0px)", "blur(8px)"]);

  // Character: up, parabolic left, fade
  const charY = useTransform(smoothScrollY, [start, end + 200], [0, -1000]);
  const charX = useTransform(smoothScrollY, [start, end + 200], [0, -400]);
  const charOpacity = useTransform(smoothScrollY, [start, end], [1, 0]);

  // Bio: Zoom 2x + Glassmorphism Dissolve
  const bioScale = useTransform(smoothScrollY, [start, end - 400], [1, 2]);
  const bioOpacity = useTransform(smoothScrollY, [start, end - 200], [1, 0]);
  const bioBlur = useTransform(smoothScrollY, [start, end - 100], ["blur(0px)", "blur(6px)"]);

  // Badges: Zoom 2x + Glassmorphism Dissolve
  const badgesScale = useTransform(smoothScrollY, [start, end - 400], [1, 2]);
  const badgesOpacity = useTransform(smoothScrollY, [start, end - 200], [1, 0]);
  const badgesBlur = useTransform(smoothScrollY, [start, end - 100], ["blur(0px)", "blur(6px)"]);

  const renderSubtitle = () => {
    return t('hero.subtitle');
  };

  return (
    <section className="hero" id="home">
      <motion.div
        className="hero-top-left font-mono"
        style={{ opacity: metaOpacity, filter: metaBlur }}
      >
        IT SECURITY ENGINEER
      </motion.div>

      <motion.a
        href="#about"
        className="hero-scroll-indicator font-mono clickable"
        style={{ opacity: metaOpacity, filter: metaBlur }}
      >
        <span>SCROLL</span>
        <div className="scroll-line"></div>
      </motion.a>

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
              {toLeet("Lorenzo")}
                <motion.div
                  className={`hero-character-floating hero-character-trigger clickable ${isPressing ? 'pressing' : ''}`}
                  onMouseDown={handlePressStart}
                  onMouseUp={handlePressEnd}
                  onMouseLeave={handlePressEnd}
                  onTouchStart={handlePressStart}
                  onTouchEnd={handlePressEnd}
                  style={{
                    x: charX,
                    y: charY,
                    opacity: charOpacity
                  }}
                >
                  <AnimatePresence>
                    {isPressing && (
                      <motion.svg 
                        className="press-progress-ring" 
                        viewBox="0 0 100 100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" 
                          stroke="var(--accent-neon)" 
                          strokeWidth="5"
                          strokeDasharray="283"
                          strokeDashoffset={283 - (283 * pressProgress) / 100}
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img src={isHackerMode ? lorenzoHackImg : lorenzoImg} alt="Stylized Character" />
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
              {toLeet("Frasconi")}
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
            <p>{renderSubtitle()}</p>
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
              {toLeet("IT Security Engineer")}
            </div>
            <div className="badge-pill">
              {toLeet("ITALY")}
            </div>
            <div className="badge-pill">
              {toLeet("M.SC. CYBERSECURITY")}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
