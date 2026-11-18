const express = require("express");
const router = express.Router();
const { authenticateAdmin } = require("../middleware/authMiddleware");
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
} = require("../controllers/adminController");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", authenticateAdmin, logoutAdmin);

module.exports = router;
