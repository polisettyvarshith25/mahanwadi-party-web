import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t('hero.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hero-btns"
          >
            <a href="#volunteer" className="btn btn-primary">{t('hero.cta')}</a>
            <a href="#news" className="btn btn-secondary">{t('nav.news')}</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
