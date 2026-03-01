import React, { useState, useEffect } from 'react';
import { 
  FaHandshake, 
  FaGlobe, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaInfoCircle, 
  FaPercentage, 
  FaRibbon
} from 'react-icons/fa';
import '../style/Sponsors.css';
// Static frontend: no backend API calls

// Local Assets
import sponsorPageBg from '../assets/HomeSponsorBG.png';
import HH from '../assets/PartnerLogo/HouseHilsa.jpg';
import SpicyTime from '../assets/PartnerLogo/SpicyTime.jpg';
import TP from '../assets/PartnerLogo/TPLogo.jpg';
import CurryLeaves from '../assets/PartnerLogo/CurryLeaves.jpg';

import MShack from '../assets/PartnerLogo/MalabariShack.jpg';
import FirstChoice from '../assets/PartnerLogo/FirstChoice.jpg';

const MOCK_DATA = [
  { 
    id: 'm1', 
    name: "House of Hilsa Restaurant INC.", 
    tier: "10% OFF", 
    discount_title: "10% OFF on All Food Items", 
    description: "South Asia’s most famous fast food and street food items here in Saskatoon.", 
    image_url: HH, 
    isLocal: true, 
    location: "1024 Louise Ave, Saskatoon, SK", 
    website_url: "https://www.facebook.com/p/House-Of-Hilsa-Restaurant-Inc-61581943780444/", 
    phone: "306-430-4989" 
  },
  { 
    id: 'm2', 
    name: "Spicy Time", 
    tier: "10% OFF", 
    discount_title: "10% OFF on All Dishes", 
    description: "Saskatoon's go-to destination for rich, authentic East Indian flavors.", 
    image_url: SpicyTime, 
    isLocal: true, 
    location: "5 - 3401 8th Street East, Saskatoon, SK", 
    website_url: "https://spicytime.ca/", 
    phone: "306-665-4747" 
  },
  { 
    id: 'm3', 
    name: "Tandoori Palace", 
    tier: "10% OFF", 
    discount_title: "10% OFF on All Dishes", 
    description: "Offers a diverse menu of authentic Pakistani and Indian cuisine in Saskatoon.", 
    image_url: TP, 
    isLocal: true, 
    location: "101 3rd Ave N, Saskatoon SK", 
    website_url: "https://tandooripalacesk.ca", 
    phone: "306-979-8800" 
  },
  { 
    id: 'm4', 
    name: "The Curry Leaves", 
    tier: "10% OFF", 
    discount_title: "10% OFF on All Dishes", 
    description: "In Saskatoon, with a diverse menu featuring Bengali, Indian, Pakistani and Indo-Chinese dishes.", 
    image_url: CurryLeaves, 
    isLocal: true, 
    location: "3330 Fairlight Dr, Saskatoon SK", 
    website_url: "https://www.thecurryleaves.ca", 
    phone: "306-952-5227" 
  },{ 
    id: 'm5', 
    name: "Malabari Shack", 
    tier: "5% OFF", 
    discount_title: "5% OFF on All Dishes", 
    description: "Celebrates the rich culinary traditions of Kerala, South India here in Saskatoon.", 
    image_url: MShack, 
    isLocal: true, 
    location: "1222 Alberta Ave, Saskatoon SK", 
    website_url: "http://www.malabarishack.com", 
    phone: "306-215-8377" 
  },{ 
    id: 'm6', 
    name: "First Choice Supermarket", 
    tier: "5% OFF", 
    discount_title: "5% OFF on All Groceries", 
    description: "Saskatoon based local grocery and Halal mear shop with vibrant selection of food products.", 
    image_url: FirstChoice, 
    isLocal: true, 
    location: "1024 Louise Ave, Saskatoon SK", 
    website_url: "http://firstchoicesk.ca", 
    phone: "306-954-5555" 
  }
];

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmailBoxOpen, setIsEmailBoxOpen] = useState(false);

  useEffect(() => {
    // Static: use mock sponsors only
    setSponsors(MOCK_DATA);
    setLoading(false);
  }, []);

  const getImageUrl = (sponsor) => {
    if (sponsor.isLocal) return sponsor.image_url;
    return sponsor.image_url?.startsWith('http') ? sponsor.image_url : sponsor.image_url;
  };

  const renderSponsorTier = (tierName) => {
    const tierSponsors = sponsors.filter((s) => s.tier === tierName);
    if (tierSponsors.length === 0) return null;

    return (
      <div className={`sppg-tier-container tier-${tierName.toLowerCase()}`} key={tierName}>
        <div className="sppg-tier-header">
          <div className="sppg-tier-label">
            <FaRibbon />
            <span>Partners Offering: {tierName}</span>
          </div>
          <div className="sppg-tier-line"></div>
        </div>
        
        <div className="sppg-grid">
          {tierSponsors.map((sponsor) => (
            <div key={sponsor.id} className="sppg-detailed-card">
              {/* Left Side: Photo & Tier */}
              <div className="sppg-card-media-pane">
                <img src={getImageUrl(sponsor)} alt={sponsor.name} className="sppg-card-hero-img" />
                {/* <div className="sppg-card-tier-tag">
                  {sponsor.tier} Partner
                </div> */}
              </div>

              {/* Right Side: Information */}
              <div className="sppg-card-details-pane">
                <h2 className="sppg-card-title">{sponsor.name}</h2>
                
                <div className="sppg-card-contact-bar">
                  {sponsor.website_url && (
                    <a href={sponsor.website_url} target="_blank" rel="noreferrer" className="sppg-card-action-link">
                      <FaGlobe /> Website
                    </a>
                  )}
                  {sponsor.phone && (
                    <a href={`tel:${sponsor.phone}`} className="sppg-card-action-link">
                      <FaPhoneAlt /> {sponsor.phone}
                    </a>
                  )}
                </div>

                <div className="sppg-card-bio">
                  <p>{sponsor.description}</p>
                </div>

                <div className="sppg-card-loc-footer">
                  <FaMapMarkerAlt /> {sponsor.location || 'Saskatoon, SK'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) return (
    <div className="sppg-loading-screen">
      <div className="loader-orbit"></div>
      <p>Connecting to Partners...</p>
    </div>
  );

  return (
    <div className="sppg-page" style={{ '--sponsor-bg': `url(${sponsorPageBg})` }}>
      {/* Hero Header */}
      <header className="sppg-hero">
        <div className="sppg-title-glass">
          <h1 className="sppg-page-title">
            <span className="sppg-text-white">Our</span> 
            <span className="sppg-text-orange">Partners</span>
          </h1>
        </div>
        <p className="sppg-subtitle">
          Collaborating with local businesses to empower and support the USask Undergraduate Bangladeshi community.
        </p>
        
        <div className="snake-border-container">
          <div className="snake-line green"></div>
          <div className="snake-line red"></div>
          <button className="sppg-btn-become" onClick={() => setIsEmailBoxOpen(true)}>
            <FaHandshake /> Become a Sponsor
          </button>
        </div>
      </header>

      {/* Permanent Tiered List */}
      <section className="sppg-categorized-list">
        {['10% OFF', '5% OFF'].map((tier) => renderSponsorTier(tier))}
      </section>

      {/* Application Form */}
        {isEmailBoxOpen && (
          <div className="modal-overlay" onClick={() => setIsEmailBoxOpen(false)}>
            <div className="sponsor-email-box" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-x"
                onClick={() => setIsEmailBoxOpen(false)}
                aria-label="Close"
              >
                ×
              </button>

              <h2>Become a Sponsor</h2>
              <p>Please email us at:</p>
              <a href="mailto:ubsa.usask@gmail.com" className="sponsor-email-link">
                <strong style={{ color: 'green' }}>ubsa.usask@gmail.com</strong>
              </a>
            </div>
          </div>
        )}
    </div>
  );
}