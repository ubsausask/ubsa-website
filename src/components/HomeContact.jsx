import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaEnvelopeOpenText, FaPaperPlane } from 'react-icons/fa';
import '../style/HomeContact.css';
import TigerBG from '../assets/ContactPageBG.png'; 

export default function HomeContact() {

  return (
    <section className="hcon-section" style={{ '--tiger-bg': `url(${TigerBG})` }}>
      {/* Shared Parallax Background Layers */}
      <div className="hcon-fixed-bg"></div>
      <div className="hcon-overlay-tint"></div>

      <div className="hcon-container">
        <div className="hcon-glass-card">
          
          {/* Left Half: Details */}
          <div className="hcon-details-side">
            <Link to="/contact" className="hcon-title-link">
              <h2 className="hcon-title">
                Get in <span className="hcon-highlight">Touch</span>
              </h2>
            </Link>
            <p className="hcon-subtitle">Drop us a message and we'll get back to you shortly.</p>
            
            <div className="hcon-info-stack">
              
              <div className="hcon-info-item">
                <div className="hcon-icon-box"><FaEnvelopeOpenText /></div>
                <div className="hcon-info-text">
                   <strong>Email</strong>
                   <p>ubsa.usask@gmail.com</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}