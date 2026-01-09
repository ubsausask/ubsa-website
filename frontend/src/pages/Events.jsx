import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaHistory, FaMapMarkerAlt, FaClock, FaTimes, FaCamera } from "react-icons/fa";
import "../style/Events.css";

// --- IMPORT YOUR NEW EVENT ASSETS ---
import FirstMeeting from "../assets/Events/First Meeting.png";
import IfterParty from "../assets/Events/Ifter.png";
import MockWedding from "../assets/Events/Mock Weeding.jpg";

// Shared Background Assets
import EventBG1 from "../assets/BD_Cultural_Elements/Event_BG.png";
import EventBG2 from "../assets/BD_Cultural_Elements/Event_BG_2.png";
import EventBG3 from "../assets/BD_Cultural_Elements/Event_BG_3.png";
import EventIcon from "../assets/BD_Cultural_Elements/Event_icon.png";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(MOCK_EVENTS);
        }
        setLoading(false);
      })
      .catch(() => {
        setEvents(MOCK_EVENTS);
        setLoading(false);
      });
  }, []);

  // Modal scroll lock
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = selectedEvent ? "hidden" : "auto";
    return () => { document.body.style.overflow = originalStyle; };
  }, [selectedEvent]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter((e) => new Date(e.date) >= today);
  const pastEvents = events.filter((e) => new Date(e.date) < today);

  const getImageUrl = (event) => {
    if (event.isLocal) return event.image_url;
    if (!event.image_url) return "https://placehold.co/800x600?text=UBSA+Event";
    return event.image_url.startsWith("http") ? event.image_url : `http://localhost:5000${event.image_url}`;
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return {
      month: d.toLocaleString("default", { month: "short" }),
      day: d.getDate(),
      full: d.toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      }),
    };
  };

  const EventModal = ({ event, onClose }) => (
    <div className="evpg-modal-overlay" onClick={onClose}>
      <div className="evpg-modal-glass" onClick={(e) => e.stopPropagation()}>
        <button className="evpg-close-btn" onClick={onClose}><FaTimes /></button>
        <div className="evpg-modal-layout">
          <div className="evpg-modal-img-col">
            <img src={getImageUrl(event)} alt={event.title} />
          </div>
          <div className="evpg-modal-info-col">
            <h2 className="evpg-modal-title">{event.title}</h2>
            <div className="evpg-modal-meta">
              <span className="evpg-pill"><FaCalendarAlt /> {formatDate(event.date).full}</span>
              {event.time && <span className="evpg-pill"><FaClock /> {event.time}</span>}
              {event.location && <span className="evpg-pill"><FaMapMarkerAlt /> {event.location}</span>}
            </div>
            <div className="evpg-modal-desc">{event.description}</div>
            <div className="evpg-modal-actions">
              <Link to={`/events/${event.id}`} className="evpg-reg-btn">Register Now</Link>
              <span className="evpg-price-badge">{event.price ? `$${event.price}` : "FREE"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <div className="evpg-loading">Loading Gatherings...</div>;

  return (
    <div className="evpg-page">
      <div className="evpg-bg-container">
        <div className="evpg-bg-overlay"></div>
        {[EventBG1, EventBG2, EventBG3].map((bg, idx) => (
          <div key={idx} className="evpg-bg-row">
            <div className={`evpg-marquee ${idx % 2 === 0 ? "left" : "right"}`}>
              <img src={bg} alt="" /><img src={bg} alt="" />
            </div>
          </div>
        ))}
      </div>

      <div className="evpg-content">
        <div className="evpg-title-container">
          <h1 className="evpg-main-title">
            <img src={EventIcon} alt="" className="evpg-title-icon" />
            Our <span className="red">Gatherings</span>
          </h1>
        </div>

        <section className="evpg-section">
          <h2 className="evpg-section-header"><FaCalendarAlt /> Upcoming Events</h2>
          <div className="evpg-grid">
            {upcomingEvents.map((event) => {
              const { month, day } = formatDate(event.date);
              return (
                <div key={event.id} className="evpg-card" onClick={() => setSelectedEvent(event)}>
                  <div className="evpg-card-img">
                    <img src={getImageUrl(event)} alt={event.title} />
                    <div className="evpg-card-badge">
                      <span className="mo">{month}</span>
                      <span className="dy">{day}</span>
                    </div>
                  </div>
                  <div className="evpg-card-details">
                    <h3 className="evpg-card-title">{event.title}</h3>
                    <div className="evpg-card-meta">
                      <p><FaClock className="red" /> {event.time || "TBA"}</p>
                      <p><FaMapMarkerAlt className="red" /> {event.location || "TBA"}</p>
                    </div>
                    <button className="evpg-card-btn">View Details</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="evpg-section evpg-past">
          <h2 className="evpg-section-header"><FaHistory /> Past Events</h2>
          <div className="evpg-grid evpg-grid-small">
            {pastEvents.map((event) => (
              <div key={event.id} className="evpg-card evpg-dimmed" onClick={() => navigate(`/gallery`)}>
                <div className="evpg-card-img">
                  <img src={getImageUrl(event)} alt={event.title} />
                  <div className="evpg-card-overlay"><FaCamera /> View Gallery</div>
                </div>
                <div className="evpg-card-details">
                  <h3 className="evpg-card-title">{event.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
}

// --- UPDATED MOCK DATA WITH YOUR PHOTOS ---
const MOCK_EVENTS = [
  {
    id: "m1",
    title: "UBSA Mock Wedding 2026",
    date: "2026-03-20",
    time: "6:00 PM - 11:00 PM",
    location: "USask Ballroom",
    description: "Experience the grandeur of a traditional Bengali wedding! Join us for a night of dance, music, and an authentic multi-course wedding feast.",
    price: "20",
    image_url: MockWedding,
    isLocal: true
  },
  {
    id: "m2",
    title: "Community Ifter Party",
    date: "2026-03-28",
    time: "7:00 PM - 9:30 PM",
    location: "Place Riel",
    description: "Join your fellow students for a community Ifter during the holy month of Ramadan. All are welcome to share in this meal and gathering.",
    price: "0",
    image_url: IfterParty,
    isLocal: true
  },
  {
    id: "p1",
    title: "Annual General Meeting",
    date: "2025-09-15",
    description: "Our first meeting of the academic year where we discuss the roadmap for UBSA.",
    image_url: FirstMeeting,
    isLocal: true
  }
];