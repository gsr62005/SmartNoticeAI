const express = require("express");
const router = express.Router();
const { authenticateAdmin } = require("../middleware/authMiddleware");
const {
  summarizeNotice,
  classifyPriority,
} = require("../controllers/aiController");

router.post("/summarize", authenticateAdmin, summarizeNotice);
router.post("/classify-priority", authenticateAdmin, classifyPriority);

module.exports = router;
