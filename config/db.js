const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "test",
  port: process.env.DB_PORT || 3306,
});

const checkConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log("Connected to Database");
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error("Database Connection Failed!", err);
  }
};
 //"ye krliya maine"
module.exports = {pool, checkConnection};
