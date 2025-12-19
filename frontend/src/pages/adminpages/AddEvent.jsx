import React, { useState } from 'react';
// Updated import path to match your new folder structure
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
  const [message, setMessage] = useState('');

  // Handle Text Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File Input
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('date', formData.date);
    data.append('time', formData.time);
    data.append('location', formData.location);
    data.append('description', formData.description);
    data.append('type', formData.type);
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setMessage('✅ Event added successfully!');
        setFormData({ title: '', date: '', time: '', location: '', description: '', type: 'upcoming' });
        setImageFile(null);
      } else {
        setMessage('❌ Failed to add event.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Error connecting to server.');
    }
  };

  return (
    <div className="add-event-page">
      <h1>Add New Event</h1>
      {message && <p className="status-msg">{message}</p>}

      <form onSubmit={handleSubmit} className="event-form">
        <label>Event Title *</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <div className="form-row">
          <div>
            <label>Date *</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div>
            <label>Time</label>
            <input type="text" name="time" placeholder="e.g. 5:00 PM" value={formData.time} onChange={handleChange} />
          </div>
        </div>

        <label>Location</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} />

        <label>Event Type</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past Memory</option>
        </select>

        <label>Description</label>
        <textarea name="description" rows="4" value={formData.description} onChange={handleChange}></textarea>

        <label>Event Photo</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" className="btn-submit">Publish Event</button>
      </form>
    </div>
  );
}