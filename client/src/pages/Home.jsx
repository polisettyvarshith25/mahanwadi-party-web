import React from 'react';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <NewsSection />
    </div>
  );
};

export default Home;
