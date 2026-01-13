const db = require("./db");

module.exports = {
    getInstagram() {
        return new Promise((resolve) => {
            db.get(
                "SELECT value AS instagram_username FROM settings WHERE key='instagram_username'",
                (err, row) => resolve(row)
            );
        });
    },

    setInstagram(username) {
        return new Promise((resolve) => {
            db.run(
                "UPDATE settings SET value=? WHERE key='instagram_username'",
                [username],
                () => resolve()
            );
        });
    }
};