import { useTranslation } from 'react-i18next';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'it' ? 'en' : 'it';
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="header pill-nav">
      <div className="header-container glass-pill">
        <div className="logo">
          <a href="#home" onClick={() => setIsMenuOpen(false)}>
            <span className="text-gradient font-mono">LF.</span>
          </a>
        </div>

        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</a>
          <a href="#projects" onClick={() => setIsMenuOpen(false)}>{t('nav.projects')}</a>
          <a href="mailto:lorenzo.frasconi99@gmail.com" onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</a>
        </nav>

        <div className="header-actions">
          <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle Language">
            <Globe size={18} />
            <span className="lang-text">{i18n.language.toUpperCase()}</span>
          </button>
          
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
