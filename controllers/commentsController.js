// backend/controllers/commentsController.js
const Comments = require("../models/commentsModel");

module.exports = {
    async getForItem(req, res) {
        try {
            const comments = await Comments.getForItem(req.params.id);
            res.json(comments);
        } catch (err) {
            console.error("getForItem error:", err);
            res.status(500).json({ error: "Failed to load comments" });
        }
    },

    async addForItem(req, res) {
        try {
            const { username, comment } = req.body;

            if (!username || !comment) {
                return res.status(400).json({ error: "Username and comment required" });
            }

            await Comments.add(req.params.id, username, comment);

            // Return updated comments so the item page refreshes instantly
            const updatedComments = await Comments.getForItem(req.params.id);

            res.json(updatedComments);

        } catch (err) {
            console.error("addForItem error:", err);
            res.status(500).json({ error: "Failed to add comment" });
        }
    }
};
