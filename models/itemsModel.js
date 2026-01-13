const db = require("./db");

module.exports = {
    getAll() {
        return new Promise((resolve) => {
            db.all("SELECT * FROM items", (err, rows) => resolve(rows));
        });
    },

    getOne(id) {
        return new Promise((resolve) => {
            db.get("SELECT * FROM items WHERE id = ?", [id], (err, row) => resolve(row));
        });
    },

    create(data) {
        return new Promise((resolve) => {
            db.run(
                "INSERT INTO items (name, description, price, stock, image) VALUES (?, ?, ?, ?, ?)",
                [data.name, data.description, data.price, data.stock, data.image],
                function () {
                    resolve(this.lastID);
                }
            );
        });
    },

    update(id, data) {
        return new Promise((resolve) => {
            db.run(
                "UPDATE items SET name=?, description=?, price=?, stock=?, image=? WHERE id=?",
                [data.name, data.description, data.price, data.stock, data.image, id],
                () => resolve()
            );
        });
    },

    remove(id) {
        return new Promise((resolve) => {
            db.run("DELETE FROM items WHERE id=?", [id], () => resolve());
        });
    }
};