import React, { useState } from 'react';
import '../style/HomeContact.css';

export default function HomeContact() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: 'General Inquiry', // Default subject for DB consistency
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
      // Direct fetch call to your backend
      const response = await fetch('http://localhost:5000/api/contact-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you! Your message has been sent to our team.');
        // Reset form after success
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      } else {
        const errorData = await response.json();
        alert(`Failed to send: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Could not connect to the server. Please check if the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="home-contact-section">
      <div className="home-contact-container">
        
        <div className="contact-glass-card">
          <div className="contact-text-col">
            <h2 className="section-title-home">Get in <span className="highlight">Touch</span></h2>
            <p className="section-subtitle">
              Have a question or want to join UBSA? Drop us a message below.
            </p>
            <div className="quick-info">
              <p>📍 Place Riel Student Centre</p>
              <p>📧 ubsa.usask@gmail.com</p>
            </div>
          </div>

          <div className="contact-form-col">
            <form onSubmit={handleSubmit}>
              <div className="form-group-home">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group-home">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group-home">
                <textarea 
                  name="message" 
                  rows="4" 
                  placeholder="Your Message..." 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn-send-home" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}