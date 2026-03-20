import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './BackToHome.css';

const BackToHome = () => {
  return (
    <div className="back-to-home-container">
      <Link to="/" className="btn btn-secondary back-to-home-btn">
        <ArrowLeft size={18} /> Back to Home
      </Link>
    </div>
  );
};

export default BackToHome;
