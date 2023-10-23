const User = require("../models/user.model");
const { generateAccessToken, verifyAccessToken } = require("../utils/jwtHandler.utils");
const { hashPassword, comparePassword } = require("../utils/passwordHandler.utils");

exports.SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: true,
                message: "Veuillez remplir tous les champs requis."
            })
        }

        const isExists = await User.findOne({
            where: {
                email
            }
        });

        if (isExists) {
            return res.status(400).json({
                error: true,
                message: "Cette adresse email est déjà utilisée."
            })
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            error: false,
            message: "Votre compte a bien été créé, vous pouvez désormais vous connecter."
        });
    } catch (error) {
        console.error("UserController::SignUp", error)
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        })
    }
}

exports.SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: "Veuillez remplir tous les champs requis."
            })
        }

        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "L'email et/ou le mot de passe est incorrect."
            })
        }

        const isValid = await comparePassword(password, user.password);

        if (!isValid) {
            return res.status(400).json({
                error: true,
                message: "L'email et/ou le mot de passe est incorrect."
            })
        }

        const accessToken = await generateAccessToken(user);

        await User.update({
            accessToken
        }, {
            where: {
                id: user.id
            }
        });

        return res.status(200).json({
            error: false,
            message: "Vous êtes désormais connecté.",
            userData: {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                accessToken: accessToken
            },
        });
    } catch (error) {
        console.error("UserController::SignIn", error)
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        })
    }
}

exports.SignOut = async (req, res) => {
    try {
        const { id } = req.user;

        await User.update({
            accessToken: null
        }, {
            where: {
                id
            }
        });

        return res.status(200).json({
            error: false,
            message: "Vous êtes désormais déconnecté."
        });
    } catch (error) {
        console.error("UserController::SignOut", error)
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        })
    }
}

exports.GetUserData = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["password", "accessToken"]
            }
        });

        return res.status(200).json({
            error: false,
            message: "Utilisateur récupéré avec succès.",
            userData: user
        });
    } catch (error) {
        console.error("UserController::GetUserData", error)
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        });
    }
}

exports.UpdateUserData = async (req, res) => {
    try {
        const { id } = req.user;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                error: true,
                message: "Veuillez remplir tous les champs requis."
            });
        }

        const user = await User.findOne({
            where: {
                id
            }
        });

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "Utilisateur introuvable."
            });
        }

        if (email !== user.email) {
            const isExists = await User.findOne({
                where: {
                    email
                }
            });

            if (isExists) {
                return res.status(400).json({
                    error: true,
                    message: "Cette adresse email est déjà utilisée."
                });
            }
        }

        await User.update({
            name,
            email
        }, {
            where: {
                id
            }
        });

        return res.status(200).json({
            error: false,
            message: "Votre profil à bien été mis à jour."
        });
    } catch (error) {
        console.error("UserController::UpdateUserData", error)
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        });
    }
}

exports.UpdateUserPassword = async (req, res) => {
    try {
        const { id } = req.user;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                error: true,
                message: "Veuillez remplir tous les champs requis."
            });
        }

        const user = await User.findOne({
            where: {
                id
            }
        });

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "Utilisateur introuvable."
            });
        }

        const isValid = await comparePassword(currentPassword, user.password);

        if (!isValid) {
            return res.status(400).json({
                error: true,
                message: "Le mot de passe actuel est incorrect."
            });
        }

        const hashedPassword = await hashPassword(newPassword);

        await User.update({
            password: hashedPassword
        }, {
            where: {
                id
            }
        });

        return res.status(200).json({
            error: false,
            message: "Votre mot de passe à bien été mis à jour."
        });       
    } catch (error) {
        console.error("UserController::UpdateUserPassword", error)
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        });
    }
}

exports.CheckAccessToken = async (req, res) => {
    try {
        const { accessToken } = req.body;

        if (!accessToken) {
            return res.status(400).json({
                error: true,
                message: "Veuillez fournir un token d'accès."
            });
        }

        const user = await User.findOne({
            where: {
                accessToken
            }
        });

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "Token d'accès invalide."
            });
        }

        const isTokenValid = await verifyAccessToken(accessToken);

        if (!isTokenValid) {
            return res.status(400).json({
                error: true,
                message: "Token d'accès invalide et/ou expiré."
            });
        }

        return res.status(200).json({
            error: false,
            message: "Token d'accès valide."
        });
    } catch (error) {
        console.error("UserController::CheckAccessToken", error)
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        });
    }
}