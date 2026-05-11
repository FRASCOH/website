import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import './ScrollProgress.css';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const sections = [
    { id: 'home', label: '01' },
    { id: 'about', label: '02' },
    { id: 'projects', label: '03' },
    { id: 'contact', label: '04' }
  ];

  return (
    <motion.div className="scroll-progress-container" style={{ opacity }}>
      <div className="scroll-track">
        <motion.div 
          className="scroll-fill" 
          style={{ scaleY }}
        />
      </div>
      <div className="section-markers">
        {sections.map((section, index) => (
          <div key={section.id} className="marker-group">
            <div className="marker-dot"></div>
            <span className="marker-label font-mono">{section.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ScrollProgress;
