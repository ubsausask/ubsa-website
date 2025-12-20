import React, { useState, useEffect } from 'react';
import SponsorFormModal from '../components/SponsorFormModal'; // We will create this
import '../style/Sponsors.css';
import '../style/Events.css'; 

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // --- 1. FETCH DATA ---
  useEffect(() => {
    fetch('http://localhost:5000/api/sponsors')
      .then(res => res.json())
      .then(data => {
        setSponsors(data.length > 0 ? data : MOCK_SPONSORS);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching sponsors:", err);
        setSponsors(MOCK_SPONSORS);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/600x400?text=Sponsor';
    return url.startsWith('http') ? url : `http://localhost:5000${url}`;
  };

  // --- 2. DETAILS MODAL ---
  const SponsorModal = ({ sponsor, onClose }) => {
    if (!sponsor) return null;
    return (
      <div className="event-modal-overlay" onClick={onClose}>
        <div className="event-modal-glass" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
          <div className="modal-content-wrapper">
            <div className="modal-details">
              <span className="sponsor-tier-badge-modal">{sponsor.tier || "Partner"}</span>
              <h2 className="modal-title">{sponsor.name}</h2>
              <div className="modal-meta-row">
                <span className="meta-tag">🤝 Contribution: {sponsor.contribution}</span>
              </div>
              <div className="sponsor-modal-discount">
                <h3>🔒 Member Exclusive</h3>
                <p className="discount-title">{sponsor.discount_title || "Special Deal"}</p>
                <p className="discount-desc">{sponsor.discount_desc || "Show your UBSA membership card to redeem."}</p>
              </div>
              <div className="modal-description-scroll">
                <p>{sponsor.description}</p>
                {sponsor.website && (
                   <a href={sponsor.website} target="_blank" rel="noreferrer" className="modal-website-link">
                     Visit Website →
                   </a>
                )}
              </div>
            </div>
            <div className="modal-image-col">
              <img src={getImageUrl(sponsor.image_url)} alt={sponsor.name} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="loading-text">Loading Partners...</div>;

  return (
    <div className="sponsors-page">
      {/* --- HEADER --- */}
      <header className="sponsors-hero">
        <h1 className="page-title">Our <span className="text-highlight">Partners</span></h1>
        <p className="page-subtitle">Collaborating with businesses to bring exclusive value to the UBSA community.</p>
        
        {/* NEW BECOME A SPONSOR BUTTON */}
        <button className="btn-become-sponsor" onClick={() => setIsFormOpen(true)}>
          Become a Sponsor
        </button>
      </header>

      {/* --- GRID SECTION --- */}
      <section className="sponsors-grid-container">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="glass-sponsor-card clickable" onClick={() => setSelectedSponsor(sponsor)}>
            <div className="card-header">
              <div className="sponsor-logo-wrapper">
                <img src={getImageUrl(sponsor.image_url)} alt={sponsor.name} />
              </div>
              <div className="sponsor-tier-badge">{sponsor.tier || "Partner"}</div>
            </div>
            <div className="card-body">
              <h2 className="sponsor-name">{sponsor.name}</h2>
              <p className="sponsor-contribution">
                <span className="label">Contribution:</span> {sponsor.contribution}
              </p>
            </div>
            <div className="card-footer-discount">
              <div className="discount-header"><span className="lock-icon">🔒</span> For Members</div>
              <div className="discount-details"><h3>{sponsor.discount_title || "View Details"}</h3></div>
            </div>
          </div>
        ))}
      </section>

      {/* --- RENDER MODALS --- */}
      {selectedSponsor && <SponsorModal sponsor={selectedSponsor} onClose={() => setSelectedSponsor(null)} />}
      {isFormOpen && <SponsorFormModal onClose={() => setIsFormOpen(false)} />}
    </div>
  );
}

const MOCK_SPONSORS = [
  { id: 1, name: "Deshi Bazaar", tier: "Platinum", contribution: "Annual Event Sponsorship", description: "The premium destination for authentic groceries.", discount_title: "10% OFF GROCERIES", website: "https://google.com" },
  { id: 2, name: "Saskatoon Tech Hub", tier: "Gold", contribution: "Workshop Equipment", description: "Tech support for coding workshops.", discount_title: "FREE DIAGNOSTIC" },
  { id: 3, name: "Spicy Bite", tier: "Silver", contribution: "Food Catering", description: "Authentic curries in town.", discount_title: "BUY 1 GET 1 DRINK" }
];