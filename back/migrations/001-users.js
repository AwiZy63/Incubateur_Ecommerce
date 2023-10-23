'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      isAdmin: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
      },
      accessToken: {
          type: Sequelize.STRING,
          allowNull: true,
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
    await queryInterface.dropTable('users');
  }
};
