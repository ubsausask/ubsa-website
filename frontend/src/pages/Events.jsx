import React, { useState, useEffect } from "react";
import "../style/Events.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. CALL THE BACKEND API
  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data); // Store the data from the database
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  // 2. Filter events (Upcoming vs Past)
  const upcomingEvents = events.filter(e => e.type === 'upcoming');
  const pastEvents = events.filter(e => e.type === 'past');

  // Helper to format dates nicely (e.g., "Dec 25")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      day: date.getDate() + 1 // +1 fixes a common timezone "off by one" bug
    };
  };

  // Helper to fix image URLs
  // The backend sends "/uploads/image.jpg", so we add "http://localhost:5000"
  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/600x400';
    return url.startsWith('http') ? url : `http://localhost:5000${url}`;
  };

  if (loading) return <div className="loading-text" style={{paddingTop: '150px', color: 'white', textAlign: 'center'}}>Loading events...</div>;

  return (
    <div className="events-page">
      
      {/* HEADER */}
      <div className="events-header">
        <h1 className="page-title">
          Our <span className="text-highlight">Gatherings</span>
        </h1>
        <p className="page-subtitle">
          Join us in celebrating culture, innovation, and community spirit.
        </p>
      </div>

      {/* SECTION 1: UPCOMING EVENTS */}
      <section className="events-section">
        <h2 className="section-title">📅 Upcoming Events</h2>
        
        {upcomingEvents.length === 0 ? (
          <p className="no-events" style={{color: '#aaa', textAlign: 'center'}}>No upcoming events scheduled. Stay tuned!</p>
        ) : (
          <div className="events-grid">
            {upcomingEvents.map((event) => {
              const { month, day } = formatDate(event.date);
              return (
                <div key={event.id} className="event-card upcoming">
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
                      {event.time && <span>🕒 {event.time}</span>}
                      {event.location && <span>📍 {event.location}</span>}
                    </div>
                    <p>{event.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 2: PAST MEMORIES */}
      <section className="events-section past-section">
        <h2 className="section-title">🕰️ Past Memories</h2>
        <div className="events-grid">
          {pastEvents.map((event) => (
            <div key={event.id} className="event-card past">
              <div className="card-image">
                <img src={getImageUrl(event.image_url)} alt={event.title} />
              </div>
              <div className="card-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}