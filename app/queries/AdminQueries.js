const { pool } = require("../../config/db");

// Company insert query using Promises
const addPerson = async(personData) => {
  const sql = `INSERT INTO companies (name, email_id, password) 
               VALUES (?, ?, ?)`;
    const [result, fields] = await pool.query(sql, personData);
    return result;
};

module.exports = { addPerson };