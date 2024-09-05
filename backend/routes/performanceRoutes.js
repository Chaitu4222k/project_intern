const express = require("express");
const router = express.Router();
const { createPerformance, getPerformance, updatePerformance, deletePerformance } = require("../controllers/performanceController");

// Routes beginning with /api/performance
router.post("/", createPerformance);
//router.get("/:performanceId", getPerformance);
//router.put("/:performanceId", updatePerformance);
//router.delete("/:performanceId", deletePerformance);

module.exports = router;
