// const {pool} = require("../../config/db");

// // Company insert query
// const addCompany = (companyData, callback) => {
//   const sql = `INSERT INTO companies (company_name, admin_name, admin_email, password, plan_type, subscribers, videos_per_subscriber) 
//                VALUES (?, ?, ?, ?, ?, ?, ?)`;
//                console.log(pool);
//   pool.query(sql, companyData, callback);
// };

// module.exports = { addCompany };

const { pool } = require("../../config/db");

// Company insert query using Promises
const addCompany = async(companyData) => {
  const sql = `INSERT INTO companies (company_name, primary_admin_name, primary_admin_email, password, plan_type, subscribers_count, videos_per_subscriber) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result, fields] = await pool.query(sql, companyData);
    return result;
};

module.exports = { addCompany };
