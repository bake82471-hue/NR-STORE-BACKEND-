const Comments = require("../models/commentsModel");

module.exports = {
    async getForItem(req, res) {
        const comments = await Comments.getForItem(req.params.id);
        res.json(comments);
    },

    async addForItem(req, res) {
        const { username, comment } = req.body;
        await Comments.add(req.params.id, username, comment);
        res.json({ success: true });
    }
};