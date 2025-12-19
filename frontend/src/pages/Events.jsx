import React, { useState } from 'react';
import eventBg from '../assets/Event_page.webp'; // Import your image
import '../style/Events.css';

export default function Events() {
  const [view, setView] = useState('upcoming');

  // --- MOCK DATA ---
  const eventsData = {
    upcoming: [
      {
        id: 1,
        title: "Pohela Boishakh 1432",
        date: "April 14, 2025",
        time: "10:00 AM - 4:00 PM",
        location: "Physics Bowl, USask",
        description: "Join us for the biggest Bengali New Year celebration in Saskatchewan! Food, music, and colors await.",
        image: "https://images.unsplash.com/photo-1604606774045-3bb7c2658a46?auto=format&fit=crop&q=80&w=800",
        link: "#register"
      },
      {
        id: 2,
        title: "Annual Badminton Tournament",
        date: "May 20, 2025",
        time: "5:00 PM",
        location: "PAC Gym",
        description: "Compete for the cup! Singles and doubles categories available for all skill levels.",
        image: "https://images.unsplash.com/photo-1626224583764-847890e05399?auto=format&fit=crop&q=80&w=800",
        link: "#register"
      }
    ],
    past: [
      {
        id: 3,
        title: "Freshers' Reception 2024",
        date: "September 15, 2024",
        location: "Louis' Loft",
        description: "Welcoming our new batch of students with open arms and warm chai.",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: 4,
        title: "International Mother Language Day",
        date: "February 21, 2024",
        location: "Arts Building",
        description: "Honoring the martyrs and celebrating the diversity of languages at USask.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
      }
    ]
  };

  const activeEvents = eventsData[view];

  return (
    <div className="events-page">
      
      {/* FIXED BACKGROUND LAYER */}
      <div className="fixed-bg-layer" style={{ backgroundImage: `url(${eventBg})` }}>
        <div className="bg-overlay"></div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="events-content-wrapper">
        
        {/* Page Header */}
        <div className="events-header">
          <h1 className="page-title">Events & <span className="text-highlight">Gatherings</span></h1>
          <p className="page-subtitle">
            From cultural festivals to sports tournaments, we keep the spirit of Bengal alive in Saskatoon.
          </p>
        </div>

        {/* Filter Toggles */}
        <div className="events-filter">
          <button 
            className={`filter-btn ${view === 'upcoming' ? 'active' : ''}`}
            onClick={() => setView('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`filter-btn ${view === 'past' ? 'active' : ''}`}
            onClick={() => setView('past')}
          >
            Past Memories
          </button>
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {activeEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="card-image-wrapper">
                <img src={event.image} alt={event.title} className="card-image" />
                <div className="card-date-badge">
                  {event.date.split(',')[0]}
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{event.title}</h3>
                <div className="card-meta">
                  <span>📍 {event.location}</span>
                  {event.time && <span>⏰ {event.time}</span>}
                </div>
                <p className="card-desc">{event.description}</p>
                {view === 'upcoming' && (
                  <a href={event.link} className="card-cta">Register Now →</a>
                )}
              </div>
            </div>
          ))}
        </div>

        {activeEvents.length === 0 && (
          <div className="no-events">
            <p>No events found in this category.</p>
          </div>
        )}

      </div>
    </div>
  );
}