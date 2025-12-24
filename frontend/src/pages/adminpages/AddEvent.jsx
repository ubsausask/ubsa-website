import React, { useState } from 'react';
import { FaPlusCircle, FaCamera, FaTrash, FaCheckCircle } from 'react-icons/fa';
import '../../style/adminpages/AddEvent.css'; 

export default function AddEvent() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    type: 'upcoming'
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState('');

  // Handle Text and Select Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File Selection and Generate Preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Clear Selected Image
  const removeImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    const input = document.getElementById('event-photo');
    if (input) input.value = '';
  };

  // Form Submission Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Processing...');
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setMessage('✅ Published Successfully!');
        setFormData({ title: '', date: '', time: '', location: '', description: '', type: 'upcoming' });
        setImageFile(null);
        setPreviewUrl(null);
      } else {
        setMessage('❌ Failed to publish.');
      }
    } catch (error) {
      setMessage('❌ Connection Error.');
    }
  };

  return (
    <div className="add-event-integrated-view">
      {/* 1. COMPACT DASHBOARD HEADER */}
      <div className="event-page-header">
        <h2><FaPlusCircle /> Create New Event</h2>
      </div>

      {/* 2. FEEDBACK MESSAGE */}
      {message && (
        <div className="status-msg-mini">
          <FaCheckCircle /> {message}
        </div>
      )}

      {/* 3. MAIN FORM CARD */}
      <div className="event-form-card">
        <form onSubmit={handleSubmit} className="event-form">
          
          {/* FULL WIDTH TITLE */}
          <div className="input-group">
            <label>Event Title *</label>
            <input 
              type="text" 
              name="title" 
              placeholder="e.g. Annual Student Gala 2025" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* DYNAMIC TRI-COLUMN ROW: Date, Time, and Type */}
          <div className="form-row-triple">
            <div className="field-block">
              <label>Date *</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="field-block">
              <label>Time</label>
              <input type="text" name="time" placeholder="e.g. 5:00 PM" value={formData.time} onChange={handleChange} />
            </div>
            <div className="field-block">
              <label>Event Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="upcoming">Upcoming Event</option>
                <option value="past">Past Memory</option>
              </select>
            </div>
          </div>

          {/* FULL WIDTH LOCATION */}
          <div className="input-group">
            <label>Location / Venue</label>
            <input 
              type="text" 
              name="location" 
              placeholder="e.g. Grand Ballroom or Zoom Link" 
              value={formData.location} 
              onChange={handleChange} 
            />
          </div>

          {/* COMPRESSED DESCRIPTION */}
          <div className="input-group">
            <label>Short Description</label>
            <textarea 
              name="description" 
              placeholder="Briefly describe the event purpose..."
              value={formData.description} 
              onChange={handleChange}
            ></textarea>
          </div>

          {/* GALLERY-STYLE UPLOAD COMPONENT */}
          <div className="file-upload-container">
            <label className="input-label-mini">Event Poster / Banner</label>
            <input type="file" id="event-photo" accept="image/*" onChange={handleFileChange} hidden />
            
            {!previewUrl ? (
              <label htmlFor="event-photo" className="file-drop-area-mini">
                <FaCamera /> 
                <span>Select from Media Gallery</span>
              </label>
            ) : (
              <div className="image-preview-wrapper-mini">
                <img src={previewUrl} alt="Preview" />
                <button type="button" className="remove-img-btn-mini" onClick={removeImage}>
                  <FaTrash /> Remove Photo
                </button>
              </div>
            )}
          </div>

          {/* FIXED BOTTOM ACTION BUTTON */}
          <button type="submit" className="btn-submit-event-compact">
            Deploy Event to Live Site
          </button>
        </form>
      </div>
    </div>
  );
}