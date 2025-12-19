import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/Navbar.css';

export default function Navbar() {
  const location = useLocation();

  // Helper to check active link for styling
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className="ubsa-navbar">
      <div className="nav-container">
        
        {/* Logo Section */}
        <Link to="/" className="nav-logo">
          <span className="logo-main">UBSA</span>
          <span className="logo-sub">USASK</span>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-menu">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/events" className={`nav-link ${isActive('/events')}`}>
            Events
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="nav-cta">
          <a href="mailto:ubsa.usask@gmail.com" className="btn-join">
            Join Us
          </a>
        </div>

      </div>
    </header>
  );
}