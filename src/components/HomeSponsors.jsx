import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHandshake, FaArrowRight, FaAward, FaCrown, FaStar, FaTags } from 'react-icons/fa';
import '../style/HomeSponsors.css';

export default function HomeSponsors() {

  return (
    <section className="hmsp-section">
      <div className="hmsp-content-wrapper">
        <div className="hmsp-header">
          <FaHandshake className="hmsp-header-main-icon" />
          <h2 className="hmsp-section-title">Official <span className="hmsp-highlight">Partners</span></h2>
          <p className="hmsp-section-subtitle">UBSA has many Community Partners offering exclusive benefits and perks to our members.</p>
        </div>
        <div> 
          <br />
        </div>

        <div className="hmsp-action-row">
          <Link to="/sponsors" className="hmsp-btn-action">
            Explore All Partners <FaArrowRight style={{marginLeft: '10px'}} />
          </Link>
        </div>
      </div>
    </section>
  );
}
