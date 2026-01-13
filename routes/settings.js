// backend/routes/settings.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// GET /settings
router.get("/", adminController.getSettings);

// PUT /settings (requires admin token)
router.put("/", authMiddleware, adminController.updateSettings);

module.exports = router;
