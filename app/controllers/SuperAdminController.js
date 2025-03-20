const bcrypt = require("bcrypt");
const utils = require("../../utils");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { pool } = require("../../config/db");

const createCompany = async (companyDetails) => {
  const connection = await pool.getConnection(); // Get a DB connection
  await connection.beginTransaction(); // Start transaction

  try {
    const {
      companyName,
      adminName,
      adminEmail,
      planType,
      subscribers,
      videosPerSubscriber,
    } = companyDetails;

    const plainPassword = crypto.randomBytes(8).toString("hex"); // Generate a random password
    console.log("plain password:", plainPassword);
    const passwordHash = await bcrypt.hash(plainPassword, 10); // Hash password

    // Insert company data
    const companyQuery = `INSERT INTO companies (company_name, primary_admin_name, primary_admin_email, plan_type, subscribers_count, videos_per_subscriber) 
                          VALUES (?, ?, ?, ?, ?, ?)`;

    const [companyResult] = await connection.query(companyQuery, [
      companyName,
      adminName,
      adminEmail,
      planType == "monthly" ? 1 : 2,
      subscribers,
      videosPerSubscriber,
    ]);

    // Get the inserted company's ID
    console.log(companyDetails);
    const companyId = companyResult.insertId;

    // Insert user data
    const userQuery = `INSERT INTO users (name, email, password, role, company_id) VALUES (?, ?, ?, 2, ?)`;

    const [userResult] = await connection.query(userQuery, [
      adminName,
      adminEmail,
      passwordHash,
      companyId, // Use the actual inserted company ID
    ]);

    // Commit the transaction
    await connection.commit();

    return { companyResult, userResult }; // Return the result of both insertions
  } catch (error) {
    await connection.rollback(); // Rollback the transaction in case of an error
    throw error;
  } finally {
    connection.release(); // Always release the connection back to the pool
  }
};

const toCamelCase = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    ); // Convert snake_case to camelCase
    acc[camelKey] = obj[key];
    return acc;
  }, {});
};

const getCompaniesWithUsers = async (page = 1, limit = 10) => {
  try {
    let query = `
    SELECT 
    c.*, 
    u.id AS user_id, u.name AS user_name, u.email AS user_email, u.role AS role_id, 
    r.role_name AS role, 
    p.type AS plan
    FROM companies c
    LEFT JOIN users u ON c.primary_admin_email = u.email
    LEFT JOIN roles r ON u.role = r.id
    LEFT JOIN plans p ON c.plan_type = p.id
    `;

    // Count total records
    const countQuery = `SELECT COUNT(*) as totalDocs FROM companies`;
    const [[{ totalDocs }]] = await pool.query(countQuery);

    let results;
    if (limit === -1) {
      // Fetch all records when limit is -1
      [results] = await pool.query(query);
    } else {
      const offset = (page - 1) * limit;
      query += ` LIMIT ? OFFSET ?;`;
      [results] = await pool.query(query, [limit, offset]);
    }

    const transformedData = results.map(toCamelCase);

    return {
      data: transformedData,
      pagination: {
        totalDocs,
        totalPages: limit === -1 ? 1 : Math.ceil(totalDocs / limit),
        currentPage: limit === -1 ? 1 : page,
      },
    };
  } catch (error) {
    throw error;
  }
};

// const sendEmail = async (email, password) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail", // You can change this to your email provider (e.g., Outlook, SMTP)
//       auth: {
//         user: "karan.ekarigar@gmail.com", // Replace with your email
//         pass: "tehk kaft qpvi fbgy", // Replace with your email password or app password
//       },
//     });

//     const mailOptions = {
//       from: "karan.ekarigar@gmail.com",
//       to: email,
//       subject: "Your Admin Account Credentials",
//       text: `Hello,\n\nYour admin account has been created successfully!\n\nEmail: ${email}\nPassword: ${password}\n\nPlease log in and change your password immediately.\n\nBest regards,\nYour Company`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully to", email);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

module.exports = {
  createCompany,
  getCompaniesWithUsers,
};
