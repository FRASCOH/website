import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import lorenzoImg from '../images/lorenzo.png';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();
  const [cookies, setCookies] = useState([]);

  const triggerCookies = (e) => {
    e.preventDefault();
    const batchId = Date.now();
    const newCookies = Array.from({ length: 40 }).map((_, i) => ({
      id: `${batchId}-${i}`,
      startX: Math.random() * 100,
      endX: (Math.random() - 0.5) * 30,
      rotate: Math.random() * 720,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 0.8,
      size: Math.random() * 30 + 15
    }));

    setCookies(prev => [...prev, ...newCookies]);

    // Cleanup only this specific batch after it finishes
    setTimeout(() => {
      setCookies(prev => prev.filter(c => !c.id.toString().startsWith(batchId.toString())));
    }, 6000);
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
    const text = t('hero.subtitle');
    const parts = text.split(/(cookie)/i);
    return parts.map((part, i) =>
      part.toLowerCase() === 'cookie' ? (
        <span
          key={i}
          className="cookie-trigger clickable"
          onClick={triggerCookies}
          style={{
            color: 'inherit',
            cursor: 'pointer',
            fontWeight: 'inherit',
            textDecoration: 'none'
          }}
        >
          {part}
        </span>
      ) : part
    );
  };

  return (
    <section className="hero" id="home">
      <AnimatePresence>
        {cookies.map(cookie => (
          <motion.div
            key={cookie.id}
            initial={{ y: -100, x: `${cookie.startX}vw`, rotate: 0, opacity: 1 }}
            animate={{
              y: '120vh',
              x: `${cookie.startX + cookie.endX}vw`,
              rotate: cookie.rotate,
              opacity: [1, 1, 0.8, 0]
            }}
            transition={{
              duration: cookie.duration,
              delay: cookie.delay,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            style={{
              position: 'fixed',
              top: 0,
              fontSize: `${cookie.size}px`,
              zIndex: 1000,
              pointerEvents: 'none',
              filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))'
            }}
          >
            🍪
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        className="hero-top-left font-mono"
        style={{ opacity: metaOpacity, filter: metaBlur }}
      >
        PMO & TECHNOLOGY SECURITY
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
              Lorenzo
              <a href="#about" className="hero-character-link">
                <motion.div
                  className="hero-character-floating hero-character-trigger clickable"
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
              </a>
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
              Cybersecurity & IT Security PMO
            </div>
            <div className="badge-pill">
              ITALY
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
