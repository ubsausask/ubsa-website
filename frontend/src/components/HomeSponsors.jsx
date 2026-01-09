import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHandshake, FaArrowRight, FaAward, FaCrown, FaStar, FaTags } from 'react-icons/fa';
import '../style/HomeSponsors.css';

export default function HomeSponsors() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/sponsors')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setSponsors(data.slice(0, 3));
        } else {
          setSponsors(MOCK_HOME_SPONSORS);
        }
      })
      .catch(() => setSponsors(MOCK_HOME_SPONSORS));
  }, []);

  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/400x200/png?text=Partner';
    return url.startsWith('http') ? url : `http://localhost:5000${url}`;
  };

  const getTierIcon = (tier) => {
    switch(tier?.toLowerCase()) {
      case 'platinum': return <FaCrown className="tier-icon platinum" />;
      case 'gold': return <FaAward className="tier-icon gold" />;
      default: return <FaStar className="tier-icon silver" />;
    }
  };

  return (
    <section className="home-sponsors-section">
      <div className="content-wrapper">
        <div className="home-sponsors-header">
          <FaHandshake className="header-main-icon" />
          <h2 className="section-title-home">Official <span className="highlight">Partners</span></h2>
          <p className="section-subtitle">Supporting the Bengali community at USask.</p>
        </div>

        <div className="home-sponsors-grid">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="sponsor-preview-card crystal-glass">
              {/* Top Right Tier Badge */}
              <div className={`top-right-tier ${sponsor.tier?.toLowerCase()}`}>
                {getTierIcon(sponsor.tier)}
                <span>{sponsor.tier}</span>
              </div>

              {/* 1. Picture */}
              <div className="sp-img-box">
                <img src={getImageUrl(sponsor.image_url)} alt={sponsor.name} />
              </div>
              
              <div className="sp-content">
                {/* 2. Business Name */}
                <h3 className="business-name">{sponsor.name}</h3>

                {/* 3. Description */}
                <p className="business-desc">
                  {sponsor.description || "A proud partner supporting UBSA events and student initiatives throughout the academic year."}
                </p>

                {/* 4. Offerings/Discount */}
                <div className="offering-box">
                   <FaTags className="tag-icon" />
                   <span className="benefit-text">
                     {sponsor.discount_title ? sponsor.discount_title : "Member Exclusive Perk"}
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="action-row">
          <Link to="/sponsors" className="btn-crystal-action">
            Explore All Partners <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

const MOCK_HOME_SPONSORS = [
  { id: 1, name: "Shahed Bazaar", tier: "Platinum", discount_title: "10% OFF Groceries", description: "Your local destination for authentic spices and traditional Bengali groceries." },
  { id: 2, name: "Shahed Tech", tier: "Gold", discount_title: "Free Diagnostics", description: "Providing expert tech support and hardware repairs for USask students." },
  { id: 3, name: "Shahed Bite", tier: "Silver", discount_title: "BOGO Drinks", description: "Experience the true flavors of street food and traditional snacks." },
];