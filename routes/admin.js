// backend/routes/admin.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");

// POST /admin/login
router.post("/login", adminController.login);

// GET /admin/settings
router.get("/settings", adminController.getSettings);

// PUT /admin/settings
router.put("/settings", auth, adminController.updateSettings);

module.exports = router;
