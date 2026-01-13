const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/auth"); // ✅ Correct path

// GET /settings
router.get("/", adminController.getSettings); // ✅ Public route

// PUT /settings (requires admin token)
router.put("/", authMiddleware, adminController.updateSettings); // ✅ Protected route

module.exports = router;
