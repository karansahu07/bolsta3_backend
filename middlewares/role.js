const isAdmin = (req, res, next) => {
  if (req.auth.role !== "admin") {
    return res.send(401, null, "Only For Admin Route");
  }
  next();
};

const isSuperAdmin = (req, res, next) => {
  if (req.auth.role !== "superadmin") {
    return res.send(401, null, "Only For Super Admin Route");
  }
  next();
};
const isUser = (req, res, next) => {
  if (req.auth.role !== "student") {
    return res.send(401, null, "Only For Student Admin Route");
  }
  next();
};

module.exports = { isAdmin, isSuperAdmin, isUser };
