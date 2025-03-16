const mysql = require('mysql2/promise');
let conn
const options = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'bolsta',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port : 3306
};


const pool = mysql.createPool(options);
       
const testdbconn = async() =>{
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connected to MySQL database!');
        connection.release(); // Release connection back to pool
        return true;
      } catch (error) {
        console.error('❌ Error connecting to MySQL:', error);
        return false;
      }
}

module.exports = {testdbconn, pool};