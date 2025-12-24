import React, { useState, useEffect } from 'react';
import { FaReply, FaTrash, FaEnvelopeOpenText, FaPaperPlane, FaTimes, FaUser, FaCircle } from 'react-icons/fa';
import '../../style/adminpages/Inbox.css';

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyModal, setReplyModal] = useState({ open: false, msg: null, text: '' });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/contact-messages');
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (!replyModal.text) return alert("Please type a reply.");
    try {
      const res = await fetch('http://localhost:5000/api/contact-messages/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: replyModal.msg.email,
          subject: `Re: ${replyModal.msg.subject}`,
          replyText: replyModal.text,
          messageId: replyModal.msg.id
        })
      });

      if (res.ok) {
        alert("Reply sent successfully!");
        setReplyModal({ open: false, msg: null, text: '' });
        fetchMessages();
      }
    } catch (err) {
      alert("Error sending reply.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this message?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/contact-messages/${id}`, { method: 'DELETE' });
      if (res.ok) fetchMessages();
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <div className="admin-loading">Accessing Secure Inbox...</div>;

  return (
    <div className="inbox-integrated-view">
      {/* HEADER SECTION */}
      <div className="inbox-page-header">
        <div className="header-text">
          <h2><FaEnvelopeOpenText /> Member Inbox</h2>
          <p>Read and respond to inquiries from the website contact form.</p>
        </div>
      </div>

      {/* MESSAGE VIEWPORT */}
      <div className="inbox-table-viewport">
        <div className="message-list">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-card ${msg.status}`}>
              <div className="msg-main-content">
                <div className="msg-header-row">
                   <div className="user-info">
                      <div className="avatar-circle"><FaUser /></div>
                      <div className="sender-details">
                         <div className="subject-line">
                            <h4>{msg.subject || "General Inquiry"}</h4>
                            <span className={`status-pill ${msg.status}`}>
                               <FaCircle className="dot" /> {msg.status}
                            </span>
                         </div>
                         <span className="sender-meta">From: <strong>{msg.name}</strong> • {msg.email}</span>
                      </div>
                   </div>
                </div>
                
                {/* INSET DARK MESSAGE BODY */}
                <div className="msg-body-dark">
                  {msg.message}
                </div>
              </div>

              {/* ACTION SIDEBAR */}
              <div className="msg-actions-sidebar">
                {msg.status !== 'replied' && (
                  <button className="reply-btn-action" title="Reply" onClick={() => setReplyModal({ open: true, msg, text: '' })}>
                    <FaReply />
                  </button>
                )}
                <button className="delete-btn-action" title="Delete" onClick={() => handleDelete(msg.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="empty-inbox">
              <FaEnvelopeOpenText className="empty-icon" />
              <p>Your inbox is clear.</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL - Standardized Tiger Dark Theme */}
      {replyModal.open && (
        <div className="modal-overlay" onClick={() => setReplyModal({ open: false, msg: null, text: '' })}>
          <div className="inbox-modal-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={() => setReplyModal({ open: false, msg: null, text: '' })}>
              <FaTimes />
            </button>
            
            <div className="modal-top">
               <span className="reply-label">Direct Email Reply</span>
               <h3>{replyModal.msg.subject}</h3>
               <p className="target-email">To: <strong>{replyModal.msg.name}</strong> ({replyModal.msg.email})</p>
            </div>

            <textarea 
              className="reply-textarea"
              placeholder="Write your professional response here..."
              value={replyModal.text}
              onChange={(e) => setReplyModal({...replyModal, text: e.target.value})}
              autoFocus
            />

            <div className="modal-footer-actions">
              <button className="cancel-btn" onClick={() => setReplyModal({ open: false, msg: null, text: '' })}>Discard</button>
              <button className="send-reply-btn" onClick={handleReply}>
                <FaPaperPlane /> Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}