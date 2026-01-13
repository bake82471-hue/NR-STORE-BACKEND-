// backend/routes/admin.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");

// POST /admin/login
router.post("/login", adminController.login);

// PUT /admin/settings/instagram
router.put("/settings/instagram", auth, adminController.updateInstagram);

module.exports = router;