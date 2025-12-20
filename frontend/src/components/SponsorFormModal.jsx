import React, { useState } from 'react';
import { FaTimes, FaMoneyBillWave, FaUniversity } from 'react-icons/fa';
import '../style/SponsorForm.css';

export default function SponsorFormModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    tier: 'Silver',
    paymentType: 'E-Transfer'
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Logic to send to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If on Step 1, just move to Step 2
    if (step === 1) {
      return setStep(2);
    }

    // If on Step 2, submit to Backend
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/sponsor-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success || response.ok) {
        alert("Application submitted! Our team will contact you shortly.");
        onClose();
      } else {
        alert("Error: " + (data.message || "Something went wrong"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Could not connect to the server. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="sponsor-form-glass" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-x" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>

        <h2>{step === 1 ? "Partner with UBSA" : "Contribution Type"}</h2>
        <p className="step-indicator">Step {step} of 2</p>

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            /* STEP 1: BUSINESS DETAILS */
            <div className="form-steps">
              <div className="form-group-modal">
                <label>Business Name</label>
                <input 
                  type="text" 
                  name="businessName"
                  placeholder="e.g. Deshi Bazaar" 
                  required 
                  value={formData.businessName}
                  onChange={handleChange} 
                />
              </div>

              <div className="form-group-modal">
                <label>Contact Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="contact@business.com" 
                  required 
                  value={formData.email}
                  onChange={handleChange} 
                />
              </div>

              <div className="form-group-modal">
                <label>Select Sponsorship Tier</label>
                <select name="tier" value={formData.tier} onChange={handleChange}>
                  <option value="Silver">Silver Tier ($100+)</option>
                  <option value="Gold">Gold Tier ($250+)</option>
                  <option value="Platinum">Platinum Tier ($500+)</option>
                </select>
              </div>

              <button type="submit" className="btn-next">
                Next: Payment Method
              </button>
            </div>
          ) : (
            /* STEP 2: PAYMENT METHOD */
            <div className="payment-steps">
              <p className="payment-instruction">How would you like to provide your contribution?</p>
              
              <div 
                className={`pay-option ${formData.paymentType === 'E-Transfer' ? 'selected' : ''}`} 
                onClick={() => setFormData({...formData, paymentType: 'E-Transfer'})}
              >
                <FaMoneyBillWave className="pay-icon" />
                <div className="pay-text">
                  <span>Interac E-Transfer</span>
                  <small>Fast & Secure digital transfer</small>
                </div>
                <input type="radio" checked={formData.paymentType === 'E-Transfer'} readOnly />
              </div>

              <div 
                className={`pay-option ${formData.paymentType === 'Cheque' ? 'selected' : ''}`} 
                onClick={() => setFormData({...formData, paymentType: 'Cheque'})}
              >
                <FaUniversity className="pay-icon" />
                <div className="pay-text">
                  <span>Cheque / Invoice</span>
                  <small>Physical cheque or business invoice</small>
                </div>
                <input type="radio" checked={formData.paymentType === 'Cheque'} readOnly />
              </div>

              <button type="submit" className="btn-final" disabled={loading}>
                {loading ? "Processing..." : "Submit Application"}
              </button>
              
              <button type="button" className="btn-back" onClick={() => setStep(1)} disabled={loading}>
                Go Back
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}