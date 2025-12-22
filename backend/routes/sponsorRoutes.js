const express = require('express');
const router = express.Router();
const db = require('../config/db');

// --- 1. POST: Submit New Application (Public Form) ---
// Route: POST /api/sponsors
router.post('/', async (req, res) => {
    const { business_name, contact_person, email, phone, tier, message } = req.body;
    
    // Validation
    if (!business_name || !email) {
        return res.status(400).json({ error: "Business name and email are required" });
    }

    try {
        const sql = `INSERT INTO sponsor_applications 
                     (business_name, contact_person, email, phone, tier, message, status) 
                     VALUES (?, ?, ?, ?, ?, ?, 'Pending')`;
        
        const [result] = await db.query(sql, [business_name, contact_person, email, phone, tier || 'Bronze', message]);
        res.status(201).json({ success: true, message: "Application submitted successfully!", id: result.insertId });
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- 2. GET: Fetch all applications (Dashboard) ---
// Route: GET /api/sponsors
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM sponsor_applications ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- 3. POST: Approve Sponsor (Moves App to Public List) ---
// Route: POST /api/sponsors/approve/:id
router.post('/approve/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [apps] = await connection.query("SELECT * FROM sponsor_applications WHERE id = ?", [id]);
        if (apps.length === 0) return res.status(404).json({ message: "Application not found" });
        const app = apps[0];

        // Insert into the public 'sponsors' table
        const sqlPublic = `INSERT INTO sponsors (name, tier) VALUES (?, ?)`;
        await connection.query(sqlPublic, [app.business_name, app.tier]);

        // Update the application status
        await connection.query("UPDATE sponsor_applications SET status = 'Approved' WHERE id = ?", [id]);

        await connection.commit();
        res.json({ success: true, message: "Sponsor approved and published!" });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
});

// --- 4. DELETE: Remove Application ---
// Route: DELETE /api/sponsors/:id
router.delete('/:id', async (req, res) => {
    try {
        await db.query("DELETE FROM sponsor_applications WHERE id = ?", [req.params.id]);
        res.json({ success: true, message: "Application deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;