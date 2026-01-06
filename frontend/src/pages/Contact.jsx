import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaInstagram, FaFacebook, FaPaperPlane } from 'react-icons/fa';
import '../style/Contact.css';
// IMPORT THE IMAGE DIRECTLY
import ContactBG from '../assets/ContactPageBG.png'; 

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/contact-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you! Your message has been sent.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      alert('Error connecting to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    /* We inject the imported image as a CSS variable here */
    <div className="contact-page" style={{ '--contact-bg': `url(${ContactBG})` }}>
      <header className="contact-hero">
        <h1 className="page-title">Get in <span className="text-highlight">Touch</span></h1>
        <p className="page-subtitle">Have questions? We'd love to hear from you.</p>
      </header>

      <div className="contact-container">
        <div className="contact-info-card glass-panel">
          <h2 className="info-title">Contact Details</h2>
          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <div className="info-text">
              <h3>Our Hub</h3>
              <p>Place Riel Student Centre, USask</p>
            </div>
          </div>
          <div className="info-item">
            <FaEnvelope className="icon" />
            <div className="info-text">
              <h3>Email Us</h3>
              <a href="mailto:ubsa.usask@gmail.com">ubsa.usask@gmail.com</a>
            </div>
          </div>
          <div className="social-links-contact">
             <h3>Follow Us</h3>
             <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
                <a href="https://instagram.com/ubsa.usask/" target="_blank" rel="noreferrer"><FaInstagram /></a>
             </div>
          </div>
        </div>

        <div className="contact-form-card glass-panel">
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit} className="contact-dynamic-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required>
                <option value="" disabled>Select a topic</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Membership">Membership</option>
                <option value="Sponsorship">Sponsorship</option>
                <option value="Events">Events</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="How can we help?" required />
            </div>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : <>Send Message <FaPaperPlane style={{marginLeft: '10px'}}/></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}