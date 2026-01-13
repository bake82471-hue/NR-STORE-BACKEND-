const db = require("./db");

module.exports = {
    getForItem(item_id) {
        return new Promise((resolve) => {
            db.all("SELECT * FROM comments WHERE item_id=?", [item_id], (err, rows) => resolve(rows));
        });
    },

    add(item_id, username, comment) {
        return new Promise((resolve) => {
            db.run(
                "INSERT INTO comments (item_id, username, comment, date) VALUES (?, ?, ?, datetime('now'))",
                [item_id, username, comment],
                () => resolve()
            );
        });
    }
};