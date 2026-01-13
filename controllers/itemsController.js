const Items = require("../models/itemsModel");

module.exports = {
    async getAll(req, res) {
        const items = await Items.getAll();
        res.json(items);
    },

    async getOne(req, res) {
        const item = await Items.getOne(req.params.id);
        res.json(item);
    },

    async create(req, res) {
        const result = await Items.create(req.body);
        res.json({ success: true, id: result });
    },

    async update(req, res) {
        await Items.update(req.params.id, req.body);
        res.json({ success: true });
    },

    async remove(req, res) {
        await Items.remove(req.params.id);
        res.json({ success: true });
    }
};