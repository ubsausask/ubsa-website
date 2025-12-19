const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool;

try {
  pool = mysql.createPool(dbConfig);
  // Convert pool to promise-based
  const promisePool = pool.promise();
  
  // Test connection
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('❌ DB Connection Failed:', err.code);
      console.error('   (The server will restart automatically via Docker)');
    } else {
      console.log(`✅ Connected to MySQL Database: ${process.env.DB_NAME}`);
      connection.release();
    }
  });

  module.exports = promisePool;
} catch (error) {
  console.error('DB Config Error:', error);
}