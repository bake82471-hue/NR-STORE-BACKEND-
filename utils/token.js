module.exports = function generateToken() {
    const token = Math.random().toString(36).substring(2);
    global.adminToken = token;
    return token;
};