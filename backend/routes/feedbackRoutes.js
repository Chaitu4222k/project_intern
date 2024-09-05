const express = require("express");
const router = express.Router();
const { addFeedback, getFeedback, updateFeedback, deleteFeedback } = require("../controllers/feedbackController");

// Routes beginning with /api/feedback
router.post("/", addFeedback);
router.get("/:internName", getFeedback);  // Use internName to retrieve feedbacks by name
router.put("/:feedbackId", updateFeedback);
router.delete("/:feedbackId", deleteFeedback);

module.exports = router;
