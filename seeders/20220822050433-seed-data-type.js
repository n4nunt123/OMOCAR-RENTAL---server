'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../data/types.json').map(el => {
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    
   await queryInterface.bulkInsert('Types', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Types', null, {});
  }
};
