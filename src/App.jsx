import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Footer from './components/Footer';
import Scene3D from './components/Scene3D';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/Projects';
import Terminal from './components/Terminal';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import MatrixRain from './components/MatrixRain';
import { HackerProvider, useHackerMode } from './context/HackerContext';
import './components/Scene3D.css';
import './App.css';

function AppContent() {
  const { isHackerMode, isTransitioning } = useHackerMode();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay for the biometric scan experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="app-wrapper"
      initial={{ opacity: 1 }}
      animate={{ opacity: isTransitioning ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <ScrollProgress />
      {isHackerMode && <MatrixRain />}
      <div className="noise-overlay"></div>
      <CustomCursor />
      <Scene3D />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
      </main>
      <Footer />
      <Terminal />
    </motion.div>
  );
}

function App() {
  return (
    <HackerProvider>
      <AppContent />
    </HackerProvider>
  );
}

export default App;
