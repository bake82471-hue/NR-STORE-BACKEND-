const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// POST /admin/login
router.post("/login", adminController.login);

// REMOVE THESE — they break your authentication
// router.get("/settings", adminController.getSettings);
// router.put("/settings", auth, adminController.updateSettings);

module.exports = router;
