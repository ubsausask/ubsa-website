import React from 'react';
import '../style/About.css';

// Importing Images
import PresidentImg from '../assets/Team/Rubana_Sayeda.png';
import VPImg from '../assets/Team/Nusrat_Ahona.png';
import FinanceImg from '../assets/Team/Mohammed_Khan.png';
import EventDirImg from '../assets/Team/Rodoshy_Prithibi.png';
import EventCoordImg from '../assets/Team/Ishrat_Maya.png';
import OutreachImg from '../assets/Team/Rab_Ahmed_Rwna.png';
import SocialImg from '../assets/Team/Abir_Khan.png';

const teamMembers = [
  {
    name: "Nusrat Ahona",
    role: "Vice President",
    image: VPImg
  },
  {
    name: "Mohammed Khan",
    role: "Finance Director",
    image: FinanceImg
  },
  {
    name: "Rodoshy Prithibi",
    role: "Event Director",
    image: EventDirImg
  },
  {
    name: "Ishrat_Maya", // Fixed spelling from filename if needed, or keep human name
    role: "Event Coordinator",
    image: EventCoordImg
  },
  {
    name: "Rab Ahmed Rwna",
    role: "Outreach Director",
    image: OutreachImg
  },
  {
    name: "Abir Khan",
    role: "Social Director",
    image: SocialImg
  }
];

export default function About() {
  return (
    <div className="about-container">
      {/* Background Pseudo-element handled in CSS */}
      
      {/* --- HERO SECTION --- */}
      <section className="about-hero">
        <div className="glass-card hero-card">
          <h1>Who We Are</h1>
          <p>The heartbeat of Bangladeshi culture at the University of Saskatchewan.</p>
        </div>
      </section>

      {/* --- MISSION SECTION --- */}
      <section className="mission-section">
        <div className="glass-card mission-card">
          <h2>Our Mission</h2>
          <p>
            Established in 2024, the UBSA is dedicated to fostering a home away from home. 
            We bridge cultures, support academic success, and create unforgettable memories 
            through festivals, socials, and community outreach.
          </p>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="team-section">
        <h2 className="section-title">Meet the Executive Team</h2>
        
        {/* PRESIDENT (Featured Large) */}
        <div className="president-wrapper">
          <div className="glass-card president-card">
            <div className="img-container">
              <img src={PresidentImg} alt="Rubana Sayeda" />
            </div>
            <div className="info">
              <h3>Rubana Sayeda</h3>
              <span className="role">President</span>
              <p className="bio">Leading with vision and passion to unite our community.</p>
            </div>
          </div>
        </div>

        {/* REST OF TEAM (Grid) */}
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="glass-card team-card">
              <div className="img-container">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="info">
                <h3>{member.name}</h3>
                <span className="role">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="stats-section">
        <div className="stat-item glass-card">
          <h3>2024</h3>
          <p>Founded</p>
        </div>
        <div className="stat-item glass-card">
          <h3>500+</h3>
          <p>Members</p>
        </div>
        <div className="stat-item glass-card">
          <h3>New</h3>
          <p>Committee</p>
        </div>
      </section>

      {/* --- PAST COMMITTEE SECTION --- */}
      <section className="past-committee-section">
        <div className="glass-card past-card">
          <h2>Our Legacy</h2>
          <p>Honoring the leaders who paved the way before us.</p>
          <button className="past-btn" onClick={() => alert("Past Committee Page Coming Soon!")}>
            View Past Committees
          </button>
        </div>
      </section>

    </div>
  );
}