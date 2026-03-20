import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Leaders from './pages/Leaders';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Volunteer from './pages/Volunteer';
import Campaigns from './pages/Campaigns';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main style={{ minHeight: '80vh', paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaders" element={<Leaders />} />
            <Route path="/news" element={<News />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/campaigns" element={<Campaigns />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
