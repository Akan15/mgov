import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import { LanguageSelector } from './LanguageSelector';
import logo from '../../assets/images/egov-m-logo-1.png';
import './Header.css';

const Header = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src={logo} alt="NITEC Logo" />
          </div>
          <nav className="nav">
            <a href="#about" className="nav-link">{t.about}</a>
            <a href="#products" className="nav-link">{t.products}</a>
            <a href="#instructions" className="nav-link">{t.instructions}</a>
            <a href="#faq" className="nav-link">{t.faq}</a>
            {/* <a href="#team" className="nav-link">{t.team.title}</a> */}
            <a href="#statistics" className="nav-link">{t.statistics.title}</a>
            {/* <a href="#contact" className="nav-link">{t.contact}</a> */}
            <a href="#top-services" className="nav-link">{t.topServices.title}</a>
          </nav>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;