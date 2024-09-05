const express = require("express");
const router = express.Router();
const { createIntern, getInterns, updateIntern, deleteIntern } = require("../controllers/internController");

// Routes beginning with /api/interns
router.post("/",  createIntern);
router.get("/",  getInterns);
router.put("/:internId",  updateIntern);
router.delete("/:internId",  deleteIntern);

module.exports = router;
