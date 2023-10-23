'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
      },
      price: {
          type: Sequelize.FLOAT,
          allowNull: false,
      },
      image: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      description: {
          type: Sequelize.TEXT,
          allowNull: false,
      },
      category: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'uncategorized',
          references: {
              model: 'products-categories',
              key: 'name',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
      },
      stock: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
      },
      createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
      },
      updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
      },
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
