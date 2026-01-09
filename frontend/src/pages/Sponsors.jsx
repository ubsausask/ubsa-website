import React, { useState, useEffect } from 'react';
import { 
  FaHandshake, 
  FaGlobe, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaInfoCircle, 
  FaPercentage, 
  FaRibbon, 
  FaTimes,
  FaArrowRight
} from 'react-icons/fa';
import SponsorFormModal from '../components/SponsorFormModal';
import '../style/Sponsors.css';

// Local Assets
import sponsorPageBg from '../assets/HomeSponsorBG.png';
import ShahedBite from '../assets/Shahed/Shahed_bite.jpg';
import ShahedTech from '../assets/Shahed/Shahed_Tech.jpg';
import ShahedTravels from '../assets/Shahed/Shahed_Travels.jpg';

const MOCK_DATA = [
  { 
    id: 'm1', 
    name: "Shahed Travels", 
    tier: "Platinum", 
    discount_title: "$50 OFF International Flights", 
    description: "Your local travel partner specializing in student bookings and group travel back to Bangladesh. We ensure the best rates for the UBSA community.", 
    image_url: ShahedTravels, 
    isLocal: true, 
    location: "Saskatoon, SK", 
    website_url: "https://example.com", 
    phone: "306-000-0000" 
  },
  { 
    id: 'm2', 
    name: "Shahed Tech", 
    tier: "Gold", 
    discount_title: "15% OFF All Repair Services", 
    description: "Expert tech support, hardware repairs, and software troubleshooting for the USask student community. Fast and reliable service.", 
    image_url: ShahedTech, 
    isLocal: true, 
    location: "Saskatoon, SK", 
    website_url: "https://example.com", 
    phone: "306-000-0000" 
  },
  { 
    id: 'm3', 
    name: "Shahed Bite", 
    tier: "Silver", 
    discount_title: "Free Soft Drink with any Meal", 
    description: "Authentic Bengali street food and traditional snacks. Experience the true flavors of home right here in Saskatoon.", 
    image_url: ShahedBite, 
    isLocal: true, 
    location: "Saskatoon, SK", 
    website_url: "https://example.com", 
    phone: "306-000-0000" 
  },
];

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/sponsors')
      .then((res) => res.json())
      .then((data) => {
        setSponsors(data && data.length > 0 ? data : MOCK_DATA);
        setLoading(false);
      })
      .catch(() => {
        setSponsors(MOCK_DATA);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (sponsor) => {
    if (sponsor.isLocal) return sponsor.image_url;
    return sponsor.image_url?.startsWith('http') 
      ? sponsor.image_url 
      : `http://localhost:5000${sponsor.image_url}`;
  };

  const renderSponsorTier = (tierName) => {
    const tierSponsors = sponsors.filter((s) => s.tier === tierName);
    if (tierSponsors.length === 0) return null;

    return (
      <div className={`sppg-tier-container tier-${tierName.toLowerCase()}`} key={tierName}>
        <div className="sppg-tier-header">
          <div className="sppg-tier-label">
            <FaRibbon />
            <span>{tierName} Partners</span>
          </div>
          <div className="sppg-tier-line"></div>
        </div>
        
        <div className="sppg-grid">
          {tierSponsors.map((sponsor) => (
            <div 
              key={sponsor.id} 
              className="sppg-glass-card" 
              onClick={() => setSelectedSponsor(sponsor)}
            >
              <div className="sppg-logo-wrapper">
                <img src={getImageUrl(sponsor)} alt={sponsor.name} />
                <div className="sppg-card-overlay-hint">
                  <span>View Details <FaArrowRight /></span>
                </div>
              </div>

              <div className="sppg-card-body">
                <h3 className="sppg-sponsor-name">{sponsor.name}</h3>
                <p className="sppg-sponsor-preview">
                  {sponsor.description.substring(0, 90)}...
                </p>
                <div className="sppg-badge-container">
                  {sponsor.discount_title ? (
                    <span className="sppg-badge sppg-badge-perk">
                      <FaPercentage /> {sponsor.discount_title}
                    </span>
                  ) : (
                    <span className="sppg-badge sppg-badge-supporter">
                      <FaHandshake /> Community Partner
                    </span>
                  )}
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
          Collaborating with local businesses to empower and support the USask Bengali community.
        </p>
        
        {/* Snake Border Wrapper */}
        <div className="snake-border-container">
          <div className="snake-line green"></div>
          <div className="snake-line red"></div>
          <button className="sppg-btn-become" onClick={() => setIsFormOpen(true)}>
            <FaHandshake /> Become a Sponsor
          </button>
        </div>
      </header>

      {/* Tiered Content */}
      <section className="sppg-categorized-list">
        {['Platinum', 'Gold', 'Silver', 'Bronze'].map((tier) => renderSponsorTier(tier))}
      </section>

      {/* Detail Modal */}
      {selectedSponsor && (
        <SponsorModal 
          sponsor={selectedSponsor} 
          onClose={() => setSelectedSponsor(null)} 
          getImageUrl={getImageUrl} 
        />
      )}

      {/* Application Form */}
      {isFormOpen && <SponsorFormModal onClose={() => setIsFormOpen(false)} />}
    </div>
  );
}

const SponsorModal = ({ sponsor, onClose, getImageUrl }) => (
  <div className="sppg-modal-overlay" onClick={onClose}>
    <div className="sppg-modal-glass-card" onClick={(e) => e.stopPropagation()}>
      <button className="sppg-modal-close-btn" onClick={onClose} aria-label="Close">
        <FaTimes />
      </button>
      
      <div className="sppg-modal-layout">
        <div className="sppg-modal-media-pane">
          <img src={getImageUrl(sponsor)} alt={sponsor.name} className="sppg-modal-hero-img" />
          <div className={`sppg-modal-tier-tag tag-${sponsor.tier.toLowerCase()}`}>
            {sponsor.tier} Partner
          </div>
        </div>

        <div className="sppg-modal-details-pane">
          <h2 className="sppg-modal-title">{sponsor.name}</h2>
          
          <div className="sppg-modal-contact-bar">
            {sponsor.website_url && (
              <a href={sponsor.website_url} target="_blank" rel="noreferrer" className="sppg-modal-action-link">
                <FaGlobe /> Website
              </a>
            )}
            {sponsor.phone && (
              <a href={`tel:${sponsor.phone}`} className="sppg-modal-action-link">
                <FaPhoneAlt /> Contact
              </a>
            )}
          </div>

          <div className="sppg-modal-content-scroll">
             {sponsor.discount_title && (
               <div className="sppg-modal-offer-card">
                  <FaPercentage className="offer-icon" />
                  <div>
                    <span className="offer-label">Exclusive Member Perk</span>
                    <p className="offer-val">{sponsor.discount_title}</p>
                  </div>
               </div>
             )}

             <div className="sppg-modal-bio">
                <h3><FaInfoCircle /> About the Partner</h3>
                <p>{sponsor.description}</p>
                <div className="sppg-modal-loc-footer">
                   <FaMapMarkerAlt /> {sponsor.location || 'Saskatoon, SK'}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);