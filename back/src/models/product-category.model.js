const { DataTypes, Model } = require('sequelize');
const sequelize = require("../../config/database.config");

class ProductCategory extends Model { }

ProductCategory.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'ProductCategory',
    tableName: 'products-categories'
});

module.exports = ProductCategory;