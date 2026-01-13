// backend/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

// Routers
const itemsRouter = require("./routes/items");
const commentsRouter = require("./routes/comments");
const adminRouter = require("./routes/admin");
const settingsRouter = require("./routes/settings");

// Init DB
require("./models/db");

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== ROUTES =====
app.use("/items", itemsRouter);
app.use("/items", commentsRouter);        // /items/:id/comments
app.use("/admin", adminRouter);
app.use("/settings", settingsRouter);     // /settings

// ===== ROOT TEST =====
app.get("/", (req, res) => {
    res.json({ ok: true, message: "NR PUFF STORE API" });
});

// ===== SERVER START =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Backend running on port", PORT);
});