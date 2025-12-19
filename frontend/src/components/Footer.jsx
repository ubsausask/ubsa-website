import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ubsa-footer">
      <div className="footer-container">
        
        {/* Column 1: Brand & Mission */}
        <div className="footer-col brand-col">
          <h2 className="footer-logo">UBSA</h2>
          <p className="footer-org-name">University of Saskatchewan<br/>Bangladeshi Students' Association</p>
          <p className="footer-mission">
            Fostering community, celebrating culture, and supporting students in Saskatoon since 2013.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col links-col">
          <h3 className="footer-heading">Explore</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/contest">Design Contest</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact & Connect */}
        <div className="footer-col contact-col">
          <h3 className="footer-heading">Connect</h3>
          <p className="contact-item">
            <strong>Email:</strong><br/>
            <a href="mailto:ubsa.usask@gmail.com">ubsa.usask@gmail.com</a>
          </p>
          <p className="contact-item">
            <strong>Address:</strong><br/>
            Place Riel Student Centre<br/>
            Saskatoon, SK, Canada
          </p>
          
          <div className="social-icons">
            {/* Replace # with actual links */}
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">FB</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">IN</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} UBSA. All rights reserved.</p>
        <div className="legal-links">
          <span>Designed with Pride in Saskatchewan</span>
        </div>
      </div>
    </footer>
  );
}