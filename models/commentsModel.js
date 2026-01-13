// backend/models/commentsModel.js
const db = require("./db");

module.exports = {
    getForItem(item_id) {
        return new Promise((resolve) => {
            db.all(
                "SELECT id, item_id, username, comment, date FROM comments WHERE item_id=? ORDER BY date DESC",
                [item_id],
                (err, rows) => resolve(rows)
            );
        });
    },

    add(item_id, username, comment) {
        return new Promise((resolve) => {
            db.run(
                "INSERT INTO comments (item_id, username, comment, date) VALUES (?, ?, ?, datetime('now'))",
                [item_id, username, comment],
                function () {
                    resolve(this.lastID);
                }
            );
        });
    }
};
