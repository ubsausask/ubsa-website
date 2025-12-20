import React, { useState, useEffect } from 'react';
import '../style/Sponsors.css';

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/sponsors')
      .then(res => res.json())
      .then(data => {
        // If backend returns empty, show mock data for design preview
        if (data.length === 0) {
            setSponsors(MOCK_SPONSORS);
        } else {
            setSponsors(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching sponsors:", err);
        // Fallback to mock data on error so page isn't empty
        setSponsors(MOCK_SPONSORS); 
        setLoading(false);
      });
  }, []);

  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/400x200?text=Sponsor+Logo';
    return url.startsWith('http') ? url : `http://localhost:5000${url}`;
  };

  if (loading) return <div className="loading-text">Loading Partners...</div>;

  return (
    <div className="sponsors-page">
      {/* --- HERO SECTION --- */}
      <header className="sponsors-hero">
        <h1 className="page-title">Our <span className="text-highlight">Partners</span></h1>
        <p className="page-subtitle">
          Collaborating with businesses to bring exclusive value to the UBSA community.
        </p>
      </header>

      {/* --- SPONSORS GRID --- */}
      <section className="sponsors-grid-container">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="glass-sponsor-card">
            
            {/* 1. Header: Logo & Tier */}
            <div className="card-header">
              <div className="sponsor-logo-wrapper">
                <img src={getImageUrl(sponsor.image_url)} alt={sponsor.name} />
              </div>
              <div className="sponsor-tier-badge">
                {sponsor.tier || "Partner"}
              </div>
            </div>

            {/* 2. Body: Name & Contribution */}
            <div className="card-body">
              <h2 className="sponsor-name">{sponsor.name}</h2>
              <p className="sponsor-contribution">
                <span className="label">Contribution:</span> {sponsor.contribution || "Supporting Student Success"}
              </p>
              <p className="sponsor-desc">
                {sponsor.description || "Proud supporter of the Bangladeshi Students' Association."}
              </p>
            </div>

            {/* 3. Footer: MEMBER EXCLUSIVE DISCOUNT */}
            <div className="card-footer-discount">
              <div className="discount-header">
                <span className="lock-icon">🔒</span> 
                For UBSA Members Only
              </div>
              <div className="discount-details">
                <h3>{sponsor.discount_title || "10% OFF"}</h3>
                <p>{sponsor.discount_desc || "Show your membership card to redeem."}</p>
              </div>
            </div>

          </div>
        ))}
      </section>

      {/* --- CTA SECTION --- */}
      <section className="sponsor-cta">
        <h2>Want to become a partner?</h2>
        <a href="mailto:ubsa.usask@gmail.com" className="btn-partner">Contact Us</a>
      </section>
    </div>
  );
}

// --- MOCK DATA (REMOVE THIS ONCE BACKEND HAS REAL DATA) ---
const MOCK_SPONSORS = [
  {
    id: 1,
    name: "Deshi Bazaar",
    tier: "Platinum",
    image_url: "", // Will use placeholder
    contribution: "Annual Event Sponsorship",
    description: "The premium destination for authentic South Asian groceries in Saskatoon.",
    discount_title: "10% OFF GROCERIES",
    discount_desc: "Get flat 10% off on bills over $50. Valid on weekends."
  },
  {
    id: 2,
    name: "Saskatoon Tech Hub",
    tier: "Gold",
    image_url: "",
    contribution: "Workshop Equipment",
    description: "Providing laptops and tech support for our coding workshops.",
    discount_title: "FREE DIAGNOSTIC",
    discount_desc: "Free laptop checkup and 15% off repairs for students."
  },
  {
    id: 3,
    name: "Spicy Bite Restaurant",
    tier: "Silver",
    image_url: "",
    contribution: "Food Catering",
    description: "Serving the spiciest and tastiest curries in town since 2015.",
    discount_title: "BUY 1 GET 1 DRINK",
    discount_desc: "Complimentary drink with any main course meal."
  }
];