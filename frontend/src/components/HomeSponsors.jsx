import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHandshake, FaArrowRight, FaAward, FaCrown, FaStar, FaTags } from 'react-icons/fa';
import '../style/HomeSponsors.css';

// --- IMPORT YOUR NEW SHAHED ASSETS ---
// import ShahedBite from '../assets/Shahed/Shahed_bite.jpg';
// import ShahedTech from '../assets/Shahed/Shahed_Tech.jpg';
// import ShahedTravels from '../assets/Shahed/Shahed_Travels.jpg';

export default function HomeSponsors() {
  // const [sponsors, setSponsors] = useState([]);

  // useEffect(() => {
  //   fetch('/api/sponsors')
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.length > 0) {
  //         setSponsors(data.slice(0, 3));
  //       } else {
  //         setSponsors(MOCK_HOME_SPONSORS);
  //       }
  //     })
  //     .catch(() => setSponsors(MOCK_HOME_SPONSORS));
  // }, []);

  // const getImageUrl = (sponsor) => {
  //   if (sponsor.isLocal) return sponsor.image_url;
  //   if (!sponsor.image_url) return 'https://placehold.co/400x200/png?text=Partner';
  //   return sponsor.image_url.startsWith('http') ? sponsor.image_url : `${sponsor.image_url}`;
  // };

  // const getTierIcon = (tier) => {
  //   switch(tier?.toLowerCase()) {
  //     case 'platinum': return <FaCrown className="hmsp-tier-icon platinum" />;
  //     case 'gold': return <FaAward className="hmsp-tier-icon gold" />;
  //     default: return <FaStar className="hmsp-tier-icon silver" />;
  //   }
  // };

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
        {/* <div className="hmsp-grid">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="hmsp-card-glass">
              <div className={`hmsp-top-right-tier ${sponsor.tier?.toLowerCase()}`}>
                {getTierIcon(sponsor.tier)}
                <span>{sponsor.tier}</span>
              </div>

              <div className="hmsp-img-box">
                <img src={getImageUrl(sponsor)} alt={sponsor.name} />
              </div>
              
              <div className="hmsp-card-body">
                <h3 className="hmsp-business-name">{sponsor.name}</h3>
                <p className="hmsp-business-desc">
                  {sponsor.description}
                </p>

                <div className="hmsp-offering-box">
                   <FaTags className="hmsp-tag-icon" />
                   <span className="hmsp-benefit-text">
                     {sponsor.discount_title}
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        <div className="hmsp-action-row">
          <Link to="/sponsors" className="hmsp-btn-action">
            Explore All Partners <FaArrowRight style={{marginLeft: '10px'}} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- UPDATED MOCK DATA WITH YOUR PHOTOS ---
// const MOCK_HOME_SPONSORS = [
//   { 
//     id: 'm1', 
//     name: "Shahed Travels", 
//     tier: "Platinum", 
//     discount_title: "Free Tours", 
//     description: "Specializing in student travel and group bookings back home to Bangladesh.",
//     image_url: ShahedTravels,
//     isLocal: true
//   },
//   { 
//     id: 'm2', 
//     name: "Shahed Tech", 
//     tier: "Gold", 
//     discount_title: "101% Free IT Support", 
//     description: "Your go-to partner for laptop repairs, hardware upgrades, and software support.",
//     image_url: ShahedTech,
//     isLocal: true
//   },
//   { 
//     id: 'm3', 
//     name: "Shahed Bite", 
//     tier: "Silver", 
//     discount_title: "99% OFF First order", 
//     description: "Authentic Bengali street food and snacks served right here in Saskatoon.",
//     image_url: ShahedBite,
//     isLocal: true
//   },
// ];