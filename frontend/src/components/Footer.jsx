import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'; // Import Icons
import '../style/Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Left Side: Logo & Copyright */}
        <div className="footer-left">
          <h2 className="footer-logo">UBSA</h2>
          <p className="footer-university">University of Saskatchewan</p>
          <p className="footer-association">Bangladeshi Students' Association</p>
        </div>

        {/* Right Side: Links & Contact */}
        <div className="footer-right">
          
          <div className="footer-links">
            <h3>Explore</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/about">About Us</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Connect</h3>
            <p>Email: <a href="mailto:ubsa.usask@gmail.com">ubsa.usask@gmail.com</a></p>
            <p className="address">Place Riel Student Centre<br/>Saskatoon, SK, Canada</p>
            
            {/* --- SOCIAL ICONS SECTION --- */}
            <div className="social-icons">
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/profile.php?id=61569283955219" 
                target="_blank" 
                rel="noopener noreferrer"
                className="icon-link fb"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/ubsa.usask/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="icon-link insta"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              {/* WhatsApp (Add link if you have a group/number) */}
              <a 
                href="https://chat.whatsapp.com/your-invite-link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="icon-link wp"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 UBSA. All rights reserved.</p>
        <p className="designer-credit">Designed with Pride in Saskatchewan</p>
      </div>
    </footer>
  );
}