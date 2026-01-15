const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const COMMENTS_FILE = path.join(__dirname, "../data/comments.json");

// Ensure file exists
if (!fs.existsSync(COMMENTS_FILE)) {
    fs.writeFileSync(COMMENTS_FILE, "{}");
}

// Load comments
function loadComments() {
    return JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf8"));
}

// Save comments
function saveComments(data) {
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(data, null, 2));
}

// GET comments for item
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const comments = loadComments();
    res.json(comments[id] || []);
});

// POST new comment
router.post("/:id", (req, res) => {
    const id = req.params.id;
    const { username, comment } = req.body;

    if (!username || !comment) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const comments = loadComments();

    if (!comments[id]) comments[id] = [];

    comments[id].push({
        username,
        comment,
        date: new Date().toLocaleString("it-IT")
    });

    saveComments(comments);

    res.json(comments[id]);
});

module.exports = router;
