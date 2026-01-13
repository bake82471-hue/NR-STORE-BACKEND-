const db = require("./db");

module.exports = {

    // ======================
    // GET ALL SETTINGS
    // ======================
    getSettings() {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT value AS instagram_username FROM settings WHERE key='instagram_username'",
                (err, row) => {
                    if (err) return reject(err);

                    resolve({
                        instagram_username: row ? row.instagram_username : ""
                    });
                }
            );
        });
    },

    // ======================
    // UPDATE SETTINGS
    // ======================
    updateSettings({ instagram_username }) {
        return new Promise((resolve, reject) => {
            db.run(
                "UPDATE settings SET value=? WHERE key='instagram_username'",
                [instagram_username],
                (err) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    }
};
