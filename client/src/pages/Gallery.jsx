import React from 'react';
import Gallery from '../components/Gallery';
import BackToHome from '../components/BackToHome';

const GalleryPage = () => {
  return (
    <div className="gallery-page">
      <Gallery />
      <BackToHome />
    </div>
  );
};

export default GalleryPage;
