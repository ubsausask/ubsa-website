router.post('/reset', async (req, res) => {
    const { execs } = req.body;
    const connection = await db.getConnection(); // Use a connection for transaction safety

    try {
        await connection.beginTransaction();

        // 1. Mark all current active executives as inactive (Archiving)
        await connection.query("UPDATE executives SET is_active = 0 WHERE is_active = 1");

        // 2. Insert new executives
        const insertQuery = "INSERT INTO executives (name, role, is_active) VALUES ?";
        const values = execs.map(e => [e.name, e.role, 1]);
        
        await connection.query(insertQuery, [values]);

        await connection.commit();
        res.status(200).json({ success: true, message: "Transition complete" });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
});