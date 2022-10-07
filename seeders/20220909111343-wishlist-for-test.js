'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [{ 
      TransportationId: 1,
      UserId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    
   await queryInterface.bulkInsert('Bookmarks', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookmarks', null, {});
  }
};
