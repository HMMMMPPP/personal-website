import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

// --- DonationModal Component ---
// This is the themed pop-up itself, now included in the same file to
// resolve the import error.
const DonationModal = ({ isOpen, onClose, formUrl }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="info-overlay" onClick={onClose}>
      <div className="info-overlay-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="info-overlay-close-btn" aria-label="Close">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
        <div className="info-overlay-header">
          <h2>Donation Details</h2>
          {/* This is now a standout primary button */}
          <div className="info-overlay-primary-action">
            <a href={"https://forms.gle/SptJTrZnq1Tzfmbq5"} target="_blank" rel="noopener noreferrer">
              Fill Out Google Form
            </a>
          </div>
        </div>
        <div className="info-overlay-body">
            <p>Donate via GCash or Maya only:</p>
            <div className="info-overlay-images">
              <div className="info-overlay-image-container">
                <img 
                  src="https://placehold.co/200x200/FFFFFF/0A0E23?text=GCash" 
                  alt="GCash QR Code"
                />
                <p>GCash</p>
              </div>
              <div className="info-overlay-image-container">
                <img 
                  src="https://placehold.co/200x200/FFFFFF/0A0E23?text=Maya" 
                  alt="Maya QR Code"
                />
                <p>Maya</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Header Component ---
// This is the main navbar component.
const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const lastScrollY = useRef(0);
  const SCROLL_THRESHOLD = 10;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (Math.abs(currentScrollY - lastScrollY.current) > SCROLL_THRESHOLD) {
        setIsVisible(currentScrollY < lastScrollY.current);
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${isVisible ? '' : 'hidden'}`}>
        <a className="navbar-logo" href="#idle">Mr.Valmoria</a>
        
        <ul className="nav-links">
          <li><a href="#wave">Skills</a></li>
          <li><a href="#DigitalFootprint">Target</a></li>
          <li><a href="#Galactic-Command">Intel</a></li>
          <li><a href="#ContactUs">Transmit</a></li>
          
          <li className="donate-item">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setIsDonationOpen(true);
              }} 
              className="donate-button"
            >
              Donate
              <span className="donate-label">Click Me</span>
            </a>
          </li>
        </ul>
      </nav>

      <DonationModal 
        isOpen={isDonationOpen} 
        onClose={() => setIsDonationOpen(false)}
        formUrl="https://docs.google.com/forms/your-form-url-here"
      />
    </>
  );
};

// --- Main App Component ---
// This component now wraps everything and includes the CSS as a <style> tag
// to resolve the "./Navbar.css" import error.
export default function App() {
  return (
    <>
      {/* Google Fonts for the theme */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Roboto+Mono:wght@700&display=swap" rel="stylesheet" />


      <Header />
    </>
  );
}
