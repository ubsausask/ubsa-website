import React from 'react';
import {
  FaStar,
  FaTicketAlt,
  FaVoteYea,
  FaUniversity,
  FaExternalLinkAlt
} from 'react-icons/fa';
import '../style/Join.css';

export default function Join() {
  const googleFormLink = 'https://docs.google.com/forms/d/e/1FAIpQLSfOIeUOT0SkWJ4nsJnP-edrEMdyxlntYxZYwT9oJ053u9_OEw/viewform';

  return (
    <div className="join-page">
      <div className="join-container">

        {/* LEFT: BENEFITS */}
        <div className="benefits-column">
          <h1 className="join-title">
            Join <span className="text-highlight">Member+</span>
          </h1>
          <p className="join-subtitle">
            Unlock exclusive USask Bangladeshi community perks.
          </p>

          <div className="benefits-list">
            <div className="benefit-item">
              <FaStar className="b-icon" />
              <div>
                <h3>Exclusive Discounts</h3>
                <p>Up to 10% off at partner grocery stores and restaurants.</p>
              </div>
            </div>

            <div className="benefit-item">
              <FaTicketAlt className="b-icon" />
              <div>
                <h3>Priority Access</h3>
                <p>Early-bird/ Special price tickets for UBSA events.</p>
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

        {/* RIGHT: SIMPLE CTA */}
        <div className="form-column">
          <div className="glass-panel join-form-card simple-join-card">
            <div className="form-header">
              <h2>Membership Registration</h2>
            </div>

            <p className="simple-join-text">
              To become a UBSA member, please complete our registration form.
            </p>

            <p className="fee-notice">⚠️ Membership fee: Free!</p>

            <a
              href={"https://docs.google.com/forms/d/e/1FAIpQLSfOIeUOT0SkWJ4nsJnP-edrEMdyxlntYxZYwT9oJ053u9_OEw/viewform"}
              target="_blank"
              rel="noreferrer"
              className="btn-join-submit join-google-btn"
            >
              Fill Out Google Form <FaExternalLinkAlt />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}