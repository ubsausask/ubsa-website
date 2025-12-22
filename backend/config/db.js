// FIX: Use 'mysql2/promise' to allow async/await in your routes
const mysql = require('mysql2/promise'); 
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword',
    database: process.env.DB_NAME || 'ubsa_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Optional: Test the connection on startup
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connected to MySQL Database via Promise Pool');
        connection.release();
    } catch (err) {
        console.error('❌ Database connection failed:', err.code);
    }
})();

module.exports = pool;