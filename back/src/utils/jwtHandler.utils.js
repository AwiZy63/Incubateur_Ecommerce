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
        // Expires in 1 minute
        expiresIn: "1m"
    });
}

const verifyAccessToken = (token) => {
    if (!token) throw new Error("Missing token.");

    const res = jwt.verify(token, JWT_SECRET, { ignoreExpiration: false});

    const hasExpired = res.exp < Math.floor(Date.now() / 1000);

    console.log("hasExpired", hasExpired);
    if (!res || !res?.id || hasExpired) return false;

    return res;
}

module.exports = {
    generateAccessToken,
    verifyAccessToken
}