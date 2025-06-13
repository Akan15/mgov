import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import { LanguageSelector } from './LanguageSelector';
import logo from '../../assets/images/1200x630wa.png';
import './Header.css';

const Header = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <nav className="nav">
            <a href="#about" className="nav-link">{t.about}</a>
            <a href="#products" className="nav-link">{t.products}</a>
            <a href="#instructions" className="nav-link">{t.instructions}</a>
            <a href="#faq" className="nav-link">{t.faq}</a>
            <a href="#contact" className="nav-link">{t.contact}</a>
          </nav>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;