const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 1. GET ALL PHOTOS
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM gallery ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) {
        console.error("Error fetching gallery:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// 2. ADD NEW PHOTO
router.post('/', async (req, res) => {
    const { src, category, caption } = req.body;

    if (!src) {
        return res.status(400).json({ error: "Image URL is required" });
    }

    try {
        const sql = "INSERT INTO gallery (src, category, caption) VALUES (?, ?, ?)";
        const [result] = await db.query(sql, [src, category, caption]);
        res.status(201).json({ message: "Photo added!", id: result.insertId });
    } catch (err) {
        console.error("Error adding photo:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// 3. DELETE PHOTO
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = "DELETE FROM gallery WHERE id = ?";
        const [result] = await db.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Photo not found" });
        }
        res.json({ message: "Photo deleted successfully" });
    } catch (err) {
        console.error("Error deleting photo:", err);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;