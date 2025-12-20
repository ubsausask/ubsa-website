import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../style/adminpages/Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({
    eventCount: 0,
    photoCount: 0,
    memberCount: 150, // Placeholder
    ticketSales: 24,  // Placeholder
  });

  // Fetch real counts from your APIs
  useEffect(() => {
    // 1. Get Events Count
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setStats(prev => ({ ...prev, eventCount: data.length })))
      .catch(err => console.error(err));

    // 2. Get Gallery Count
    fetch('http://localhost:5000/api/gallery')
      .then(res => res.json())
      .then(data => setStats(prev => ({ ...prev, photoCount: data.length })))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin <span className="text-highlight">Dashboard</span></h1>
        <p>Welcome back, Admin. Here is what’s happening today.</p>
      </div>

      {/* --- STATS GRID --- */}
      <div className="stats-grid">
        <div className="stat-card glass">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>Total Events</h3>
            <p className="stat-number">{stats.eventCount}</p>
          </div>
        </div>

        <div className="stat-card glass">
          <div className="stat-icon">🖼️</div>
          <div className="stat-info">
            <h3>Gallery Photos</h3>
            <p className="stat-number">{stats.photoCount}</p>
          </div>
        </div>

        <div className="stat-card glass">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Active Members</h3>
            <p className="stat-number">{stats.memberCount}</p>
          </div>
        </div>

        <div className="stat-card glass">
          <div className="stat-icon">🎟️</div>
          <div className="stat-info">
            <h3>Tickets Sold</h3>
            <p className="stat-number">{stats.ticketSales}</p>
          </div>
        </div>
      </div>

      {/* --- QUICK ACTIONS --- */}
      <h2 className="section-title">Quick Actions</h2>
      <div className="actions-grid">
        
        {/* Add Event Button */}
        <Link to="/admin/add-event" className="action-card glass">
          <div className="action-icon">➕</div>
          <h3>Add Event</h3>
          <p>Create a new upcoming event or memory.</p>
        </Link>

        {/* Manage Gallery Button */}
        <Link to="/admin/manage-gallery" className="action-card glass">
          <div className="action-icon">📸</div>
          <h3>Manage Gallery</h3>
          <p>Upload new photos or delete old ones.</p>
        </Link>

        {/* Manage Sponsors Button (Placeholder) */}
        <Link to="/sponsors" className="action-card glass">
          <div className="action-icon">🤝</div>
          <h3>Manage Sponsors</h3>
          <p>Update sponsor logos and tiers.</p>
        </Link>

        {/* Settings / Users (Placeholder) */}
        <div className="action-card glass disabled">
          <div className="action-icon">⚙️</div>
          <h3>Settings</h3>
          <p>Site configuration (Coming Soon).</p>
        </div>

      </div>
    </div>
  );
}