import React, { useState } from 'react';
import { 
  FaCheckCircle, FaStar, FaTicketAlt, FaVoteYea, 
  FaTimes, FaUniversity, FaIdBadge, FaEnvelopeOpenText, 
  FaUserGraduate, FaExclamationTriangle 
} from 'react-icons/fa';
import logo from '../assets/UBSA_Logo.png'; 
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
  const [memberInfo, setMemberInfo] = useState(null);
  const [showExistingModal, setShowExistingModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const departments = [
    "Arts & Science", "Engineering (USask)", "Edwards School of Business", 
    "Computer Science", "Medicine", "Nursing", "Law", "Kinesiology", 
    "Agriculture & Bioresources", "Pharmacy & Nutrition", "Graduate Studies"
  ];

  const handleChange = (e) => {
    setValidationError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateUSask = () => {
    // Regex for: abc123@mail.usask.ca or abc123@usask.ca
    const emailRegex = /^[a-z]{3}\d{3}@(mail\.)?usask\.ca$/i;
    // Regex for: exactly 8 digits
    const sidRegex = /^\d{8}$/;

    if (!emailRegex.test(formData.email)) {
      setValidationError("Please use a valid USask email (e.g., lsx341@mail.usask.ca)");
      return false;
    }
    if (!sidRegex.test(formData.studentId)) {
      setValidationError("Student Number must be exactly 8 digits (e.g., 11360945)");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUSask()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 400 && data.existingMember) {
        setMemberInfo(data.existingMember);
        setShowExistingModal(true);
      } else if (response.ok) {
        setSubmitted(true);
      } else {
        setValidationError(data.message || "Something went wrong.");
      }
    } catch (error) {
      setValidationError("Could not connect to the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const getNSID = (email) => email.split('@')[0].toUpperCase();

  if (submitted) {
    return (
      <div className="join-page success-view">
        <div className="glass-panel success-card">
          <FaCheckCircle className="success-icon" />
          <h1>Welcome to UBSA!</h1>
          <p>Registration successful for <strong>{getNSID(formData.email)}</strong>.</p>
          <p>Check your email for membership benefits and fee payment instructions.</p>
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
          <h1 className="join-title">Join <span className="text-highlight">Member+</span></h1>
          <p className="join-subtitle">Unlock exclusive USask Bangladeshi community perks.</p>
          
          <div className="benefits-list">
            <div className="benefit-item">
              <FaStar className="b-icon" />
              <div>
                <h3>Exclusive Discounts</h3>
                <p>15% off at partner grocery stores and restaurants.</p>
              </div>
            </div>
            <div className="benefit-item">
              <FaTicketAlt className="b-icon" />
              <div>
                <h3>Priority Access</h3>
                <p>Early-bird tickets for Gala and Boishakhi events.</p>
              </div>
            </div>
            <div className="benefit-item">
              <FaVoteYea className="b-icon" />
              <div>
                <h3>Voting Rights</h3>
                <p>Participate in annual UBSA executive elections.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="form-column">
          <div className="glass-panel join-form-card">
            <div className="form-header">
              <FaUniversity className="header-icon" />
              <h2>Student Registration</h2>
            </div>

            {validationError && (
              <div className="error-banner">
                <FaExclamationTriangle /> {validationError}
              </div>
            )}

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
                <label>USask Email (contains NSID)</label>
                <input type="email" name="email" placeholder="lsx341@mail.usask.ca" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Student Number</label>
                  <input type="text" name="studentId" placeholder="11360945" value={formData.studentId} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Faculty / Dept</label>
                  <select name="department" value={formData.department} onChange={handleChange} required>
                    <option value="">Select Department</option>
                    {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                  </select>
                </div>
              </div>

              <p className="fee-notice">⚠️ Membership fee: $5/year.</p>
              
              <button type="submit" className="btn-join-submit" disabled={loading}>
                {loading ? "Verifying..." : "Register Now"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- EXISTING MEMBER DIGITAL ID CARD --- */}
      {showExistingModal && memberInfo && (
        <div className="modal-overlay">
          <div className="glass-panel member-card-modal">
            <button className="close-x" onClick={() => setShowExistingModal(false)}>
              <FaTimes />
            </button>
            <div className="card-header-modal">
              <FaIdBadge className="card-badge-icon" />
              <div>
                <h2>NSID: {getNSID(memberInfo.email)}</h2>
                <span className="status-badge">{memberInfo.status}</span>
              </div>
            </div>
            <div className="card-body-info">
              <div className="info-row">
                <FaUserGraduate className="info-icon" />
                <div>
                  <span>MEMBER NAME</span>
                  <p>{memberInfo.first_name} {memberInfo.last_name}</p>
                </div>
              </div>
              <div className="info-row">
                <FaUniversity className="info-icon" />
                <div>
                  <span>FACULTY</span>
                  <p>{memberInfo.department}</p>
                </div>
              </div>
              <div className="info-row">
                <FaEnvelopeOpenText className="info-icon" />
                <div>
                  <span>JOINED DATE</span>
                  <p>{new Date(memberInfo.applied_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <p className="card-footer-note">
              This record is securely verified in ubsa_db.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}