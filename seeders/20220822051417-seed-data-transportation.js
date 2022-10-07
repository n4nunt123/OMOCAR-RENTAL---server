'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../data/transportations.json').map(el => {
      return {
        ...el,
        status: 'Active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    
   await queryInterface.bulkInsert('Transportation', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transportation', null, {});
  }
};
