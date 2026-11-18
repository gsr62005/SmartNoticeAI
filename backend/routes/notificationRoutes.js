const express = require("express");
const router = express.Router();
const { authenticateAdmin } = require("../middleware/authMiddleware");
const {
  getNotifications,
  createNotification,
  markNotificationRead,
  deleteNotification,
} = require("../controllers/notificationController");

router.get("/", getNotifications);
router.post("/", authenticateAdmin, createNotification);
router.patch("/:id/read", markNotificationRead);
router.delete("/:id", deleteNotification);

module.exports = router;
