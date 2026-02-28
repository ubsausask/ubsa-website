import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaHistory, FaMapMarkerAlt, FaClock, FaTimes, FaCamera } from "react-icons/fa";
import "../style/Events.css";
import { API_BASE, api } from '../api';

// --- IMPORT YOUR NEW EVENT ASSETS ---
import Boishakh from "../assets/Events/RongilaBoishakh.jpg";
import Iftar from "../assets/Events/AnnualIftar.jpg";
import MockWedding2026 from "../assets/Events/MockWedding2026.jpg";
import FuchkaFest from "../assets/Events/FuchkaFest.jpg";
import ShondharAdda from "../assets/Events/ShondharAdda.jpg";
import WebsiteDesign from "../assets/Events/WebsiteDesign.jpg";

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
    fetch(api('/events'))
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
    return event.image_url.startsWith("http") ? event.image_url : `${API_BASE}${event.image_url}`;
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
              <Link to={event.register_url} className="evpg-reg-btn">Register Now</Link>
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
              <div key={event.id} className="evpg-card evpg-dimmed" onClick={() => window.open(event.event_url || "#", "_blank")}>
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
    id: "6",
    title: "Annual Iftar 2026",
    date: "2026-03-09",
    time: "6:00 PM - 11:00 PM",
    location: "Health Sciences D-Wing Atrium",
    description: "Annual Iftar event with UBSA",
    price: "0",
    register_url: "https://www.zeffy.com/en-CA/ticketing/ubsa-iftar--2026",
    event_url: "https://www.instagram.com/p/DVPZ05ODWlb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    image_url: Iftar,
    isLocal: true
  },{
    id: "5",
    title: "UBSA Fusion Wedding 2026",
    date: "2026-02-06",
    time: "6:00 PM - 11:00 PM",
    location: "Sutherland Hall",
    description: "Fusion Mock Wedding with UBSA and PSA at USask",
    price: "30",
    event_url: "https://www.instagram.com/reel/DU7i8EbE5FQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    image_url: MockWedding2026,
    isLocal: true
  },{
    id: "4",
    title: "Website Design Contest",
    date: "2026-01-09",
    time: "6:00 PM - 10:30 PM",
    location: "Online",
    description: "Website design contest for USask students",
    price: "0",
    event_url: "https://www.instagram.com/p/DSOKt0gjyUZ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    image_url: WebsiteDesign,
    isLocal: true
  },
  {
    id: "3",
    title: "Shondhar Adda 2026",
    date: "2025-10-21",
    time: "6:00 PM - 10:30 PM",
    location: "Education Lounge",
    description: "An evening of Bangladeshi adda.",
    price: "3",
    event_url: "https://www.instagram.com/reel/DRoJ98VkeFa/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    image_url: ShondharAdda,
    isLocal: true
  },
  {
    id: "2",
    title: "Fuchka Fest 2025",
    date: "2025-09-12",
    description: "A fun-filled evening celebrating the beloved Bengali street food, Fuchka!",
    event_url: "https://www.instagram.com/reel/DPks5YgjLUv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    image_url: FuchkaFest,
    isLocal: true
  },
  {
    id: "1",
    title: "Rongila Boishakh 2025",
    date: "2025-04-29",
    description: "Celebration of the Bengali New Year with traditional music, dance, and food.",
    event_url: "https://www.instagram.com/p/DOFUZBjkfH5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    image_url: Boishakh,
    isLocal: true
  }
];