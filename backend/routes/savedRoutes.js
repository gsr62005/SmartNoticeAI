const express = require("express");
const router = express.Router();
const {
  saveNotice,
  getSavedNotices,
  removeSavedNotice,
} = require("../controllers/savedController");

router.post("/", saveNotice);
router.get("/", getSavedNotices);
router.delete("/:noticeId", removeSavedNotice);

module.exports = router;
