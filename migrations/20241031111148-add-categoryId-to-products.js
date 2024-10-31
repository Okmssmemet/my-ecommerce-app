'use strict';

/** @type {import('sequelize-cli').Migration} */
// ./migrations/XXXXXXXXXXXXXX-add-categoryId-to-products.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'categoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'categories', // Kategoriler tablosuna referans
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'categoryId');
  },
};

