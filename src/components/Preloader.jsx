import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  return (
    <motion.div 
      className="preloader-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={() => onComplete && onComplete()}
    >
      <div className="loader-content">
        <motion.div 
          className="biometric-container retina-scan"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Eye size={80} className="fingerprint-icon" />
          <motion.div 
            className="scanner-line"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 0.8, repeat: 1, ease: "linear" }}
          />
        </motion.div>
        
        <motion.div 
          className="loader-status font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.2, repeat: 3 }}
          >
            {"> "} ACCESS GRANTED
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
