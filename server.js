// backend/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const adminRouter = require("./routes/admin");
const commentsRouter = require("./routes/comments");
const itemsRouter = require("./routes/items");
const settingsRouter = require("./routes/settings");
const uploadRouter = require("./routes/upload");

const app = express();

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// Serve static uploaded images
// -> frontend will use URLs like: https://nr-store-backend.onrender.com/uploads/filename.png
app.use(
    "/uploads",
    express.static(path.join(__dirname, "public", "uploads"))
);

// ---------- ROUTES ----------
app.use("/admin", adminRouter);
app.use("/comments", commentsRouter);
app.use("/items", itemsRouter);
app.use("/settings", settingsRouter);
app.use("/upload", uploadRouter);

// Health check
app.get("/", (req, res) => {
    res.json({ status: "ok", message: "NR PUFF STORE backend running" });
});

// ---------- 404 HANDLER ----------
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});

// ---------- ERROR HANDLER ----------
app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
