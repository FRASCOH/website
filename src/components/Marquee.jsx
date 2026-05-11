import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './Marquee.css';

const Marquee = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
  const blur = useTransform(smoothProgress, [0, 0.3, 0.7, 1], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  const items = [
    "CYBERSECURITY",
    "IT PROJECT MANAGEMENT",
    "NIS2",
    "GDPR",
    "ISO 27001",
    "AGILE",
    "PENETRATION TESTING"
  ];

  const marqueeItems = [...items, ...items, ...items];

  return (
    <motion.div 
      ref={containerRef}
      className="marquee-container"
      style={{ opacity, scale, filter: blur }}
    >
      <div className="marquee-track">
        {marqueeItems.map((item, index) => (
          <div key={index} className="marquee-item">
            <span className="marquee-text">{item}</span>
            <span className="marquee-separator">•</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Marquee;
