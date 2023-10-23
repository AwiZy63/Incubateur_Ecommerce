const User = require("../models/user.model");
const { verifyAccessToken } = require("../utils/jwtHandler.utils");

const authenticateUser = async (req, res, next) => {
    try {
        // Grab Bearer Token
        const token = req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                error: true,
                message: "Vous devez être connecté pour effectuer cette action."
            })
        }

        const { id } = await verifyAccessToken(token);

        if (!id) {
            return res.status(401).json({
                error: true,
                message: "Vous devez être connecté pour effectuer cette action."
            })
        }

        const user = await User.findOne({
            where: {
                id
            }
        });

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "Vous devez être connecté pour effectuer cette action."
            })
        }

        req.user = user;

        next();
    } catch (error) {
        console.error("authenticateUser", error)
        // Check if TokenExpiredError
        if (error?.name === "TokenExpiredError") {
            return res.status(401).json({
                error: true,
                message: "Votre session a expiré, veuillez vous reconnecter."
            })
        }
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        })
    }
}

module.exports = authenticateUser;