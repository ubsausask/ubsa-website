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
    // 1. ATTEMPT INSERT
    // Using [result] destructuring for promise-based mysql2
    await db.query(sqlInsert, [firstName, lastName, email, studentId, department]);

    // SUCCESS LOGIC
    console.log("-----------------------------------------");
    console.log(`✅ NEW REGISTRATION: ${email}`);
    console.log("-----------------------------------------");

    return res.status(201).json({ 
      success: true, 
      message: "Member registered successfully!" 
    });

  } catch (err) {
    // 2. CATCH DUPLICATE ENTRY (Prevents the crash)
    if (err.code === 'ER_DUP_ENTRY') {
      console.log(`⚠️  DUPLICATE ATTEMPT: ${email}`);
      
      try {
        // Fetch the existing data to show on the digital ID modal
        const [rows] = await db.query("SELECT * FROM members WHERE email = ?", [email]);
        
        return res.status(400).json({ 
          success: false, 
          message: "Existing record found", 
          existingMember: rows[0] 
        });
      } catch (fetchErr) {
        return res.status(500).json({ success: false, message: "Error fetching existing record" });
      }
    }

    // 3. CATCH OTHER ERRORS
    console.error("❌ DATABASE ERROR:", err.message);
    return res.status(500).json({ 
      success: false, 
      message: "An internal server error occurred." 
    });
  }
});

module.exports = router;