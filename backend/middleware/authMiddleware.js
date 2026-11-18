const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// ===============================
// ADMIN JWT AUTHENTICATION
// ===============================
const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. Please login as admin.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required.",
      });
    }

    const admin = await Admin.findById(decoded.id);

    if (!admin || admin.tokenVersion !== decoded.tokenVersion) {
      return res.status(401).json({
        message: "Session expired. Please login again.",
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token. Please login again.",
    });
  }
};

module.exports = { authenticateAdmin };
