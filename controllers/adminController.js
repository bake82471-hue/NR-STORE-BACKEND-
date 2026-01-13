const Settings = require("../models/settingsModel");
const generateToken = require("../utils/token");

// Hard-coded admin credentials
const ADMIN_USERNAME = "Nick_Rizzi";
const ADMIN_PASSWORD = "rizzi246820";

module.exports = {

    // ======================
    // ADMIN LOGIN
    // ======================
    async login(req, res) {
        const { username, password } = req.body;

        if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
            return res.json({ success: false });
        }

        const token = generateToken();

        // ⭐ REQUIRED: store token so middleware can validate it
        global.adminToken = token;

        res.json({ success: true, token });
    },

    // ======================
    // GET SETTINGS
    // ======================
    async getSettings(req, res) {
        try {
            const settings = await Settings.getSettings();
            res.json(settings);
        } catch (err) {
            console.error("Error loading settings:", err);
            res.status(500).json({ error: "Failed to load settings" });
        }
    },

    // ======================
    // UPDATE SETTINGS
    // ======================
    async updateSettings(req, res) {
        try {
            const { instagram_username } = req.body;

            await Settings.updateSettings({ instagram_username });

            res.json({ success: true, instagram_username });
        } catch (err) {
            console.error("Error updating settings:", err);
            res.status(500).json({ error: "Failed to update settings" });
        }
    }
};
