// backend/models/itemsModel.js
const db = require("./db");

module.exports = {
    getAll() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM items", (err, rows) => {
                if (err) {
                    console.error("getAll DB error:", err);
                    return reject(err);
                }
                resolve(rows);
            });
        });
    },

    getOne(id) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM items WHERE id = ?", [id], (err, row) => {
                if (err) {
                    console.error("getOne DB error:", err);
                    return reject(err);
                }
                resolve(row || null);
            });
        });
    },

    create(data) {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO items (name, description, price, stock, image) VALUES (?, ?, ?, ?, ?)",
                [data.name, data.description, data.price, data.stock, data.image],
                function (err) {
                    if (err) {
                        console.error("create DB error:", err);
                        return reject(err);
                    }
                    resolve(this.lastID);
                }
            );
        });
    },

    update(id, data) {
        return new Promise((resolve, reject) => {
            db.run(
                "UPDATE items SET name = ?, description = ?, price = ?, stock = ?, image = ? WHERE id = ?",
                [data.name, data.description, data.price, data.stock, data.image, id],
                function (err) {
                    if (err) {
                        console.error("update DB error:", err);
                        return reject(err);
                    }
                    resolve();
                }
            );
        });
    },

    remove(id) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM items WHERE id = ?", [id], function (err) {
                if (err) {
                    console.error("remove DB error:", err);
                    return reject(err);
                }
                resolve();
            });
        });
    }
};