import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import axios from 'axios';
import './VolunteerForm.css';

const VolunteerForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('/api/volunteers', formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', address: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="volunteer" className="volunteer-section">
      <div className="container">
        <div className="volunteer-container">
          <div className="volunteer-info">
            <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 2rem' }}>{t('volunteer.title')}</h2>
            <p className="description">
              Our party thrives on the dedication of our volunteers. Join us today and be part of the change you want to see in the world.
            </p>
            <div className="contact-list">
              <div className="contact-item"><Phone size={20} /> <span>+91 99887 76655</span></div>
              <div className="contact-item"><Mail size={20} /> <span>join@mahanwadi.org</span></div>
              <div className="contact-item"><MapPin size={20} /> <span>Hyderabad, Telangana, India</span></div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="form-card"
          >
            {status === 'success' ? (
              <div className="success-message">
                <CheckCircle size={64} className="success-icon" />
                <h3>{t('volunteer.success')}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label><User size={18} /> {t('volunteer.name')}</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                </div>
                <div className="input-group">
                  <label><Mail size={18} /> {t('volunteer.email')}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                </div>
                <div className="grid-2">
                  <div className="input-group">
                    <label><Phone size={18} /> {t('volunteer.phone')}</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 1234567890" />
                  </div>
                  <div className="input-group">
                    <label><MapPin size={18} /> {t('volunteer.address')}</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Area, City" />
                  </div>
                </div>
                <button type="submit" disabled={status === 'loading'} className="btn btn-primary submit-btn">
                  {status === 'loading' ? 'Registering...' : <><Send size={18} /> {t('volunteer.submit')}</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerForm;
