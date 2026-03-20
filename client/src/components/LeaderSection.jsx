import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './LeaderSection.css';

const LeaderSection = () => {
  const { t, i18n } = useTranslation();
  const [leaders, setLeaders] = useState([]);
  const [selectedLeader, setSelectedLeader] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/leaders')
      .then(res => setLeaders(res.data))
      .catch(err => console.error(err));
  }, []);

  const lang = i18n.language;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="leaders" className="leaders-section">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            {t('leaders.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="section-subtitle"
          >
            {t('leaders.subtitle', 'Meet the dedicated leaders driving the vision and mission of Mahanwadi Party.')}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="leader-grid"
        >
          {leaders.map((leader) => (
            <motion.div 
              key={leader.id}
              variants={itemVariants}
              className="leader-card"
              onClick={() => setSelectedLeader(leader)}
            >
              <div className="leader-image-wrapper">
                <img src={leader.image_url} alt={leader[`name_${lang}`]} />
              </div>
              <div className="leader-info">
                <h3>{leader[`name_${lang}`]}</h3>
                <span className="position">{leader[`position_${lang}`]}</span>
                <p className="leader-description">{leader[`description_${lang}`]}</p>
                <button className="view-profile-btn">
                  {t('leaders.viewMore')} <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedLeader && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setSelectedLeader(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="leader-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedLeader(null)}>
                <X size={24} />
              </button>
              <div className="modal-image-side">
                <img src={selectedLeader.image_url} alt={selectedLeader[`name_${lang}`]} />
              </div>
              <div className="modal-content-side">
                <span className="modal-role">{selectedLeader[`position_${lang}`]}</span>
                <h2>{selectedLeader[`name_${lang}`]}</h2>
                <div className="modal-bio">
                  {selectedLeader[`description_${lang}`]}
                </div>
                <button className="view-profile-btn" onClick={() => setSelectedLeader(null)}>
                  Close Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LeaderSection;
