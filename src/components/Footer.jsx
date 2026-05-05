import { CodeXml, Briefcase } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-giant" id="contact">
      <div className="content-container">
        <div className="footer-cta-container">
          <a href="mailto:lorenzo.frasconi99@gmail.com" className="giant-cta-link text-gradient">
            Ciao! ↗
          </a>
        </div>
        
        <div className="footer-bottom">
          <span className="font-mono">LF.</span>
          <p className="copyright">© {new Date().getFullYear()} Lorenzo Frasconi. All rights reserved.</p>
          <div className="social-links">
            <a href="https://linkedin.com/in/lorenzo-frasconi" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Briefcase size={20} />
            </a>
            <a href="https://github.com/FRASCOH" target="_blank" rel="noreferrer" aria-label="GitHub">
              <CodeXml size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
