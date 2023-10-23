const { DataTypes, Model } = require('sequelize');
const sequelize = require("../../config/database.config");

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      isAdmin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
      },
      accessToken: {
          type: DataTypes.STRING,
          allowNull: true,
      }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
});

module.exports = User;