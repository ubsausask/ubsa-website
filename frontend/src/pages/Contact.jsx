import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';
import '../style/Contact.css';

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
      // Direct fetch to backend port 5000
      const response = await fetch('http://localhost:5000/api/contact-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you! Your message has been sent to the UBSA Admin Inbox.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorData = await response.json();
        alert(`Failed to send: ${errorData.error || 'Server error'}`);
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert('Could not connect to the server. Please check if the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <header className="contact-hero">
        <h1 className="page-title">Get in <span className="text-highlight">Touch</span></h1>
        <p className="page-subtitle">Have questions? We'd love to hear from you.</p>
      </header>

      <div className="contact-container">
        {/* INFO SECTION */}
        <div className="contact-info-card glass-panel">
          <h2 className="info-title">Contact Information</h2>
          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <div><h3>Location</h3><p>Place Riel Student Centre, USask</p></div>
          </div>
          <div className="info-item">
            <FaEnvelope className="icon" />
            <div><h3>Email</h3><a href="mailto:ubsa.usask@gmail.com">ubsa.usask@gmail.com</a></div>
          </div>
          <div className="social-links-contact">
             <h3>Follow Us</h3>
             <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
                <a href="https://instagram.com/ubsa.usask/" target="_blank" rel="noreferrer"><FaInstagram /></a>
             </div>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="contact-form-card glass-panel">
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit} className="event-style-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <select name="subject" value={formData.subject} onChange={handleChange} required>
                <option value="" disabled>Select a topic</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Membership">Membership</option>
                <option value="Sponsorship">Sponsorship</option>
                <option value="Events">Events</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="How can we help you?" required />
            </div>

            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}