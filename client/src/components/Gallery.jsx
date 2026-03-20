import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import axios from 'axios';
import './Gallery.css';

const Gallery = () => {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/gallery')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  const lang = i18n.language;

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <h2 className="section-title">{t('gallery.title')}</h2>
        <div className="gallery-grid">
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="gallery-item"
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.thumbnail_url} alt={item[`caption_${lang}`]} />
              <div className="gallery-hover">
                <ZoomIn size={32} color="white" />
                <p>{item[`caption_${lang}`]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              className="gallery-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedItem(null)}>
                <X size={24} />
              </button>
              {selectedItem.type === 'image' ? (
                <img src={selectedItem.url} alt="Large preview" />
              ) : (
                <video src={selectedItem.url} controls autoPlay />
              )}
              <div className="gallery-modal-caption">
                <p>{selectedItem[`caption_${lang}`]}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
