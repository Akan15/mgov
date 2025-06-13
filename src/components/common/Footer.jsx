import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import './Footer.css';

// Import social media logos
import telegramLogo from '../../assets/images/telegram-svgrepo-com.svg';
import telegramBotLogo from '../../assets/images/telegram-svgrepo-com.svg';
import instagramLogo from '../../assets/images/instagram-1-svgrepo-com.svg';
import facebookLogo from '../../assets/images/facebook-logo.svg';
import youtubeLogo from '../../assets/images/youtube-svgrepo-com.svg';
import mailLogo from '../../assets/images/mail-svgrepo-com.svg';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const socialLinks = [
    {
      name: 'Telegram Bot',
      logo: telegramBotLogo,
      url: 'https://t.me/egovkz_bot',
      className: 'telegram'
    },
    {
      name: 'Telegram Channel',
      logo: telegramLogo,
      url: 'https://t.me/egovkz',
      className: 'telegram'
    },
    {
      name: 'Instagram',
      logo: instagramLogo,
      url: 'https://www.instagram.com/egovkz',
      className: 'instagram'
    },
    {
      name: 'Facebook',
      logo: facebookLogo,
      url: 'https://www.facebook.com/egovkz',
      className: 'facebook'
    },
    {
      name: 'YouTube',
      logo: youtubeLogo,
      url: 'https://www.youtube.com/@nitec_kz',
      className: 'youtube'
    },
    {
      name: 'nitec@nitec.kz',
      logo: mailLogo,
      className: 'email'
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{t.footer.aboutTitle}</h3>
            <p>{t.footer.aboutText}</p>
          </div>
          <div className="footer-section">
            <h3>{t.footer.socialTitle}</h3>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className={`social-link ${link.className}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={link.logo} alt={link.name} className="social-logo" />
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;