const Settings = require("../models/settingsModel");
const generateToken = require("../utils/token");

// Hard-coded admin credentials
const ADMIN_USERNAME = "Nick_Rizzi";
const ADMIN_PASSWORD = "rizzi246820";

module.exports = {
    async login(req, res) {
        const { username, password } = req.body;

        if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
            return res.json({ success: false });
        }

        const token = generateToken();
        res.json({ success: true, token });
    },

    async updateInstagram(req, res) {
        const { username } = req.body;
        await Settings.setInstagram(username);
        res.json({ success: true });
    },

    async getSettings(req, res) {
        const settings = await Settings.getInstagram();
        res.json(settings);
    }
};