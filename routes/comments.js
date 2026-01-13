// backend/routes/comments.js
const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

// GET /items/:id/comments
router.get("/:id/comments", commentsController.getForItem);

// POST /items/:id/comments
router.post("/:id/comments", commentsController.addForItem);

module.exports = router;