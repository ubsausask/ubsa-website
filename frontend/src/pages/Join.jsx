import React, { useState } from 'react';
import { FaCheckCircle, FaStar, FaTicketAlt, FaVoteYea } from 'react-icons/fa';
import '../style/Join.css';

export default function Join() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    department: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting membership:", error);
      alert("Something went wrong. Please try again or contact us.");
    }
  };

  if (submitted) {
    return (
      <div className="join-page success-view">
        <div className="glass-panel success-card">
          <FaCheckCircle className="success-icon" />
          <h1>Welcome to the Family!</h1>
          <p>Your membership application has been submitted. Please check your email for the next steps regarding the membership fee and card collection.</p>
          <button onClick={() => window.location.href = '/'} className="btn-join-submit">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="join-page">
      <div className="join-container">
        
        {/* LEFT: BENEFITS */}
        <div className="benefits-column">
          <h1 className="join-title">Become a <span className="text-highlight">Member+</span></h1>
          <p className="join-subtitle">Join 200+ students and unlock exclusive Bangladeshi community perks at USask.</p>
          
          <div className="benefits-list">
            <div className="benefit-item">
              <FaStar className="b-icon" />
              <div>
                <h3>Exclusive Discounts</h3>
                <p>Up to 15% off at partner grocery stores and restaurants in Saskatoon.</p>
              </div>
            </div>
            <div className="benefit-item">
              <FaTicketAlt className="b-icon" />
              <div>
                <h3>Priority Event Access</h3>
                <p>Early-bird tickets and reserved seating for Gala nights and Boishakhi events.</p>
              </div>
            </div>
            <div className="benefit-item">
              <FaVoteYea className="b-icon" />
              <div>
                <h3>Voting Rights</h3>
                <p>Have your say in the annual UBSA executive elections and constitutional changes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="form-column">
          <div className="glass-panel join-form-card">
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label>NSID / Email</label>
                <input type="email" name="email" placeholder="abc123@mail.usask.ca" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Student ID #</label>
                <input type="text" name="studentId" placeholder="11223344" value={formData.studentId} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Department / Major</label>
                <input type="text" name="department" placeholder="e.g. Computer Science" value={formData.department} onChange={handleChange} required />
              </div>

              <p className="fee-notice">⚠️ A nominal membership fee of $5/year applies.</p>
              
              <button type="submit" className="btn-join-submit">Submit Application</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}