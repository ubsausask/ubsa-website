import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';
import '../style/Contact.css';
import ContactBG from '../assets/ContactPageBG.png';

export default function Contact() {
  return (
    <div className="contact-page" style={{ '--contact-bg': `url(${ContactBG})` }}>
      <header className="contact-hero">
        <h1 className="page-title">Get in <span className="text-highlight">Touch</span></h1>
        <p className="page-subtitle">Have questions? Reach out to us through any of the options below.</p>
      </header>

      <div className="contact-container simple-contact-container">
        <div className="contact-info-card glass-panel simple-contact-card">
          <h2 className="info-title">Contact Methods</h2>

          <div className="info-item">
            <FaEnvelope className="icon" />
            <div className="info-text">
              <h3>Email</h3>
              <a href="mailto:ubsa.usask@gmail.com">ubsa.usask@gmail.com</a>
            </div>
          </div>

          <div className="info-item">
            <FaInstagram className="icon" />
            <div className="info-text">
              <h3>Message us on Instagram</h3>
              <a href="https://instagram.com/ubsa.usask/" target="_blank" rel="noreferrer">
                @ubsa.usask
              </a>
            </div>
          </div>

          <div className="info-item">
            <FaFacebook className="icon" />
            <div className="info-text">
              <h3>Message us on Facebook</h3>
              <a href="https://www.facebook.com/people/UBSA-USASK/61569283955219/" target="_blank" rel="noreferrer">
                UBSA USASK
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}