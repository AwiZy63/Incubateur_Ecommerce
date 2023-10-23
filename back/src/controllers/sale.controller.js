const moment = require('moment/moment');
const Product = require('../models/product.model');
const Sale = require('../models/sale.model');
const User = require('../models/user.model');
const { Op } = require('sequelize');

exports.Create = async (req, res) => {
    try {
        const { cartContent, total } = req.body;
        const { id: userId } = req.user;

        if (!cartContent || !total) {
            return res.status(400).json({
                error: true,
                message: "Veuillez remplir tous les champs requis."
            });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(400).json({
                error: true,
                message: "Utilisateur introuvable."
            });
        }

        const products = JSON.parse(cartContent);

        if (!products || products.length === 0) {
            return res.status(400).json({
                error: true,
                message: "Veuillez remplir votre panier avant de passer commande."
            });
        }

        if (products.length > 0) {
            for (let i = 0; i < products.length; i++) {
                const product = products[i];

                const dbProduct = await Product.findByPk(product.id);

                if (!dbProduct) {
                    return res.status(400).json({
                        error: true,
                        message: "Produit introuvable."
                    });
                }

                if (product.quantity > dbProduct.stock) {
                    return res.status(400).json({
                        error: true,
                        message: "Le stock du produit " + dbProduct.name + " est insuffisant."
                    });
                }

                dbProduct.stock -= product.quantity;

                await dbProduct.save();
            }
        }

        const sale = await Sale.create({ userId, cartContent, total });

        return res.status(201).json({
            error: false,
            message: "Votre comande à été effectuée avec succès.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

exports.GetAll = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "Accès interdit."
            });
        }

        if (!user.isAdmin) {
            return res.status(401).json({
                error: true,
                message: "Accès interdit."
            });
        }

        const sales = await Sale.findAll();

        return res.status(200).json({
            error: false,
            sales,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

exports.GetById = async (req, res) => {
    try {
        const { saleId } = req.params;
        const { id: userId } = req.user;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "Accès interdit."
            });
        }

        if (!user.isAdmin) {
            return res.status(401).json({
                error: true,
                message: "Accès interdit."
            });
        }

        const sale = await Sale.findByPk(saleId);

        if (!sale) {
            return res.status(400).json({
                error: true,
                message: "Commande introuvable."
            });
        }

        return res.status(200).json({
            error: false,
            sale,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

exports.Delete = async (req, res) => {
    try {
        const { saleId } = req.params;
        const { id: userId } = req.user;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "Accès interdit."
            });
        }

        if (!user.isAdmin) {
            return res.status(401).json({
                error: true,
                message: "Accès interdit."
            });
        }

        const sale = await Sale.findByPk(saleId);

        if (!sale) {
            return res.status(400).json({
                error: true,
                message: "Commande introuvable."
            });
        }

        await sale.destroy();

        return res.status(200).json({
            error: false,
            message: "Commande supprimée avec succès.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

exports.GetByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const { id } = req.user;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "Accès interdit."
            });
        }

        if (!user.isAdmin) {
            return res.status(401).json({
                error: true,
                message: "Accès interdit."
            });
        }

        const sales = await Sale.findAll({ where: { userId } });

        return res.status(200).json({
            error: false,
            sales,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

exports.GetAllDateFiltered = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        const { id } = req.user;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "Accès interdit."
            });
        }

        if (!user.isAdmin) {
            return res.status(401).json({
                error: true,
                message: "Accès interdit."
            });
        }

        if (!startDate || !endDate) {
            return res.status(400).json({
                error: true,
                message: "Veuillez remplir tous les champs requis."
            });
        }

        const sales = await Sale.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        const data = [];

        // compter le nombre de jours entre les deux dates
        const days = moment(endDate).diff(moment(startDate), 'days');

        // Si aucune vente n'a été effectuée une journée alors on enregistre sales: 0 et total 0, par contre si il y a des vente ce jour, on enregistre sales: 1 et total: total de la vente
        for (let i = 0; i <= days; i++) {
            const date = moment(startDate).add(i, 'days').format('YYYY-MM-DD');

            const salesAtDate = sales.filter(sale => moment(sale.createdAt).format('YYYY-MM-DD') === date);

            if (salesAtDate.length > 0) {
                const total = salesAtDate.reduce((acc, sale) => acc + sale.total, 0);

                data.push({
                    date,
                    sales: salesAtDate.length,
                    total,
                });
            } else {
                data.push({
                    date,
                    sales: 0,
                    total: 0,
                });
            }
        }

        return res.status(200).json({
            error: false,
            sales: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            error: true,
            message: "Internal server error"
        });
    }
}