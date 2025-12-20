const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST: Handle new sponsor application
router.post('/', (req, res) => {
  const { businessName, email, tier, paymentType } = req.body;
  
  const sql = "INSERT INTO sponsor_applications (business_name, email, tier, payment_type) VALUES (?, ?, ?, ?)";
  
  db.query(sql, [businessName, email, tier, paymentType], (err, result) => {
    if (err) {
      console.error("Sponsor Query Error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    res.status(201).json({ success: true, message: "Application submitted!" });
  });
});

// GET: Fetch inquiries for admin
router.get('/', (req, res) => {
  const sql = "SELECT * FROM sponsor_applications ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching data" });
    res.json(results);
  });
});

module.exports = router;