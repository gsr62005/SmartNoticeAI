const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// ===============================
// SECURE ADMIN REGISTRATION
// ===============================
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, registrationKey } = req.body;

    // Validate required fields
    if (!name || !email || !password || !registrationKey) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        message: "Name must contain at least 2 characters",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    // Verify private registration key
    if (
      !process.env.ADMIN_REGISTRATION_KEY ||
      registrationKey !== process.env.ADMIN_REGISTRATION_KEY
    ) {
      return res.status(403).json({
        message: "Invalid admin registration key",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check existing admin
    const existingAdmin = await Admin.findOne({ email: normalizedEmail });

    if (existingAdmin) {
      return res.status(409).json({
        message: "Admin with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin
    const admin = await Admin.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "admin",
    });

    return res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin registration error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Admin with this email already exists",
      });
    }

    return res.status(500).json({
      message: "Admin registration failed",
    });
  }
};

// ===============================
// SECURE ADMIN LOGIN
// ===============================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid admin credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid admin credentials",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        tokenVersion: admin.tokenVersion,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name || "Administrator",
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      message: "Admin login failed",
    });
  }
};

// ===============================
// ADMIN LOGOUT (invalidates old tokens)
// ===============================
const logoutAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndUpdate(req.admin.id, {
      $inc: { tokenVersion: 1 },
    });

    res.json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Admin logout error:", error);

    res.status(500).json({
      message: "Logout failed",
    });
  }
};

module.exports = { registerAdmin, loginAdmin, logoutAdmin };
