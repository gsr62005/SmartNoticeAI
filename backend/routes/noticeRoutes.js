const express = require("express");
const router = express.Router();
const { authenticateAdmin } = require("../middleware/authMiddleware");
const {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");

router.get("/", getNotices);
router.post("/", authenticateAdmin, createNotice);
router.put("/:id", authenticateAdmin, updateNotice);
router.delete("/:id", authenticateAdmin, deleteNotice);

module.exports = router;
