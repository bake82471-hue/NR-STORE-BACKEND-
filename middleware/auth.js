module.exports = function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token || token !== global.adminToken) {
        return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    next();
};