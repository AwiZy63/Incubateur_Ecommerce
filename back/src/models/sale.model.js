const { DataTypes, Model } = require('sequelize');
const sequelize = require("../../config/database.config");

class Sale extends Model {}

Sale.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cartContent: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'sale',
    tableName: 'sales',
});

module.exports = Sale;