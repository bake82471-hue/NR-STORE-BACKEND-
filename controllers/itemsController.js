// backend/controllers/itemsController.js
const Items = require("../models/itemsModel");

module.exports = {
    async getAll(req, res) {
        try {
            const items = await Items.getAll();
            res.json(items);
        } catch (err) {
            console.error("getAll error:", err);
            res.status(500).json({ error: "Failed to fetch items" });
        }
    },

    async getOne(req, res) {
        try {
            const item = await Items.getOne(req.params.id);

            if (!item) {
                return res.status(404).json({ error: "Item not found" });
            }

            res.json(item);
        } catch (err) {
            console.error("getOne error:", err);
            res.status(500).json({ error: "Failed to fetch item" });
        }
    },

    async create(req, res) {
        try {
            const data = req.body;

            if (!data.name || !data.price) {
                return res.status(400).json({ error: "Name and price are required" });
            }

            const id = await Items.create({
                name: data.name,
                description: data.description || "",
                price: data.price,
                stock: data.stock ?? 0,
                image: data.image || null
            });

            res.json({ success: true, id });
        } catch (err) {
            console.error("create error:", err);
            res.status(500).json({ error: "Failed to create item" });
        }
    },

    async update(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;

            const existing = await Items.getOne(id);
            if (!existing) {
                return res.status(404).json({ error: "Item not found" });
            }

            // Merge existing data with new data
            const merged = {
                name: data.name ?? existing.name,
                description: data.description ?? existing.description,
                price: data.price ?? existing.price,
                stock: data.stock ?? existing.stock,
                // IMPORTANT: keep old image if no new image provided
                image:
                    (data.image === undefined || data.image === null || data.image === "")
                        ? existing.image
                        : data.image
            };

            await Items.update(id, merged);

            res.json({ success: true });
        } catch (err) {
            console.error("update error:", err);
            res.status(500).json({ error: "Failed to update item" });
        }
    },

    async remove(req, res) {
        try {
            const id = req.params.id;

            const existing = await Items.getOne(id);
            if (!existing) {
                return res.status(404).json({ error: "Item not found" });
            }

            await Items.remove(id);
            res.json({ success: true });
        } catch (err) {
            console.error("remove error:", err);
            res.status(500).json({ error: "Failed to delete item" });
        }
    }
};