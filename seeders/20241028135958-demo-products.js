'use strict';

const productData = require('./productsData'); 
const updatedProducts = productData.map(product => ({
  ...product,
  createdAt: new Date(),
  updatedAt: new Date()
}));
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', updatedProducts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
