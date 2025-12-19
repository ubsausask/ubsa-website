const express = require('express');
const router = express.Router();
const { getEvents, createEvent } = require('../controllers/eventController');
const upload = require('../middleware/uploadMiddleware');

// Route to get all events
router.get('/', getEvents);

// Route to add an event (Expects a single file field named 'image')
router.post('/', upload.single('image'), createEvent);

module.exports = router;