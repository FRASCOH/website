import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useHackerMode } from '../context/HackerContext';
import './CustomCursor.css';

import { useTranslation } from 'react-i18next';

const CustomCursor = () => {
  const { t } = useTranslation();
  const { isHackerMode } = useHackerMode();
  const [hoverType, setHoverType] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (isHidden) setIsHidden(false);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    const handleHoverStart = (e) => {
      const target = e.target.closest('a, button, .clickable');
      if (target) {
        if (target.classList.contains('lang-toggle')) {
          setHoverType('translate');
        } else if (target.classList.contains('hero-character-trigger')) {
          setHoverType(isHackerMode ? 'deactivate_hacker' : 'hacker');
        } else if (target.getAttribute('target') === '_blank' || target.getAttribute('href')?.startsWith('http')) {
          setHoverType('open');
        } else {
          setHoverType('go');
        }
      }
    };
    const handleHoverEnd = () => setHoverType('');

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleHoverStart);
    window.addEventListener('mouseout', handleHoverEnd);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mouseout', handleHoverEnd);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHidden, mouseX, mouseY]);

  return (
    <motion.div
      className={`custom-cursor-wrapper ${isHidden ? 'hidden' : ''}`}
      style={{
        left: cursorX,
        top: cursorY,
      }}
    >
      <AnimatePresence>
        {hoverType && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            className="cursor-text font-mono"
          >
            {t(`cursor.${hoverType}`)}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomCursor;
