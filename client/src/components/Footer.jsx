import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react';
import axios from 'axios';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await axios.post('/api/subscribe', { email });
      setStatus('success');
      setMessage(response.data.message || 'Successfully subscribed!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.error || 'Subscription failed. Please try again.');
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h2>MAHANWADI</h2>
          <p>Building a better future for every citizen through transparency, development, and unity.</p>
          <div className="social-links">
            <a href="https://www.facebook.com/mahanvadiparty.hariomsinghkushwah/" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
            <a href="https://x.com/mp269india?s=11" target="_blank" rel="noopener noreferrer"><Twitter size={20} /></a>
            <a href="https://www.instagram.com/mahanwadi_party?igsh=aTZ6bmR1eTlvczh5" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
            <a href="https://youtube.com/@bbnews269?si=lqUw4YvRe6y81NOz" target="_blank" rel="noopener noreferrer"><Youtube size={20} /></a>
          </div>
        </div>
        
        <div className="footer-links">
          <h3>{t('nav.home')}</h3>
          <ul>
            <li><Link to="/leaders">{t('nav.leaders')}</Link></li>
            <li><Link to="/news">{t('nav.news')}</Link></li>
            <li><Link to="/gallery">{t('nav.gallery')}</Link></li>
            <li><Link to="/volunteer">{t('nav.volunteer')}</Link></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest party news and events.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? '...' : 'Subscribe'}
            </button>
          </form>
          {message && (
            <div style={{ marginTop: '10px', fontSize: '14px', color: status === 'error' ? '#ff6b6b' : '#51cf66' }}>
              {message}
            </div>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Mahanwadi Party. All Rights Reserved.</p>
          <button className="back-to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            Back to Top <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
