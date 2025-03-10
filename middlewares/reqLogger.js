const reqLogger = (req, res, next) => {
  console.log("url->",req.url);
  console.log("session->",req.session)
  console.log("cookies->",req.cookies)
  console.log("method->",req.method);
  console.log("query->",req.query);
  console.log("body->",req.body);
  next();
};

module.exports = reqLogger;
