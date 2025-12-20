const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST: Register a new member
router.post('/', async (req, res) => {
  const { firstName, lastName, email, studentId, department } = req.body;

  const sqlInsert = `INSERT INTO members 
    (first_name, last_name, email, student_id, department) 
    VALUES (?, ?, ?, ?, ?)`;

  try {
    // 1. Attempt the insert
    await db.query(sqlInsert, [firstName, lastName, email, studentId, department]);

    console.log(`✅ Success: ${email} registered.`);
    
    return res.status(201).json({ 
      success: true, 
      message: "Member registered successfully!" 
    });

  } catch (err) {
    // 2. Catch Duplicate Email (ER_DUP_ENTRY)
    if (err.code === 'ER_DUP_ENTRY') {
      console.log(`⚠️  Duplicate email detected: ${email}`);
      
      try {
        // Fetch the existing user's data to send to the frontend modal
        const [rows] = await db.query("SELECT * FROM members WHERE email = ?", [email]);
        
        return res.status(400).json({ 
          success: false, 
          message: "Existing record found", 
          existingMember: rows[0] 
        });
      } catch (fetchErr) {
        return res.status(500).json({ success: false, message: "Error fetching data" });
      }
    }

    // 3. Catch all other DB errors (prevent server crash)
    console.error("❌ Database Error:", err.message);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
});

module.exports = router;