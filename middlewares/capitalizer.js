module.exports = (req, res, next) => {
    if (req.body) {
      if (req.url == "/api/auth/login") return next();
      const body = {};
      Object.entries(req.body).forEach(([k, v]) => {
        if (typeof v === "string" && !v.toLowerCase().includes("password")) {
          body[k] = v.toUpperCase();
        } else {
          body[k] = v;
        }
      });
      req.body = { ...body };
      next();
    }
  }