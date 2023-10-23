const ProductCategory = require("../models/product-category.model");

exports.CreateProductCategory = async (req, res) => {
    try {
        const { name, label } = req.body;
        const { isAdmin } = req.user;

        if (!isAdmin) {
            return res.status(403).json({
                error: true,
                message: "Vous n'êtes pas autorisé à effectuer cette action."
            });
        }

        if (!name || !label) {
            return res.status(400).json({
                error: true,
                message: "Veuillez remplir tous les champs requis."
            })
        }

        const isExists = await ProductCategory.findOne({
            where: {
                name
            }
        });

        if (isExists) {
            return res.status(400).json({
                error: true,
                message: "Cette catégorie existe déjà."
            })
        }

        const category = await ProductCategory.create({
            name,
            label
        });

        return res.status(201).json({
            error: false,
            message: "La catégorie a bien été créée.",
            category
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        });
    }
}

exports.GetProductCategories = async (req, res) => {
    try {
        const categories = await ProductCategory.findAll();

        return res.status(200).json({
            error: false,
            categories
        });
    } catch (error) {
        console.error("ProductCategoryController::GetProductCategories:", error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        });
    }
}

exports.GetProductCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await ProductCategory.findOne({
            where: {
                id
            }
        });

        if (!category) {
            return res.status(404).json({
                error: true,
                message: "Cette catégorie n'existe pas."
            })
        }

        return res.status(200).json({
            error: false,
            category
        });
    } catch (error) {
        console.error("ProductCategoryController::GetProductCategory:", error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        });
    }
}

exports.UpdateProductCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, label } = req.body;
        const { isAdmin } = req.user;

        if (!isAdmin) {
            return res.status(403).json({
                error: true,
                message: "Vous n'êtes pas autorisé à effectuer cette action."
            });
        }

        if (!name || !label) {
            return res.status(400).json({
                error: true,
                message: "Veuillez remplir tous les champs requis."
            })
        }

        const category = await ProductCategory.findOne({
            where: {
                id
            }
        });

        if (!category) {
            return res.status(404).json({
                error: true,
                message: "Cette catégorie n'existe pas."
            })
        }

        if (name !== category.name) {
            const isExists = await ProductCategory.findOne({
                where: {
                    name
                }
            });

            if (isExists) {
                return res.status(400).json({
                    error: true,
                    message: "Cette catégorie existe déjà."
                })
            }
        }

        await ProductCategory.update({
            name
        }, {
            where: {
                id
            }
        });

        return res.status(200).json({
            error: false,
            message: "La catégorie a bien été mise à jour."
        });
    } catch (error) {
        console.error("ProductCategoryController::UpdateProductCategory:", error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        });
    }
}

exports.DeleteProductCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { isAdmin } = req.user;

        if (!isAdmin) {
            return res.status(403).json({
                error: true,
                message: "Vous n'êtes pas autorisé à effectuer cette action."
            });
        }

        const category = await ProductCategory.findOne({
            where: {
                id
            }
        });

        if (!category) {
            return res.status(404).json({
                error: true,
                message: "Cette catégorie n'existe pas."
            })
        }

        await ProductCategory.destroy({
            where: {
                id
            }
        });

        return res.status(200).json({
            error: false,
            message: "La catégorie a bien été supprimée."
        });
    } catch (error) {
        console.error("ProductCategoryController::DeleteProductCategory:", error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue."
        });
    }
}