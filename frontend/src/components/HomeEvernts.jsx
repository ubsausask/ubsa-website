import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaMapMarkerAlt, FaTicketAlt, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import "../style/HomeEvents.css";

// Asset Imports
import TigerBG from "../assets/Event_page.jpg"; 
import EventIcon from "../assets/BD_Cultural_Elements/Event_icon.png";
import MockWeddingImg from "../assets/Gallery/MockWeeding.jpg"; 

const HomeEventTitle = () => (
  <div className="home-events-title-container">
    <div className="title-glass-pill">
      <img src={EventIcon} alt="Event Icon" className="title-custom-icon" />
      <h2 className="home-events-title">
        <span className="latest">Upcoming </span>
        <span className="ubsa">UBSA</span>
        <span className="event-txt"> Events</span>
      </h2>
    </div>
  </div>
);

export default function HomeEvents() {
  const [latestEvent, setLatestEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sortedUpcoming = data
          .filter((e) => e.date && new Date(e.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (sortedUpcoming.length > 0) {
          setLatestEvent(sortedUpcoming[0]);
        } else {
          setLatestEvent(DEMO_EVENT);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLatestEvent(DEMO_EVENT);
        setLoading(false);
      });
  }, []);

  const imgPath = (event) => {
    if (event.isDemo) return MockWeddingImg;
    return event.image_url ? `http://localhost:5000${event.image_url}` : "https://placehold.co/800x600";
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      month: d.toLocaleString("default", { month: "short" }),
      full: d.toLocaleDateString(undefined, { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      })
    };
  };

  if (loading) return null;

  return (
    <section className="home-events-section">
      <div className="home-events-parallax-bg" style={{ backgroundImage: `url(${TigerBG})` }} />

      <div className="home-events-wrapper">
        <HomeEventTitle /> 

        {latestEvent && (
          <div className="snake-border-container">
            <div className="snake-line green"></div>
            <div className="snake-line red"></div>
            
            <div className="compact-event-card frosted-white">
              <div 
                className="card-media" 
                onClick={() => navigate(`/events?open=${latestEvent.id}`)}
              >
                <img src={imgPath(latestEvent)} alt={latestEvent.title} />
                <div className="mini-date-badge">
                  <span className="d">{formatDate(latestEvent.date).day}</span>
                  <span className="m">{formatDate(latestEvent.date).month}</span>
                </div>
              </div>

              <div className="card-details">
                <h3 className="event-title-small">{latestEvent.title}</h3>
                
                <div className="event-info-strip">
                  <div className="info-tag">
                    <FaCalendarAlt className="tag-icon green-txt" /> 
                    <span>{formatDate(latestEvent.date).full}</span>
                  </div>
                  <div className="info-tag">
                    <FaClock className="tag-icon green-txt" /> 
                    <span>{latestEvent.time}</span>
                  </div>
                  <div className="info-tag">
                    <FaMapMarkerAlt className="tag-icon red-txt" /> 
                    <span>{latestEvent.location}</span>
                  </div>
                </div>

                <div className="event-action-footer">
                  <button 
                    className="action-btn-dynamic"
                    onClick={() => navigate(`/events?open=${latestEvent.id}`)}
                  >
                    Register
                  </button>
                  <div className="price-glass">
                    <FaTicketAlt />
                    <span>{latestEvent.price ? `$${latestEvent.price}` : "FREE"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="events-explore-cta">
          <button className="view-all-btn" onClick={() => navigate("/events")}>
            More Events <FaArrowRight style={{ marginLeft: '10px' }} />
          </button>
        </div>
      </div>
    </section>
  );
}

const DEMO_EVENT = {
  id: "demo-1",
  isDemo: true,
  title: "UBSA Mock Wedding 2026",
  date: "2026-02-14",
  time: "6:00 PM - 11:00 PM",
  location: "Uni of Saskatchewan",
  price: "25",
  description: "Experience the vibrant colors and traditions of a Bengali wedding!"
};