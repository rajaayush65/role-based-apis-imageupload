const jwt = require("jsonwebtoken");

authUserValidation = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.locals = user;
        next();
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid/Expired Token",
        });
      }
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Authorization Token Must Be `Bearer [token]`",
    });
  }
};

module.exports = { authUserValidation };
