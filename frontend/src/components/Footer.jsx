import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaUserShield } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; // Use Link for internal routing
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
              <li><Link to="/">Home</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/about">About Us</Link></li>
              {/* Added discrete admin link here as well */}
              <li><Link to="/admin/login" className="admin-discrete-link">Admin Portal</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Connect</h3>
            <p>Email: <a href="mailto:ubsa.usask@gmail.com">ubsa.usask@gmail.com</a></p>
            <p className="address">Place Riel Student Centre<br/>Saskatoon, SK, Canada</p>
            
            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=61569283955219" target="_blank" rel="noopener noreferrer" className="icon-link fb" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/ubsa.usask/" target="_blank" rel="noopener noreferrer" className="icon-link insta" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://chat.whatsapp.com/your-invite-link" target="_blank" rel="noopener noreferrer" className="icon-link wp" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <p>© 2025 UBSA. All rights reserved.</p>
          <p className="designer-credit">Designed by SHAHED</p>
        </div>
        
        {/* --- ADMIN LOGIN BUTTON --- */}
        <div className="footer-bottom-right">
          <Link to="/admin/login" className="admin-login-btn">
            <FaUserShield /> Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}