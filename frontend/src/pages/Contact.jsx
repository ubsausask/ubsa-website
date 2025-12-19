import React, { useState } from 'react';
import '../style/Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Since we don't have a backend yet, this opens the user's email client
    const mailtoLink = `mailto:ubsa.usask@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="contact-page">
      
      <div className="contact-header">
        <h1 className="page-title">Get in <span className="text-highlight">Touch</span></h1>
        <p className="page-subtitle">
          Have questions about membership, events, or sponsorship? We'd love to hear from you.
        </p>
      </div>

      <div className="contact-container">
        
        {/* LEFT COLUMN: Info & Socials */}
        <div className="contact-info">
          
          <div className="info-card">
            <h3>📍 Visit Us</h3>
            <p>University of Saskatchewan<br/>Saskatoon, SK, Canada</p>
          </div>

          <div className="info-card">
            <h3>📧 Email Us</h3>
            <p>
              <a href="mailto:ubsa.usask@gmail.com" className="contact-link">
                ubsa.usask@gmail.com
              </a>
            </p>
          </div>

          <div className="info-card social-card">
            <h3>🌐 Follow Our Journey</h3>
            <p>Stay updated with our latest stories and events.</p>
            <div className="social-links-large">
              <a 
                href="https://www.instagram.com/ubsa.usask/" 
                target="_blank" 
                rel="noreferrer" 
                className="social-btn insta"
              >
                Instagram ↗
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61569283955219" 
                target="_blank" 
                rel="noreferrer" 
                className="social-btn fb"
              >
                Facebook ↗
              </a>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Contact Form */}
        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send a Message</h3>
            
            <div className="form-group">
              <label>Your Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input 
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                required 
                placeholder="Event Inquiry"
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea 
                name="message" 
                rows="5" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button type="submit" className="btn-submit">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}