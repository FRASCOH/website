import { motion } from 'framer-motion';
import './Marquee.css';

const Marquee = () => {
  const items = [
    "CYBERSECURITY",
    "IT PROJECT MANAGEMENT",
    "NIS2",
    "GDPR",
    "ISO 27001",
    "AGILE",
    "PENETRATION TESTING"
  ];

  // We duplicate the items to create a seamless infinite loop
  const marqueeItems = [...items, ...items, ...items];

  return (
    <motion.div 
      className="marquee-container"
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
