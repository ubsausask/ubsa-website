const db = require('../config/db');

// @desc    Get all events
// @route   GET /api/events
const getEvents = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM events ORDER BY date ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new event
// @route   POST /api/events
const createEvent = async (req, res) => {
  // If a file was uploaded, create the URL, otherwise use null
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  const { title, date, time, location, description, type } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: 'Title and Date are required' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO events (title, date, time, location, description, image_url, type) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, date, time, location, description, image_url, type || 'upcoming']
    );
    
    res.status(201).json({ 
      message: 'Event created successfully',
      event: { id: result.insertId, title, date, image_url } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Could not save event' });
  }
};

module.exports = { getEvents, createEvent };