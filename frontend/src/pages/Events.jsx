import React, { useState, useEffect } from "react";
import "../style/Events.css";

export default function Events({ isHome = false }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null); // State for Modal

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  // --- Filtering Logic ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events
    .filter(e => {
      const d = new Date(e.date); d.setHours(0,0,0,0);
      return d >= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const pastEvents = events
    .filter(e => {
      const d = new Date(e.date); d.setHours(0,0,0,0);
      return d < today;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // On Home page, maybe limit items? (Optional: currently showing ALL)
  const showUpcoming = isHome ? upcomingEvents.slice(0, 3) : upcomingEvents;
  const showPast = isHome ? pastEvents.slice(0, 3) : pastEvents;

  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/600x400';
    return url.startsWith('http') ? url : `http://localhost:5000${url}`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      day: date.getDate(),
      full: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    };
  };

  // --- MODAL COMPONENT ---
  const EventModal = ({ event, onClose }) => {
    if (!event) return null;
    return (
      <div className="event-modal-overlay" onClick={onClose}>
        <div className="event-modal-glass" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
          
          <div className="modal-content-wrapper">
            {/* LEFT: Details */}
            <div className="modal-details">
              <h2 className="modal-title">{event.title}</h2>
              <div className="modal-meta-row">
                <span className="meta-tag">📅 {formatDate(event.date).full}</span>
                {event.time && <span className="meta-tag">⏰ {event.time}</span>}
              </div>
              {event.location && <p className="modal-location">📍 {event.location}</p>}
              
              <div className="modal-description-scroll">
                <p>{event.description}</p>
              </div>
            </div>

            {/* RIGHT: Photo */}
            <div className="modal-image-col">
              <img src={getImageUrl(event.image_url)} alt={event.title} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="loading-text">Loading...</div>;

  return (
    <div className={`events-page ${isHome ? 'is-home' : ''}`}>
      
      {/* 1. Page Header (Hidden on Home) */}
      {!isHome && (
        <div className="events-header">
          <h1 className="page-title">Our <span className="text-highlight">Gatherings</span></h1>
          <p className="page-subtitle">Celebrating culture, innovation, and community spirit.</p>
        </div>
      )}

      {/* 2. UPCOMING SECTION */}
      {showUpcoming.length > 0 && (
        <section className="events-section">
          {/* Use specific styles for Home headers to match your theme */}
          <h2 className={isHome ? "home-section-title" : "section-title"}>
            {isHome ? "Upcoming Events" : "📅 Upcoming Events"}
          </h2>
          <div className="events-grid">
            {showUpcoming.map((event) => {
              const { month, day } = formatDate(event.date);
              return (
                <div key={event.id} className="event-card upcoming" onClick={() => setSelectedEvent(event)}>
                  <div className="card-image">
                    <img src={getImageUrl(event.image_url)} alt={event.title} />
                    <div className="date-badge">
                      <span className="month">{month}</span>
                      <span className="day">{day}</span>
                    </div>
                  </div>
                  <div className="card-content">
                    <h3>{event.title}</h3>
                    <div className="event-meta">
                      <span>{event.time || "All Day"}</span>
                      <span>{event.location || "TBA"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. PAST SECTION (Now Visible on Home too!) */}
      {showPast.length > 0 && (
        <section className="events-section past-section">
          <h2 className={isHome ? "home-section-title" : "section-title"}>
            {isHome ? "Past Memories" : "🕰️ Past Memories"}
          </h2>
          <div className="events-grid">
            {showPast.map((event) => (
              <div key={event.id} className="event-card past" onClick={() => setSelectedEvent(event)}>
                <div className="card-image">
                  <img src={getImageUrl(event.image_url)} alt={event.title} />
                </div>
                <div className="card-content">
                  <h3>{event.title}</h3>
                  <div className="event-meta">
                     <span>{formatDate(event.date).full}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. MODAL POPUP */}
      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
}