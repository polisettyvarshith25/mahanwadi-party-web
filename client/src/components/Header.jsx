import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home'), href: '/' },
    { id: 'leaders', label: t('nav.leaders'), href: '/leaders' },
    { id: 'news', label: t('nav.news'), href: '/news' },
    { id: 'gallery', label: t('nav.gallery'), href: '/gallery' },
    { id: 'volunteer', label: t('nav.volunteer'), href: '/volunteer' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <Link to="/" className="logo">
          <h1>MAHANWADI</h1>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink 
                  to={item.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => isActive ? 'active-link' : ''}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="lang-switcher">
            <Globe size={18} />
            <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>EN</button>
            <button onClick={() => changeLanguage('hi')} className={i18n.language === 'hi' ? 'active' : ''}>HI</button>
            <button onClick={() => changeLanguage('te')} className={i18n.language === 'te' ? 'active' : ''}>TE</button>
          </div>
        </nav>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
