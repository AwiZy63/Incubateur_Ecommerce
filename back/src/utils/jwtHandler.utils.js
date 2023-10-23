const jwt = require('jsonwebtoken');
const { development: { api: { JWT_SECRET } } } = require("../../config/config.json");

const generateAccessToken = (user) => {
    if (!user) throw new Error("Missing user.");

    return jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, JWT_SECRET, {
        expiresIn: "1d"
    });
}

const verifyAccessToken = (token) => {
    if (!token) throw new Error("Missing token.");

    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    generateAccessToken,
    verifyAccessToken
}