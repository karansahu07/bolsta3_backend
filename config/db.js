const mysql = require('mysql2/promise');
let conn
const options = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

console.log(`Connecting to MySQL at ${options.host}/${options.database}`);

const init = async () => {
    try {
        const connection = await mysql.createPool(options);
        console.log("Connected to MySQL database successfully!");
        conn = connection;
        return connection;
    } catch (error) {
        console.error("MySQL Connection Error:", error);
        throw error;
    }
};

module.exports = {init, conn};