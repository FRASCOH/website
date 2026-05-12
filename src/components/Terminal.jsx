import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHackerMode } from '../context/HackerContext';
import './Terminal.css';

const Terminal = () => {
  const { setIsHackerMode } = useHackerMode();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'LF_OS v2.0.4 - SECURE CONNECTION ESTABLISHED' },
    { type: 'system', content: 'Type "help" to see available commands.' },
    { type: 'system', content: '--------------------------------------------' }
  ]);
  const [typedChars, setTypedChars] = useState('');
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  // Listen for "hack"
  useEffect(() => {
    const handleKeyDown = (e) => {
      const newChars = (typedChars + e.key).slice(-4);
      setTypedChars(newChars);
      if (newChars.toLowerCase() === 'hack') {
        setIsOpen(true);
        setTypedChars('');
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typedChars]);

  // Listen for custom toggle event (for mobile/click triggers)
  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggleTerminal', handleToggle);
    return () => window.removeEventListener('toggleTerminal', handleToggle);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isOpen, history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', content: `> ${input}` }];

      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'output', content: 'Available commands: about, skills, contact, clear, exit, whoami, exploit, restore' });
          break;
        case 'about':
          newHistory.push({ type: 'output', content: 'Lorenzo Frasconi: Cybersecurity Expert & IT Project Manager. Specialized in risk analysis and secure infrastructures.' });
          break;
        case 'skills':
          newHistory.push({ type: 'output', content: 'Mastering: Risk Management (ISO 27001, NIS2, GDPR, VA/PT), Full-stack Dev (React, Node.js, PHP).' });
          break;
        case 'whoami':
          newHistory.push({ type: 'output', content: 'guest_user@frasconi_security_terminal' });
          break;
        case 'contact':
          newHistory.push({ type: 'output', content: 'Email: lorenzo.frasconi99@gmail.com | LinkedIn: /in/lorenzo-frasconi' });
          break;
        case 'login':
          newHistory.push({ type: 'output', content: 'login done' });
          break;
        case 'exploit':
          newHistory.push({ type: 'output', content: 'SYSTEM BREACHED. INITIALIZING ROOT_MODE...' });
          setIsHackerMode(true);
          setTimeout(() => setIsOpen(false), 1000);
          break;
        case 'restore':
          newHistory.push({ type: 'output', content: 'RESTORING SYSTEM INTEGRITY... SECURITY PATCHES APPLIED.' });
          setIsHackerMode(false);
          setTimeout(() => setIsOpen(false), 1000);
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'exit':
          setIsOpen(false);
          setInput('');
          return;
        case '':
          break;
        default:
          newHistory.push({ type: 'error', content: `Command not found: ${cmd}. Type "help" for a list of commands.` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="terminal-overlay"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
        >
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red" onClick={() => setIsOpen(false)}></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="terminal-title font-mono">guest@lorenzofrasconi: ~</div>
            </div>
            <div className="terminal-body font-mono">
              <div className="history">
                {history.map((line, i) => (
                  <div key={i} className={`line ${line.type}`}>
                    {line.content}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
              <div className="input-line">
                <span className="prompt"></span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
