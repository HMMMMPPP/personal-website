import { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const SCROLL_THRESHOLD = 10; // Minimum scroll difference to trigger hide/show

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navbar at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Hide when scrolling down, show when scrolling up
      if (Math.abs(currentScrollY - lastScrollY.current) > SCROLL_THRESHOLD) {
        setIsVisible(currentScrollY < lastScrollY.current);
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isVisible ? '' : 'hidden'}`}>
      <div className="logo">VIRTUAL  Porfolio</div>
      
      <ul className="nav-links">
        <li><a href="#idle">About</a></li>
        <li><a href="#wave">Skills</a></li>
        <li><a href="#dance">Study</a></li>
        <li><a href="#clap">Work</a></li>
      </ul>


    </nav>
  );
};

export default Header;