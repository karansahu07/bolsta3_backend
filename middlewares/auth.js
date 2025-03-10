const constants = require("../config/constants");
const jwt = require('jsonwebtoken');

const decodeToken = (token) =>{
  return jwt.verify(token,process.env.JWT_KEY);
}

function hasToken(req, res, next) {
  try {
    // return next();
    const { token } = req.cookies;
    if (!token) {
      res.apiResponse(401, constants.UNAUTHORISED_ACCESS);
      return;
    }
    const decode = decodeToken(token);
    req.auth = { ...decode };
    return next();
  } catch (error) {
    next(error);
  }
}

module.exports = hasToken;
