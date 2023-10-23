'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products-categories', { 
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
      label: {
          type: Sequelize.STRING,
          allowNull: false,
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
    await queryInterface.dropTable('products-categories');
  }
};
