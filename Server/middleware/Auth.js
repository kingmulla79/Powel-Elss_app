const jwt = require("jsonwebtoken");
const UserDetails = require("../models/UserDetails");

exports.isAuth = async (req, res, next) => {
  if (req.headers && req.headers["authorization"]) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const user = await UserDetails.findById(decode.user_id);
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "unauthorized access" });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        res
          .status(401)
          .json({ success: false, message: "unauthorized access" });
      }
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          success: false,
          message: "Session has expired. Try signing in",
        });
      }
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(498).json({
      success: false,
      message: "session expired. Try signing in again",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  if (req.headers && req.headers["authorization"]) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const user = await UserDetails.findById(decode.user_id);
      req.user = user;
      if (user.role === "admin") {
        return next();
      }

      res.status(401).json({
        success: false,
        message: `Access denied`,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

exports.isVerified = async (req, res, next) => {
  if (req.headers && req.headers["authorization"]) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const user = await UserDetails.findById(decode.user_id);
      req.user = user;
      if (user.verified === true) {
        return next();
      }

      res.status(401).json({
        success: false,
        message: `Access denied`,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
