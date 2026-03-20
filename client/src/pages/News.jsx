import React from 'react';
import NewsSection from '../components/NewsSection';
import BackToHome from '../components/BackToHome';

const News = () => {
  return (
    <div className="news-page">
      <NewsSection />
      <BackToHome />
    </div>
  );
};

export default News;
