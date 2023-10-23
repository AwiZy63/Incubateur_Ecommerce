const ProductCategory = require("../models/product-category.model");
const Product = require("../models/product.model");

exports.CreateProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;
        const { isAdmin } = req.user;

        if (!isAdmin) {
            return res.status(403).json({
                error: true,
                message: "Vous n'êtes pas autorisé à effectuer cette action."
            });
        }

        if (!name || !description || !price || !image || !category) {
            return res.status(400).json({
                error: true,
                message: "Veuillez remplir tous les champs requis."
            })
        }

        const isCategoryExists = await ProductCategory.findOne({
            where: {
                name
            }
        });

        if (!isCategoryExists) {
            return res.status(400).json({
                error: true,
                message: "Cette catégorie n'existe pas."
            })
        }

        const isProductExists = await Product.findOne({
            where: {
                name
            }
        });

        if (isProductExists) {
            return res.status(400).json({
                error: true,
                message: "Ce produit existe déjà."
            })
        }

        const product = await Product.create({
            name,
            description,
            price,
            image,
            category
        });

        return res.status(201).json({
            error: false,
            message: "Le produit a bien été créé.",
            product
        });
    } catch (error) {
        console.error("ProductController::CreateProduct:", error)
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        });
    }
}

exports.GetProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        return res.status(200).json({
            error: false,
            products
        });
    } catch (error) {
        console.error("ProductController::GetProducts:", error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        });
    }
}

exports.GetProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "L'identifiant du produit est invalide."
            });
        }

        const product = await Product.findOne({
            where: {
                id
            }
        });

        if (!product) {
            return res.status(404).json({
                error: true,
                message: "Ce produit n'existe pas."
            });
        }

        return res.status(200).json({
            error: false,
            product
        });
    } catch (error) {
        console.error("ProductController::GetProduct:", error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        });
    }
}

exports.UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image, category } = req.body;
        const { isAdmin } = req.user;

        if (!isAdmin) {
            return res.status(403).json({
                error: true,
                message: "Vous n'êtes pas autorisé à effectuer cette action."
            });
        }

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "L'identifiant du produit est invalide."
            });
        }

        if (!name || !description || !price || !image || !category) {
            return res.status(400).json({
                error: true,
                message: "Veuillez remplir tous les champs requis."
            })
        }

        const isCategoryExists = await ProductCategory.findOne({
            where: {
                name
            }
        });

        if (!isCategoryExists) {
            return res.status(400).json({
                error: true,
                message: "Cette catégorie n'existe pas."
            })
        }

        const product = await Product.findOne({
            where: {
                id
            }
        });

        if (!product) {
            return res.status(404).json({
                error: true,
                message: "Ce produit n'existe pas."
            });
        }

        if (name !== product.name) {
            const isProductExists = await Product.findOne({
                where: {
                    name
                }
            });

            if (isProductExists) {
                return res.status(400).json({
                    error: true,
                    message: "Ce produit existe déjà."
                })
            }
        }

        await Product.update({
            name,
            description,
            price,
            image,
            category
        }, {
            where: {
                id
            }
        });

        return res.status(200).json({
            error: false,
            message: "Le produit a bien été modifié."
        });
    } catch (error) {
        console.error("ProductController::UpdateProduct:", error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        });
    }
}

exports.DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const { isAdmin } = req.user;

        if (!isAdmin) {
            return res.status(403).json({
                error: true,
                message: "Vous n'êtes pas autorisé à effectuer cette action."
            });
        }

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "L'identifiant du produit est invalide."
            });
        }

        const product = await Product.findOne({
            where: {
                id
            }
        });

        if (!product) {
            return res.status(404).json({
                error: true,
                message: "Ce produit n'existe pas."
            });
        }

        await Product.destroy({
            where: {
                id
            }
        });

        return res.status(200).json({
            error: false,
            message: "Le produit a bien été supprimé."
        });
    } catch (error) {
        console.error("ProductController::DeleteProduct:", error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        });
    }
}