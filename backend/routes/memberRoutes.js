const express = require('express');
const router = express.Router();
const db = require('../config/db');

// --- 1. GET: Fetch all members ---
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM members ORDER BY applied_at DESC");
    res.json(rows);
  } catch (err) {
    console.error("❌ Fetch Error:", err.message);
    res.status(500).json({ success: false, message: "Error fetching members" });
  }
});

// --- 2. POST: Register Member (Public) ---
router.post('/', async (req, res) => {
  // FIX: Destructure snake_case keys to match the rewritten Join.jsx payload
  const { first_name, last_name, email, student_id, department } = req.body;

  if (!first_name || !last_name || !email || !student_id) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }
  
  // Create a unique hash for the Digital ID / QR System
  const qrToken = Buffer.from(`${email}-${Date.now()}`).toString('base64').substring(0, 12);

  const sqlInsert = `INSERT INTO members 
    (first_name, last_name, email, student_id, department, qr_code_token) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  try {
    await db.query(sqlInsert, [first_name, last_name, email, student_id, department, qrToken]);
    console.log(`✅ New Registration: ${email}`);
    return res.status(201).json({ success: true, message: "Registered successfully!" });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      const [rows] = await db.query("SELECT * FROM members WHERE email = ?", [email]);
      return res.status(400).json({ success: false, message: "Member already exists", existingMember: rows[0] });
    }
    console.error("❌ DB Error:", err.message);
    res.status(500).json({ success: false, message: "Database Error", error: err.message });
  }
});

// --- 3. PUT: Update Payment Status ---
router.put('/:id/status', async (req, res) => {
  const { status } = req.body; 
  const { id } = req.params;

  try {
    const sqlUpdate = status === 'Paid' 
      ? "UPDATE members SET status = ?, payment_date = NOW() WHERE id = ?" 
      : "UPDATE members SET status = ?, payment_date = NULL WHERE id = ?";

    await db.query(sqlUpdate, [status, id]);
    res.json({ success: true, message: `Member set to ${status}` });
  } catch (err) {
    res.status(500).json({ success: false, message: "Status update failed" });
  }
});

// --- 4. DELETE: Removal ---
router.delete('/:id', async (req, res) => {
  try {
    await db.query("DELETE FROM members WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Member removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

module.exports = router;