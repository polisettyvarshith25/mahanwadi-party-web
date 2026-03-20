import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';
import './NewsSection.css';

const NewsSection = () => {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('/api/news')
      .then(res => setNews(res.data))
      .catch(err => console.error(err));
  }, []);

  const lang = i18n.language;

  return (
    <section id="news" className="news-section">
      <div className="container">
        <h2 className="section-title">{t('news.title')}</h2>
        <div className="news-grid">
          {news.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="news-card"
            >
              <div className="news-image">
                <img src={item.image_url} alt={item[`title_${lang}`]} />
                <span className="news-date">{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <div className="news-info">
                <h3>{item[`title_${lang}`]}</h3>
                <p>{item[`content_${lang}`]}</p>
                <a href="#" className="read-more">{t('news.readMore')} →</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
