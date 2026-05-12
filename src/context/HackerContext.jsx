import { createContext, useContext, useState, useEffect } from 'react';

const HackerContext = createContext();

export const HackerProvider = ({ children }) => {
  const [isHackerMode, setIsHackerModeState] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const performTransition = (newState) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsHackerModeState(newState);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 500);
  };

  const setIsHackerMode = (val) => {
    if (val === isHackerMode) return;
    performTransition(val);
  };

  const toggleHackerMode = () => {
    performTransition(!isHackerMode);
  };

  const toLeet = (text) => {
    if (!isHackerMode || !text) return text;
    const map = {
      'a': '4', 'A': '4',
      'e': '3', 'E': '3',
      'i': '1', 'I': '1',
      'o': '0', 'O': '0',
      's': '5', 'S': '5',
      't': '7', 'T': '7'
    };
    return text.split('').map(char => map[char] || char).join('');
  };

  useEffect(() => {
    if (isHackerMode) {
      document.body.classList.add('hacker-mode');
    } else {
      document.body.classList.remove('hacker-mode');
    }
  }, [isHackerMode]);

  return (
    <HackerContext.Provider value={{ isHackerMode, setIsHackerMode, toggleHackerMode, toLeet, isTransitioning }}>
      {children}
    </HackerContext.Provider>
  );
};

export const useHackerMode = () => useContext(HackerContext);
