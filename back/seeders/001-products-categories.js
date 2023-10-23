'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products-categories', [
      {
        name: 'uncategorized',
        label: 'Non catégorisé',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'laptops',
        label: 'Ordinateurs portables',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'desktops',
        label: 'Ordinateurs de bureau',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'screens',
        label: 'Écrans',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'keyboards',
        label: 'Claviers',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'mice',
        label: 'Souris',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products-categories', null, {});
  }
};
