const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../../config/db");
const utils = require("../../utils");

const login = async ({ email, password }) => {
  const query = `SELECT users.id AS userId, users.name AS userName, users.email, users.password, roles.role_name AS role 
    FROM users 
    JOIN roles ON users.role = roles.id 
    WHERE users.Email = ?`;
  const [result] = await pool.query(query, [email]);
  if (result.length <= 0) throw new utils.ApiError("Invalid email", 401);
  const user = result[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new utils.ApiError("Invalid password", 401);
  const token = await jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_KEY,
    {
      expiresIn: "5h",
    }
  );
  return { token, user: { userName: user.userName, email, role: user.role } };
};

module.exports = {
  login,
};
