const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/db'); 

// Load environment variables
dotenv.config();

// Import Routes
const eventRoutes = require('./routes/eventRoutes');
const galleryRoutes = require('./routes/galleryRoutes'); 
const sponsorRoutes = require('./routes/sponsorRoutes'); // <--- New
const memberRoutes = require('./routes/memberRoutes');   // <--- New (Optional but recommended)

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(cors()); 
app.use(express.json()); 

// --- STATIC FILE SERVING ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API ROUTES ---
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes); 
app.use('/api/sponsor-applications', sponsorRoutes); // <--- Clean API call here
app.use('/api/members', memberRoutes);               // <--- Clean API call here

// Basic Test Route
app.get('/', (req, res) => {
  res.send('UBSA API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});